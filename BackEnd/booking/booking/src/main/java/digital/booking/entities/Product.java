package digital.booking.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer"})
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
    @Column(columnDefinition="TEXT")
    private String description;

    @Override
    public String toString() {
        return this.title + this.description;
    }

    @NotNull
    @ManyToOne
    @JoinColumn(name = "category_id",nullable = false)
    private Category category;

    @NotNull
    @OneToOne(cascade = CascadeType.ALL )
    @JoinColumn(name = "location_id",nullable = false)
    private Location location;

    @ManyToMany
    @JoinColumn(name = "amenities",nullable = false)
    private List<Amenity> amenities;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "product",nullable = false)
    private List<Image> images;

    @ManyToMany
    @JoinColumn(name = "items",nullable = false)
    private List<Item> items;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "product",nullable = false)
    private List<Rating> ratings;

    public Product(Long id, String title, String description, Category category, Location location) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.location = location;
    }
}
