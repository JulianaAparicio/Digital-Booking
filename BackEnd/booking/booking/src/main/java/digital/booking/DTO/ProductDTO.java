package digital.booking.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import digital.booking.entities.*;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductDTO {

    private Long id;
    private String title;
    private String description;
    private Category category;
    private List<Amenity> amenities;
    private Location location;
    private List<ImageDTO> images;
    private List<Item> items;
    private List<RatingDTO> ratings;
    private List<Booking> availability;

}
