package digital.booking.entities;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "amenities")
public class Amenity {

    @Id
    @SequenceGenerator(name="amenity_seg",initialValue = 1,allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "amenity_seq")

    @NotNull
    private Long id;

    @NotNull
    @Column
    private String name;
}
