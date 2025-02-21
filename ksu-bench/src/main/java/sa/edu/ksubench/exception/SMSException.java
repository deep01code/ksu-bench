package sa.edu.ksubench.exception;

public class SMSException extends Exception{

    public SMSException(String message) {
        super(message);
    }

    public SMSException() {
        super("SMSException");
    }
}
