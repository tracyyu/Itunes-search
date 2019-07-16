import React from 'react';
import styles from './CategoryCarousel.scss';
import SearchListCategoryEntry from '../searchListCategoryEntry/searchListCategoryEntry.jsx';

class CategoryCarousel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mediaGallery: this.props.searchResults,
            currentMedia: [],
            imagesLimit: 5,
            currentMediaSet: 1,
            totalMediaSet: 1
        }
    
        this.gotoImageSet = this.gotoImageSet.bind(this);
        this.handleMoveLeft = this.handleMoveLeft.bind(this);
        this.handleMoveRight = this.handleMoveRight.bind(this);
        this.onImageChanged = this.onImageChanged.bind(this);
    }

    componentDidMount() {
        var totalSets = Math.ceil(this.state.mediaGallery.length / this.state.imagesLimit);
        this.setState({ totalMediaSet : totalSets }, () => {
            this.gotoImageSet(1);
        })
    }

    gotoImageSet(id) {
        const currentIndex = Math.max(1, Math.min(id, this.state.totalMediaSet));
        this.setState({ currentMediaSet : currentIndex }, () => {
          this.onImageChanged();
        })
      }
      
      handleMoveLeft(e) {
        e.preventDefault();
        this.gotoImageSet(this.state.currentMediaSet-1);
      }
  
      handleMoveRight(e) {
        e.preventDefault();
        this.gotoImageSet(this.state.currentMediaSet+1);
      }
      
      onImageChanged() {   
          let offset = (this.state.currentMediaSet - 1) * this.state.imagesLimit;
          let currentMedia = this.state.mediaGallery.slice(offset, offset + this.state.imagesLimit);  
          this.setState({ currentMedia: currentMedia });
      }

    render() {
        return(
            <div className={styles.carousel}>
                {
                    this.state.currentMediaSet > 1 ?
                    <div className={styles.buttonWrapper}>
                        <button className={`${styles.button} ${styles.buttonBack}`} 
                            onClick={this.handleMoveLeft}
                            disabled={this.state.currentMediaSet === 1}>Back</button>
                    </div> 
                    : null
                }
                <div className={styles.carouselViewport}>
                    <div className={styles.carouselItems}>
                    {
                        this.state.currentMedia.map( (product, ind) => {
                            return ( 
                                <SearchListCategoryEntry 
                                    key={ind} 
                                    data={product}
                                    category={this.props.category} 
                                    saveFavorites={this.props.saveFavorites} 
                                    removeSavedFavorites={this.props.removeSavedFavorites}
                                    isFavorite={this.props.isFavorite} 
                                /> );
                        })
                    }
                    </div>
                </div>
                {
                    this.state.totalMediaSet > 1 ? 
                    <div className={styles.buttonWrapper}>
                        <button className={`${styles.button} ${styles.buttonForward}`} 
                            onClick={this.handleMoveRight}
                            disabled={this.state.currentMediaSet === this.state.totalMediaSet}>Forward</button>
                    </div> 
                    : null
                }
            </div>
        );
    }
}

export default CategoryCarousel;
