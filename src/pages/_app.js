import React from 'react'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <Head>
        <title>ComicToon · เว็ปอ่านการ์ตูนออนไลน์</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </React.StrictMode>
  )
}

export default MyApp
