const joi = require("joi")

const loginSchema = joi.object({
    username: joi.string()
                .min(3)
                .max(14)
                .required(),
    password: joi.string()
                .min(8)
                .max(20)
                .required()
});


module.exports = {loginSchema}