import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'

import formatValue from '../utils/formatValue'

export default class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: null,
    }
  }

  openModal = product => {
    this.setState({product})
  }
  
  closeModal = () => {
    this.setState({product: null})
  }

  render() {
    const { product } = this.state
    return (
      <>
      <Fade bottom cascade>
        <ul className='products'>
          { this.props.products.map(product => (
            <li key={product._id}>
              <div className='product'>
                <a href={'#' + product._id} onClick={() => this.openModal(product)}>
                  <img src={product.image} alt={product.title} />
                  <p>{product.title}</p>
                </a>
                <div className='product-price'>
                  <div>{formatValue(product.price)}</div>
                </div>
                <button className='button primary' onClick={() => this.props.addToCart(product)}>
                  Adicinonar ao carrinho
                </button>
              </div>
            </li>
          )) }
        </ul>
      </Fade>
      
      { product &&
        <Modal isOpen={!!product} onRequestClose={this.closeModal}>
          <Zoom>
            <button className='close-modal' onClick={this.closeModal}>X</button>
            <div className='product-details'>
              <img src={product.image} alt={product.title} />
              <div className='product-details-description'>
                <p><strong>{product.title}</strong></p>
                <p>{product.description}</p>
                <p>
                  Available Sizes{' '}
                  {product.availableSizes.map(size => (
                    <span>
                      {' '}
                      <button>{size}</button>
                    </span>
                  ))}
                </p>
                <div className='product-price'>
                  <div>{formatValue(product.price)}</div>
                  <button onClick={e => {
                    this.props.addToCart(product)
                    this.closeModal()
                  }}>
                    Adicionar ao carrinho
                  </button>
                </div>
              </div>
            </div>
          </Zoom>
        </Modal>
      }
    </>      
    )
  }
}
