import React from "react";
import styles from './searchListCategory.scss';
import SearchListCategoryEntry from '../searchListCategoryEntry/searchListCategoryEntry.jsx';

const SearchListCategory = (props) => (
    <div className={styles.category}>
        <h1 className={styles.categoryHeader}>{props.category}</h1>
        <ul className={[styles.categoryList, styles[props.category]].join(' ')}>
        {
            props.result.map( (data) => {
                return <SearchListCategoryEntry data={data} category={props.category} saveFavorites={props.saveFavorites} />
            })
        }
        </ul>
    </div>
);

SearchListCategory.propTypes = {
    result: PropTypes.array.isRequired
};


export default SearchListCategory;