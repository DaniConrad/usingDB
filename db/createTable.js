const options = require('./options/db')
const knex = require('knex')(options)

knex.schema.createTable('cart', table => {
    table.increments('id')
    table.string('timestamp')
})

    .then(() => console.log('Table created'))
    .catch(err => {console.log(err); throw(err)})
    .finally(() =>{
        knex.destroy()
    })
    