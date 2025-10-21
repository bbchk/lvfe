import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import s from './listing.header.module.scss';
import Breadcrumbs from 'comps/navigation/breadcrumbs';
import { unslugify } from '@bbuukk/slugtrans/slugify';
import { untransliterate } from '@bbuukk/slugtrans/transliterate';

const ListingHeader = ({ category }) => {
  const { categoryPath } = useParams();

  const label = useMemo(() => {
    // Check if categoryPath exists and includes a search query
    if (categoryPath?.includes('search=')) {
      const slugQuery = categoryPath.split('search=')[1];
      const query = untransliterate(unslugify(slugQuery));
      return `Результати пошуку «${query}»`;
    }
    // Otherwise, return the category name passed via props
    return category?.name;
    // Add 'category' to the dependency array
  }, [categoryPath, category]);

  return (
    <>
      <div className={`${s.listing_header}`}>
        <Breadcrumbs category={category} />
        <h1 className={`${s.label}`}>{label}</h1>
      </div>
    </>
  );
};

export default ListingHeader;
