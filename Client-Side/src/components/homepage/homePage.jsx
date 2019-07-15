import React, { Component } from 'react';
import styles from './HomePage.scss';

class HomePage extends Component {

  constructor(props) {
    super(props);

    this.startCarousel = this.startCarousel.bind(this);
  }

  componentDidMount() {
    this.startCarousel();
  }

  startCarousel() {
    var carousel = document.getElementById("carousel");
    var scene = document.getElementById("scene");
    var carousel_items_Arrey = document.getElementsByClassName("carouselItem");
    var n = carousel_items_Arrey.length;
    var curr_carousel_items_Arrey = 0;
    var theta = Math.PI * 2 / n;
    var interval = null;
    var autoCarousel = carousel.dataset.auto;

    setupCarousel(n, parseFloat(getComputedStyle(carousel_items_Arrey[0]).width));
    window.addEventListener('resize', function() {
      clearInterval(interval);
      setupCarousel(n, parseFloat(getComputedStyle(carousel_items_Arrey[0]).width));
    }, false);

    function setupCarousel(n, width) {
      var apothem = width / (2 * Math.tan(Math.PI / n));
      scene.style.transformOrigin = `50% 50% ${- apothem}px`;

      for (let i = 1; i < n; i++) {
        carousel_items_Arrey[i].style.transformOrigin = `50% 50% ${- apothem}px`;
        carousel_items_Arrey[i-1].style.opacity = `0.75`;
        carousel_items_Arrey[i].style.opacity = `1.0`;
        carousel_items_Arrey[i].style.scale = `1.3`;
        carousel_items_Arrey[i].style.transform = `rotateY(${i * theta}rad)`;
      }

      if (autoCarousel === "true") {
        setCarouselInterval();
      }
    }

    function setCarouselInterval() {
      interval = setInterval(function() {
        curr_carousel_items_Arrey++;
        scene.style.transform = `rotateY(${(curr_carousel_items_Arrey) * -theta}rad)`;
      }, 3000);
    }
  }

  render() {
    return (
      <div className={styles.carousel} id="carousel" data-auto="true">
        <div className={styles.scene} id="scene">
          <img className={`${styles.carouselItem} carouselItem`} src="https://images.unsplash.com/photo-1480318931062-06a1fef0a31b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2688&q=80" alt="" />
          <img className={`${styles.carouselItem} carouselItem`} src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1525&q=80" alt="" />
          <img className={`${styles.carouselItem} carouselItem`} src="https://images.unsplash.com/photo-1561151290-01d07c376e17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80" alt="" />
          <img className={`${styles.carouselItem} carouselItem`} src="https://images.unsplash.com/photo-1490971512195-3385e8e72ab4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80" alt="" />
          <img className={`${styles.carouselItem} carouselItem`} src="https://images.unsplash.com/photo-1552168324-d612d77725e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=976&q=80" alt="" />
          <img className={`${styles.carouselItem} carouselItem`} src="https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&auto=format&fit=crop&w=1940&q=80" alt="" />
          <img className={`${styles.carouselItem} carouselItem`} src="https://images.unsplash.com/photo-1538209587953-37d275d95c8a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80" alt="" />
        </div>
      </div>
    );
  }
}

export default HomePage;