import '../styles/index.css'
import Header from '../components/Header';
import Background from '../components/Background';

function MyApp({ Component, pageProps }) {
  return (
    <Background>
      <Component {...pageProps} />
    </Background>
  )
}

export default MyApp
