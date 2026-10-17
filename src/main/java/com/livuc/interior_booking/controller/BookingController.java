package com.livuc.interior_booking.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import jakarta.validation.Valid;

import com.livuc.interior_booking.entity.Booking;
import com.livuc.interior_booking.service.BookingService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/bookings/{id}")
    public Booking getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Booking not found"));
    }

    @PostMapping("/bookings")
    public Booking createBooking(@Valid @RequestBody Booking booking) {
        return bookingService.saveBooking(booking);
    }

    @PutMapping("/bookings/{id}")
    public Booking updateBooking(
            @PathVariable Long id,
            @Valid @RequestBody Booking booking) {

        Booking existingBooking = bookingService.getBookingById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Booking not found"));

        existingBooking.setServiceName(booking.getServiceName());
        existingBooking.setBookingDate(booking.getBookingDate());

        return bookingService.saveBooking(existingBooking);
    }

    @DeleteMapping("/bookings/{id}")
    public void deleteBooking(@PathVariable Long id) {
        if (bookingService.getBookingById(id).isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Booking not found");
        }

        bookingService.deleteBooking(id);
    }
}