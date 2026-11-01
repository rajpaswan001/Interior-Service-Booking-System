package com.livuc.interior_booking.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.livuc.interior_booking.entity.Booking;
import com.livuc.interior_booking.repository.BookingRepository;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByCustomerId(Long customerId) {
        return bookingRepository.findByCustomerId(customerId);
    }

    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }

    // Update booking status
    public Optional<Booking> updateBookingStatus(Long id, String status) {

        Optional<Booking> optionalBooking = bookingRepository.findById(id);

        if (optionalBooking.isEmpty()) {
            return Optional.empty();
        }

        Booking booking = optionalBooking.get();
        booking.setStatus(status);

        Booking updatedBooking = bookingRepository.save(booking);

        return Optional.of(updatedBooking);
    }
}