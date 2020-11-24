import React, { Component } from 'react';

import formatValue from '../utils/formatValue'

export default class Products extends Component {
  render() {
    return (
      <div className='products'>
        { this.props.products.map(product => (
          <li key={product._id}>
            <div className='product'>
              <a href={'#' + product._id}>
                <img src={product.image} alt={product.title} />
                <p>{product.title}</p>
              </a>
              <div className='product-price'>
                <div>{ formatValue(product.price)}</div>
                <button className='button primary' onClick={() => {}}>
                  Adicinonar ao carrinho
                </button>
              </div>
            </div>
          </li>
        )) }
      </div>
    );
  }
}
