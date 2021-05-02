import { useEffect, Fragment } from 'react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { loginState, emailState } from '../../states/atom'
import Logout from '../modules/Logout'
import UserPool from '../modules/UserPool'
import Cookies from 'js-cookie'

const Navbar = () => {
  const router = useRouter()

  const [login, setLogin] = useRecoilState(loginState)
  const [email, setEmail] = useRecoilState(emailState)

  useEffect(() => {
    const user = UserPool.getCurrentUser()
    if (user) {
      user.getSession((err, session) => {
        if (err) {
          // console.log(err)
        } else {
          // console.log(session)
          Cookies.set('cognito', session.accessToken.jwtToken, { secure: true })
          setLogin(true)
          setEmail(session.idToken.payload.email)
        }
      })
    }
  }, [])

  return (
    <nav className="navbar navbar-light border-bottom border-2 border-yellow mb-2">
      <div className="container">
        {/* logo */}
        <a className="navbar-brand pointer" onClick={() => router.push('/')}>
          <img
            src="/logo32.png"
            alt="ComicToon Icon"
            width="32"
            className="d-inline-block align-text-top me-1"
          />
          ComicToon
        </a>
        {/* account */}
        <Fragment>
          {/* login */}
          {router.pathname !== '/login' &&
            router.pathname !== '/register' &&
            login && (
              <div>
                <span className="d-inline-block me-1">{email}</span>
                <button
                  type="button"
                  className="btn btn-yellow"
                  onClick={() => {
                    Logout()
                    setLogin(false)
                    setEmail(null)
                    router.push('/')
                  }}
                >
                  ออกจากระบบ
                </button>
              </div>
            )}
          {/* not login */}
          {router.pathname !== '/login' &&
            router.pathname !== '/register' &&
            !login && (
              <div>
                <button
                  type="button"
                  className="btn btn-yellow"
                  onClick={() => router.push('/login')}
                >
                  เข้าสู่ระบบ
                </button>
              </div>
            )}
        </Fragment>
      </div>
    </nav>
  )
}

export default Navbar
