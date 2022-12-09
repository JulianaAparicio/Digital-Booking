package digital.booking.entities;


import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(columnDefinition="TEXT")
    private String description;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "politicId",nullable = false)
    private Politic politic;
}
