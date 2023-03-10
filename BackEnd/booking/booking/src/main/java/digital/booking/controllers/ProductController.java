package digital.booking.controllers;


import digital.booking.DTO.ProductDTO;
import digital.booking.entities.Booking;
import digital.booking.exceptions.BadRequestException;
import digital.booking.exceptions.NotFoundException;
import digital.booking.services.BookingService;
import digital.booking.services.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @Autowired
    private BookingService bookingService;

    @Operation(summary = "Consultar Todos los productos segun una query")
    @GetMapping
    public ResponseEntity<List<ProductDTO>> findAllProducts(@RequestParam Map<String,String> allParams){
        return ResponseEntity.ok(productService.searchByQuery(allParams));
    }

    @Operation(summary = "Consultar disponibilidad de producto segun id")
    @GetMapping("/availability/{id}")
    public ResponseEntity<List<Booking>> findAvailabilityByProductId(@PathVariable Long id){
        return ResponseEntity.ok(bookingService.getAvailabilityByProductId(id));
    }

    @Operation(summary = "Consultar producto por ID")
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> findProductById(@PathVariable Long id) throws NotFoundException {
        return ResponseEntity.ok(productService.searchById((id)));
    }
    @Operation(summary = "Crear nuevo producto")
    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductDTO product) throws BadRequestException {
        return ResponseEntity.ok(productService.create(product));
    }

    @Operation(summary = "Actualizar producto por ID")
    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(@PathVariable Long id, @RequestBody ProductDTO product) throws NotFoundException {
        return ResponseEntity.ok(productService.update(product, id));
    }

    @Operation(summary = "Eliminar producto")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) throws NotFoundException {
        productService.delete(id);
        return ResponseEntity.ok("Product deleted ID: " + id);
    }

    @Operation(summary = "Lista 6 productos aleatoriamente")
    @GetMapping("/random")
    public ResponseEntity<List<ProductDTO>> findRandomProducts(){
        return ResponseEntity.ok(productService.searchRandom());
    }
}
