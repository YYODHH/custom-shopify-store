import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getAllProducts } from '../shopify/shopify'
import { getProduct } from '../shopify/shopify'
import ProductList from '../components/ProductList'

export default function Home({products}) {
//  console.log(products)

  return (
   <div>
     <ProductList products={products} />
   </div>
  )
}

export async function getStaticProps() {
  const products= await getAllProducts()
  return {
    props: {products}, 
  }
}
