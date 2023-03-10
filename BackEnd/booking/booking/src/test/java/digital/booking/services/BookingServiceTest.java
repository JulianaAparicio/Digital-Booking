package digital.booking.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import digital.booking.DTO.BookingDTO;
import digital.booking.DTO.BookingReqDTO;
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

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static digital.booking.entities.UserRoleEnum.USER;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

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
    LocationRepository locationRepository;

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
    private Category categoryTest;

    @Mock
    private Location locationTest;

    @Mock
    private City cityTest;

    @Mock
    private Product productTest;

    @Mock
    private User userTest;

    @Mock
    private Role roleTest;

    private Booking bookingTest;

    @Mock
    List<Booking> bookingsListAvailability;

    @Mock
    private EntityManager entityManagerMock;

    @Mock
    private EntityManagerFactory entityManagerFactory;

    @Mock
    private QBooking bookingQ;

    @Mock
    private JPAQuery<Booking> queryBooking;



    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        categoryTest = new Category(1L,"titleTest","descriptionTest",
                "imageURLTest");
        categoryRepository.save(categoryTest);

        cityTest = new City(1L,"cityNameTest","stateTest","countryTest");
        cityRepository.save(cityTest);

        locationTest = new Location(1L,cityTest,"addressTest","latitudeTest",
                "longitudeTest");
        locationRepository.save(locationTest);

        productTest = new Product(1L, "titleTest", "descriptionTest",categoryTest,
                locationTest);
        productRepository.save(productTest);

        roleTest = new Role(1L,USER);
        roleRepository.save(roleTest);

        userTest = new User(1L,"nameTest","lastNameTest", "email_test@test.com",
                "passwordTest",true,roleTest);
        userRepository.save(userTest);

        bookingTest = new Booking(1L, "10:00", LocalDate.now(),LocalDate.now(),
                productTest,userTest);
        bookingRepository.save(bookingTest);

        bookingsListAvailability = new ArrayList<>();
        bookingsListAvailability.add(bookingTest);

        when(entityManagerMock.getEntityManagerFactory())
                .thenReturn(entityManagerFactory);

        queryBooking = new JPAQuery<>(entityManagerMock);

        bookingQ = QBooking.booking;

    }

    @Order(2)
    @Test
    void testSearchAll() {
        try {
            when(bookingRepository.findAll()).thenReturn(Collections.emptyList());

            List<BookingDTO> bookingList = bookingService.searchAll();

            assertNotNull(bookingList,"The value is null.");

        } catch (Exception e){
            e.printStackTrace();
        }
    }

    @Order(3)
    @Test
    void testSearchById() {
        try {
            when(bookingRepository.findById(1L)).thenReturn(Optional.of(bookingTest));
            BookingDTO bookingFounded = bookingService.searchById(bookingTest.getId());

            assertThat(bookingFounded).isNotNull();

        } catch (NotFoundException e){
            e.printStackTrace();
        }
    }

    @Order(1)
    @Test
    void testCreate() {
        try{
            when(bookingRepository.save(any(Booking.class))).thenReturn(bookingTest);

            BookingDTO bookingDTO = new BookingDTO();
            bookingDTO.setId(1L);
            bookingDTO.setStartTime("10:00");
            bookingDTO.setInitial_date(LocalDate.now());
            bookingDTO.setFinal_date(LocalDate.now());
            bookingDTO.setProduct(mapper.convertValue(productTest,ProductDTO.class));
            bookingDTO.setUser(mapper.convertValue(userTest,UserDTO.class));

            BookingDTO bookingCreated = bookingService.create(bookingDTO);

            // Verifies if booking is null:
            assertNotNull(bookingCreated,"The booking is null");

            // Verifies booking's attributes:
            assertEquals(bookingTest.getStartTime(), bookingCreated.getStartTime(), "Start times don't match.");
            assertEquals(bookingTest.getInitial_date(), bookingCreated.getInitial_date(), "Initial dates don't match.");
            assertEquals(bookingTest.getFinal_date(), bookingCreated.getFinal_date(), "Final dates don't match.");
            assertEquals(bookingTest.getProduct(), bookingTest.getProduct(), "Products don't match.");

        } catch (BadRequestException e){
            e.printStackTrace();
        }
    }

    @Order(4)
    @Test
    void testBook() {
        try{
            when(productRepository.findById(1L)).thenReturn(Optional.of(productTest));
            when(userRepository.findById(1L)).thenReturn(Optional.of(userTest));
            when(bookingRepository.save(any(Booking.class))).thenReturn(bookingTest);

            BookingReqDTO bookingReqDTO = new BookingReqDTO();
            bookingReqDTO.setId(1L);
            bookingReqDTO.setStartTime("10:00");
            bookingReqDTO.setInitial_date("12/01/2022");
            bookingReqDTO.setFinal_date("12/15/2022");
            bookingReqDTO.setProductId(productTest.getId().toString());
            bookingReqDTO.setUserId(userTest.getId().toString());
            bookingReqDTO.setVaccinated(true);
            bookingReqDTO.setSeller("seller");

            BookingDTO bookingCreated = bookingService.book(bookingReqDTO);

            // Verifies if booking is null:
            assertNotNull(bookingCreated,"The booking is null");

            // Verifies booking's attributes:
            assertEquals(bookingTest.getStartTime(), bookingCreated.getStartTime(), "Start times don't match.");
            assertEquals(bookingTest.getInitial_date(), bookingCreated.getInitial_date(), "Initial dates don't match.");
            assertEquals(bookingTest.getFinal_date(), bookingCreated.getFinal_date(), "Final dates don't match.");
            assertEquals(bookingTest.getVaccinated(), bookingCreated.getVaccinated(), "Vaccinated info don't match.");
            assertEquals(bookingTest.getSeller(), bookingCreated.getSeller(), "Sellers info don't match.");

        } catch (BadRequestException e){
            e.printStackTrace();
        }
    }

    @Order(5)
    @Test
    void update() {
        try{
            BookingReqDTO bookingReqDTO = new BookingReqDTO();
            bookingReqDTO.setId(1L);
            bookingReqDTO.setStartTime("startTimeTestEdited");
            bookingReqDTO.setInitial_date("12/01/2022");
            bookingReqDTO.setFinal_date("12/06/2022");
            bookingReqDTO.setUserId(userTest.getId().toString());
            bookingReqDTO.setProductId(productTest.getId().toString());

            when(bookingRepository.findById(1L)).thenReturn(Optional.ofNullable(bookingTest));
            when(bookingRepository.save(bookingTest)).thenReturn(bookingTest);

            BookingDTO bookingUpdated = bookingService.updateBooking(bookingReqDTO,1L);

            assertNotNull(bookingUpdated,"The booking updated is null.");

            assertEquals("startTimeTestEdited", bookingUpdated.getStartTime(),
                    "Start times don't match.");

        } catch (NotFoundException e){
            e.printStackTrace();
        }
    }

    @Order(6)
    @Test
    void testGetAvailabilityByProductId() {
        try {
            when(queryBooking.select(Projections.bean(Booking.class, bookingQ.initial_date,
                    bookingQ.final_date)).from(bookingQ).where(bookingQ.product.id.eq(1L)).stream()
                    .toList()).thenReturn(bookingsListAvailability);

            List<Booking> bookings = bookingService.getAvailabilityByProductId(1L);

            assertNotNull(bookings,"The value is null.");

        } catch (Exception e){
            e.printStackTrace();
        }
    }

    @Order(7)
    @Test
    void testGetBookingsByUserId() {
        try {
            when(queryBooking.from(bookingQ).where(bookingQ.user.id.eq(1L)).stream().toList())
                    .thenReturn(bookingsListAvailability);

            List<Booking> bookings = bookingService.getBookingsByUserId(1L);

            assertNotNull(bookings,"The value is null.");

        } catch (Exception e){
            e.printStackTrace();
        }
    }

    @Order(8)
    @Test
    void testDelete() {
        try{
            when(bookingRepository.findById(1L)).thenReturn(Optional.of(bookingTest));
            bookingService.delete(1L);
            verify(bookingRepository).findById(1L);

        } catch (NotFoundException e){
            e.printStackTrace();
        }
    }
}