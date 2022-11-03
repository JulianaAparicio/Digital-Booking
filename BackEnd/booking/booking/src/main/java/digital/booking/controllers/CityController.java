package digital.booking.controllers;

import digital.booking.entities.City;
import digital.booking.services.CityService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
