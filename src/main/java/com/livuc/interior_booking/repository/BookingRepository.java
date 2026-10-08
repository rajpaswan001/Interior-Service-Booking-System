package com.livuc.interior_booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.livuc.interior_booking.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}