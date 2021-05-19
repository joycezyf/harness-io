// pages/404.js
import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="container">
      <img src="/harness-light.svg" />
      <h3>Ooooops! This page doesn't exist...</h3>
      <div className="link">
        Not to worry,{' '}
        <Link href="/">
          <a>head back to our Homepage</a>
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
  )
}
