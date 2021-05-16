import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ContentWithSidebarLayout from '../../components/layout/ContentWithSidebarLayout'
import { Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
const { DateTime } = require('luxon')

const apiData = {
  apiPath: process.env.NEXT_PUBLIC_API_PATH
}

const comic = () => {
  const router = useRouter()

  const [bookData, setBookData] = useState([])
  const [episodeData, setEpisodeData] = useState([])

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
          // console.log(response.data.response)
          if (checkStatus === 'success') {
            const sortedEpisodeData = response.data.response
              .sort(
                (a, b) => DateTime.fromISO(b.date) - DateTime.fromISO(a.date)
              )
              .reverse()
            setEpisodeData(sortedEpisodeData)
          } else console.log('Load Data Error')
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
            className="btn btn-yellow rounded mb-3"
          >
            เพิ่มตอน
          </button>
          {episodeData.map((data) => (
            <div
              className="my-2 mx-2 p-1 border border-yellow rounded pointer shadow-sm episodeCard"
              key={data.id}
              onClick={() =>
                router.push({
                  pathname: '/episode/[eid]',
                  query: { eid: data.id }
                })
              }
            >
              <div className="d-flex justify-content-between">
                <p className="m-1">{data.title} </p>
                {data.price > 0 && (
                  <div className="d-inline mt-1 me-2">
                    <img
                      src="/coin.png"
                      alt="Coin"
                      width="16"
                      className="me-2 align-middle"
                    />
                    <span>{data.price}</span>
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-end">
                <div className="mx-2">
                  {data.price === 0 && (
                    <span>
                      <FontAwesomeIcon
                        icon={faEye}
                        className="d-inline-block ms-1"
                      />
                      {' อ่าน'}
                    </span>
                  )}
                  {data.price > 0 && (
                    <span>
                      <FontAwesomeIcon
                        icon={faShoppingCart}
                        className="d-inline-block ms-1"
                      />
                      {' ซื้อ'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Col>
      </Row>
    </ContentWithSidebarLayout>
  )
}

export default comic
