import React from 'react'
import ProductContent from '../../components/ProductContent'
import { getAllProducts, getProduct } from '../../shopify/shopify'


const ProductPage = ({product}) => {

  return (

      <div className='md:mt-40'>
        <ProductContent product={product}/>
      </div>

  )
}

export default ProductPage

export async function getStaticPaths() {
    const products = await getAllProducts()
  
    const paths = products.map(item => {
      const handle = String(item.node.handle)
  
      return {
        params: { product: handle }
      }
    })
  
    return {
      paths,
      fallback: false
    }
  }
  
  export async function getStaticProps({ params }) {
    const product = await getProduct(params.product)
  
    return {
      props: {
        product
      }
    }
  }