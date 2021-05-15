import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faDotCircle } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'

const SideBar = () => {
  const router = useRouter()
  return (
    <div className="sideBar p-4">
      <p className="fs-4 pointer" onClick={() => router.push('/')}>
        <FontAwesomeIcon icon={faHome} className="me-2 align-middle" />
        หน้าหลัก
      </p>
      <p className="ms-4 pointer" onClick={() => router.push('/')}>
        <FontAwesomeIcon
          icon={faDotCircle}
          className="me-2 align-middle"
          size="sm"
        />
        การ์ตูนใหม่
      </p>
    </div>
  )
}

export default SideBar
