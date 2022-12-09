package digital.booking.services;

import digital.booking.entities.Role;
import digital.booking.entities.User;
import digital.booking.repositories.RoleRepository;
import digital.booking.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

import static digital.booking.entities.UserRoleEnum.USER;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.when;

class AuthServiceTest {

    @Mock
    UserRepository userRepository;

    @Mock
    RoleRepository roleRepository;

    @InjectMocks
    AuthService authService;

    @Mock
    private User userTest;

    @Mock
    private Role roleTest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        roleTest = new Role(1L,USER);
        roleRepository.save(roleTest);
        userTest = new User(1L,"nameTest","lastNameTest", "email_test@test.com",
                "passwordTest",true,roleTest);
        userRepository.save(userTest);
    }

    @Test
    void loadUserByUsername() {
        when(userRepository.findByEmail("email_test@test.com")).thenReturn(Optional.of(userTest));
        UserDetails userLoaded = authService.loadUserByUsername(userTest.getEmail());

        assertThat(userLoaded).isNotNull();
    }
}