package digital.booking.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import digital.booking.DTO.CategoryDTO;
import digital.booking.entities.Category;
import digital.booking.exceptions.BadRequestException;
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

    @Mock
    private ObjectMapper mapper;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        category = new Category();
        category.setId(1L);
        category.setTitle("titleTest");
        category.setDescription("descriptionTest");
        category.setImageURL("imageURLTest");
    }

    @Order(2)
    @Test
    public void testSearchAll(){

        try {
            lenient().when(categoryRepository.findAll()).thenReturn(Collections.emptyList());

            List<CategoryDTO> categoryList = categoryService.searchAll();

            assertThat(categoryList).isNotNull();
            assertNotNull(categoryList,"The value is null.");

        } catch (Exception e){
            e.printStackTrace();
        }
    }

    /*@Order(2)
    @Test
    public void testSearchAll(){

        try {
            // WHEN:
            List<CategoryDTO> categoriesList = categoryService.searchAll();

            // THEN:
            assertTrue(categoriesList.size() > 0,"There are no categories to list.");

        } catch (Exception e){
            e.printStackTrace();
        }
    }

    @Order(3)
    @Test
    public void testSearchById(){
        try {
            // WHEN:
            CategoryDTO categoryFounded = categoryService.searchById(categoryDTO.getId());

            // THEN:
            assertEquals(categoryDTO.getId(), categoryFounded.getId(), "Ids don't match.");
            assertNotNull(categoryFounded,"The categpry founded is null.");

        } catch (NotFoundException e){
            e.printStackTrace();
        }
    }*/

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

    /*@Order(4)
    @Test
    public void testUpdate() {
        try{
            // WHEN:
            categoryDTO.setTitle("titleEdited");
            categoryDTO.setDescription("descriptionEdited");
            categoryDTO.setImageURL("ImageURLEdited");

            // THEN:
            CategoryDTO categoryUpdated = categoryService.update(categoryDTO,15L);

            assertEquals(categoryDTO.getTitle(), categoryUpdated.getTitle(), "Titles don't match.");
            assertEquals(categoryDTO.getDescription(), categoryUpdated.getDescription(), "Descriptions don't match.");
            assertEquals(categoryDTO.getImageURL(), categoryUpdated.getImageURL(), "ImageURLs don't match.");

        } catch (NotFoundException e){
            e.printStackTrace();
        }
    }*/

}
