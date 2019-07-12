import React, { Component } from "react";
import styles from './searchListCategoryEntry.scss';

class SearchListCategoryEntry extends Component {

  constructor(props) {
    super(props);
    this.state = {
      favorite: false
    }

    this.toggleFavorite = this.toggleFavorite.bind(this);
  }

  toggleFavorite() {
    this.setState({ favorite: !this.state.favorite }, () => {
      if(this.state.favorite) {
        this.props.saveFavorites(this.props.category, this.props.data);
      }
    });
  }

  render() {
    return (
      <li className={styles.categoryEntry}>
        <a href={this.props.data['url']} className={styles.imgUrl}>
            <img src={this.props.data['artwork']} />
        </a>
        <p><strong>{this.props.data['name']}</strong></p>
        <p>Genre: {this.props.data['genre']}</p>
        <div className={styles.links}>
          <em><a href={this.props.data['url']}>Link</a></em>
          <span className={styles.favorite} onClick={this.toggleFavorite} >
            <i class={this.state.favorite ?  "fas fa-heart" : "far fa-heart"}></i>
          </span>
        </div>
      </li>
    );
  }

}

export default SearchListCategoryEntry;