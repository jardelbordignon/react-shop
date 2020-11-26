import { FETCH_PRODUCTS } from '../types'

export const fetchProducts = () => async (dispatch) => {
  const res = await fetch('/api/products')
  const payload = await res.json()

  console.log(res)
  console.log(payload)

  dispatch({type: FETCH_PRODUCTS, payload })
}
