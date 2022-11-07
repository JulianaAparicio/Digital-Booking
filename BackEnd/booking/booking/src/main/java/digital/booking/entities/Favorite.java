package digital.booking.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "favorites")
public class Favorite {

    @Id
    @SequenceGenerator(name="favorite_seg",initialValue = 1,allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "favorite_seq")

    @NotNull
    private Long id;

    @OneToOne
    @JoinColumn(name = "product_id",nullable = false)
    private Product product;

    @ManyToMany
    @JoinColumn(name = "users",nullable = false)
    private List<User> users;

}
