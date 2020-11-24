import React from 'react'

import Products from './components/Products'
import {products} from './db/data.json'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products,
      size: '',
      sort: ''
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