package digital.booking.services;

import digital.booking.entities.Image;
import digital.booking.entities.Product;
import digital.booking.exceptions.BadRequestException;
import digital.booking.repositories.ImageRepository;
import digital.booking.repositories.ProductRepository;
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
class ImageServiceTest {

    @Mock
    private ImageRepository imageRepository;

    @InjectMocks
    private ImageService imageService;

    @Mock
    ProductRepository productRepository;

    @Mock
    private Product productTest;

    private Image imageTest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        productTest = new Product();
        productTest.setId(1L);
        productRepository.save(productTest);
        imageTest = new Image(1L,"imageTitleTest","imageURLTest",productTest);
        imageRepository.save(imageTest);
    }

    @Test
    void create() {
        try{
            when(imageRepository.save(any(Image.class))).thenReturn(imageTest);

            Image image = new Image();
            image.setId(1L);
            image.setTitle("imageTitleTest");
            image.setURL("imageURLTest");
            image.setProduct(productTest);

            Image imageCreated = imageService.create(image);

            // Verifies if image is null:
            assertNotNull(imageCreated,"The image is null");

            // Verifies image's attributes:
            assertEquals(imageTest.getTitle(), imageCreated.getTitle(), "Titles don't match.");
            assertEquals(imageTest.getURL(), imageCreated.getURL(), "URLs don't match.");
            assertEquals(imageTest.getProduct(), imageCreated.getProduct(), "Products don't match.");

        } catch (BadRequestException e){
            e.printStackTrace();
        }
    }
}