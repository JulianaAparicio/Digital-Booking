package digital.booking.controllers;

import digital.booking.entities.Category;
import digital.booking.exceptions.BadRequestException;
import digital.booking.exceptions.NotFoundException;
import digital.booking.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> findAllCategories(){
        return ResponseEntity.ok(categoryService.searchAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> findCategoryById(@PathVariable Long id) throws NotFoundException {
        return ResponseEntity.ok(categoryService.searchById((id)));
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category) throws BadRequestException {
        return ResponseEntity.ok(categoryService.create(category));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category category) throws NotFoundException {
        return ResponseEntity.ok(categoryService.update(category, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) throws NotFoundException {
        categoryService.delete(id);
        return ResponseEntity.ok("Category deleted ID: " + id);
    }

}
