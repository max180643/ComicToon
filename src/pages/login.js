import { useState } from 'react'
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import UserPool from './components/modules/UserPool'

const login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alertMSG, setAlertMSG] = useState('')

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
        onSuccess: (res) => {
          console.log('onSuccess:', res)
          clearStateLogin()
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
    <div>
      <h2 className="mb-3">เข้าสู่ระบบ</h2>
      <form onSubmit={LoginSubmit}>
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
      </form>
    </div>
  )
}

export default login
