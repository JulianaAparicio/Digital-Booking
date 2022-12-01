package digital.booking.controllers;

import digital.booking.entities.Amenity;
import digital.booking.entities.City;
import digital.booking.exceptions.NotFoundException;
import digital.booking.services.AmenityService;
import digital.booking.services.CityService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/amenities")
public class AmenityController {

    @Autowired
    AmenityService amenityService;

    @Operation(summary = "Consultar Todas las caracteristicas")
    @GetMapping
    public ResponseEntity<List<Amenity>> findAllAmenities(){
        return ResponseEntity.ok(amenityService.searchAll());
    }

}