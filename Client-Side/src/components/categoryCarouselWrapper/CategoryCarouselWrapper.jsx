import React from 'react';
import CategoryCarousel from '../categoryCarousel/CategoryCarousel.jsx';
import styles from './CategoryCarouselWrapper.scss';

const CategoryCarouselWrapper = (props) => {
  return (
    <div className={styles.categoryCarouselWrapper}>
      {   props.searchResults.length >= 5 && props.toggleViewAll &&
        <h3 className={styles.carouselSubtitle}>
          <button onClick={props.toggleViewAll}>View All</button>
        </h3>
      }
      <div className={styles.categoryCarouselWrapperWithTitle}>
        <CategoryCarousel 
          searchResults={props.searchResults} 
          key={props.category}
          category={props.category} 
          saveFavorites={props.saveFavorites} 
          removeSavedFavorites={props.removeSavedFavorites}
          isFavorite={props.isFavorite}
        />
      </div>
    </div>
  );
};

export default CategoryCarouselWrapper;