import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ContentWithSidebarLayout from '../../components/layout/ContentWithSidebarLayout'
import { Row, Col } from 'react-bootstrap'

const apiData = {
  apiPath: process.env.NEXT_PUBLIC_API_PATH
}

const comic = () => {
  const router = useRouter()

  const [bookData, setBookData] = useState([])
  const [episodeData, setEpisodeData] = useState([])
  const { DateTime } = require('luxon')

  useEffect(() => {
    if (router.isReady) {
      const { cid } = router.query
      const axios = require('axios')
      axios
        .get(apiData.apiPath + '/api/comic/id/' + cid)
        .then(function (response) {
          const checkStatus = response.data.status
          if (checkStatus === 'success') setBookData(response.data.response)
          else console.log('Load Data Error')
        })
        .catch(function (error) {
          console.log(error)
        })
        .then(function () {
          // always executed
        })
      axios
        .get(apiData.apiPath + '/api/episode/all/' + cid)
        .then(function (response) {
          const checkStatus = response.data.status
          console.log(response.data.response)
          if (checkStatus === 'success') setEpisodeData(response.data.response)
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

  return (
    <ContentWithSidebarLayout title={bookData.name}>
      <Row className="mt-4">
        <Col className="d-flex justify-content-center">
          <img
            src={bookData.cover}
            alt={bookData.name}
            className="mh-100 mw-100"
          />
        </Col>
        <Col>
          <p>{bookData.description}</p>
          <p>
            วันที่เปิดตัว{' '}
            {DateTime.fromISO(bookData.date).setLocale('th').toFormat('DDD')}
          </p>
          <button
            onClick={() =>
              router.push({
                pathname: '/episode/add/[cid]',
                query: { cid: bookData.id }
              })
            }
            className="btn btn-dark rounded"
          >
            เพิ่มตอน
          </button>
          {episodeData.map((data) => (
            <div className="my-4 mx-2 p-1 bg-dark text-light rounded">
              <p>{data.title}</p>
              <div class="d-flex justify-content-end">
                <button className="btn btn-light rounded-circle mx-2">
                  {data.price}
                </button>
                <button
                  onClick={() =>
                    router.push({
                      pathname: '/episode/[eid]',
                      query: { eid: data.id }
                    })
                  }
                  className="btn btn-light rounded-circle mx-2"
                >
                  อ่าน
                </button>
              </div>
            </div>
          ))}
        </Col>
      </Row>
    </ContentWithSidebarLayout>
  )
}

export default comic
