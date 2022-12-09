package digital.booking.services;

import digital.booking.entities.User;
import digital.booking.exceptions.BadRequestException;
import digital.booking.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
class UserServiceTest {

    @Mock
    UserRepository userRepository;

    @InjectMocks
    UserService userService;

    private User userTest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userTest = new User("nameTest","lastNameTest", "email_test@test.com",
                "passwordTest");
        userTest.setId(1L);
        userRepository.save(userTest);
    }

    @Test
    void create() {
        try{
            when(userRepository.save(any(User.class))).thenReturn(userTest);

            User user = new User();
            user.setId(1L);
            user.setName("imageTitleTest");
            user.setLastName("imageURLTest");
            user.setEmail("email_test@test.com");
            user.setPassword("passwordTest");

            User userCreated = userService.create(user);

            // Verifies if user is null:
            assertNotNull(userCreated,"The user is null");

            // Verifies user's attributes:
            assertEquals(userTest.getName(), userCreated.getName(), "Names don't match.");
            assertEquals(userTest.getLastName(), userCreated.getLastName(), "Last names don't match.");
            assertEquals(userTest.getEmail(), userCreated.getEmail(), "Emails don't match.");
            assertEquals(userTest.getPassword(), userCreated.getPassword(), "Passwords don't match.");

        } catch (BadRequestException e){
            e.printStackTrace();
        }
    }
}