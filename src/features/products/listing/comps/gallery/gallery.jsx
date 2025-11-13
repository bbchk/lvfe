import ListingProductCard from './card/listing_card'

import s from './gallery.module.scss'

import { useState } from 'react'
import { useCart } from 'hooks/use_cart'

const ProductGallery = ({
  activeProducts: products,
  activeCategory: category,
}) => {
  const [cart, add] = useCart()

  return (
    <main
      id='main_content'
      className={`${s.g}`}
    >
      {products.map((product, index) => {

        const enhancedProduct = {
          ...product,
          inCart: cart.items.some((p) => p._id === product._id),
          add: add
        }

        return (
          <div role='gridcell' key={product._id || index}>
              <ListingProductCard
                product={enhancedProduct}
                priority={index < 4}
              />
          </div>
        )
      })}
    </main>
  )
}

export default ProductGallery


