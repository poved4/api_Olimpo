class ControllerDishes {

    queriesDish = require('../services/mongodb/helpers/mongodb.queries.dish')

    dishById = async (req, res) => {
        try {

            const id = req.params.id
            const dish = await this.queriesDish.dishById(id)
            res.status(200).json( { "ok": true, dish } )

        } catch (error) {
            res.status(500).json( { "ok": false, "error": error.message } )
        } 
    }

    dishesAll = async (req, res) => {
        try {

            const dishes = await this.queriesDish.dishesAll()
            res.status(200).json( { "ok": true, dishes } )
            
        } catch (error) {
            res.status(500).json( { "ok": false, "error": error.message } )
        } 
    }

    dishCreate = async (req, res) => {
        try {
            const dish = await this.queriesDish.dishCreate(req.body)
            res.status(200).json( { "ok": true } )

        } catch (error) {
            res.status(500).json( { "ok": false, "error": error.message } )
        } 
    }

    dishUpdateById = async (req, res) => {
        try {

            const body = req.body, id = req.params.id
            const dish = this.queriesDish.dishUpdate(id, body)
            res.status(200).json( { "ok": true, dish } )

        } catch (error) {
            res.status(500).json( { "ok": false, "error": error.message } )
        } 
    }

    dishRemoveById = async (req, res) => {
        try {

            const id = req.params.id
            await this.queriesDish.dishRemove(id)
            res.status(200).json( { "ok": true } )

        } catch (error) {
            res.status(500).json( { "ok": false, "error": error.message } )
        } 
    }

}

module.exports = new ControllerDishes() 