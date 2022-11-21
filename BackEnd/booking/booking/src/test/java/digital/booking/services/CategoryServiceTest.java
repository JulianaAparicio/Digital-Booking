package digital.booking.services;

import digital.booking.DTO.CategoryDTO;
import digital.booking.entities.Category;
import digital.booking.exceptions.BadRequestException;
import digital.booking.exceptions.NotFoundException;
import digital.booking.repositories.CategoryRepository;
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
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;

@ExtendWith(MockitoExtension.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
public class CategoryServiceTest {

    @Mock
    CategoryRepository categoryRepository;
    @Autowired
    CategoryService categoryService;

    private Category category;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        category = new Category(1L,"titleTest","descriptionTest","imageURLTest");
    }

    @Order(2)
    @Test
    public void testSearchAll(){
        try {
            lenient().when(categoryRepository.findAll()).thenReturn(Collections.emptyList());

            List<CategoryDTO> categoryList = categoryService.searchAll();

            assertNotNull(categoryList,"The value is null.");

        } catch (Exception e){
            e.printStackTrace();
        }
    }

    @Order(3)
    @Test
    public void testSearchById(){
        try {
            lenient().when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
            CategoryDTO categoryFounded = categoryService.searchById(category.getId());

            assertThat(categoryFounded).isNotNull();

        } catch (NotFoundException e){
            e.printStackTrace();
        }
    }

    @Order(1)
    @Test
    public void testCreate() {
        try{
            lenient().when(categoryRepository.save(any(Category.class))).thenReturn(category);

            CategoryDTO categoryDTO = new CategoryDTO();
            categoryDTO.setId(1L);
            categoryDTO.setTitle("titleTest");
            categoryDTO.setDescription("descriptionTest");
            categoryDTO.setImageURL("imageURLTest");

            CategoryDTO categoryCreated = categoryService.create(categoryDTO);

            // Verifies if category is null:
            assertNotNull(categoryCreated,"The category is null");

            // Verifies category's attributes:
            assertEquals(category.getTitle(), categoryCreated.getTitle(), "Titles don't match.");
            assertEquals(category.getDescription(), categoryCreated.getDescription(), "Descriptions don't match.");
            assertEquals(category.getImageURL(), categoryCreated.getImageURL(), "ImageURLs don't match.");

        } catch (BadRequestException e){
            e.printStackTrace();
        }
    }

    @Order(4)
    @Test
    public void testUpdate() {
        try{
            //lenient().when(categoryRepository.save(any())).thenReturn(category);

            CategoryDTO categoryDTO = new CategoryDTO();
            categoryDTO.setId(1L);
            categoryDTO.setTitle("titleEdited");
            categoryDTO.setDescription("descriptionEdited");
            categoryDTO.setImageURL("ImageURLEdited");

            lenient().when(categoryRepository.findById(1L)).thenReturn(Optional.ofNullable(category));
            lenient().when(categoryRepository.save(category)).thenReturn(category);

            CategoryDTO categoryUpdated = categoryService.update(categoryDTO,1L);

            assertNotNull(categoryUpdated,"The category updated is null.");

            assertEquals("titleEdited", categoryUpdated.getTitle(), "Titles don't match.");
            assertEquals("descriptionEdited", categoryUpdated.getDescription(), "Descriptions don't match.");
            assertEquals("ImageURLEdited", categoryUpdated.getImageURL(), "ImageURLs don't match.");

        } catch (NotFoundException e){
            e.printStackTrace();
        }
    }


}
