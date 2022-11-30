package digital.booking.entities;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "categories")
public class Category {

    @Id
    @SequenceGenerator(name="category_seg",initialValue = 1,allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "category_seq")

    @NotNull
    private Long id;

    @NotNull
    @Column
    private String title;

    @Column
    private String description;

    @Column
    private String imageURL;


}
