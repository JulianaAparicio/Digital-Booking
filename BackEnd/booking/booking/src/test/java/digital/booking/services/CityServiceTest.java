package digital.booking.services;

import digital.booking.entities.City;
import digital.booking.exceptions.BadRequestException;
import digital.booking.exceptions.NotFoundException;
import digital.booking.repositories.CityRepository;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
class CityServiceTest {

    @Mock
    private CityRepository cityRepository;

    @InjectMocks
    private CityService cityService;

    @Mock
    ProductService productService;

    private City cityTest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        cityTest = new City(1L,"cityNameTest","stateTest","countryTest");
    }


    @Order(2)
    @Test
    void testSearchAll() {
        try {
            when(cityRepository.findAll()).thenReturn(Collections.emptyList());

            List<City> cityList = cityService.searchAll();

            assertNotNull(cityList,"The value is null.");

        } catch (Exception e){
            e.printStackTrace();
        }
    }

    @Order(3)
    @Test
    void testSearchById() {
        try {
            lenient().when(cityRepository.findById(1L)).thenReturn(Optional.of(cityTest));
            City cityFounded = cityService.searchById(cityTest.getId());

            assertThat(cityFounded).isNotNull();

        } catch (NotFoundException e){
            e.printStackTrace();
        }
    }

    @Order(1)
    @Test
    void testCreate() {
        try{
            when(cityRepository.save(any(City.class))).thenReturn(cityTest);

            City city = new City();
            city.setId(1L);
            city.setName("cityNameTest");
            city.setState("stateTest");
            city.setCountry("countryTest");

            City cityCreated = cityService.create(city);

            // Verifies if city is null:
            assertNotNull(cityCreated,"The city is null");

            // Verifies city's attributes:
            assertEquals(cityTest.getName(), cityCreated.getName(), "Names don't match.");
            assertEquals(cityTest.getState(), cityCreated.getState(), "States don't match.");
            assertEquals(cityTest.getCountry(), cityCreated.getCountry(), "Countries don't match.");

        } catch (BadRequestException e){
            e.printStackTrace();
        }

    }

    @Order(4)
    @Test
    void testUpdate() {
        try {
            City city = new City();
            city.setId(1L);
            city.setName("nameEdited");
            city.setState("stateEdited");
            city.setCountry("countryEdited");

            lenient().when(cityRepository.findById(1L)).thenReturn(Optional.ofNullable(cityTest));
            lenient().when(cityRepository.save(cityTest)).thenReturn(cityTest);

            City cityUpdated = cityService.update(city, 1L);

            assertNotNull(cityUpdated, "The city updated is null.");

            assertEquals("nameEdited", cityUpdated.getName(), "Names don't match.");
            assertEquals("stateEdited", cityUpdated.getState(), "States don't match.");
            assertEquals("countryEdited", cityUpdated.getCountry(), "Countries don't match.");

        } catch (NotFoundException e) {
            e.printStackTrace();
        }
    }

    @Order(5)
    @Test
    public void testDelete() {
        try{
            lenient().when(cityRepository.findById(1L)).thenReturn(Optional.of(cityTest));
            cityService.delete(1L);
            verify(cityRepository).findById(1L);

        } catch (NotFoundException e){
            e.printStackTrace();
        }
    }

}
