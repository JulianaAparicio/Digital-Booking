package digital.booking.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorDTO {
    private String message;
    private int status;

}
