import { useEffect, Fragment, forwardRef } from 'react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { loginState, emailState } from '../../states/atom'
import Logout from '../modules/Logout'
import UserPool from '../modules/UserPool'
import Cookies from 'js-cookie'
import { Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSignOutAlt,
  faHistory,
  faCog,
  faCaretDown
} from '@fortawesome/free-solid-svg-icons'

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
    } else {
      setLogin(false)
    }
  }, [])

  const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        onClick(e)
      }}
      className="text-black-50"
    >
      {children}
      <FontAwesomeIcon
        icon={faCaretDown}
        className="d-inline-block ms-1"
        size="md"
      />
    </a>
  ))

  return (
    <nav className="navbar navbar-light border-bottom border-2 border-yellow mb-2">
      <div className="container">
        {/* logo */}
        <a className="navbar-brand pointer" onClick={() => router.push('/')}>
          <img
            src="/favicon.png"
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
                <Dropdown className="d-inline-block">
                  <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
                    <img
                      src="/profile.png"
                      alt="Profile"
                      width="32"
                      className="d-inline-block"
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Header>
                      <img
                        src="/profile.png"
                        alt="Profile"
                        width="36"
                        className="d-inline-block me-2 align-top"
                      />

                      <div className="d-inline-block">
                        <h6 className="my-0 text-dark">FristName LastName</h6>
                        <span>{email}</span>
                      </div>
                    </Dropdown.Header>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#">
                      <img
                        src="/coin.png"
                        alt="Coin"
                        width="16"
                        className="me-2 align-middle"
                      />
                      0 เหรียญ
                      <button
                        type="button"
                        className="btn btn-yellow btn-sm ms-5"
                        onClick={() => {}}
                      >
                        เติมเหรียญ
                      </button>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#">
                      <FontAwesomeIcon
                        icon={faHistory}
                        className="me-2 align-middle"
                        size="md"
                      />
                      ประวัติการใช้งาน
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
                      <FontAwesomeIcon
                        icon={faCog}
                        className="me-2 align-middle"
                        size="md"
                      />
                      ตั้งค่า
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={() => {
                        Logout()
                        setLogin(false)
                        setEmail(null)
                        router.push('/')
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        className="me-2 align-middle"
                        size="md"
                      />
                      ออกจากระบบ
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          {/* not login */}
          {router.pathname !== '/login' &&
            router.pathname !== '/register' &&
            login === false && (
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
