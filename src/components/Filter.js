import React, { Component } from 'react'
import { connect } from 'react-redux'

import { filterProducts, sortProducts } from '../redux/actions/productActions'

class Filter extends Component {
  render() {

    if(!this.props.filteredProducts)
      return <div>Carregando...</div>

    return (
      <div className='flex pv-20'>
        <div className='filter-result'>{ this.props.filteredProducts.length } Produtos</div>
        
        <div className='filter-sort'>
          Ordenar 
          <select className='ml-5' value={this.props.sort}
            onChange={e => this.props.sortProducts(this.props.filteredProducts, e.target.value)}>
            <option value='latest'>Mais Recentes</option>
            <option value='lowest'>Menor valor</option>
            <option value='highest'>Maior valor</option>
          </select>
        </div>

        <div className='filter-size'>
          Tamanhos
          <select className='ml-5' value={this.props.size} 
            onChange={e => this.props.filterProducts(this.props.products, e.target.value)}>
            <option value=''>Todos</option>
            <option value='XS'>PP</option>
            <option value='S'>P</option>
            <option value='M'>M</option>
            <option value='L'>G</option>
            <option value='XL'>GG</option>
            <option value='XXL'>XG</option>
          </select>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems
  }),
  { filterProducts, sortProducts }
)(Filter)