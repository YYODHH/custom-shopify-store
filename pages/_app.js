import '../styles/globals.css'
import Layout from '../components/Layout'
import ShopProvider from '../shopify/shopContext'
import {useRouter} from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return (
    <ShopProvider>
      <Layout>
        <Component {...pageProps} key={router.asPath} />
      </Layout>
    </ShopProvider>
  )
  
}
export default MyApp
