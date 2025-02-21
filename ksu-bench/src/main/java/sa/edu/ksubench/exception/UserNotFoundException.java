package sa.edu.ksubench.exception;

public class UserNotFoundException extends Exception{
    public UserNotFoundException(String message) {
        super(message);
    }

    public UserNotFoundException() {
        super("UserNotFoundException");
    }
}
