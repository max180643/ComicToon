import React from 'react'
import Head from 'next/head'
import { RecoilRoot } from 'recoil'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'

import Navbar from '../components/elements/Navbar'

function MyApp({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <Head>
        <title>ComicToon · เว็ปอ่านการ์ตูนออนไลน์</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <RecoilRoot>
        <div className="container">
          <Navbar />
          <Component {...pageProps} />
        </div>
      </RecoilRoot>
    </React.StrictMode>
  )
}

export default MyApp
