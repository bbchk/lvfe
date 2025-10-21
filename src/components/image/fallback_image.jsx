import { useEffect, useState } from 'react'

export default function ImageFallback({ src, fallbackSrc, ...rest }) {
  const [imgSrc, set_imgSrc] = useState(src)

  useEffect(() => {
    set_imgSrc(src)
  }, [src])

  return (
    <img
      {...rest}
      src={imgSrc}
      onLoad={(result) => {
        if (result.naturalWidth === 0) {
          set_imgSrc(fallbackSrc)
        }
      }}
      onError={() => {
        set_imgSrc(fallbackSrc)
      }}
    />
  )
}
