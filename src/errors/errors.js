export function conflictError(entity){
    return{
        type:"conflict",
        message:`${entity} já existe!`
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

export function badRequest(){
    return{
        type: "badRequest",
        message: "esta operação não pode ser realizada sem a data de devolução!"
    }
}
