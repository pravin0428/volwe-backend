// const { object } = require("joi")
const Joi = require("joi")

module.exports.validatePost = ({body}) =>{
    const schema = Joi.object({
        title : Joi.string().required().label("Title"),
        description : Joi.string().required().label("discription"),
        imageFileSet : Joi.string().required().label("imageFileSet"),
        publishedAt : Joi.date().default(Date.now()) 

    })

    const responce =  schema.validate(body , {AbortEarly: false})
    return responce
}