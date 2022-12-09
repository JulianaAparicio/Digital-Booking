package digital.booking.DTO;

import lombok.*;

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