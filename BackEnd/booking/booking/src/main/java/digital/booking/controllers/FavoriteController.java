package digital.booking.controllers;

import digital.booking.entities.Product;
import digital.booking.exceptions.BadRequestException;
import digital.booking.services.FavoriteService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @Operation(summary = "Agregar o eliminar favorito")
    @PutMapping
    public ResponseEntity<List<Product>> createFavorite(@RequestBody Map<String, Long> favorite) throws BadRequestException {
        return ResponseEntity.ok(favoriteService.toggleFavorite(favorite.get("userId"), favorite.get("productId")));
    }

    @Operation(summary = "Obtener Favoritos por id Usuario")
    @GetMapping("{id}")
    public ResponseEntity<List<Product>> getFavorites(@PathVariable Long id) throws BadRequestException {
        return ResponseEntity.ok(favoriteService.getFavoritesByUserId(id));
    }

}
