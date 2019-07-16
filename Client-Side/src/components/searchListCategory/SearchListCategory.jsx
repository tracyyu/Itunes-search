import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from './SearchListCategory.scss';
import CategoryCarouselWrapper from '../categoryCarouselWrapper/CategoryCarouselWrapper.jsx';
import SearchListCategoryEntry from '../searchListCategoryEntry/SearchListCategoryEntry.jsx';

class SearchListCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
        viewAll: false
    }

    this.toggleViewAll = this.toggleViewAll.bind(this);
  }

  toggleViewAll() {
    this.setState((prevState, props) => ({
        viewAll: !prevState.viewAll
    }));
  }


  render() {
    return(
      <div className={styles.category}>
        <h1 className={styles.categoryHeader}>{this.props.category}</h1>
        { (this.props.result.length >= 5 && !this.state.viewAll) ? 
          <div className={[styles.categoryList, styles[this.props.category]].join(' ')}>
            <CategoryCarouselWrapper 
              searchResults={this.props.result} 
              category={this.props.category} 
              saveFavorites={this.props.saveFavorites} 
              removeSavedFavorites={this.props.removeSavedFavorites}
              isFavorite={this.props.isFavorite}
              viewAll={this.state.viewAll}
              toggleViewAll={this.toggleViewAll}
            />
          </div>
          : 
          <div className={[styles.categoryList, styles[this.props.category]].join(' ')}>
            {
              this.props.result.length >= 5 && this.state.viewAll &&
              <h3 className={styles.listSubtitle}>
                <button onClick={this.toggleViewAll}>Collapse</button>
              </h3>
            }
            <ul>
              { this.props.result.map( (data) => {
                  return(
                    <SearchListCategoryEntry 
                      data={data} 
                      category={this.props.category} 
                      saveFavorites={this.props.saveFavorites} 
                      removeSavedFavorites={this.props.removeSavedFavorites}
                      isFavorite={this.props.isFavorite}
                    />
                  )
                })
              }
            </ul>
          </div>
        }
      </div>
    );
  }
}

SearchListCategory.propTypes = {
  result: PropTypes.array.isRequired
};


export default SearchListCategory;
