export function schemaValidate(schema){
    return (req, res, next)=> {

        const validation = schema.validate(req.body, {abortEarly: false});
        if(validation.error){
            const messages = validation.error.details.map(detail => detail.message);
            return res.status(400).send(messages)
        }

        next();
    }
}