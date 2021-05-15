import { useState } from 'react'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import UserPool from '../components/modules/UserPool'
import { useRecoilState } from 'recoil'
import { loginState, emailState, nameState } from '../states/atom'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

const axios = require('axios')

const apiData = {
  apiPath: process.env.NEXT_PUBLIC_API_PATH
}

const login = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alertMSG, setAlertMSG] = useState('')

  const [login, setLogin] = useRecoilState(loginState)
  const [emailGlobal, setEmailGlobal] = useRecoilState(emailState)
  const [name, setName] = useRecoilState(nameState)

  const clearStatePassword = () => {
    setPassword('')
  }

  const clearStateLogin = () => {
    setEmail('')
    setPassword('')
    setAlertMSG('')
  }

  const LoginSubmit = (event) => {
    event.preventDefault()

    if (email && password) {
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool
      })

      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password
      })

      user.authenticateUser(authDetails, {
        onSuccess: async (res) => {
          // console.log('onSuccess:', res)

          const { username } = res.accessToken.payload
          const { email } = res.idToken.payload

          let fristTime = false

          // get user data
          await axios
            .get(apiData.apiPath + '/api/user/get/' + username)
            .then((res) => {
              const { status, response } = res.data
              if (status === 'success' && response === 'user not found.') {
                fristTime = true
              } else {
                const { frist_name, last_name } = response
                setName([frist_name, last_name])
              }
            })
            .catch((error) => {
              console.log(error)
            })

          // if frist time create new user
          if (fristTime) {
            await axios
              .post(apiData.apiPath + '/api/user/create', {
                id: username,
                email: email
              })
              .then((res) => {
                // console.log(res.data)
              })
              .catch((error) => {
                console.log(error)
              })
          }

          Cookies.set('cognito', res.accessToken.jwtToken, { secure: true })
          clearStateLogin()
          setLogin(true)
          setEmailGlobal(res.idToken.payload.email)
          router.push('/')
        },

        onFailure: (err) => {
          // console.error('onFailure:', err)
          clearStatePassword()
          setAlertMSG(err.message)
        }
      })
    }
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 mt-4">
      <h2 className="mb-3">เข้าสู่ระบบ</h2>
      <form onSubmit={LoginSubmit} className="w-50">
        <div className="mb-3">
          <label htmlFor="InputEmail" className="form-label">
            อีเมล
          </label>
          <input
            type="email"
            className="form-control"
            id="InputEmail"
            placeholder="อีเมล"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="InputPassword" className="form-label">
            รหัสผ่าน
          </label>
          <input
            type="password"
            className="form-control"
            id="InputPassword"
            placeholder="รหัสผ่าน"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        {alertMSG && (
          <div className="alert alert-danger" role="alert">
            {alertMSG}
          </div>
        )}

        <button type="submit" className="btn btn-yellow">
          เข้าสู่ระบบ
        </button>
        <div
          role="button"
          onClick={() => router.push('/register')}
          className="mx-3 d-inline-flex text-dark"
        >
          สมัครสมาชิก
        </div>
      </form>
    </div>
  )
}

export default login
