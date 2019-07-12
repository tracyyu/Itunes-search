import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './searchList.scss';

import LoadingProducts from "../loader/loadingSearch.jsx";
import NoResults from "../emptyState/noResults.jsx";
import SearchListCategory from '../searchListCategory/searchListCategory.jsx';

class SearchList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        // Empty State or Result State
        let keys = Object.keys(this.props.results);
        // check result count
        var resultCt = 0;
        for( let i of keys ) {
            resultCt += this.props.results[i].length;
        }

        return (
            <div className={styles.productListMain}>
                { keys.length > 0 && <p>You've searched <span><em>{this.props.term}</em></span></p> }
                {
                    resultCt ?  keys.map( (category) => {
                        return this.props.results[category].length > 0 ? <SearchListCategory key={category} category={category} result={this.props.results[category]} saveFavorites={this.props.saveFavorites}/> : ''
                    }) : ( this.props.isSearching ? <NoResults /> : '')
                }
            </div>
        );
    }
};


export default SearchList;

