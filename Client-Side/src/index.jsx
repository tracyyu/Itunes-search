import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SearchBar from './components/searchBar/searchBar.jsx';
import SearchList from './components/searchList/searchList.jsx';
import styles from './scss/index.scss';
import HomePage from './components/homepage/homePage.jsx';
import FavoriteList from './components/favoriteList/favoriteList.jsx';


class ItunesSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: {},
      term: '',
      isSearching: false,
      favorites: {
        'book': [],
        'album': [],
        'coached-audio': [],
        'feature-movie': [],
        'interactive-booklet': [],
        'music-video': [],
        'pdf podcast': [],
        'software-package': [],
        'song': [],
        'tv-episode': [],
        'artist': [],
        'podcast': []
      }
    }

    this.fetchSearchResults = this.fetchSearchResults.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.saveFavorites = this.saveFavorites.bind(this);
    this.retrieveSavedFavorites = this.retrieveSavedFavorites.bind(this);
  }

  componentDidMount() {
    this.retrieveSavedFavorites();
  }

  fetchSearchResults(term) {
    axios
      .get(`52.90.70.201:3000/itunes-search?term=${term}`)
      .then(({data}) => {
        this.setState({ results: data, isSearching: true })
      });
  }

  handleSearch(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  saveFavorites(kind, obj) {
    var currentFavorites = JSON.parse(JSON.stringify(this.state.favorites));
    currentFavorites[kind].push(obj);
    this.setState({ favorites: currentFavorites }, () => { 
      localStorage.setItem("favorites", JSON.stringify(this.state.favorites));
    });
  }

  retrieveSavedFavorites() {
    var retrievedData = localStorage.getItem("favorites");
    var userFavorites = JSON.parse(retrievedData) || {};
    this.setState({
      favorites: userFavorites
    });
  }
  
  render() {
    return(
      <div className={styles.pageLayout}>
        <SearchBar fetchSearchResults={this.fetchSearchResults} handleSearch={this.handleSearch} term={this.state.term} />
        {
          !Object.keys(this.state.results).length && <HomePage />
        }
        <SearchList results={this.state.results} term={this.state.term} isSearching={this.state.isSearching} saveFavorites={this.saveFavorites} />
        { Object.keys(this.state.favorites).length && <FavoriteList favorites={this.state.favorites} /> }
      </div>
    );
  }
};

ReactDOM.render(<ItunesSearch />, document.getElementById('app'))