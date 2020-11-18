import '../styles/index.css'
import Background from '../components/Background';

function MyApp({ Component, pageProps }) {
  return (
    <Background>
      <Component {...pageProps} />
    </Background>
  )
}

export default MyApp
