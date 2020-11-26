import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'

import store from './redux/store'
import Filter from './components/Filter'
import Products from './components/Products'
import Cart from './components/Cart'

import { products } from './db/data.json'
const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products,
      cartItems,
      size: '',
      sort: ''
    }
  }

  createOrder = order => {
    alert('Need to save order for '+order.name)
  }

  removeFromCart = product => {
    const cartItems = this.state.cartItems.slice()

    let filteredCartItems = []
    if(product.count > 1) {
      filteredCartItems = cartItems.map( item => {
        if(item._id === product._id) item.count--
        return item
      })
    } else {
      filteredCartItems = cartItems.filter(item => item._id !== product._id)
    }

    this.setState({ cartItems: filteredCartItems })
    localStorage.setItem('cartItems', JSON.stringify(filteredCartItems))
  }

  addToCart = product => {
    const cartItems = this.state.cartItems.slice()
    let alreadyInCart = false

    cartItems.forEach( item => {
      if(item._id === product._id) {
        item.count++
        alreadyInCart = true
      } 
    })

    if (!alreadyInCart)
      cartItems.push({ ...product, count: 1})

    this.setState({ cartItems })
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }

  sortProducts = event => {
    console.log(event.target.value)
    const sort = event.target.value
    this.setState(state => ({
      sort, products: this.state.products.slice().sort((a,b) => (
        sort === 'lowest' ? ((a.price > b.price) ? 1 : -1 ) :
        sort === 'highest' ? ((a.price < b.price) ? 1 : -1 ) :
        a._id > b._id ? 1 : -1
      ))
    }))
  }

  filterProducts = event => {
    console.log(event.target.value)
    const size = event.target.value
    if(size === '') {
      this.setState({size, products})
    } else {
      this.setState({
        size,
        products: products.filter(product => product.availableSizes.indexOf(event.target.value) >= 0)
      })
    }
  }

  render() {
    return (
      <ReduxProvider store={store}>
      <div className='grid-container'>
        <header className='flex'>
          <a href='/'>React Shop</a>
        </header>

        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                sortProducts={this.sortProducts}
                filterProducts={this.filterProducts} />

              <Products products={this.state.products} addToCart={this.addToCart} />
            </div>
            <div className="sidebar">
              <Cart
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
                createOrder={this.createOrder} />
            </div>
          </div>
        </main>

        <footer className='flex flex-center'>
          All rights reserved.
        </footer>
      </div>
      </ReduxProvider>
    )
  }
}