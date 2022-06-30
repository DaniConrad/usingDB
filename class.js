const options = require('./db/options/db')
const knex = require('knex')(options)

    class Container{
    constructor(object = {}){
     this.name = object?.name || ''
     this.price = object?.price || ''
     this.db = [];
    }
    
    async saveFile(obj){
        knex('ecommercedb').insert(obj)
            .then(() => console.log('data inserted'))
            .catch(err => console.log(err))
            // .finally(() => knex.destroy())
        }

    async getById(myId){
        let item
        await knex.from('ecommercedb').select('*')
            .then( rows => {
               item = rows.find(prod => prod.id === myId);
            })
            .catch(err => console.log(err))
            // .finally(() => knex.destroy())
        return item
        
    }

    async deleteById(myId){
      await knex.from('ecommercedb')
                .where('id', '=', myId)
                .del()
            
                .then(() => console.log('data deleted'))
                .catch(err => console.log(err))
                // .finally(() => knex.destroy())
        }
        

    async editById(myId, name, price, desc, img, stock, code){ 
       const timestamp = Date.now()
       const obj = {
            id: myId,
            name,
            price,
            desc,
            img,
            stock,
            code,
            timestamp

       }
       await knex.from('ecommercedb')
            .where('id', '=', myId)
            .update(obj)

            .then(() => console.log('data updated'))
            .catch(err => console.log(err))
            // .finally(() => knex.destroy())
    }

    async getAll(){
        let db = []
        await knex.from('ecommercedb').select('*')
                
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