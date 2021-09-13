class InputNameException extends Error{
    constructor(message){
        super(message)
        this.name = "InputNameNotValid"
    }
}

class InputPasswordException extends Error {
    constructor(message){
        super(message)
        this.name = "InputPasswordNotValid"
    }
}

class InputEmailException extends Error{
    constructor(message){
        super(message)
        this.name = "InputEmailNotValid"
    }
}

export { InputNameException, InputPasswordException, InputEmailException };

