package digital.booking.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @SequenceGenerator(name="booking_seg", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @NotNull
    private Long id;

    @NotNull
    @Column
    private String startTime;

    @NotNull
    @Column
    private LocalDate initialDate;

    @NotNull
    @Column
    private LocalDate finalDate;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "productId",nullable = false)
    private Product product;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "userId",nullable = false)
    private User user;



}
