import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function Error() {
  return (
    <>
      <Head>
        <title>
          Harness - Self-Service CI/CD Tool for DevOps Teams &amp; Engineers
        </title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Reenie+Beanie:wght@400;500;600&display=swap"
        />
      </Head>
      <div className="container">
        <img src="/harness-light.svg" />
        <h3>Ooooops! Something goes wrong...</h3>
        <div className="link">
          <Link href="/">
            <a>Head back to our Homepage</a>
          </Link>
        </div>
        <style jsx>{`
          .container {
            min-height: 100vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          h3 {
            margin: 36px;
          }
          .link {
            font-size: 18px;
            font-weight: 600;
          }
        `}</style>
      </div>
    </>
  )
}
