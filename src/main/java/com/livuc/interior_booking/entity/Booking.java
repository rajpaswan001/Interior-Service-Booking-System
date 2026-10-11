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
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;




@Entity
@Getter
@Setter 

public class Booking {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // private String customerName;
   

    
    @NotBlank(message = "Service name is required")
    private String serviceName;


    @NotNull(message = "Booking date is required")
    private LocalDate  bookingDate;
    
     @ManyToOne 
     @JoinColumn (name = "customer_id")
    private Customer customer;
}
