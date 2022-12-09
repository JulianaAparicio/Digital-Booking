package digital.booking.services;

import digital.booking.entities.Amenity;
import digital.booking.repositories.AmenityRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
class AmenityServiceTest {

    @Mock
    AmenityRepository amenityRepository;

    @InjectMocks
    AmenityService amenityService;

    @Mock
    private Amenity amenityTest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        amenityTest = new Amenity(1L,"AmenityNameTest");
    }

    @Test
    void searchAll() {
        when(amenityRepository.findAll()).thenReturn(Collections.emptyList());

        List<Amenity> amenityList = amenityService.searchAll();

        assertNotNull(amenityList,"The value is null.");
    }
}