package com.livuc.interior_booking.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.livuc.interior_booking.entity.Booking;
import com.livuc.interior_booking.entity.Customer;
import com.livuc.interior_booking.service.BookingService;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final BookingService bookingService;

    public AdminController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/dashboard")
    public Map<String, String> getAdminDashboard() {
        return Map.of(
                "message", "Welcome to Admin Dashboard",
                "role", "ADMIN"
        );
    }

    @GetMapping("/bookings")
    public List<Map<String, Object>> getAllBookings() {

        return bookingService.getAllBookings().stream()
                .map(booking -> {
                    Customer customer = booking.getCustomer();

                    return Map.<String, Object>of(
                            "id", booking.getId(),
                            "serviceName", booking.getServiceName(),
                            "bookingDate", booking.getBookingDate(),
                            "status", booking.getStatus(),
                            "customerName", customer != null
                                    ? customer.getName() : "Unknown",
                            "customerEmail", customer != null
                                    ? customer.getEmail() : "N/A"
                    );
                })
                .toList();
    }

    @PutMapping("/bookings/{id}/status")
    public ResponseEntity<?> updateBookingStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {

        String status = request.get("status");

        if (status == null || !List.of(
                "PENDING",
                "CONFIRMED",
                "COMPLETED",
                "CANCELLED"
        ).contains(status)) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Invalid booking status"));
        }

        return bookingService.updateBookingStatus(id, status)
                .<ResponseEntity<?>>map(booking ->
                        ResponseEntity.ok(Map.of(
                                "message", "Booking status updated successfully",
                                "id", booking.getId(),
                                "status", booking.getStatus()
                        )))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "Booking not found")));
    }
}