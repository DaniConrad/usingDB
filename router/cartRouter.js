const express = require('express');
const { Router } = express
const Cart = require('../cart/Cart.js')

const dbCart = new Cart('./cart/cart.json')
const router = Router();

router.get('/cart/:id/products', async (req, res) => {
    const id = Number(req.params.id)
    
    res.json(await dbCart.getCart(id))
})

router.post('/cart', (req, res) => {
    dbCart.createCart()
    res.send('cart created')
})

router.post('/cart/:id/products', async (req, res) =>{
    const id = Number(req.params.id)
    
    res.json(await dbCart.saveCart(req.body, id))
})

router.delete(`/cart/:id`, async (req, res) =>{
    const id = Number(req.params.id)
    res.json(await dbCart.deleteCart(id))
})

router.delete(`/cart/:id/products/:prodId`,  (req, res) =>{
    const cartId = Number(req.params.id)
    const prodId = Number(req.params.prodId)
     dbCart.deleteProd(cartId, prodId)
    res.json("Borrado")

})

module.exports = router;