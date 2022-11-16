package digital.booking.repositories;

import digital.booking.entities.Role;
import digital.booking.entities.UserRoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Role findByName(UserRoleEnum role);
}
