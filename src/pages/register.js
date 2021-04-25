import { useState } from 'react'
import { useRouter } from 'next/router'
import UserPool from './components/modules/UserPool'

const register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [alertMSG, setAlertMSG] = useState('')
  const [successMSG, setSuccessMSG] = useState(false)

  const clearStatePassword = () => {
    setPassword('')
    setConfirmPassword('')
  }

  const clearRegisterState = () => {
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setAlertMSG('')
  }

  const RegisterSubmit = (event) => {
    event.preventDefault()

    if (email && password && confirmPassword) {
      if (password === confirmPassword && password >= 8) {
        UserPool.signUp(email, password, [], null, (err, res) => {
          if (err) {
            // console.error(err)
            setAlertMSG(err.message)
          }
          // console.log(res)
          clearRegisterState()
          setSuccessMSG(true)
        })
      } else {
        clearStatePassword()
        setAlertMSG('ตรวจสอบรหัสผ่านใหม่อีกครั้ง!')
      }
    }
  }

  const router = useRouter()

  return (
    <div>
      <h2 className="mb-3">สมัครมาชิก</h2>
      <form onSubmit={RegisterSubmit}>
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
          <label htmlFor="InputPassword1" className="form-label">
            รหัสผ่าน
          </label>
          <input
            type="password"
            className="form-control"
            id="InputPassword1"
            placeholder="รหัสผ่าน"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <small className="form-text text-muted">
            รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัว
          </small>
        </div>
        <div className="mb-3">
          <label htmlFor="InputPassword2" className="form-label">
            ยืนยันรหัสผ่าน
          </label>
          <input
            type="password"
            className="form-control"
            id="InputPassword2"
            placeholder="รหัสผ่าน"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>

        {alertMSG && (
          <div className="alert alert-danger" role="alert">
            {alertMSG}
          </div>
        )}

        {successMSG && (
          <div className="alert alert-success" role="alert">
            สมัครมาชิกสำเร็จ!{' '}
            <a
              onClick={() => router.push('/login')}
              className="alert-link pointer"
            >
              คลิกที่นี่เพื่อเข้าสู่ระบบ
            </a>
          </div>
        )}

        <button type="submit" className="btn btn-yellow">
          สมัครมาชิก
        </button>
      </form>
    </div>
  )
}

export default register
