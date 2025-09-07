import styles from './Product.module.scss';
import ProductImage from './ProductImage/ProductImage.js';
import ProductForm from './ProductForm/ProductForm.js';
import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';

const Product = ({name, title, basePrice, colors, sizes}) => {
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [currentSize, setCurrentSize] = useState(sizes[0].name);

  const finalPrice = useMemo(() => {
    const activeSizeObj = sizes.find(size => size.name === currentSize);
    return basePrice + (activeSizeObj?.additionalPrice || 0);
  }, [currentSize, basePrice, sizes]);

  const addToCart = e => {
    e.preventDefault();
    console.log(`
      Summary
    ===========
    Name: ${title},
    Price: ${finalPrice},
    Size: ${currentSize},
    Color: ${currentColor}`
    );
  }

  return (
    <article className={styles.product}>
      <ProductImage title={title} name={name} currentColor={currentColor} />
      <div>
        <header>
          <h2 className={styles.name}>{title}</h2>
          <span className={styles.price}>Price: {finalPrice}$</span>
        </header>
        <ProductForm 
          addToCart={addToCart} 
          currentColor={currentColor}
          colors={colors} 
          sizes={sizes} 
          setCurrentColor={setCurrentColor}
          setCurrentSize={setCurrentSize}
        />  
      </div>
    </article>
  );
};

Product.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  basePrice: PropTypes.number.isRequired,
  colors: PropTypes.array.isRequired,
  sizes: PropTypes.array.isRequired
};

export default Product;
