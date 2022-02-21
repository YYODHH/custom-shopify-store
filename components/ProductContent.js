import React from 'react'

const ProductContent = ({product}) => {
  return (
    <div className='flex justify-around items-center'>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
    </div>
  )
}

export default ProductContent