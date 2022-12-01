package digital.booking.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import digital.booking.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RatingDTO {
    private Long id;
    private Integer score;
    private UserDTO user;
}
