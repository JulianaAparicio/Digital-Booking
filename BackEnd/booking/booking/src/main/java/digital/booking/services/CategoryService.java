package digital.booking.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import digital.booking.DTO.CategoryDTO;
import digital.booking.entities.Category;
import digital.booking.exceptions.BadRequestException;
import digital.booking.exceptions.NotFoundException;
import digital.booking.interfaces.IService;
import digital.booking.repositories.CategoryRepository;
import org.apache.log4j.Logger;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService implements IService<CategoryDTO> {
    private final Logger logger = Logger.getLogger(CategoryService.class);
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ObjectMapper mapper;


    @Override
    public List<CategoryDTO> searchAll() {
        List<Category> categories = categoryRepository.findAll();
        logger.debug("Searching all categories...");

        List<CategoryDTO> categoriesDTO = new ArrayList<>();
        for (Category category : categories){
            categoriesDTO.add(mapper.convertValue(category,CategoryDTO.class));
        }

        logger.info("Listing all categories...");
        return categoriesDTO;
    }

    @Override
    public CategoryDTO searchById(Long id) throws NotFoundException {
        logger.debug("Searching category with id: " + id);
        Category categoryFounded = categoryRepository.findById(id).orElseThrow(() -> new NotFoundException("The " +
                "category with the id: " + id + " was not found."));
        return mapper.convertValue(categoryFounded, CategoryDTO.class);
    }

    @Override
    public CategoryDTO create(CategoryDTO category) throws BadRequestException {
        if (category.getTitle()==null || category.getDescription()==null || category.getImageURL()==null){
            logger.error("The data entered has null values.");
            throw new BadRequestException("The category has null values.");
        } else{
            logger.debug("Creating new category...");
            Category categoryCreated = mapper.convertValue(category, Category.class);
            logger.info("The category was created successfully.");
            return mapper.convertValue(categoryRepository.save(categoryCreated), CategoryDTO.class);
        }
    }

    @Override
    public CategoryDTO update(CategoryDTO category, Long id) throws NotFoundException {
        Category existingCategory = categoryRepository.findById(category.getId())
                .orElseThrow(() -> new NotFoundException("The category with id " + category.getId() +
                        "was not found."));

        logger.debug("Updating category...");
        existingCategory.setTitle(category.getTitle());
        existingCategory.setDescription(category.getDescription());
        existingCategory.setImageURL(category.getImageURL());

        categoryRepository.save(existingCategory);
        logger.info("The category was updated successfully.");
        return mapper.convertValue(existingCategory, CategoryDTO.class);
    }

    @Override
    public void delete(Long id) throws NotFoundException {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new NotFoundException("The " +
                "category with the id: " + id + " was not found."));
        logger.debug("Deleting category...");
        categoryRepository.delete(category);
    }
}

