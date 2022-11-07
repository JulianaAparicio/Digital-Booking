package digital.booking.controllers;

import digital.booking.entities.Favorite;
import digital.booking.exceptions.BadRequestException;
import digital.booking.exceptions.NotFoundException;
import digital.booking.services.FavoriteService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/favorites")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @Operation(summary = "Agregar nuevo favorito")
    @PostMapping
    public ResponseEntity<Favorite> createFavorite(@RequestBody Favorite favorite) throws BadRequestException {
        return ResponseEntity.ok(favoriteService.create(favorite));
    }

    @Operation(summary = "Eliminar favorito")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFavorite(@PathVariable Long id) throws NotFoundException {
        favoriteService.delete(id);
        return ResponseEntity.ok("Favorite deleted ID: " + id);
    }
}
