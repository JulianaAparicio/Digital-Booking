package digital.booking.controllers;

import digital.booking.DTO.BookingDTO;
import digital.booking.exceptions.BadRequestException;
import digital.booking.exceptions.NotFoundException;
import digital.booking.services.BookingService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/bookings")
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
    public ResponseEntity<BookingDTO> createBooking(@RequestBody BookingDTO booking) throws BadRequestException {
        return ResponseEntity.ok(bookingService.create(booking));
    }

    @Operation(summary = "Actualizar reserva por ID")
    @PutMapping("/{id}")
    public ResponseEntity<BookingDTO> updateBooking(@PathVariable Long id, @RequestBody BookingDTO booking) throws NotFoundException {
        return ResponseEntity.ok(bookingService.update(booking, id));
    }

    @Operation(summary = "Eliminar reserva")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBooking(@PathVariable Long id) throws NotFoundException {
        bookingService.delete(id);
        return ResponseEntity.ok("Booking deleted ID: " + id);
    }

}
