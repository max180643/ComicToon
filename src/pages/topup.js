import ContentWithSidebarLayout from '../components/layout/ContentWithSidebarLayout'

const topup = () => {
  const price_data = [
    { coin: 100, price: 29 },
    { coin: 300, price: 79 },
    { coin: 500, price: 129 },
    { coin: 1000, price: 189 },
    { coin: 1500, price: 399 }
  ]

  return (
    <ContentWithSidebarLayout title="เติมเหรียญ">
      <div className="px-2">
        <h5>เหรียญของฉัน: 0 เหรียญ</h5>
        {price_data.map((data) => {
          return (
            <div>
              <h5>
                <img
                  src="/coin.png"
                  alt="Coin"
                  width="16"
                  className="me-2 align-middle"
                />
                {data.coin} เหรียญ
                <button type="button" className="btn btn-yellow ms-3">
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
