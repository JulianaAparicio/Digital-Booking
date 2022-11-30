package digital.booking.entities;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cities")
public class City {
    @Id
    @SequenceGenerator(name="city_seg",initialValue = 1,allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "city_seq")

    @NotNull
    private Long id;

    @NotNull
    @Column
    private String name;

    @NotNull
    @Column
    private String state;

    @NotNull
    @Column
    private String country;

}
