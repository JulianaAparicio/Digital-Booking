package digital.booking.services;

import digital.booking.DTO.CategoryDTO;
import digital.booking.exceptions.BadRequestException;
import digital.booking.exceptions.NotFoundException;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
public class CategoryServiceTest {

    @Autowired
    CategoryService categoryService;

    private CategoryDTO categoryDTO;

    @BeforeEach
    void setUp() {
        // GIVEN:
        categoryDTO = new CategoryDTO(15L,"titleTest","descriptionTest","imageURLTest");
    }

    @Order(2)
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
    }

    @Order(1)
    @Test
    public void testCreate() {
        try{
            // WHEN:
            categoryService.create(categoryDTO);

            // THEN:
            CategoryDTO categoryCreated = categoryService.searchById(15L);

            // Verifies if category is null:
            assertNotNull(categoryCreated,"The category is null");

            // Verifies category's attributes:
            assertEquals(categoryDTO.getTitle(), categoryCreated.getTitle(), "Titles don't match.");
            assertEquals(categoryDTO.getDescription(), categoryCreated.getDescription(), "Descriptions don't match.");
            assertEquals(categoryDTO.getImageURL(), categoryCreated.getImageURL(), "ImageURLs don't match.");

        } catch (BadRequestException | NotFoundException e){
            e.printStackTrace();
        }
    }

    @Order(4)
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
    }

}
