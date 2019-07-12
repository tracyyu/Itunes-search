import React from "react";
import styles from './noResults.scss';

const NoResults = () => {
  return (
    <div className={styles.noResults}>
      <h2>Sorry, no products matched your search!</h2>
      <p>Enter a different keyword and try.</p>
    </div>
  );
};

export default NoResults;