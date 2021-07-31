import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../public/styles/site.css'
import React from 'react'

// eslint-disable-next-line react/prop-types
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
