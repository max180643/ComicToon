import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const apiData = {
  apiPath: process.env.NEXT_PUBLIC_API_PATH
}

const episodeAdd = () => {
  const router = useRouter()

  const [episodeData, setEpisodeData] = useState([])

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

  return <div>{episodeData.path}</div>
}

export default episodeAdd
