package digital.booking.controllers;

import digital.booking.DTO.BookingDTO;
import digital.booking.DTO.BookingReqDTO;
import digital.booking.exceptions.BadRequestException;
import digital.booking.exceptions.NotFoundException;
import digital.booking.services.BookingService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@RestController
@RequestMapping("/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Operation(summary = "Consultar todas las reservas")
    @GetMapping
    public ResponseEntity<List<BookingDTO>> findAllBookings(){
        return ResponseEntity.ok(bookingService.searchAll());
    }

    @Operation(summary = "Consultar reserva por ID")
    @GetMapping("/{id}")
    public ResponseEntity<BookingDTO> findBookingById(@PathVariable Long id) throws NotFoundException {
        return ResponseEntity.ok(bookingService.searchById((id)));
    }

    @Operation(summary = "Crear nueva reserva")
    @PostMapping
    public ResponseEntity<BookingDTO> createBooking(@RequestBody BookingReqDTO bookingInfo) throws BadRequestException {

        return ResponseEntity.ok(bookingService.book(bookingInfo));
    }

    @Operation(summary = "Actualizar reserva por ID")
    @PutMapping("/{id}")
    public ResponseEntity<BookingDTO> updateBooking(@PathVariable Long id, @RequestBody BookingReqDTO booking) throws NotFoundException {
        return ResponseEntity.ok(bookingService.updateBooking(booking, id));
    }

    @Operation(summary = "Eliminar reserva")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBooking(@PathVariable Long id) throws NotFoundException {
        bookingService.delete(id);
        return ResponseEntity.ok("Booking deleted ID: " + id);
    }

}
