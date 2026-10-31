
package com.livuc.interior_booking.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import jakarta.validation.Valid;

import com.livuc.interior_booking.entity.Booking;
import com.livuc.interior_booking.entity.Customer;
import com.livuc.interior_booking.repository.CustomerRepository;
import com.livuc.interior_booking.service.BookingService;

@RestController
public class BookingController {

    private final BookingService bookingService;
    private final CustomerRepository customerRepository;

    public BookingController(
            BookingService bookingService,
            CustomerRepository customerRepository) {
        this.bookingService = bookingService;
        this.customerRepository = customerRepository;
    }

    private Customer getAuthenticatedCustomer(
            Authentication authentication) {

        return customerRepository
                .findByEmail(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Customer not found"));
    }

    private Booking getOwnedBooking(Long id, Customer customer) {

        Booking booking = bookingService.getBookingById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Booking not found"));

        if (booking.getCustomer() == null
                || !customer.getId().equals(
                        booking.getCustomer().getId())) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Booking not found");
        }

        return booking;
    }

    @GetMapping("/bookings")
    public List<Booking> getAllBookings(
            Authentication authentication) {

        Customer customer = getAuthenticatedCustomer(authentication);

        return bookingService.getBookingsByCustomerId(customer.getId());
    }

    @GetMapping("/bookings/{id}")
    public Booking getBookingById(
            @PathVariable Long id,
            Authentication authentication) {

        Customer customer = getAuthenticatedCustomer(authentication);

        return getOwnedBooking(id, customer);
    }

    @PostMapping("/bookings")
    public Booking createBooking(
            @Valid @RequestBody Booking booking,
            Authentication authentication) {

        Customer customer = getAuthenticatedCustomer(authentication);

        booking.setCustomer(customer);

        return bookingService.saveBooking(booking);
    }

    @PutMapping("/bookings/{id}")
    public Booking updateBooking(
            @PathVariable Long id,
            @Valid @RequestBody Booking booking,
            Authentication authentication) {

        Customer customer = getAuthenticatedCustomer(authentication);
        Booking existingBooking = getOwnedBooking(id, customer);

        existingBooking.setServiceName(booking.getServiceName());
        existingBooking.setBookingDate(booking.getBookingDate());

        return bookingService.saveBooking(existingBooking);
    }

    @DeleteMapping("/bookings/{id}")
    public void deleteBooking(
            @PathVariable Long id,
            Authentication authentication) {

        Customer customer = getAuthenticatedCustomer(authentication);
        getOwnedBooking(id, customer);

        bookingService.deleteBooking(id);
    }
}
