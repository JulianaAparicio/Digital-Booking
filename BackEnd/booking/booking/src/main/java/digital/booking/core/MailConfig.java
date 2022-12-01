package digital.booking.core;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Date;

public class MailConfig {

    public static void sendEmail(Session session, String toEmail, String subject, String body) {
        try {
            MimeMessage mimeMessage = new MimeMessage(session);
            //set message headers
            mimeMessage.addHeader("Content-type", "text/HTML; charset=UTF-8");
            mimeMessage.addHeader("format", "flowed");
            mimeMessage.addHeader("Content-Transfer-Encoding", "8bit");

            mimeMessage.setFrom(new InternetAddress("digitalbooking.c3g6@gmail.com", "Digital Booking"));

            mimeMessage.setReplyTo(InternetAddress.parse("digitalbooking.c3g6@gmail.com", false));

            mimeMessage.setSubject(subject, "UTF-8");

            mimeMessage.setContent(body, "text/html");

            mimeMessage.setSentDate(new Date());

            mimeMessage.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail, false));
            System.out.println("Message is ready");
            Transport.send(mimeMessage);

            System.out.println("EMail Sent Successfully!!");
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
}
