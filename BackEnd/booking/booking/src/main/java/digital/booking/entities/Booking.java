package digital.booking.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column
    private String startTime;

    @NotNull
    @Column
    private LocalDate initial_date;

    @NotNull
    @Column
    private LocalDate final_date;

    @Column
    private Boolean vaccinated;

    @Column(columnDefinition="TEXT")
    private String seller;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productId",nullable = false)
    private Product product;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId",nullable = false)
    private User user;


    public Booking(Long id, String startTime, LocalDate initial_date, LocalDate final_date, Product product, User user) {
        this.id = id;
        this.startTime = startTime;
        this.initial_date = initial_date;
        this.final_date = final_date;
        this.product = product;
        this.user = user;
    }

}
