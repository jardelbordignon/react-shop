import React, { Component } from 'react';

import formatValue from '../utils/formatValue'

export default class Cart extends Component {
  render() {
    const { cartItems } = this.props

    return (
      <div>
        <div className='cart cart-header'>
          { !cartItems.length 
            ? 'Carrinho vazio' 
            : `Você tem ${cartItems.length} itens no carrinho`
          }
        </div>
        <div>
          <div className='cart'>
            <ul className='cart-items'>
              { cartItems.map( item => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      {item.count} X { formatValue(item.price) }
                      <button onClick={() => this.props.removeFromCart(item)}>
                        Excluir {item.count > 1 && ' 1'}
                      </button>
                    </div>
                  </div>
                </li>
              )) }
            </ul>
          </div>

          { !!cartItems.length && 
            <div className='flex'>
              <strong>
                Total: {' '}
                {formatValue(
                  cartItems.reduce((total, item) => total + item.price * item.count, 0)
                )}
              </strong>
              <button>Finalizar compra</button>
            </div>
          }
        </div>
      </div>
    )
  }
}