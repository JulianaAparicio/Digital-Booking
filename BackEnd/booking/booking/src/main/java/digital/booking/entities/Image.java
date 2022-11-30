package digital.booking.entities;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "images")
public class Image {

    @Id
    @SequenceGenerator(name="image_seg",initialValue = 1,allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "image_seq")

    @NotNull
    private Long id;

    @NotNull
    @Column
    private String title;

    @NotNull
    @Column
    private String URL;
}
