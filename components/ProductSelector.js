
   
import { useState, useEffect, useContext } from "react"
import { formatter } from '../utilities/currencyFormattter'
import OptionSelector from './OptionSelector'

import { CartContext } from "../shopify/shopContext"
// import axios from "axios"
// import useSWR from 'swr'

// setup inventory fetcher
// const fetchInventory = (url, id) =>
//   axios
//     .get(url, {
//       params: {
//         id: id,
//       },
//     })
//     .then((res) => res.data)

export default function ProductSelector({ product }) {

//   const { data: productInventory } = useSWR(
//     ['/api/available', product.handle],
//     (url, id) => fetchInventory(url, id),
//     { errorRetryCount: 3 }
//   )

//   const [available, setAvailable] = useState(true)


  const { addToCart } = useContext(CartContext)

  const allVariantOptions = product.variants.edges?.map(variant => {
    
    const allOptions = {}

    variant.node.selectedOptions.map(item => {
      allOptions[item.name] = item.value
    })
    return {
      id: variant.node.id,
      title: product.title,
      handle: product.handle,
      image: product.images.edges[0].node.url,
      options: allOptions,
      variantTitle: variant.node.title,
      variantPrice: variant.node.priceV2.amount,
      variantQuantity: 1
    }
  })

  const defaultValues = {}
  product.options.map(item => {
    defaultValues[item.name] = item.values[0]
  })

  const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0])
  const [selectedOptions, setSelectedOptions] = useState(defaultValues)

  function setOptions(name, value) {
    setSelectedOptions(prevState => {
      return { ...prevState, [name]: value }
    })

    const selection = {
      ...selectedOptions,
      [name]: value
    }

    allVariantOptions.map(item => {
      if (JSON.stringify(item.options) === JSON.stringify(selection)) {
        setSelectedVariant(item)
      }
    })
  }


//   useEffect(() => {
//     if (productInventory) {
//       const checkAvailable = productInventory?.variants.edges.filter(item => item.node.id === selectedVariant.id)

//       if (checkAvailable[0].node.availableForSale) {
//         setAvailable(true)
//       } else {
//         setAvailable(false)
//       }
//     }
//   }, [productInventory, selectedVariant])


  return (
    <div className="rounded-2xl p-4 shadow-lg flex flex-col w-full md:w-1/3">
      <h2 className="text-2xl font-bold">{product.title}</h2>
      <span className="pb-3">{formatter.format(product.variants.edges[0].node.priceV2.amount)}</span>
      {
        product.options.map(({ name, values }) => (
          <OptionSelector
            key={`key-${name}`}
            name={name}
            values={values}
            selectedOptions={selectedOptions}
            setOptions={setOptions}
            selectedVariant={selectedVariant}
            // productInventory={productInventory}
            // available={available}
          />
        ))
      }
      {
        // available ?
          <button
            onClick={() => {
              addToCart(selectedVariant)
            }}
            className="bg-violet-700 rounded-lg text-white px-2 py-3 mt-3 hover:bg-violet-900">Add To Card
          </button> 
        //   <button
        //     className="rounded-lg text-white px-2 py-3 mt-3 bg-gray-800 cursor-not-allowed">
        //       Sold out!
        //   </button>
      }

    </div>
  )
}