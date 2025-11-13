import React, { useEffect, useState, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import axios from "axios";

import LoadingSpinner from "comps/loading/spinner";
import { useStopLoading } from "hooks/useStopLoading";
import { useUpdateFilters } from "features/products/listing/hooks/use_update_filters";
import { useDispatchInitialFilters } from "features/products/listing/hooks/use_dispatch_initial_filters";
import { usePageValidation } from "features/products/listing/hooks/use_page_validation";

import { unslugify } from "@bbuukk/slugtrans/slugify";
import { untransliterate } from "@bbuukk/slugtrans/transliterate";

import { useMediaQuery } from "@mui/material";

import { useMemo } from 'react';
import Breadcrumbs from 'comps/navigation/breadcrumbs';

import {
  body,
  selected,
  sort_group,
  filters,
  gallery,
  no_products,
  listing_header,
  label,
} from "./ProductsListing.module.scss";

const NoProductYet = React.lazy(() => import("comps/warnings/no_products"));

const FiltersAccordion = React.lazy(
  () =>
    import(
      "features/products/listing/comps/filter/filters_accordion/filters_accordion"
    ),
);

const ProductsPagination = React.lazy(
  () => import("features/products/listing/comps/gallery/pagination/pagination"),
);
const Selected = React.lazy(
  () => import("features/products/listing/comps/filter/selected"),
);

import SortGroup from "features/products/listing/comps/filter/sort-group";
import ProductGallery from "features/products/listing/comps/gallery/gallery";

const SubcategoriesGallery = React.lazy(
  () => import("features/products/listing/comps/subcategories/gallery"),
);

const ProductsListing = () => {
  const { categoryPath, filtersStr } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useStopLoading();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const isBySearch = categoryPath.includes("search=");

      try {
        const method = isBySearch ? "by-query" : "by-category-path";
        const searchBy = isBySearch
          ? categoryPath.split("search=")[1]
          : categoryPath;
        const url = `/products/${method}/${searchBy}/filtered-by/${filtersStr || "default"}`;

        const res = await axios.get(url);
        const responseData = res.data;

        const FIRST_PAGE = 1;
        setData({
          ...responseData,
          page: filtersStr?.match(/page=(\d+)/)?.[1] || FIRST_PAGE,
        });
      } catch (e) {
        console.error("Error fetching products:", e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryPath, filtersStr]);

  const {
    activeCategory: category,
    directSubcategories: subcategories,
    numPages,
  } = data || {};

  usePageValidation(numPages);
  useDispatchInitialFilters();
  useUpdateFilters();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !data) {
    return <div>Error loading products. Please try again.</div>;
  }

  const searchBy = categoryPath.includes("search=")
    ? `Результати пошуку "${untransliterate(unslugify(categoryPath.split("search=")[1]))}"`
    : `Товари у категорії "${category.path}"`;

  return (
    <>
      <Helmet>
        <title>{`${searchBy} у магазині Живий світ`}</title>
        <meta name="description" content={`Живий Світ | ${searchBy}`} />
      </Helmet>

      <>
        <ListingHeader category={category} />

        <Suspense fallback={<LoadingSpinner />}>
          <SubcategoriesGallery subcategories={subcategories} />
        </Suspense>

        <ProductListingBody data={data} />
      </>
    </>
  );
};


export default ProductsListing;

const ProductListingBody = ({
  data: {
    filtersMap,
    minMaxPrice,
    products: productsData,
    productsCount,
    category,
    numPages,
    page,
  },
}) => {
  const isSmallViewport = useMediaQuery("(max-width:1100px)");
  return (
    <>
      {productsCount > 0 ? (
        <>
          <div className={body}>
            <div className={selected}>
              <Suspense fallback={<LoadingSpinner />}>
                <Selected productsCount={productsCount} />
              </Suspense>
            </div>
            <div className={sort_group}>
              <SortGroup />
            </div>
            <div className={''}></div>
            {!isSmallViewport && (
              <div className={filters}>
                <Suspense fallback={<LoadingSpinner />}>
                  <FiltersAccordion
                    filters={filtersMap}
                    minMaxPrice={minMaxPrice}
                  />
                </Suspense>
              </div>
            )}

            <div className={gallery}>
              <div className={''}>
                <ProductGallery
                  activeProducts={productsData}
                  activeCategory={category}
                />
              </div>
              <Suspense fallback={<LoadingSpinner />}>
                <ProductsPagination numPages={numPages} activePageId={page} />
              </Suspense>
            </div>
          </div>
        </>
      ) : (
        <div className={no_products}>
          <Suspense fallback={<LoadingSpinner />}>
            <NoProductYet />
          </Suspense>
        </div>
      )}
    </>
  );
};


const ListingHeader = ({ category }) => {
  const { categoryPath } = useParams();

  const labelText = useMemo(() => {
    if (categoryPath?.includes('search=')) {
      const slugQuery = categoryPath.split('search=')[1];
      const query = untransliterate(unslugify(slugQuery));
      return `Результати пошуку «${query}»`;
    }
    return category?.name;
  }, [categoryPath, category]);

  return (
    <div className={listing_header}>
      <Breadcrumbs category={category} />
      <h1 className={label}>{labelText}</h1>
    </div>
  );
};

