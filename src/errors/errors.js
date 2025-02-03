export function conflictError(entity){
    return{
        type:"conflict",
        message:`Um(a) ${entity} com esse valor já existe!`
    }
}

export function notFound(entity){
    return{
        type:"notFound",
        message:`${entity} não existe!`
    }
}

export function UnprocessableEntity(){
    return{
        type:"UnprocessableEntity",
        message:"não é possível processar!"
    }
}
