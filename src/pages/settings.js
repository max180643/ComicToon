import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { userIdState, nameState } from '../states/atom'
import ContentWithSidebarLayout from '../components/layout/ContentWithSidebarLayout'
const axios = require('axios')

const apiData = {
  apiPath: process.env.NEXT_PUBLIC_API_PATH
}

const settings = () => {
  const [userId, setUserId] = useRecoilState(userIdState)
  const [name, setName] = useRecoilState(nameState)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [successMSG, setSuccessMSG] = useState(false)

  useEffect(() => {
    // get user data
    axios
      .get(apiData.apiPath + '/api/user/get/' + userId)
      .then((res) => {
        const { status, response } = res.data
        if (status === 'success') {
          setFirstName(response.first_name)
          setLastName(response.last_name)
          setEmail(response.email)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [userId])

  const updateUserSubmit = (event) => {
    event.preventDefault()

    if ((firstName, lastName)) {
      axios
        .put(apiData.apiPath + '/api/user/update/' + userId, {
          first_name: firstName,
          last_name: lastName
        })
        .then((res) => {
          const { status, response } = res.data
          console.log(response)
          if (status === 'success') {
            setName([firstName, lastName])
            setSuccessMSG(true)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <ContentWithSidebarLayout title="ตั้งค่า">
      <form onSubmit={updateUserSubmit} className="w-75 m-4">
        <div className="mb-3">
          {successMSG && (
            <div className="alert alert-success" role="alert">
              ปรับปรุงข้อมูลเสร็จสิ้น!
            </div>
          )}
          <label htmlFor="InputFirstName" className="form-label">
            ชื่อจริง
          </label>
          <input
            type="text"
            className="form-control"
            id="InputFirstName"
            placeholder="ชื่อจริง"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="InputLastName" className="form-label">
            นามสกุล
          </label>
          <input
            type="text"
            className="form-control"
            id="InputLastName"
            placeholder="นามสกุล"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="InputEmail" className="form-label">
            อีเมล
          </label>
          <input
            type="text"
            className="form-control"
            id="InputEmail"
            placeholder="อีเมล"
            value={email}
            disabled
          />
        </div>

        <button type="submit" className="btn btn-yellow">
          แก้ไขข้อมูล
        </button>
      </form>
    </ContentWithSidebarLayout>
  )
}

export default settings
