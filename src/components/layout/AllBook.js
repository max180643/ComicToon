import { useEffect, useState } from 'react'
import BookCard from '../elements/BookCard'
import { Row } from 'react-bootstrap'

const apiData = {
  apiPath: process.env.NEXT_PUBLIC_API_PATH
}

const allBook = () => {
  const [bookData, setBookData] = useState([])

  useEffect(() => {
    const axios = require('axios')
    axios
      .get(apiData.apiPath + '/api/comic/all')
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
  }, [])

  return (
    <Row>
      {bookData.map((item) => {
        return <BookCard data={item} key={item.id} />
      })}
    </Row>
  )
}

export default allBook
