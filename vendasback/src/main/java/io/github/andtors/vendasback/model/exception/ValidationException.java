package io.github.andtors.vendasback.model.exception;

public class ValidationException extends RuntimeException{
    public ValidationException (String message){
        super(message);
    }
}
