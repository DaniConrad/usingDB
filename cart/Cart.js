const fs = require('fs')
const options = require('../db/options/db')
const knex = require('knex')(options)


class Cart{
    constructor(file){
        this.file = file
        this.valide
    }

    async createCart(){
        await knex('carts').insert({})
                .then(() => console.log('data inserted'))
                .catch(err => console.log(err))
    }

    async saveCart(obj, id) {
        const cart_products = {
            "cart_id": id,
            "prod_id":obj.id
        }
        
        await knex('carts').select('*')
                .then(rows => this.valide =  rows.some(row => row.id === id))

                .then(() => console.log('done'))
                .catch(err => console.log(err))
        if (this.valide === false) return {msg: "Error en existencia de carrito"}
            
        
       await knex('carts_products').insert(cart_products)
                .then(() => console.log('data inserted'))
                .catch(err => console.log(err))
       return {msg: 'Agregado con éxito'}
    }

    async getCart(id){
        await knex('carts_products')
                .join('products', 'carts_products.prod_id', '=', 'products.id')
                .where('cart_id', '=', id)
                .then(rows => this.valide = rows)

                .then(() => console.log('done'))
                .catch(err => console.log(err))
        return this.valide
    }

    async deleteCart(id){
        await knex('carts_products')
                .where('cart_id', '=', id)
                .del()

                .then(() => console.log('cart deleted'))
                .catch(err => console.log(err))
        return ({msg: "Se eliminó este carrito"})
    }

    async deleteProd(cartId, prodId){
        await knex('carts_products')
                .where('cart_id', '=', cartId)
                .where('prod_id', '=', prodId)
                .del()

                .then(() => console.log('data deleted'))
                .catch(err => console.log(err))
        
    }
}

module.exports = Cart
