import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ContentWithSidebarLayout from '../../../components/layout/ContentWithSidebarLayout'
import { Row, Col } from 'react-bootstrap'

import { Document, Page, pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'

const apiData = {
  apiPath: process.env.NEXT_PUBLIC_API_PATH
}

const episodeAdd = () => {
  const router = useRouter()

  const [comic_id, setComicId] = useState('')

  const [bookData, setBookData] = useState([])
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState()
  const [numPages, setNumPages] = useState(null)

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  const axios = require('axios')

  useEffect(() => {
    if (router.isReady) {
      const { cid } = router.query
      if (!cid) {
        router.push('/')
      }
      axios
        .get(apiData.apiPath + '/api/comic/id/' + cid)
        .then(function (response) {
          const checkStatus = response.data.status
          setComicId(cid)
          if (checkStatus === 'success') setBookData(response.data.response)
        })
        .catch(function (error) {
          console.log(error)
        })
        .then(function () {
          // always executed
        })
    }
  }, [router.isReady])

  const AddEpisodeSubmit = (event) => {
    event.preventDefault()

    if (title && file) {
      var formData = new FormData()
      formData.append('title', title)
      formData.append('price', price)
      formData.append('comic_id', comic_id)
      formData.append('file', file)
      axios
        .post(apiData.apiPath + '/api/episode/add/', formData)
        .then(function (response) {
          router.push({
            pathname: '/comic/[cid]',
            query: { cid: comic_id }
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  return (
    <ContentWithSidebarLayout title="เพิ่มตอน">
      <Row>
        <Col>
          <form onSubmit={AddEpisodeSubmit} className="w-75 m-4">
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
                placeholder="ราคา"
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
        </Col>
        <Col>
          {file && (
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  renderTextLayer={false}
                  className="d-flex justify-content-center"
                />
              ))}
            </Document>
          )}
        </Col>
      </Row>
    </ContentWithSidebarLayout>
  )
}

export default episodeAdd
