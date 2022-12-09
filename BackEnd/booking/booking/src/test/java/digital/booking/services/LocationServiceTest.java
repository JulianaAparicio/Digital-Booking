package digital.booking.services;

import digital.booking.entities.City;
import digital.booking.entities.Location;
import digital.booking.exceptions.BadRequestException;
import digital.booking.repositories.CityRepository;
import digital.booking.repositories.LocationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
class LocationServiceTest {

    @Mock
    private LocationRepository locationRepository;

    @Mock
    private CityRepository cityRepository;

    @InjectMocks
    private LocationService locationService;

    @Mock
    private City cityTest;

    private Location locationTest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        cityTest = new City(1L,"cityNameTest","stateTest","countryTest");
        cityRepository.save(cityTest);

        locationTest = new Location(1L,cityTest,"addressTest","latitudeTest","longitudeTest");
        locationRepository.save(locationTest);
    }

    @Test
    void create() {
        try{
            when(locationRepository.save(any(Location.class))).thenReturn(locationTest);

            Location location = new Location();
            location.setId(1L);
            location.setCity(cityTest);
            location.setAddress("addressTest");
            location.setLatitude("latitudeTest");
            location.setLongitude("longitudeTest");

            Location locationCreated = locationService.create(location);

            // Verifies if location is null:
            assertNotNull(locationCreated,"The image is null");

            // Verifies location's attributes:
            assertEquals(locationTest.getCity(), locationCreated.getCity(), "Cities don't match.");
            assertEquals(locationTest.getAddress(), locationCreated.getAddress(), "Address don't match.");
            assertEquals(locationTest.getLatitude(), locationCreated.getLatitude(), "Latitudes don't match.");
            assertEquals(locationTest.getLongitude(), locationCreated.getLongitude(), "Longitudes don't match.");

        } catch (BadRequestException e){
            e.printStackTrace();
        }
    }
}