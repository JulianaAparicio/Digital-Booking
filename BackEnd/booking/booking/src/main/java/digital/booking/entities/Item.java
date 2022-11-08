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
@Table(name = "items")
public class Item {

    @Id
    @SequenceGenerator(name="item_seg",initialValue = 1,allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "item_seq")

    @NotNull
    private Long id;

    @NotNull
    @Column
    private String description;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "politicId",nullable = false)
    private Politic politic;
}
