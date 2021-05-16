import { useState } from 'react'
import { useRouter } from 'next/router'
import ContentWithSidebarLayout from '../../components/layout/ContentWithSidebarLayout'
import { Row, Col } from 'react-bootstrap'

const apiData = {
  apiPath: process.env.NEXT_PUBLIC_API_PATH
}

const comicAdd = () => {
  const router = useRouter()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState([])

  const axios = require('axios')

  const AddComicSubmit = (event) => {
    event.preventDefault()

    if (name && description && file) {
      var formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('file', file)
      axios
        .post(apiData.apiPath + '/api/comic/add/', formData)
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
      <Row>
        <Col>
          <form onSubmit={AddComicSubmit} className="w-75 m-4">
            <div className="mb-3">
              <label htmlFor="InputName" className="form-label">
                ชื่อเรื่อง
              </label>
              <input
                type="text"
                className="form-control"
                id="InputName"
                placeholder="ชื่อเรื่อง"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="InputDescription" className="form-label">
                คำอธิบาย
              </label>
              <input
                type="text"
                className="form-control"
                id="InputDescription"
                placeholder="คำอธิบาย"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="InputFile" className="form-label">
                รูปปก
              </label>
              <input
                type="file"
                className="form-control"
                id="InputFile"
                accept="image/png, image/jpeg"
                onChange={(event) => setFile(event.target.files[0])}
              />
            </div>

            <button type="submit" className="btn btn-yellow">
              เพิ่มs
            </button>
          </form>
        </Col>
        <Col>
          {file.length !== 0 && (
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="mw-100 mh-100"
            />
          )}
        </Col>
      </Row>
    </ContentWithSidebarLayout>
  )
}

export default comicAdd
