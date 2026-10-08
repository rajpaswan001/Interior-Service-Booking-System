package com.livuc.interior_booking.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;





@Entity
@Getter
@Setter 

public class Booking {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // private String customerName;
   

    

    private String serviceName;
    private LocalDate  bookingDate;
     @ManyToOne 
     @JoinColumn (name = "customer_id")
    private Customer customer;
}
