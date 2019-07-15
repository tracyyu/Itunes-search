import React from 'react';
import axios from 'axios';
import SearchBar from './components/searchBar/SearchBar.jsx';
import SearchList from './components/searchList/SearchList.jsx';
import styles from './scss/index.scss';
import HomePage from './components/homepage/HomePage.jsx';
import FavoriteList from './components/favoriteList/FavoriteList.jsx';


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
    this.removeSavedFavorites = this.removeSavedFavorites.bind(this);
  }

  componentDidMount() {
    this.retrieveSavedFavorites();
  }

  fetchSearchResults(term) {
    axios
      .get(`http://52.90.70.201:3000/itunes-search?term=${term}`)
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
    if(retrievedData) {
        var userFavorites = JSON.parse(retrievedData);
        this.setState({
            favorites: userFavorites
        });
    }
  }

  removeSavedFavorites(kind, obj) {
    var currentFavorites = JSON.parse(JSON.stringify(this.state.favorites));
    var kindArr = currentFavorites[kind];
    for (var i=0; i < kindArr.length; i++) {
        if (kindArr[i].id === obj.id) {
            kindArr.splice(i,1);
        }
    }
    currentFavorites[kind] = kindArr;
    this.setState({ favorites: currentFavorites }, () => { 
      localStorage.setItem("favorites", JSON.stringify(this.state.favorites));
    });
  }
  
  render() {
    return(
      <div className={styles.pageLayout}>
        {
          !Object.keys(this.state.results).length && <HomePage />
        }
        <SearchBar fetchSearchResults={this.fetchSearchResults} handleSearch={this.handleSearch} term={this.state.term} />
        <SearchList results={this.state.results} term={this.state.term} isSearching={this.state.isSearching} saveFavorites={this.saveFavorites} removeSavedFavorites={this.removeSavedFavorites}/>
        <FavoriteList favorites={this.state.favorites} saveFavorites={this.saveFavorites} removeSavedFavorites={this.removeSavedFavorites}/>
      </div>
    );
  }
};

export default ItunesSearch;