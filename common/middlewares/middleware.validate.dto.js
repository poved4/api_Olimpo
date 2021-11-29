function validateDto (ajvValidate) {
    return (req, res, next) => {
        const valid = ajvValidate(req.body)
    }
}

module.exports = validateDto