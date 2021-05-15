import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Document, Page, pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'

const apiData = {
  apiPath: process.env.NEXT_PUBLIC_API_PATH
}

const episodeAdd = () => {
  const router = useRouter()

  const [episodeData, setEpisodeData] = useState([])
  const [numPages, setNumPages] = useState(null)

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
  }

  useEffect(() => {
    if (router.isReady) {
      const { eid } = router.query
      const axios = require('axios')
      axios
        .get(apiData.apiPath + '/api/episode/id/' + eid)
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
    <div className="all-page-container">
      <Document file={episodeData.path} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            renderTextLayer={false}
            className="d-flex justify-content-center"
          />
        ))}
      </Document>
    </div>
  )
}

export default episodeAdd
