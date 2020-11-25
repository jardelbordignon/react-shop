import React, { Component } from 'react'

export default class Filter extends Component {
  render() {
    return (
      <div className='flex pv-20'>
        <div className='filter-result'>{ this.props.count } Produtos</div>
        
        <div className='filter-sort'>
          Ordenar 
          <select className='ml-5' value={this.props.sort} onChange={this.props.sortProducts}>
            <option value=''>Recentes (Latest)</option>
            <option value='lowest'>Menor valor (Lowest)</option>
            <option value='highest'>Maior valor (Highest)</option>
          </select>
        </div>

        <div className='filter-size'>
          Tamanhos
          <select className='ml-5' value={this.props.size} onChange={this.props.filterProducts}>
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