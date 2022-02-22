import React from 'react'
import ProductSelector from './ProductSelector'
import Image from 'next/image'

// import { Swiper, SwiperSlide } from 'swiper/react'
// import SwiperCore, { Navigation, Pagination } from 'swiper'
// import RecommendedList from './RecommendedList'

const ProductContent = ({product}) => {
  // const images = []

  // product.images.edges.map((image, i) => {
  //   images.push(
  //     <SwiperSlide key={`slide-${i}`}>
  //       <Image src={image.node.originalSrc} alt={image.node.altText} layout="fill" objectFit="cover" />
  //     </SwiperSlide>
  //   )
  // })
  const {url, altText} = product.images.edges[0].node

  return (

      <div className="flex flex-col justify-center items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
        <div className="w-full max-w-md border bg-white rounded-2xl overflow-hidden shadow-lg md:w-1/2">
          <div className="relative h-96 w-full">
            {/* <Swiper
              style={{ '--swiper-navigation-color': '#000', '--swiper-pagination-color': '#000' }}
              navigation
              pagination={{ clickable: true }}
              className="h-96 rounded-2xl"
              loop="true"
            >
              {images}
            </Swiper> */}
            <Image 
              src={url}
              alt={altText}
              layout="fill"
              objectFit="cover"
            />

          </div>
        </div>
        <ProductSelector product={product} />
      </div>


  )
}

export default ProductContent