import React, { Component } from 'react';

import formatValue from '../utils/formatValue'

export default class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCheckout: false,
      name: '',
      email: '',
      address: ''
    }
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  createOrder = e => {
    e.preventDefault()
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems
    }

    this.props.createOrder(order)
  }

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
            <>
              <div className='flex'>
                <strong>
                  Total: {' '}
                  {formatValue(
                    cartItems.reduce((total, item) => total + item.price * item.count, 0)
                  )}
                </strong>
                <button onClick={() => this.setState({showCheckout: true})}>Finalizar compra</button>
              </div>
              
              { this.state.showCheckout &&
                <div className='cart'>
                  <form onSubmit={this.createOrder}>
                    <ul className='form-container'>
                      <li>
                        <label htmlFor='name'>Nome</label>
                        <input name='name' required onChange={this.handleOnChange} />
                      </li>
                      <li>
                        <label htmlFor='email'>E-mail</label>
                        <input name='email' type='email' required onChange={this.handleOnChange} />
                      </li>
                      <li>
                        <label htmlFor='address'>Endereço</label>
                        <input name='address' required onChange={this.handleOnChange} />
                      </li>
                      <li>
                        <button type='submit'>Efetuar pagamento</button>
                      </li>
                    </ul>
                  </form>
                </div>
              }
            </>
          }
        </div>
      </div>
    )
  }
}