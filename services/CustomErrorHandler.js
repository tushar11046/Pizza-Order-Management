class CustomErrorHandler extends Error {
    constructor (status, message){
        super();
        this.status = status,
        this.message = message
    };

    static userAlreadyExists(message){
        return new CustomErrorHandler(409, message);
    }

    static noSuchUserExists(message="No such user Exists. Please register yourself"){
        return new CustomErrorHandler(401, message);
    }

    static wrongPassword(message="Incorrect Password"){
        return new CustomErrorHandler(401, message);
    }
    
    static unAuthorizedAccess(message="Unauthorized Access"){
        return new CustomErrorHandler(401, message);
    }

    static userNotFound(message="User Not Found"){
        return new CustomErrorHandler(404, message);
    }

    static ingredientValidationError(message="Ingredient values not specified"){
        return new CustomErrorHandler(401, message);
    }

    static ingredientExists(message="Ingredient with the same name already exists"){
        return new CustomErrorHandler(409, message);
    }

    static ingredientNotExists(message="Ingredient with the given values doesn't exist"){
        return new CustomErrorHandler(404, message);
    }

    static orderValidationError(message="Order values not specified"){
        return new CustomErrorHandler(401, message);
    }

    static orderNotExists(message="Order with the given id doesn't exist"){
        return new CustomErrorHandler(404, message);
    }
}

export default CustomErrorHandler;