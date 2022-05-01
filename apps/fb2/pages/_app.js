import '../styles/globals.css'
import 'event-target-polyfill'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

