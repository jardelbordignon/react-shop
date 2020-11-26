import { FETCH_PRODUCTS, FILTER_PRODUCTS_BY_SIZE, ORDER_PRODUCTS_BY_PRICE } from '../types'

export const fetchProducts = () => async (dispatch) => {
  const res = await fetch('/api/products')
  const payload = await res.json()

  dispatch({type: FETCH_PRODUCTS, payload })
}

export const filterProducts = (products, size) => dispatch => {
  const payload = {
    size,
    items: size === '' ? products :
      products.filter(product => product.availableSizes.indexOf(size) >= 0)
  }
  dispatch({type: FILTER_PRODUCTS_BY_SIZE, payload})
}

export const sortProducts = (filteredProducts, sort) => dispatch => {
  const items = filteredProducts.slice()
  if (sort==='latest')
    items.sort((a,b) => (a._id > b._id ? 1 : -1))
  else {
    if(sort === 'lowest')
      items.sort((a,b) => (a.price > b.price ? 1 : -1))
    else
      items.sort((a,b) => (a.price < b.price ? 1 : -1 ))
  }

  const payload = { sort, items }
  dispatch({type: ORDER_PRODUCTS_BY_PRICE, payload})
}