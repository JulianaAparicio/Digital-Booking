package digital.booking.DTO;

import digital.booking.entities.Product;
import digital.booking.entities.User;
import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO {
    private Long id;
    private String startTime;
    private LocalDate initialDate;
    private LocalDate finalDate;
    private Boolean vaccinated;
    private String seller;
    private ProductDTO product;
    private UserDTO user;

}
