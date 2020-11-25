import React from 'react'

import Filter from './components/Filter'
import Products from './components/Products'

import { products } from './db/data.json'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products,
      size: '',
      sort: ''
    }
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

              <Products products={this.state.products} />
            </div>
            <div className="sidebar">
              Cart Items
            </div>
          </div>
        </main>

        <footer className='flex flex-center'>
          All rights reserved.
        </footer>
      </div>
    )
  }
}