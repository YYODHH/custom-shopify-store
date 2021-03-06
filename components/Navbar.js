import Link from 'next/link'
import { useContext } from 'react'
import { CartContext } from '../shopify/shopContext'
import MiniCart from './MiniCart'

export default function Navbar() {
  const { cart, cartOpen, setCartOpen } = useContext(CartContext)

  let cartQuantity = 0
  cart.map(item => {
    return (cartQuantity += item?.variantQuantity)
  })

  return (
    <header className="border-b sticky top-0 z-20 bg-white">
      <div className="flex items-center justify-between max-w-6xl pt-4 pb-2 px-4 mx-auto lg:max-w-screen-xl">
        <Link href="/" passHref>
          <a className="cursor-pointer">
            <span className="text-lg pt-1 font-bold">
              My Custom Store
            </span>
          </a>
        </Link>
        <a 
          className="text-md font-bold cursor-pointer hover:tex-gray-500"
          onClick={() => setCartOpen(!cartOpen)}
          >

           <p> Cart ({cartQuantity})</p>
        </a>
        <MiniCart cart={cart} />
      </div>
    </header>
  )
}