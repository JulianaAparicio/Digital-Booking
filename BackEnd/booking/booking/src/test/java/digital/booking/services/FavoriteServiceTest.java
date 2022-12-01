package digital.booking.services;

import digital.booking.DTO.FavoriteDTO;
import digital.booking.DTO.ProductDTO;
import digital.booking.entities.*;
import digital.booking.exceptions.BadRequestException;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
public class FavoriteServiceTest {
    @Autowired
    private FavoriteService favoriteService;

    private User userTest;
    private ProductDTO productDTOTest;
    private FavoriteDTO favoriteTest;

    @BeforeEach
    void setUp() {
        Category categoryTest = new Category();
        List<Amenity> amenitiesTest = new ArrayList<>();
        Location locationTest = new Location();
        List<Image> imagesTest = new ArrayList<>();
        List<Item> itemsTest = new ArrayList<>();
        List<Rating> ratingsTest = new ArrayList<>();
        List<Product> productsTest = new ArrayList<>();

        productDTOTest = new ProductDTO(25L, "titleTest", "descriptionTest", categoryTest, amenitiesTest, locationTest, imagesTest, itemsTest, ratingsTest, new ArrayList<>());
        userTest = new User("userNameTest", "userLastNameTest", "userEmailTest", "userPassTest", productsTest);
        userTest.setId(10L);
        favoriteTest = new FavoriteDTO(userTest.getId(), productDTOTest.getId());
    }

    @Test
    void testToggleFavorite() {
        try {

        //GIVEN
        Long userId = userTest.getId();
        Long productId = productDTOTest.getId();

        // WHEN
        favoriteService.toggleFavorite(userId,productId);

        // THEN
        List<Product> userTestProducts = userTest.getProducts();
        assertTrue(userTestProducts.size() > 0,"There are no products associated to this user.");

        } catch (BadRequestException e) {
            e.printStackTrace();
        }
    }

}