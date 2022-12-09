package digital.booking.services;

import digital.booking.DTO.ProductDTO;
import digital.booking.DTO.RatingDTO;
import digital.booking.entities.*;
import digital.booking.exceptions.BadRequestException;
import digital.booking.exceptions.NotFoundException;
import digital.booking.repositories.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
public class ProductServiceTest {

    @Mock
    ProductRepository productRepository;

    @Mock
    CategoryRepository categoryRepository;

    @Mock
    CityRepository cityRepository;

    @Mock
    LocationRepository locationRepository;

    @Autowired
    @InjectMocks
    ProductService productService;

    @Mock
    private Category categoryTest;

    @Mock
    private Location locationTest;

    @Mock
    private List<RatingDTO> ratingDTOTest;

    @Mock
    private List<Rating> ratingTest;

    @Mock
    private City cityTest;

    private Product productTest1;
    private ProductDTO productDTOTest;

    private List<Product> productListTest = new ArrayList<>();


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        categoryTest = new Category(1L,"titleTest","descriptionTest","imageURLTest");
        categoryRepository.save(categoryTest);

        cityTest = new City(1L,"cityNameTest","stateTest","countryTest");
        cityRepository.save(cityTest);

        locationTest = new Location(1L,cityTest,"addressTest","latitudeTest","longitudeTest");
        locationRepository.save(locationTest);

        ratingTest = new ArrayList<>();
        ratingDTOTest = new ArrayList<>();

        productTest1 = new Product(1L, "titleTest", "descriptionTest",categoryTest,locationTest, ratingTest);
        productRepository.save(productTest1);

        Product productTest2 = new Product(2L, "titleTest2", "descriptionTest2", categoryTest, locationTest, ratingTest);
        productRepository.save(productTest2);

        Product productTest3 = new Product(3L, "titleTest3", "descriptionTest3", categoryTest, locationTest, ratingTest);
        productRepository.save(productTest3);

        Product productTest4 = new Product(4L, "titleTest4", "descriptionTest4", categoryTest, locationTest, ratingTest);
        productRepository.save(productTest4);

        Product productTest5 = new Product(5L, "titleTest5", "descriptionTest5", categoryTest, locationTest, ratingTest);
        productRepository.save(productTest5);

        Product productTest6 = new Product(6L, "titleTest6", "descriptionTest6", categoryTest, locationTest, ratingTest);
        productRepository.save(productTest6);

        Product productTest7 = new Product(7L, "titleTest7", "descriptionTest7", categoryTest, locationTest, ratingTest);
        productRepository.save(productTest7);

        productDTOTest = new ProductDTO(1L,"titleTest", "descriptionTest", categoryTest, new ArrayList<>(), locationTest, new ArrayList<>(), new ArrayList<>(), ratingDTOTest, new ArrayList<>());

        productListTest = new ArrayList<>();
        productListTest.add(productTest1);
        productListTest.add(productTest2);
        productListTest.add(productTest3);
        productListTest.add(productTest4);
        productListTest.add(productTest5);
        productListTest.add(productTest6);
        productListTest.add(productTest7);


    }

    @Order(2)
    @Test
    void testSearchAll() {
        try {
            when(productRepository.findAll()).thenReturn(Collections.emptyList());

            List<ProductDTO> productList = productService.searchAll();

            assertNotNull(productList,"The value is null.");

        } catch (Exception e){
            e.printStackTrace();
        }
    }

    @Order(3)
    @Test
    void testSearchById() {
        try {
            when(productRepository.findById(productTest1.getId())).thenReturn(Optional.ofNullable(productTest1));
            ProductDTO productFounded = productService.searchById(productTest1.getId());

            assertThat(productFounded).isNotNull();

        } catch (NotFoundException e){
            e.printStackTrace();
        }
    }

    @Order(1)
    @Test
    void testCreate() {
        try{
            when(productRepository.save(any(Product.class))).thenReturn(productTest1);

            ProductDTO productCreated = productService.create(productDTOTest);

            // Verifies if product is null:
            assertNotNull(productCreated,"The product is null");

            // Verifies product's attributes:
            assertEquals(productTest1.getTitle(), productCreated.getTitle(), "Titles don't match.");
            assertEquals(productTest1.getDescription(), productCreated.getDescription(), "Descriptions don't match.");

        } catch (BadRequestException e){
            e.printStackTrace();
        }
    }

    @Order(4)
    @Test
    void testUpdate() {
        try{
            productDTOTest.setTitle("titleEdited");
            productDTOTest.setDescription("descriptionEdited");

            when(productRepository.findById(1L)).thenReturn(Optional.ofNullable(productTest1));
            when(productRepository.save(productTest1)).thenReturn(productTest1);

            ProductDTO productUpdated = productService.update(productDTOTest, productTest1.getId());

            assertNotNull(productUpdated,"The product updated is null.");

            assertEquals("titleEdited", productUpdated.getTitle(), "Titles don't match.");
            assertEquals("descriptionEdited", productUpdated.getDescription(), "Descriptions don't match.");

        } catch (NotFoundException e){
            e.printStackTrace();
        }
    }

    @Order(5)
    @Test
    public void testSearchRandom(){
        when(productRepository.findAll()).thenReturn(productListTest);

        List<ProductDTO> randomProductsList = productService.searchRandom();

        assertNotNull(randomProductsList,"The 6 random product list is null");
        assertEquals(6, randomProductsList.size());

    }

    @Order(6)
    @Test
    public void testSearchByQuery(){
    }

    @Order(7)
    @Test
    public void testDelete() {
        try{
            when(productRepository.findById(1L)).thenReturn(Optional.of(productTest1));
            productService.delete(1L);
            verify(productRepository).findById(1L);

        } catch (NotFoundException e){
            e.printStackTrace();
        }
    }

}
