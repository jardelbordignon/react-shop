import { ADD_TO_CART, REMOVE_FROM_CART } from '../types'

export const addToCart = product => (dispatch, getState) => {
 
  const cartItems = getState().cart.cartItems.slice()
  let alreadyInCart = false

  cartItems.forEach( item => {
    if(item._id === product._id) {
      item.count++
      alreadyInCart = true
    } 
  })

  if (!alreadyInCart)
    cartItems.push({ ...product, count: 1})

  dispatch({ type: ADD_TO_CART, payload: { cartItems } })

  localStorage.setItem('cartItems', JSON.stringify(cartItems))
}


export const removeFromCart = product => (dispatch, getState) => {
  console.log('CHEGOU AQUI')

  const cartItems = getState().cart.cartItems.slice()

  let filteredCartItems = []
  if(product.count > 1) {
    filteredCartItems = cartItems.map( item => {
      if(item._id === product._id) item.count--
      return item
    })
  } else {
    filteredCartItems = cartItems.filter(item => item._id !== product._id)
  }

  dispatch({ type: REMOVE_FROM_CART, payload: { cartItems: filteredCartItems} })
  localStorage.setItem('cartItems', JSON.stringify(filteredCartItems))
}