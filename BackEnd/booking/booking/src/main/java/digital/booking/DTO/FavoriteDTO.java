package digital.booking.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteDTO {
    private Long userId;
    private Long productId;
}
