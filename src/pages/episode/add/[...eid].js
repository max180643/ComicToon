import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ContentWithSidebarLayout from '../../../components/layout/ContentWithSidebarLayout'

const apiData = {
  apiPath: process.env.NEXT_PUBLIC_API_PATH
}

const episodeAdd = () => {
  const router = useRouter()

  const [comic_id, setComicId] = useState('')

  const [bookData, setBookData] = useState([])
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState([])

  const axios = require('axios')

  useEffect(() => {
    if (router.isReady) {
      const { cid } = router.query
      axios
        .get(apiData.apiPath + '/api/comic/id/' + cid)
        .then(function (response) {
          const checkStatus = response.data.status
          setComicId(cid)
          if (checkStatus === 'success') setBookData(response.data.response)
          else console.log('Load Data Error')
        })
        .catch(function (error) {
          console.log(error)
        })
        .then(function () {
          // always executed
        })
    }
  }, [router.isReady])

  const AddComicSubmit = (event) => {
    event.preventDefault()

    if (title && price && file) {
      var formData = new FormData()
      formData.append('title', title)
      formData.append('price', price)
      formData.append('comic_id', comic_id)
      formData.append('file', file)
      axios
        .post(apiData.apiPath + '/api/episode/add/', formData)
        .then(function (response) {
          console.log(response)
          router.push('/')
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  return (
    <ContentWithSidebarLayout title="เพิ่มตอน">
      <form onSubmit={AddComicSubmit} className="w-75 m-4">
        <div className="mb-3">
          <label htmlFor="InputName" className="form-label">
            ชื่อเรื่อง
          </label>
          <input
            type="name"
            className="form-control"
            id="InputName"
            placeholder={bookData.name}
            disabled
          />
        </div>
        <div className="mb-3">
          <label htmlFor="InputTitle" className="form-label">
            ชื่อตอน
          </label>
          <input
            type="text"
            className="form-control"
            id="InputTitle"
            placeholder="ชื่อตอน"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="InputPrice" className="form-label">
            ราคา
          </label>
          <input
            type="number"
            className="form-control"
            id="InputPrice"
            placeholder="ชื่อตอน"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="InputFile" className="form-label">
            ไฟล์การ์ตูน
          </label>
          <input
            type="file"
            className="form-control"
            id="InputFile"
            accept="application/pdf"
            onChange={(event) => setFile(event.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-yellow">
          เพิ่ม
        </button>
      </form>
    </ContentWithSidebarLayout>
  )
}

export default episodeAdd
