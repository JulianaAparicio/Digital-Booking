package digital.booking.controllers;

import digital.booking.entities.City;
import digital.booking.exceptions.NotFoundException;
import digital.booking.services.CityService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/cities")
public class CityController {

    @Autowired
    private CityService cityService;

    @Operation(summary = "Consultar Todas las ciudades")
    @GetMapping
    public ResponseEntity<List<City>> findAllCities(){
        return ResponseEntity.ok(cityService.searchAll());
    }

    @Operation(summary = "Consultar ciudad por ID")
    @GetMapping("/{id}")
    public ResponseEntity<City> findCityById(@PathVariable Long id) throws NotFoundException {
        return ResponseEntity.ok(cityService.searchById((id)));
    }
}
