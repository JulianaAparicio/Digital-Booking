package digital.booking.DTO;

import digital.booking.entities.Product;
import digital.booking.entities.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookingReqDTO {
    private String startTime;
    private String initialDate;
    private String finalDate;
    private String productId;
    private String userId;
    private Long id;
    private Boolean vaccinated;
    private String seller;
}