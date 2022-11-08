package digital.booking.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "locations")
public class Location {

    @Id
    @SequenceGenerator(name="location_seg",initialValue = 1,allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "location_seq")

    @NotNull
    private Long id;

    @ManyToOne
    @JoinColumn(name = "city_id",nullable = false)
    private City city;

    @NotNull
    @Column
    private String address;

    @NotNull
    @Column
    private String latitude;

    @NotNull
    @Column
    private String longitude;

}
