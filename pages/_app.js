import '../styles/globals.css'
import Layout from '../components/Layout'
import ShopProvider from '../shopify/shopContext'
import {useRouter} from 'next/router'
import Blockchain from '../components/Blockchain.js'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <ShopProvider>
      <Layout>
        <Component {...pageProps} key={router.asPath} />
      </Layout>
      <Blockchain />
    </ShopProvider>
  )
}
export default MyApp
