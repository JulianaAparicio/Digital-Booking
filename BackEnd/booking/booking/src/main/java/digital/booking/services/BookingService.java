package digital.booking.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import digital.booking.DTO.BookingDTO;
import digital.booking.entities.Booking;
import digital.booking.exceptions.BadRequestException;
import digital.booking.exceptions.NotFoundException;
import digital.booking.interfaces.IService;
import digital.booking.repositories.BookingRepository;
import org.apache.log4j.Logger;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService implements IService<BookingDTO> {

    private final Logger logger = Logger.getLogger(BookingService.class);

    @Autowired
    private BookingRepository bookingRepository;

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
        if (booking.getFinalDate()==null || booking.getInitialDate()==null || booking.getStartTime()==null){
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
    public BookingDTO update(BookingDTO booking, Long id) throws NotFoundException {
        Booking existingBooking = bookingRepository.findById(booking.getId())
                .orElseThrow(() -> new NotFoundException("The booking with id " + booking.getId() +
                        "was not found."));

        logger.debug("Updating booking...");
        existingBooking.setStartTime(booking.getStartTime());
        existingBooking.setInitialDate(booking.getInitialDate());
        existingBooking.setFinalDate(booking.getFinalDate());
        existingBooking.setProduct(booking.getProduct());
        existingBooking.setUser(booking.getUser());

        bookingRepository.save(existingBooking);
        logger.info("The booking was updated successfully.");
        return mapper.convertValue(existingBooking, BookingDTO.class);
    }

    @Override
    public void delete(Long id) throws ServiceException, NotFoundException {
        Booking booking = bookingRepository.findById(id).orElseThrow(() -> new NotFoundException("The " +
                "booking with id: " + id + " was not found."));
        logger.debug("Deleting booking...");
        bookingRepository.delete(booking);
    }
}
