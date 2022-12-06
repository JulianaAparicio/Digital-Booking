package digital.booking.DTO;

import digital.booking.entities.Product;
import digital.booking.entities.User;
import lombok.*;

import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingReqDTO {
    private String startTime;
    private String initial_date;
    private String final_date;
    private String productId;
    private String userId;
    private Long id;
    private Boolean vaccinated;
    private String seller;
}