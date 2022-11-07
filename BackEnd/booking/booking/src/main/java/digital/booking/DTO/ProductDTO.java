package digital.booking.DTO;

import digital.booking.entities.*;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {

    private Long id;
    private String title;
    private String description;
    private Category category;
    private List<Amenity> amenities;
    private Location location;
    private List<Image> images;
    private List<Item> items;
    private List<Rating> ratings;



}
