import { useDispatch } from "react-redux";
import s from "./card.module.scss";

import { slugify } from "@bbuukk/slugtrans/slugify";
import { transliterate } from "@bbuukk/slugtrans/transliterate";

import { startLoading } from "store/slices/global_comps/global_comps.slice.js";
import ImageFallback from "comps/image/fallback_image.js";
import { useId } from "react";
import TabIndexButton from "comps/accessibility/indexTabButton.js";

const Card = ({ category, subcategories }) => {
  const dispatch = useDispatch();

  const categoryPathSlug = (path) => {
    return `/products/${slugify(transliterate(path))}/page=1`;
  };

  function handleClick(e) {
    dispatch(startLoading());
  }

  const id = useId();
  const subcategoriesWithElepsis = [
    ...subcategories,
    {
      path: category.path,
      name: "Інші категорії...",
      _id: `${id}-more`,
    },
  ];

  return (
    <div className={`${s.cat_card}`}>
      <a
        href={categoryPathSlug(category.path)}
        onClick={() => handleClick()}
        aria-label={`${category.name} основна категорія`}
      >
        <imgFallback
          src={category.imagePath}
          fallbackSrc={"/assets/goods_placeholder.svg"}
          alt={`Основна категорія ${category.name}`}
          width={300}
          height={150}
          sizes="(max-width: 600px) 50vw, (max-width: 768px) 20vw, (max-width: 1000px) 25vw, (max-width: 1200px) 20vw, 15vw"
          priority
        />
        <h2>{category.name}</h2>
      </a>

      <TabIndexButton aria-label={`Переглянути підкатегорії ${category.name}`}>
        <ul className={`${s.subcat_list}`}>
          {subcategoriesWithElepsis.map(({ _id, path, name }) => {
            return (
              <li key={_id}>
                <a
                  href={categoryPathSlug(path)}
                  onClick={() => handleClick()}
                  aria-label={
                    path === category.path
                      ? `Переclглянути більше підкатегорій ${category.name}`
                      : `${name} підкатегорія`
                  }
                >
                  {name}
                </a>
              </li>
            );
          })}
        </ul>
      </TabIndexButton>
    </div>
  );
};

export default Card;
