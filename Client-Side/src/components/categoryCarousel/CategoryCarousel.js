import React from 'react';

class CategoryCarousel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imagesGallery: this.props.similarProduct,
            currentImages: [],
            imagesLimit: 5,
            currentImageSet: 1,
            totalImageSet: 1
        }
    
        this.gotoImageSet = this.gotoImageSet.bind(this);
        this.handleMoveLeft = this.handleMoveLeft.bind(this);
        this.handleMoveRight = this.handleMoveRight.bind(this);
        this.onImageChanged = this.onImageChanged.bind(this);
    }

    componentDidMount() {
        var totalSets = Math.ceil(this.state.imagesGallery.length / this.state.imagesLimit);
        this.setState({ totalImageSet : totalSets }, () => {
            this.gotoImageSet(1);
        })
    }

    gotoImageSet(id) {
        const currentIndex = Math.max(1, Math.min(id, this.state.totalImageSet));
        this.setState({ currentImageSet : currentIndex }, () => {
          this.onImageChanged();
        })
      }
      
      handleMoveLeft(e) {
        e.preventDefault();
        this.gotoImageSet(this.state.currentImageSet-1);
      }
  
      handleMoveRight(e) {
        e.preventDefault();
        this.gotoImageSet(this.state.currentImageSet+1);
      }
      
      onImageChanged() {   
          let offset = (this.state.currentImageSet - 1) * this.state.imagesLimit;
          let currentImages = this.state.imagesGallery.slice(offset, offset + this.state.imagesLimit);  
          this.setState({ currentImages: currentImages });
      }

    render() {
        return(
            <div className={style.carouselProduct}>
                <div className={style.carousel}>
                    <div className={style.buttonWrapper}>
                        <button className={`${style.button} ${style.buttonBack}`} 
                            onClick={this.handleMoveLeft}
                            disabled={this.state.currentImageSet === 1}>Back</button>
                    </div>
                    <div className={style.carouselViewport}>
                        <div className={style.carouselItems}>
                        {
                            this.state.currentImages.map( (product, ind) => {
                                return <CarouselItem key={ind} product={product} />
                            })
                        }
                        </div>
                    </div>
                    <div className={style.buttonWrapper}>
                        <button className={`${style.button} ${style.buttonForward}`} 
                            onClick={this.handleMoveRight}
                            disabled={this.state.currentImageSet === this.state.totalImageSet}>Forward</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoryCarousel;
