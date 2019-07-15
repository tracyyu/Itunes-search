import React, { Component } from 'react';
import styles from './SearchBar.scss';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animate: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.fetchSearchResults(this.props.term);
    this.refs.searchBox.value = "";
    this.setState({animateUp: true});
  }

  render(){
    const cssClasses = [
        styles.search,
        this.state.animateUp ? styles.animateUp : ''
      ];
    return(
      <div className={cssClasses.join(' ')}>
      <form
        action="#"
        method="get"
        onSubmit={this.handleSubmit}
        className={styles.searchForm}
      >
      <input
        type="search"
        ref="searchBox"
        name="term"
        placeholder="Discover something new"
        onChange={this.props.handleSearch}
        className={styles.searchKeyword}
      />
      <button
        className={styles.searchButton}
        type="submit"
        onClick={this.handleSubmit}
      >
        <i class="fas fa-search fa-2x"></i>
      </button>
      </form>
      </div>
    );
  }
}

export default SearchBar;
