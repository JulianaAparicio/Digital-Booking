package digital.booking.services;

import digital.booking.DTO.Favorite;
import digital.booking.DTO.ProductDTO;
import digital.booking.entities.*;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
public class FavoriteServiceTest {
    @Autowired
    private FavoriteService favoriteService;

    private User userTest;
    private ProductDTO productDTOTest;
    private Favorite favoriteTest;

    @BeforeEach
    void setUp() {
        Category categoryTest = new Category();
        List<Amenity> amenitiesTest = new ArrayList<>();
        Location locationTest = new Location();
        List<Image> imagesTest = new ArrayList<>();
        List<Item> itemsTest = new ArrayList<>();
        List<Rating> ratingsTest = new ArrayList<>();
        List<Product> productsTest = new ArrayList<>();

        productDTOTest = new ProductDTO(1L, "titleTest", "descriptionTest", categoryTest, amenitiesTest, locationTest, imagesTest, itemsTest, ratingsTest);
        userTest = new User(1L, "userNameTest", "userLastNameTest", "userEmailTest", "userPassTest", productsTest);
        favoriteTest = new Favorite(userTest.getId(), productDTOTest.getId());
    }

    @Test
    void testToggleFavorite() {
        /*try {
        } catch (BadRequestException e) {
            e.printStackTrace();
        }*/
    }

}