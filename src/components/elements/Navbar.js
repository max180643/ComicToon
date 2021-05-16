import { useEffect, Fragment, forwardRef } from 'react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import {
  loginState,
  emailState,
  nameState,
  userIdState,
  coinState
} from '../../states/atom'
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

const axios = require('axios')

const apiData = {
  apiPath: process.env.NEXT_PUBLIC_API_PATH
}

const Navbar = () => {
  const router = useRouter()

  const [login, setLogin] = useRecoilState(loginState)
  const [email, setEmail] = useRecoilState(emailState)
  const [name, setName] = useRecoilState(nameState)
  const [userId, setUserId] = useRecoilState(userIdState)
  const [coin, setCoin] = useRecoilState(coinState)

  useEffect(() => {
    const user = UserPool.getCurrentUser()
    if (user) {
      user.getSession(async (err, session) => {
        if (err) {
          // console.log(err)
        } else {
          // console.log(session)
          const { username } = session.accessToken.payload
          const { email } = session.idToken.payload

          // get user data
          await axios
            .get(apiData.apiPath + '/api/user/get/' + username)
            .then((res) => {
              const { status, response } = res.data
              if (status === 'success' && response !== 'user not found.') {
                const { first_name, last_name, coin } = response
                setName([first_name, last_name])
                setCoin(coin)
              }
            })
            .catch((error) => {
              console.log(error)
            })

          // set cookie
          Cookies.set('cognito', session.accessToken.jwtToken, {
            secure: true
          })

          // set state
          setUserId(username)
          setEmail(email)
          setLogin(true)
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
      <FontAwesomeIcon icon={faCaretDown} className="d-inline-block ms-1" />
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
                        <h6 className="my-0 text-dark">
                          {name[0]} {name[1]}
                        </h6>
                        <span>{email}</span>
                      </div>
                    </Dropdown.Header>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => router.push('/topup')}>
                      <img
                        src="/coin.png"
                        alt="Coin"
                        width="16"
                        className="me-2 align-middle"
                      />
                      {coin} เหรียญ
                      <button
                        type="button"
                        className="btn btn-yellow btn-sm ms-5"
                      >
                        เติมเหรียญ
                      </button>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#" disabled>
                      <FontAwesomeIcon
                        icon={faHistory}
                        className="me-2 align-middle"
                      />
                      ประวัติการใช้งาน
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => router.push('/settings')}>
                      <FontAwesomeIcon
                        icon={faCog}
                        className="me-2 align-middle"
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
