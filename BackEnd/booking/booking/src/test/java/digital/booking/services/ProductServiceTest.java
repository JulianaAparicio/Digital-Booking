package digital.booking.services;

import digital.booking.DTO.ProductDTO;
import digital.booking.entities.*;
import digital.booking.exceptions.BadRequestException;
import digital.booking.exceptions.NotFoundException;
import digital.booking.repositories.ProductRepository;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;

@ExtendWith(MockitoExtension.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
public class ProductServiceTest {

    @Mock
    ProductRepository productRepository;

    @Autowired
    ProductService productService;

    @Mock
    private Product productTest;

    @Mock
    private Category categoryTest;

    @Mock
    private Location locationTest;

    @Mock
    private City cityTest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        categoryTest = new Category(1L,"titleTest","descriptionTest","imageURLTest");
        cityTest = new City(1L,"cityNameTest","stateTest","countryTest");
        locationTest = new Location(1L,cityTest,"adressTest","latitudeTest","longitudeTest");

        productTest = new Product(1L, "titleTest", "descriptionTest",categoryTest,locationTest);
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
            lenient().when(productRepository.findById(1L)).thenReturn(Optional.of(productTest));
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

            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(1L);
            productDTO.setTitle("titleTest");
            productDTO.setDescription("descriptionTest");
            productDTO.setCategory(categoryTest);
            //productDTO.setLocation(locationTest);

            ProductDTO productCreated = productService.create(productDTO);

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
            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(1L);
            productDTO.setTitle("titleEdited");
            productDTO.setDescription("descriptionEdited");

            lenient().when(productRepository.findById(1L)).thenReturn(Optional.ofNullable(productTest));
            lenient().when(productRepository.save(productTest)).thenReturn(productTest);

            ProductDTO productUpdated = productService.update(productDTO,1L);

            assertNotNull(productUpdated,"The product updated is null.");

            assertEquals("titleEdited", productUpdated.getTitle(), "Titles don't match.");
            assertEquals("descriptionEdited", productUpdated.getDescription(), "Descriptions don't match.");

        } catch (NotFoundException e){
            e.printStackTrace();
        }
    }
}
