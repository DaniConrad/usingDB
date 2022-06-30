const options = require('./db/options/db')
const knex = require('knex')(options)

knex('cart_products')
  .join('cart', 'cart.id', '=', 'contacts.cart_products.cart_id')
//   .select('cart_products', 'cart.id')
  .then(() => console.log('Table created'))
  .catch(err => {console.log(err); throw(err)})