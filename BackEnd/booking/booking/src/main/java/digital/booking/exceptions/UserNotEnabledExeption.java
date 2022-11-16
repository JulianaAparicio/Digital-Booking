package digital.booking.exceptions;

public class UserNotEnabledExeption extends Exception{

    public UserNotEnabledExeption(String email) {
        super("The user with email: " + email + "is not active");
    }
}
