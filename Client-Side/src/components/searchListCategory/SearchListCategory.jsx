import React from "react";
import PropTypes from 'prop-types';
import styles from './SearchListCategory.scss';
import SearchListCategoryEntry from '../searchListCategoryEntry/SearchListCategoryEntry.jsx';

const SearchListCategory = (props) => (
  <div className={styles.category}>
    <h1 className={styles.categoryHeader}>{props.category}</h1>
    <ul className={[styles.categoryList, styles[props.category]].join(' ')}>
    {
      props.result.map( (data) => {
        return (
          <SearchListCategoryEntry 
            data={data} 
            category={props.category} 
            saveFavorites={props.saveFavorites} 
            removeSavedFavorites={props.removeSavedFavorites}
            isFavorite={props.isFavorite}
          />)
      })
    }
    </ul>
  </div>
);

SearchListCategory.propTypes = {
  result: PropTypes.array.isRequired
};


export default SearchListCategory;
