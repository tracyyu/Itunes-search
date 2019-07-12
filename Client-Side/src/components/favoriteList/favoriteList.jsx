import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../searchList/searchList.scss';
import faveStyles from './favoriteList.scss';

import SearchListCategory from '../searchListCategory/searchListCategory.jsx';

class FavoriteList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    // Empty State or Result State
    let keys = Object.keys(this.props.favorites);
    // check result count
    var resultCt = 0;
    for( let i of keys ) {
      resultCt += this.props.favorites[i].length;
    }

    return (
      <div className={faveStyles.favoriteListMain}>
        <h1>Favorited List:</h1>
        {
          resultCt ?  keys.map( (category) => {
            return this.props.favorites[category].length > 0 ? 
              <SearchListCategory 
                key={category} 
                category={category} 
                result={this.props.favorites[category]} 
                saveFavorites={this.props.saveFavorites} 
              /> : ''
          }) : ( this.props.isSearching ? <NoResults /> : '')
        }
      </div>
    );
  }
};

FavoriteList.propTypes = {
    favorites: PropTypes.object.isRequired
};


export default FavoriteList;
