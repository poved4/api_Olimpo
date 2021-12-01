class MongodbQueriesDish {

    modelDish = require('../models/mongodb.model.dish')
    
    dishById = async (_id) => {
        const data = await this.modelDish.findOne({_id})
        if(!data) throw new Error('dish not found')
        return data 
    }

    dishesAll = async () => {
        const data = await this.modelDish.find()
        if(!data) throw new Error('no data')
        return data
    }
    
    dishCreate = async (body) => {
        const model = await this.dishModel(body)
        const data = await this.dishSave(model)
        return data
    }

    dishUpdate = async (_id, body) => {
        return await this.modelDish.findByIdAndUpdate(
            _id, body, { new : true }
        )
    }

    dishSave = async (user) => user.save()

    dishRemove = async (_id) => await this.modelDish.findByIdAndRemove(_id)

    /* Model Dish */
    dishModel = async ({ name, price, category, imageUrl, description }) => {
        return new this.modelDish({
            name, price, category, imageUrl, description
        })
    }

}

module.exports = new MongodbQueriesDish();