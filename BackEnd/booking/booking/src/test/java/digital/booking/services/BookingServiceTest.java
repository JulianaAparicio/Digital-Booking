package digital.booking.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import digital.booking.DTO.BookingDTO;
import digital.booking.DTO.ProductDTO;
import digital.booking.DTO.UserDTO;
import digital.booking.entities.*;
import digital.booking.exceptions.BadRequestException;
import digital.booking.exceptions.NotFoundException;
import digital.booking.repositories.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static digital.booking.entities.UserRoleEnum.USER;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
class BookingServiceTest {

    @Mock
    BookingRepository bookingRepository;

    @Mock
    ProductRepository productRepository;

    @Mock
    CategoryRepository categoryRepository;

    @Mock
    CityRepository cityRepository;

    @Mock
    UserRepository userRepository;

    @Mock
    RoleRepository roleRepository;

    @Autowired
    @InjectMocks
    BookingService bookingService;

    @Autowired
    private ObjectMapper mapper;

    @Mock
    private Booking bookingTest;

    @Mock
    private Category categoryTest;

    @Mock
    private Location locationTest;

    @Mock
    private City cityTest;

    @Mock
    private ProductDTO productTest;

    @Mock
    private User userTest;

    @Mock
    private Role roleTest;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        categoryTest = new Category(1L,"titleTest","descriptionTest","imageURLTest");
        categoryRepository.save(categoryTest);

        cityTest = new City(1L,"cityNameTest","stateTest","countryTest");
        cityRepository.save(cityTest);

        locationTest = new Location(1L,cityTest,"addressTest","latitudeTest",
                "longitudeTest");

        productTest = new ProductDTO(1L, "titleTest", "descriptionTest",categoryTest,
                locationTest);
        Product productTestConverted = mapper.convertValue(productTest,Product.class);
        productRepository.save(productTestConverted);

        roleTest = new Role(1L,USER);
        roleRepository.save(roleTest);

        userTest = new User(1L,"nameTest","lastNameTest", "emailTest",
                "passwordTest",true,roleTest);
        userRepository.save(userTest);

        bookingTest = new Booking(1L, "hh:mm", LocalDate.now(),LocalDate.now(),
                productTestConverted,userTest);
    }

    @Order(2)
    @Test
    void searchAll() {
        try {
            lenient().when(bookingRepository.findAll()).thenReturn(Collections.emptyList());

            List<BookingDTO> bookingList = bookingService.searchAll();

            assertNotNull(bookingList,"The value is null.");

        } catch (Exception e){
            e.printStackTrace();
        }
    }

    @Order(3)
    @Test
    void searchById() {
        try {
            lenient().when(bookingRepository.findById(1L)).thenReturn(Optional.of(bookingTest));
            BookingDTO bookingFounded = bookingService.searchById(bookingTest.getId());

            assertThat(bookingFounded).isNotNull();

        } catch (NotFoundException e){
            e.printStackTrace();
        }
    }

    @Order(1)
    @Test
    void create() {
        try{
            lenient().when(bookingRepository.save(any(Booking.class))).thenReturn(bookingTest);

            BookingDTO bookingDTO = new BookingDTO();
            bookingDTO.setId(1L);
            bookingDTO.setStartTime("hh:mm");
            bookingDTO.setInitial_date(LocalDate.now());
            bookingDTO.setFinal_date(LocalDate.now());
            bookingDTO.setProduct(productTest);
            bookingDTO.setUser(mapper.convertValue(userTest,UserDTO.class));

            BookingDTO bookingCreated = bookingService.create(bookingDTO);

            // Verifies if product is null:
            assertNotNull(bookingCreated,"The booking is null");

            // Verifies product's attributes:
            assertEquals(bookingTest.getStartTime(), bookingCreated.getStartTime(), "Start times don't match.");
            assertEquals(bookingTest.getInitial_date(), bookingCreated.getInitial_date(), "Initial dates don't match.");
            assertEquals(bookingTest.getFinal_date(), bookingCreated.getFinal_date(), "Final dates don't match.");
            assertEquals(bookingTest.getProduct(), bookingTest.getProduct(), "Products don't match.");

        } catch (BadRequestException e){
            e.printStackTrace();
        }
    }

    /*@Order(4)
    @Test
    void update() {
        try{
            BookingReqDTO bookingReqDTO = new BookingReqDTO();
            bookingReqDTO.setId(1L);
            bookingReqDTO.setStartTime("startTimeTestEdited");
            bookingReqDTO.setInitialDate("06/15/2020");
            bookingReqDTO.setFinalDate("06/30/2020");
            bookingReqDTO.setUserId(userTest.getId().toString());
            bookingReqDTO.setProductId(productTest.getId().toString());

            lenient().when(bookingRepository.findById(1L)).thenReturn(Optional.ofNullable(bookingTest));
            lenient().when(bookingRepository.save(bookingTest)).thenReturn(bookingTest);

            BookingDTO bookingUpdated = bookingService.updateBooking(bookingReqDTO,1L);

            assertNotNull(bookingUpdated,"The booking updated is null.");

            assertEquals("startTimeTestEdited", bookingUpdated.getStartTime(),
                    "Start times don't match.");

        } catch (NotFoundException e){
            e.printStackTrace();
        }
    }*/

    @Order(5)
    @Test
    void delete() {
        try{
            lenient().when(bookingRepository.findById(1L)).thenReturn(Optional.of(bookingTest));
            bookingService.delete(1L);
            verify(bookingRepository).findById(1L);

        } catch (NotFoundException e){
            e.printStackTrace();
        }
    }
}