package digital.booking.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "products")
public class Product {

    @Id
    @SequenceGenerator(name="product_seg",initialValue = 1,allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "product_seq")

    @NotNull
    private Long id;

    @NotNull
    @Column
    private String title;

    @NotNull
    @Column
    private String description;

    @ManyToOne
    @JoinColumn(name = "categoryId",nullable = false)
    private Category category;

    @OneToOne
    @JoinColumn(name = "locationId",nullable = false)
    private Location location;

    @ManyToMany
    @JoinColumn(name = "amenities",nullable = false)
    private List<Amenity> amenities;

    @OneToMany
    @JoinColumn(name = "product",nullable = false)
    private List<Image> images;

}
