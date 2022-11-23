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
public class BookingDTO {
    private Long id;
    private String startTime;
    private LocalDate initialDate;
    private LocalDate finalDate;
    private Product product;
    private User user;

}
