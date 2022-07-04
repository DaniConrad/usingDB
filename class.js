const options = require('./db/options/db')
const knex = require('knex')(options)

    class Container{
    constructor(object = {}){
     this.name = object?.name || ''
     this.price = object?.price || ''
     this.db = [];
    }
    
    async saveFile(obj){
        knex('products').insert(obj)
            .then(() => console.log('data inserted'))
            .catch(err => console.log(err))
            // .finally(() => knex.destroy())
        }

    async getById(myId){
        let item
        await knex.from('products')
                .where('id', '=', myId)
                .then(res => item = res)

            .catch(err => console.log(err))
            // .finally(() => knex.destroy())
        return item
        
    }

    async deleteById(myId){
      await knex.from('products')
                .where('id', '=', myId)
                .del()
            
                .then(() => console.log('data deleted'))
                .catch(err => console.log(err))
                // .finally(() => knex.destroy())
        }
        

    async editById(myId, name, price, desc, img, stock, code){ 
       const obj = {
            id: myId,
            name,
            price,
            desc,
            img,
            stock,
            code

       }
       await knex.from('products')
            .where('id', '=', myId)
            .update(obj)

            .then(() => console.log('data updated'))
            .catch(err => console.log(err))
            // .finally(() => knex.destroy())
    }

    async getAll(){
        let db = []
        await knex.from('products').select('*')
                
                .then( rows => {
                    db.push(...rows) 
                })
                .catch(err => console.log(err))
                // .finally(() => knex.destroy())
                return db
                
    }
}

module.exports = Container


// ---