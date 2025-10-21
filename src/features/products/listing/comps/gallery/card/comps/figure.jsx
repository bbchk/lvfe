import ImageFallback from 'comps/image/fallback_image.js'

import s from './figure.module.scss'
import lcs from '../listing_card.module.scss'
import { useDispatch } from 'react-redux'

import { startLoading } from 'store/slices/global_comps/global_comps.slice'

const ProductFigure = ({ product, productUrl, priority }) => {
  const dispatch = useDispatch()
  return (
    <a
      className={`${lcs.figure}`}
      href={productUrl('about')}
      onClick={() => dispatch(startLoading())}
      aria-label='Перейти до сторінки товару'
    >
      <figure className={`${s.figure} `}>
        <imgFallback
          src={
            //todo implement displaying many images on hover
            product.images && product.images[0]
          }
          fallbackSrc={'/assets/goods_placeholder.svg'}
          alt='товар'
          quality={80}
          width={250}
          height={250}
          sizes='(max-width: 600px) 50vw, (max-width: 768px) 35vw,(max-width: 800px) 30vw,(max-width: 1200px) 25vw, 10vw'
          priority={priority}
        />
        <figcaption>{product.name}</figcaption>
      </figure>
    </a>
  )
}

export default ProductFigure
