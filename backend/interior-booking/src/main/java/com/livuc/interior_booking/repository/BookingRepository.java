
package com.livuc.interior_booking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.livuc.interior_booking.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByCustomerId(Long customerId);
}
