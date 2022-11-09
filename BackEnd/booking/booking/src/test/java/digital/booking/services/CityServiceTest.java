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
        cityTest = new City(1L,"cityNameTest","stateTest","countryTest");
    }


    @Order(2)
    @Test
    void testSearchAll() {
        try {
            List<City> cityList = cityService.searchAll();
            assertTrue(cityList.size() > 0,"There are no cities to list.");

        } catch (Exception e){
            e.printStackTrace();
        }
    }

    @Order(3)
    @Test
    void testSearchById() {
        try {
            City cityFounded = cityService.searchById(cityTest.getId());
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
            cityService.create(cityTest);

            City cityCreated = cityService.searchById(1L);

            assertNotNull(cityCreated,"The city is null");
            assertEquals(cityTest.getName(), cityCreated.getName(), "Titles don't match.");
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
            cityTest.setName("nameEdited");
            cityTest.setState("stateEdited");
            cityTest.setCountry("countryEdited");

            City cityUpdated = cityService.update(cityTest,1L);

            assertEquals(cityTest.getName(), cityUpdated.getName(), "Names don't match.");
            assertEquals(cityTest.getState(), cityUpdated.getState(), "States don't match.");
            assertEquals(cityTest.getCountry(), cityUpdated.getCountry(), "Countries don't match.");

        } catch (NotFoundException e){
            e.printStackTrace();
        }
    }

    @Order(5)
    @Test
    void testDelete() {
        try {
            cityService.delete(cityTest.getId());
            assertNull(cityService.searchById(cityTest.getId()));
        } catch (NotFoundException e){
            e.printStackTrace();
        }
    }
}
