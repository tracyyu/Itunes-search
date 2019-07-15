import React from 'react';
import categoryCarousel from '../categoryCarousel/CategoryCarousel';
import style from './RelatedProductCarouselWrapper.scss';
import axios from 'axios';

class categoryCarouselWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults : []
        }

        this.fetchDataByID = this.fetchDataByID.bind(this);
    }

    render() {
        return (
            <div className={style.categoryCarouselWrapper}>
                <div className={style.categoryCarouselWrapperWithTitle}>
                    <div className={style.categoryCarouselWrapperWithTitle}>
                        <p className={style.carouselSubtitle}>
                            <a href="">View All</a>
                        </p>
                        <CategoryCarousel searchResults={this.state.searchResults} key={this.state.searchResults.length}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default categoryCarouselWrapper;