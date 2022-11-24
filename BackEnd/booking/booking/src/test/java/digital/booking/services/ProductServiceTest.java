package digital.booking.services;

import digital.booking.DTO.ProductDTO;
import digital.booking.entities.*;
import digital.booking.exceptions.BadRequestException;
import digital.booking.exceptions.NotFoundException;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
public class ProductServiceTest {

    @Autowired
    private ProductService productService;

    private ProductDTO productDTOTest;

    @BeforeEach
    void setUp() {
        // GIVEN:

        // ProductDTOTest initial attributes:
        Category categoryTest = new Category();
        List<Amenity> amenitiesTest = new ArrayList<>();
        Location locationTest = new Location();
        locationTest.setCity(new City(1L, "Medellin", "Antioquia", "Colombia"));
        List<Image> imagesTest = new ArrayList<>();
        List<Item> itemsTest = new ArrayList<>();
        List<Rating> ratingsTest = new ArrayList<>();

        productDTOTest = new ProductDTO(30L, "titleTest", "descriptionTest", categoryTest, amenitiesTest, locationTest, imagesTest, itemsTest, ratingsTest, new ArrayList<>());
    }

    @Order(2)
    @Test
    void testSearchAll() {
        try {
            List<ProductDTO> productDTOListList = productService.searchAll();
            assertTrue(productDTOListList.size() > 0,"There are no products to list.");

        } catch (Exception e){
            e.printStackTrace();
        }
    }

    @Order(3)
    @Test
    void testSearchById() {
        try {
            // WHEN:
            ProductDTO productDTOFounded = productService.searchById(productDTOTest.getId());

            // THEN:
            assertEquals(productDTOTest.getId(), productDTOFounded.getId(), "Ids don't match.");
            assertNotNull(productDTOFounded,"The product founded is null.");

        } catch (NotFoundException e){
            e.printStackTrace();
        }
    }

    @Order(1)
    @Test
    void testCreate() {
        /*try{
            // WHEN:
            productService.create(productDTOTest);

            // THEN:
            ProductDTO productDTOCreated = productService.searchById(30L);

            // Verifies if product is null:
            assertNotNull(productDTOCreated,"The product is null");

            // Verifies product's attributes:
            assertEquals(productDTOTest.getTitle(), productDTOCreated.getTitle(), "Titles don't match.");
            assertEquals(productDTOTest.getDescription(), productDTOCreated.getDescription(), "Descriptions don't match.");
            assertEquals(productDTOTest.getCategory(), productDTOCreated.getCategory(), "Categories don't match.");
            assertEquals(productDTOTest.getImages(), productDTOCreated.getImages(), "Images don't match.");
            assertEquals(productDTOTest.getAmenities(), productDTOCreated.getAmenities(), "Amenities don't match.");
            assertEquals(productDTOTest.getLocation(), productDTOCreated.getLocation(), "Locations don't match.");
            assertEquals(productDTOTest.getItems(), productDTOCreated.getItems(), "Items don't match.");
            assertEquals(productDTOTest.getRatings(), productDTOCreated.getRatings(), "Ratings don't match.");

        } catch (BadRequestException | NotFoundException e){
            e.printStackTrace();
        }*/

    }

    @Order(4)
    @Test
    void testUpdate() {
        try{
            // GIVEN: modifies 2 attributes
            productDTOTest.setTitle("titleEdited");
            productDTOTest.setDescription("descriptionEdited");

            // WHEN:
            ProductDTO productDTOUpdated = productService.update(productDTOTest,30L);

            // THEN:
            assertEquals(productDTOTest.getTitle(), productDTOUpdated.getTitle(), "Titles don't match.");
            assertEquals(productDTOTest.getDescription(), productDTOUpdated.getDescription(), "Descriptions don't match.");

        } catch (NotFoundException e){
            e.printStackTrace();
        }
    }
}
