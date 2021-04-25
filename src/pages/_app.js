import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return (
    <React.StrictMode>
      <Head>
        <title>ComicToon · เว็ปอ่านการ์ตูนออนไลน์</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <div className="container">
        <nav className="navbar navbar-light border-bottom border-2 border-yellow mb-2">
          <div className="container">
            <a
              className="navbar-brand pointer"
              onClick={() => router.push('/')}
            >
              <img
                src="/logo32.png"
                alt="ComicToon Icon"
                width="32"
                className="d-inline-block align-text-top me-1"
              />
              ComicToon
            </a>
          </div>
        </nav>
        <Component {...pageProps} />
      </div>
    </React.StrictMode>
  )
}

export default MyApp
