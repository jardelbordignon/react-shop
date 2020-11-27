import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import Zoom from 'react-reveal/Zoom'

import { removeFromCart } from '../redux/actions/cartActions'
import { createOrder, clearOrder } from '../redux/actions/orderActions'
import formatValue from '../utils/formatValue'

class Cart extends Component {
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
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((total, item) => total + item.price * item.count, 0)
    }

    this.props.createOrder(order)
  }

  closeModal = () => this.props.clearOrder()

  render() {
    const { cartItems, order } = this.props

    return (
      <div>
        <div className='cart cart-header'>
          { !cartItems.length 
            ? 'Carrinho vazio' 
            : `Você tem ${cartItems.length} itens no carrinho`
          }
        </div>

        { order &&
         <Modal isOpen={!!order} onRequestClose={this.closeModal} ariaHideApp={false}>
          <Zoom>
            <button className='close-modal' onClick={this.closeModal}>X</button>
              <div className='order-details'>
                <h3 className='success-message'>Seu pedido foi realizado com sucesso</h3>
                <h2>Pedido {order._id}</h2>
                <ul>
                  <li>
                    <div>Nome</div>
                    <div>{order.name}</div>
                  </li>
                  <li>
                    <div>E-mail</div>
                    <div>{order.email}</div>
                  </li>
                  <li>
                    <div>Endereço</div>
                    <div>{order.address}</div>
                  </li>
                  <li>
                    <div>Data</div>
                    <div>{order.createdAt}</div>
                  </li>
                  <li>
                    <div>Total</div>
                    <div>{formatValue(order.total)}</div>
                  </li>
                  <li>
                    <div>Itens do pedido</div>
                    <div>
                      {
                        order.cartItems.map(item => (
                          <div key={item._id}>{`${item.count} - ${item.title}`}</div>
                        ))
                      }
                    </div>
                  </li>
                </ul>
              </div>
            </Zoom>
          </Modal>
        }

        <div>
          <div className='cart'>

            <Fade left cascade>
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
            </Fade>
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
                <Fade right cascade>
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
                </Fade>
              }
            </>
          }
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    order: state.order.order,
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart, createOrder, clearOrder }
)(Cart)