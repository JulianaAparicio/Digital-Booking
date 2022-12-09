package digital.booking.services;

import digital.booking.DTO.FavoriteDTO;
import digital.booking.entities.*;
import digital.booking.exceptions.BadRequestException;
import digital.booking.repositories.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
public class FavoriteServiceTest {
    @InjectMocks
    private FavoriteService favoriteService;

    @Mock
    ProductRepository productRepository;

    @Mock
    CategoryRepository categoryRepository;

    @Mock
    CityRepository cityRepository;

    @Mock
    LocationRepository locationRepository;

    @Mock
    RoleRepository roleRepository;

    @Mock
    UserRepository userRepository;

    @Mock
    private Category categoryTest;

    @Mock
    private City cityTest;

    @Mock
    private Location locationTest;

    @Mock
    private Role roleTest;

    private User userTest;
    private Product productTest;

    private FavoriteDTO favoriteTest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        categoryTest = new Category(1L,"titleTest","descriptionTest","imageURLTest");
        categoryRepository.save(categoryTest);

        cityTest = new City(1L,"cityNameTest","stateTest","countryTest");
        cityRepository.save(cityTest);

        locationTest = new Location(1L,cityTest,"addressTest","latitudeTest","longitudeTest");
        locationRepository.save(locationTest);

        productTest = new Product(1L, "titleTest", "descriptionTest",categoryTest,locationTest);
        productRepository.save(productTest);

        List<Product> productListTest = new ArrayList<>();
        productListTest.add(productTest);

        userTest = new User(1L,"nameTest","lastNameTest", "emailTest",
                "passwordTest",true,roleTest);
        userTest.setProducts(productListTest);
        userRepository.save(userTest);

        favoriteTest = new FavoriteDTO(userTest.getId(), productTest.getId());
    }

    @Order(1)
    @Test
    void testToggleFavorite() {
        try {
            when(productRepository.findById(productTest.getId())).thenReturn(Optional.ofNullable(productTest));
            when(userRepository.findById(userTest.getId())).thenReturn(Optional.ofNullable(userTest));

            Long userId = userTest.getId();
            Long productId = productTest.getId();

            // Verifies not null attributes:
            assertNotNull(userId,"The value is null.");
            assertNotNull(productId,"The value is null.");
            assertNotNull(favoriteTest,"The value is null.");

            List<Product> userTestProducts = userTest.getProducts();

            // Remove from favorite list:
            favoriteService.toggleFavorite(userId,productId);

            assertNotNull(userTestProducts,"The value is null.");

            assertEquals(0, userTestProducts.size(), "There are still products associated to this user.");

            // Add to favorite list:
            favoriteService.toggleFavorite(userId,productId);

            assertTrue(userTestProducts.size() > 0,"There are no products associated to this user.");

        } catch (BadRequestException e) {
            e.printStackTrace();
        }
    }

    @Order(2)
    @Test
    public void testGetFavoritesByUserId(){
        try {
            when(userRepository.findById(userTest.getId())).thenReturn(Optional.ofNullable(userTest));

            List<Product> productList = favoriteService.getFavoritesByUserId(userTest.getId());

            assertNotNull(productList,"The value is null.");
            assertTrue(productList.size() > 0,"There are no products associated to this user.");

        } catch (Exception e){
            e.printStackTrace();
        }
    }

}