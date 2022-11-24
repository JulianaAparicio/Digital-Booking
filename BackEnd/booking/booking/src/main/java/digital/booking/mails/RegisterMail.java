package digital.booking.mails;

import digital.booking.core.MailConfig;
import digital.booking.entities.User;

import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import java.util.Properties;

public class RegisterMail {

    public static void sendRegisterEmail (User user) {
        final String fromEmail = "digitalbooking.c3g6@gmail.com"; //requires valid gmail id
        final String password = "suptqfhzgqzwotbs"; // correct password for gmail id

        System.out.println("TLSEmail Start");
        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com"); //SMTP Host
        props.put("mail.smtp.port", "587"); //TLS Port
        props.put("mail.smtp.auth", "true"); //enable authentication
        props.put("mail.smtp.starttls.enable", "true"); //enable STARTTLS

        //create Authenticator object to pass in Session.getInstance argument
        Authenticator auth = new Authenticator() {
            //override the getPasswordAuthentication method
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(fromEmail, password);
            }
        };
        Session session = Session.getInstance(props, auth);
        String registerSubjectMail = user.getName() + " " + user.getLastName() + ", Bienvenido a Digital Booking!";
        String registerBodyMail = "<div style=\"width: 90%;border: 1px solid #383b58; margin: auto;\">\n" +
                "      <div style=\"width: 100%;background-color: #1DBEB4;color:#383b58;\">\n" +
                "         <h1 style=\"padding: 0.5rem;\">Digital Booking</h1>\n" +
                "         <h3 style=\"padding: 0.5rem;\">Bienvenido, " + user.getName() + " " + user.getLastName() + "</h3> \n" +
                "      </div>\n" +
                "      <div style=\"padding: 1rem;\">\n" +
                "         Gracias por elegir ser parte de Digital Booking (C3G6)!\n" +
                "\n" +
                "         Ya te encuentras registrado en nuestra web y podrás acceder a miles de ofertas especiales en nuestros diferentes alojamientos.<br><br><br>\n" +
                "\n" +
                "         Para iniciar sesión solo tienes que ingresar tu e-mail y tu contraseña...<br><br>\n" +
                "\n" +
                "         <a style=\"color:#1DBEB4;\" href=\"http://camada3grupo6frontend.s3-website.us-east-2.amazonaws.com\">Ingresa ahora</a>, selecciona tu primer destino y obtén tú primer descuento <br><br><br>\n" +
                "\n" +
                "         Te esperamos en nuestra web!<br><br>\n" +
                "\n" +
                "         Att: El equipo de Digital Booking\n" +
                "      </div>\n" +
                "   </div>";

        MailConfig.sendEmail(session, user.getEmail(),registerSubjectMail, registerBodyMail);

    }
}
