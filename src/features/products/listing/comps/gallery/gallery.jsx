import ListingProductCard from './card/listing_card'

import s from './gallery.module.scss'

import { useWishList } from 'hooks/useWishList'
import { useState, useEffect } from 'react'
import TabIndexButton from 'comps/accessibility/indexTabButton'
import { useCart } from 'hooks/use_cart'

import LoadingSpinner from 'comps/loading/spinner'

const MIN_COLUMNS = 2 // Minimum number of columns
const MIN_COLUMN_WIDTH = 250 // Minimum width for a column

const ProductGallery = ({
  activeProducts: products,
  activeCategory: category,
}) => {
  const [wshl, like] = useWishList()
  const [cart, add] = useCart()

  const [columnsNumber, setColumnsNumber] = useState(4)

  // Update columns based on window width
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth
      let columnCount = Math.floor(width / MIN_COLUMN_WIDTH)
      columnCount = columnCount < MIN_COLUMNS ? MIN_COLUMNS : columnCount
      setColumnsNumber(columnCount)
    }

    // Set initial columns
    updateColumns()

    // Add resize listener
    window.addEventListener('resize', updateColumns)

    // Cleanup
    return () => window.removeEventListener('resize', updateColumns)
  }, [])

  return (
    <main
      id='main_content'
      className={`${s.g}`}
      style={{
        '--children-number': Math.ceil(products.length / columnsNumber),
        display: 'grid',
        gridTemplateColumns: `repeat(${columnsNumber}, 1fr)`,
        gap: '1rem',
        padding: '1rem'
      }}
    >
      {products.map((product, index) => {
        // Add wishlist and cart properties to product
        const enhancedProduct = {
          ...product,
          isLiked: wshl.includes(product._id),
          like: like,
          inCart: cart.items.some((p) => p._id === product._id),
          add: add
        }

        return (
          <div role='gridcell' key={product._id || index}>
              <ListingProductCard
                product={enhancedProduct}
                priority={index < columnsNumber}
              />
          </div>
        )
      })}
    </main>
  )
}

export default ProductGallery


