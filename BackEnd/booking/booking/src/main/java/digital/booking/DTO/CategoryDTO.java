package digital.booking.DTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {

    private Long id;
    private String title;
    private String description;
    private String imageURL;
}
