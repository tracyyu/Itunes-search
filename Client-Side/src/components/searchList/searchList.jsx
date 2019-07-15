import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchList.scss';

import LoadingProducts from "../loader/LoadingSearch.jsx";
import NoResults from "../emptyState/NoResults.jsx";
import SearchListCategory from '../searchListCategory/SearchListCategory.jsx';

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
            return this.props.results[category].length > 0 ? 
              <SearchListCategory 
                key={category} 
                category={category} 
                result={this.props.results[category]} 
                saveFavorites={this.props.saveFavorites}
                removeSavedFavorites={this.props.removeSavedFavorites}
                isFavorite={false}
              /> : ''
          }) : ( this.props.isSearching ? <NoResults /> : '')
        }
      </div>
    );
  }
};

SearchList.propTypes = {
  results: PropTypes.object.isRequired
};



export default SearchList;

