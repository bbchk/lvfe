
import s from './listing.subcat_card.module.scss'

import { slugify } from '@bbuukk/slugtrans/slugify'
import { transliterate } from '@bbuukk/slugtrans/transliterate'
import ImageFallback from 'comps/image/fallback_images'

const SubcategoryCard = ({ category }) => {
  const { name, imagePath } = category

  const categoryPathSlug = `/products/${slugify(
    transliterate(category.path),
  )}/page=1`

  return (
    <a href={categoryPathSlug} as={categoryPathSlug} className={`${s.card}`}>
      <ImageFallback
        src={imagePath}
        fallbackSrc={'/assets/goods_placeholder.svg'}
        width={150}
        height={150}
        alt='підкатегорія'
        priority
      />
      <div>
        <p> {name}</p>
      </div>
    </a>
  )
}

export default SubcategoryCard
