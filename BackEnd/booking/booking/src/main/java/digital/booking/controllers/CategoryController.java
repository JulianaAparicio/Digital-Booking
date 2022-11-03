package digital.booking.controllers;

import digital.booking.DTO.CategoryDTO;
import digital.booking.exceptions.BadRequestException;
import digital.booking.exceptions.NotFoundException;
import digital.booking.services.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Operation(summary = "Consultar Todas las categorias")
    @GetMapping
    public ResponseEntity<List<CategoryDTO>> findAllCategories(){
        return ResponseEntity.ok(categoryService.searchAll());
    }

    @Operation(summary = "Consultar Categoria por ID")
    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> findCategoryById(@PathVariable Long id) throws NotFoundException {
        return ResponseEntity.ok(categoryService.searchById((id)));
    }
    @Operation(summary = "Crear nueva categoria")
    @PostMapping
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody CategoryDTO category) throws BadRequestException {
        return ResponseEntity.ok(categoryService.create(category));
    }

    @Operation(summary = "Actualizar categoria por ID")
    @PutMapping("/{id}")
    public ResponseEntity<CategoryDTO> updateCategory(@PathVariable Long id, @RequestBody CategoryDTO category) throws NotFoundException {
        return ResponseEntity.ok(categoryService.update(category, id));
    }

    @Operation(summary = "Eliminar categoria")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) throws NotFoundException {
        categoryService.delete(id);
        return ResponseEntity.ok("Category deleted ID: " + id);
    }

}
