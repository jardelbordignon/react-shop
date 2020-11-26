import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'

import store from './redux/store'
import Filter from './components/Filter'
import Products from './components/Products'
import Cart from './components/Cart'


export default class App extends React.Component {

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
              <Filter />
              <Products />
            </div>
            <div className="sidebar">
              <Cart />
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