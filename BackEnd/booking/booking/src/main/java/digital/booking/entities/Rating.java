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
@Table(name = "ratings")
public class Rating {

    @Id
    @SequenceGenerator(name="rating_seg",initialValue = 1,allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "rating_seq")

    @NotNull
    private Long id;

    @Column
    private Integer score;

    @ManyToMany
    @JoinColumn(name = "users",nullable = false)
    private List<User> users;

}
