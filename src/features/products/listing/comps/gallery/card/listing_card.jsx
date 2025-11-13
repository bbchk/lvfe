import s from './listing_card.module.scss'

import { slugify } from '@bbuukk/slugtrans/slugify'
import { transliterate } from '@bbuukk/slugtrans/transliterate'
import ProductFigure from './comps/figure'
import ProductRating from './comps/rating'
import BuyInfo from './comps/buy_info'

const ListingProductCard = ({ product, ...props }) => {
  const productUrl = (activeTab) =>
    `/product/${slugify(transliterate(product.name))}/${
      product._id
    }/${activeTab}`

  const { priority } = props
  return (
    <article className={`${s.card} `}>
      <ProductFigure
        product={product}
        productUrl={productUrl}
        priority={priority}
      />
      <ProductRating product={product} productUrl={productUrl} />
      <BuyInfo product={product} />
    </article>
  )
}

export default ListingProductCard
