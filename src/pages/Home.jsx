import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import axios from 'axios'

import { useStopLoading } from 'hooks/useStopLoading'

import { useDispatch } from "react-redux";

import { slugify } from "@bbuukk/slugtrans/slugify";
import { transliterate } from "@bbuukk/slugtrans/transliterate";

import { startLoading } from "store/slices/global_comps/global_comps.slice";
import ImageFallback from "comps/image/fallback_image";
import { useId } from "react";
import TabIndexButton from "comps/accessibility/indexTabButton";

import {
  gallery,
  header,
  decor_line,
  cat_card,
  subcat_list,
} from "./Home.module.scss";

const Home = () => {
  const [rootCategories, setRootCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useStopLoading()

  useEffect(() => {
    const fetchRootCategories = async () => {
      try {
        const res = await axios.get('/categories/root')
        setRootCategories(res.data)
      } catch (error) {
        console.error('Error fetching root categories:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRootCategories()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Helmet>
        <title>
          Живий Світ: товари для саду, городу та домашніх улюбленців
        </title>
        <meta
          name='description'
          content='Живий Світ: товари для саду, городу та домашніх улюбленців. Найкраще для вас у магазині Живий Світ!'
        />
      </Helmet>

      <div id='main_content' className='my-5 header-spec'>
        <Gallery rootCategories={rootCategories} />
      </div>
    </>
  )
}


const Gallery = ({ rootCategories }) => {
  return (
    <div id='categories' className={gallery}>
      <div className={header}>
        <h1>Категорії</h1>
      </div>
      <div
        className={`container row row-cols-sm-12 row-cols-lg-3 row-cols-xxl-4 mt-1 mx-auto g-5`}
      >
        {rootCategories.map((category) => {
          return (
            <div
              key={category._id}
              className={`col d-flex justify-content-center`}
            >
              <Card category={category} subcategories={category.subcats} />
            </div>
          )
        })}
      </div>
      <div className={`${decor_line} mt-5`}></div>
    </div>
  )
}


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
    <div className={cat_card}>
      <a
        href={categoryPathSlug(category.path)}
        onClick={() => handleClick()}
        aria-label={`${category.name} основна категорія`}
      >
        <ImageFallback
          src={category.imagePath}
          fallbackSrc={"/assets/goods_placeholder.svg"}
          alt={`Основна категорія ${category.name}`}
          width={300}
          height={150}
          sizes="(max-width: 600px) 50vw, (max-width: 768px) 20vw, (max-width: 1000px) 25vw, (max-width: 1200px) 20vw, 15vw"
        />
        <h2>{category.name}</h2>
      </a>

      <TabIndexButton aria-label={`Переглянути підкатегорії ${category.name}`}>
        <ul className={subcat_list}>
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

export default Home
