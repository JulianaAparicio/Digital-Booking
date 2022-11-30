package digital.booking.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Favorite {
    private Long userId;
    private Long productId;
}
