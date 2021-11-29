const jwt = require("jsonwebtoken")

class authJwt {
    #jwtSign = process.env.JWT_SIGN
    #jwtExpires = process.env.JWT_EXPIRESIN

    #getToken = (header) => {
        const authorization = header.authorization
        const token = authorization && authorization.split(' ')[1]
        if (!token) throw new Error("Undefined Token")
        return token
    }
    
    generateToken = (_id) => {
        const token = jwt.sign(
            { _id }, this.#jwtSign, 
            { expiresIn: this.#jwtExpires }
        )
    
        if(!token || !_id) throw new Error('token not generated');
        return token
    }
    
    verifyToken = (header) => {
        const token = this.#getToken(header)
        return jwt.verify(token, this.#jwtSign, (error) => {
            if (error.name === 'JsonWebTokenError') throw new Error(`${error.message}`) 
            else return true
        }) 
    }
    
    decodeToken = (header) => {
        const token = this.#getToken(header)
        return jwt.decode(token, this.#jwtSign, (error) => {
            if (error.name === 'JsonWebTokenError') throw new Error(`${error.message}`) 
            else return true
        })
    }
}

module.exports = new authJwt()