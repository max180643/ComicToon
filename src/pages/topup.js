import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { userIdState, coinState } from '../states/atom'
import ContentWithSidebarLayout from '../components/layout/ContentWithSidebarLayout'

const axios = require('axios')

const apiData = {
  apiPath: process.env.NEXT_PUBLIC_API_PATH
}

const topup = () => {
  const [userId, setUserId] = useRecoilState(userIdState)
  const [coin, setCoin] = useRecoilState(coinState)

  const [successMSG, setSuccessMSG] = useState(false)

  const price_data = [
    { coin: 100, price: 29 },
    { coin: 300, price: 79 },
    { coin: 500, price: 129 },
    { coin: 1000, price: 189 },
    { coin: 1500, price: 399 }
  ]

  const topup = async (data) => {
    setSuccessMSG(false)

    await axios
      .post(apiData.apiPath + '/api/user/topup/' + userId, {
        package: data
      })
      .then(async (res) => {
        const { status, response } = res.data
        if (status === 'success' && response === 'coin added.') {
          // get current coin
          await axios
            .get(apiData.apiPath + '/api/user/get/' + userId)
            .then((res) => {
              const { status, response } = res.data
              if (status === 'success' && response !== 'user not found.') {
                setCoin(response.coin)
              }
            })
            .catch((error) => {
              console.log(error)
            })

          setSuccessMSG(true)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <ContentWithSidebarLayout title="เติมเหรียญ">
      <div className="px-2">
        {successMSG && (
          <div className="alert alert-success" role="alert">
            เติมเหรียญสำเร็จ!
          </div>
        )}
        <h5>เหรียญของฉัน: {coin} เหรียญ</h5>
        {price_data.map((data) => {
          return (
            <div key={'coin' + data.coin}>
              <h5>
                <img
                  src="/coin.png"
                  alt="Coin"
                  width="16"
                  className="me-2 align-middle"
                />
                {data.coin} เหรียญ
                <button
                  type="button"
                  className="btn btn-yellow ms-3"
                  onClick={() => topup('price' + data.price)}
                >
                  {data.price} บาท
                </button>
              </h5>
            </div>
          )
        })}
      </div>
    </ContentWithSidebarLayout>
  )
}

export default topup
