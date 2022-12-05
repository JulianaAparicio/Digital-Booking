package digital.booking.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQuery;
import digital.booking.DTO.BookingDTO;
import digital.booking.DTO.BookingReqDTO;
import digital.booking.entities.Booking;
import digital.booking.entities.Product;
import digital.booking.entities.QBooking;
import digital.booking.entities.User;
import digital.booking.exceptions.BadRequestException;
import digital.booking.exceptions.NotFoundException;
import digital.booking.interfaces.IService;
import digital.booking.mails.BookingMail;
import digital.booking.repositories.BookingRepository;
import digital.booking.repositories.ProductRepository;
import digital.booking.repositories.UserRepository;
import org.apache.log4j.Logger;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

@Service
public class BookingService implements IService<BookingDTO> {

    @PersistenceContext
    EntityManager entityManager;

    private final Logger logger = Logger.getLogger(BookingService.class);

    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper mapper;

    @Override
    public List<BookingDTO> searchAll() {
        List<Booking> bookings = bookingRepository.findAll();
        logger.debug("Searching all bookings...");

        List<BookingDTO> bookingsDTO = new ArrayList<>();
        for (Booking booking : bookings){
            bookingsDTO.add(mapper.convertValue(booking,BookingDTO.class));
        }

        logger.info("Listing all bookings...");
        return bookingsDTO;
    }

    @Override
    public BookingDTO searchById(Long id) throws NotFoundException {
        logger.debug("Searching booking with id: " + id);
        Booking bookingFounded = bookingRepository.findById(id).orElseThrow(() -> new NotFoundException("The " +
                "booking with id: " + id + " was not found."));
        return mapper.convertValue(bookingFounded, BookingDTO.class);
    }

    @Override
    public BookingDTO create(BookingDTO booking) throws BadRequestException {
        if (booking.getFinal_date()==null || booking.getInitial_date()==null || booking.getStartTime()==null){
            logger.error("The data entered has null values.");
            throw new BadRequestException("The booking has null values.");
        } else{
            logger.debug("Creating new booking...");
            Booking bookingCreated = mapper.convertValue(booking, Booking.class);
            logger.info("The booking was created successfully.");
            return mapper.convertValue(bookingRepository.save(bookingCreated), BookingDTO.class);
        }
    }

    @Override
    public BookingDTO update(BookingDTO entity, Long id) throws NotFoundException {
        return null;
    }

    public BookingDTO book(BookingReqDTO booking) throws BadRequestException {
        if (booking.getFinalDate()==null || booking.getInitialDate()==null || booking.getStartTime()==null){
            logger.error("The data entered has null values.");
            throw new BadRequestException("The booking has null values.");
        } else {
            logger.debug("Creating new booking...");
            DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("MM/dd/yyyy", Locale.US);
            Optional<User> user = userRepository.findById(Long.parseLong(booking.getUserId()));
            Optional<Product> product = productRepository.findById(Long.parseLong(booking.getProductId()));
            Booking bookingCreated = new Booking();
            bookingCreated.setUser(user.get());
            bookingCreated.setProduct(product.get());
            bookingCreated.setStartTime(booking.getStartTime());
            bookingCreated.setInitial_date(LocalDate.parse(booking.getInitialDate(), dateFormat));
            bookingCreated.setFinal_date(LocalDate.parse(booking.getFinalDate(), dateFormat));
            bookingCreated.setVaccinated(booking.getVaccinated());
            bookingCreated.setSeller(booking.getSeller());

            logger.info("The booking was created successfully.");
            Booking bookingSaved = bookingRepository.save(bookingCreated);
            BookingMail.sendBookingEmail(user.get(), product.get(), bookingSaved);
            return mapper.convertValue(bookingSaved, BookingDTO.class);
        }
    }

    public BookingDTO updateBooking(BookingReqDTO booking, Long id) throws NotFoundException {
        Booking existingBooking = bookingRepository.findById(booking.getId())
                .orElseThrow(() -> new NotFoundException("The booking with id " + booking.getId() +
                        "was not found."));

        logger.debug("Updating booking...");
        DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("MM/dd/yyyy", Locale.US);
        Optional<User> user = userRepository.findById(Long.parseLong(booking.getUserId()));
        Optional<Product> product = productRepository.findById(Long.parseLong(booking.getProductId()));
        existingBooking.setStartTime(booking.getStartTime());
        existingBooking.setInitial_date(LocalDate.parse(booking.getInitialDate(), dateFormat));
        existingBooking.setFinal_date(LocalDate.parse(booking.getFinalDate(), dateFormat));
        existingBooking.setProduct(product.get());
        existingBooking.setUser(user.get());
        existingBooking.setVaccinated(booking.getVaccinated());
        existingBooking.setSeller(booking.getSeller());

        bookingRepository.save(existingBooking);
        logger.info("The booking was updated successfully.");
        return mapper.convertValue(existingBooking, BookingDTO.class);
    }

    public List<Booking> getAvailabilityByProductId(Long id) {
        JPAQuery<Booking> queryBooking = new JPAQuery<>(entityManager);
        QBooking bookingQ = QBooking.booking;
        List<Booking> bookings = queryBooking.select(Projections.bean(Booking.class, bookingQ.initial_date, bookingQ.final_date)).from(bookingQ).where(bookingQ.product.id.eq(id)).stream().toList();
        System.out.println(bookings);
        return bookings;
    }

    @Override
    public void delete(Long id) throws ServiceException, NotFoundException {
        Booking booking = bookingRepository.findById(id).orElseThrow(() -> new NotFoundException("The " +
                "booking with id: " + id + " was not found."));
        logger.debug("Deleting booking...");
        bookingRepository.delete(booking);
    }

    public List<Booking> getBookingsByUserId(Long id) {
        JPAQuery<Booking> queryBooking = new JPAQuery<>(entityManager);
        QBooking bookingQ = QBooking.booking;
        return queryBooking.from(bookingQ).where(bookingQ.user.id.eq(id)).stream().toList();
    }
}
