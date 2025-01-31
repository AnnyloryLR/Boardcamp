// conflict error --> 409 use param === "entity";
//Games "name"
//customer "cpf"
//
//not found error --> 404;
//DELETE rental, rental RETURN ---> id non existent
//customer "id"
//gameId
//customerId

//unprocessable entity error ---> 422;
//rental RETURN already finished => 422

//*** schema validation: bad request error --->400:
//DELETE rental: if renturnDate is empty or null

export function conflict(entity){
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
