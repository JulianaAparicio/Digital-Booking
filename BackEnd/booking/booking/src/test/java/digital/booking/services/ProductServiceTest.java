package digital.booking.services;

import digital.booking.DTO.ProductDTO;
import digital.booking.DTO.RatingDTO;
import digital.booking.entities.*;
import digital.booking.exceptions.BadRequestException;
import digital.booking.exceptions.NotFoundException;
import digital.booking.repositories.CategoryRepository;
import digital.booking.repositories.CityRepository;
import digital.booking.repositories.ProductRepository;
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
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.verify;

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

    @Autowired
    @InjectMocks
    ProductService productService;

    @Mock
    private Product productTest;
    @Mock
    private ProductDTO productDTOTest;

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

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        categoryTest = new Category(1L,"titleTest","descriptionTest","imageURLTest");
        categoryRepository.save(categoryTest);
        cityTest = new City(1L,"cityNameTest","stateTest","countryTest");
        cityRepository.save(cityTest);
        locationTest = new Location(1L,cityTest,"addressTest","latitudeTest","longitudeTest");
        ratingTest = new ArrayList<>();
        ratingDTOTest = new ArrayList<>();

        productTest = new Product(1L, "titleTest", "descriptionTest",categoryTest,locationTest, ratingTest);
        productDTOTest = new ProductDTO(1L,"titleTest", "descriptionTest", categoryTest, new ArrayList<>(), locationTest, new ArrayList<>(), new ArrayList<>(), ratingDTOTest, new ArrayList<>());

    }

    @Order(2)
    @Test
    void testSearchAll() {
        try {
            lenient().when(productRepository.findAll()).thenReturn(Collections.emptyList());

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
            lenient().when(productRepository.findById(productTest.getId())).thenReturn(Optional.ofNullable(productTest));
            ProductDTO productFounded = productService.searchById(productTest.getId());

            assertThat(productFounded).isNotNull();

        } catch (NotFoundException e){
            e.printStackTrace();
        }
    }

    @Order(1)
    @Test
    void testCreate() {
        try{
            lenient().when(productRepository.save(any(Product.class))).thenReturn(productTest);

            ProductDTO productCreated = productService.create(productDTOTest);

            // Verifies if product is null:
            assertNotNull(productCreated,"The product is null");

            // Verifies product's attributes:
            assertEquals(productTest.getTitle(), productCreated.getTitle(), "Titles don't match.");
            assertEquals(productTest.getDescription(), productCreated.getDescription(), "Descriptions don't match.");

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

            lenient().when(productRepository.findById(1L)).thenReturn(Optional.ofNullable(productTest));
            lenient().when(productRepository.save(productTest)).thenReturn(productTest);

            ProductDTO productUpdated = productService.update(productDTOTest, productTest.getId());

            assertNotNull(productUpdated,"The product updated is null.");

            assertEquals("titleEdited", productUpdated.getTitle(), "Titles don't match.");
            assertEquals("descriptionEdited", productUpdated.getDescription(), "Descriptions don't match.");

        } catch (NotFoundException e){
            e.printStackTrace();
        }
    }

    @Order(5)
    @Test
    public void testDelete() {
        try{
            lenient().when(productRepository.findById(1L)).thenReturn(Optional.of(productTest));
            productService.delete(1L);
            verify(productRepository).findById(1L);

        } catch (NotFoundException e){
            e.printStackTrace();
        }
    }

}
