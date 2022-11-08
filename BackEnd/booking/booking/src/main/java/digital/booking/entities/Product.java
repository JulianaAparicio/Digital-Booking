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

<<<<<<< HEAD
    @NotNull
=======
    @Override
    public String toString() {
        return this.title + this.description;
    }

>>>>>>> b24f32b8f6d8d1a76cdee50f8a74174a9cbb6eb1
    @ManyToOne
    @JoinColumn(name = "category_id",nullable = false)
    private Category category;

<<<<<<< HEAD
    @NotNull
    @OneToOne
=======
    @OneToOne(cascade = CascadeType.ALL )
>>>>>>> b24f32b8f6d8d1a76cdee50f8a74174a9cbb6eb1
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

}
