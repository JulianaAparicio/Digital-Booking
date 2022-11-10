package digital.booking.services;

import digital.booking.entities.City;
import digital.booking.exceptions.BadRequestException;
import digital.booking.exceptions.NotFoundException;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
class CityServiceTest {

    @Autowired
    private CityService cityService;

    private City cityTest;

    @BeforeEach
    void setUp() {
        // GIVEN:
        cityTest = new City(1L,"cityNameTest","stateTest","countryTest");
    }


    @Order(2)
    @Test
    void testSearchAll() {
        try {
            // WHEN:
            List<City> cityList = cityService.searchAll();

            // THEN:
            assertTrue(cityList.size() > 0,"There are no cities to list.");

        } catch (Exception e){
            e.printStackTrace();
        }
    }

    @Order(3)
    @Test
    void testSearchById() {
        try {
            // WHEN:
            City cityFounded = cityService.searchById(cityTest.getId());

            // THEN:
            assertEquals(cityTest.getId(), cityFounded.getId(), "Ids don't match.");
            assertNotNull(cityFounded,"The city founded is null.");

        } catch (NotFoundException e){
            e.printStackTrace();
        }
    }

    @Order(1)
    @Test
    void testCreate() {
        try{
            // WHEN:
            cityService.create(cityTest);

            // THEN:
            City cityCreated = cityService.searchById(1L);

            // Verifies if city is null:
            assertNotNull(cityCreated,"The city is null");

            // Verifies city's attributes:
            assertEquals(cityTest.getName(), cityCreated.getName(), "Names don't match.");
            assertEquals(cityTest.getState(), cityCreated.getState(), "States don't match.");
            assertEquals(cityTest.getCountry(), cityCreated.getCountry(), "Countries don't match.");

        } catch (BadRequestException | NotFoundException e){
            e.printStackTrace();
        }

    }

    @Order(4)
    @Test
    void testUpdate() {
        try{
            // WHEN:
            cityTest.setName("nameEdited");
            cityTest.setState("stateEdited");
            cityTest.setCountry("countryEdited");

            City cityUpdated = cityService.update(cityTest,1L);

            // THEN:
            assertEquals(cityTest.getName(), cityUpdated.getName(), "Names don't match.");
            assertEquals(cityTest.getState(), cityUpdated.getState(), "States don't match.");
            assertEquals(cityTest.getCountry(), cityUpdated.getCountry(), "Countries don't match.");

        } catch (NotFoundException e){
            e.printStackTrace();
        }
    }

}
