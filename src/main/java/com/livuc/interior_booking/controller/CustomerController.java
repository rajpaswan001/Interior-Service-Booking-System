
package com.livuc.interior_booking.controller;

import com.livuc.interior_booking.dto.CustomerLoginRequest;
import com.livuc.interior_booking.dto.CustomerRegistrationRequest;
import com.livuc.interior_booking.entity.Customer;
import com.livuc.interior_booking.service.CustomerService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    // Customer registration API
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerCustomer(
            @Valid @RequestBody CustomerRegistrationRequest request) {

        Customer customer = customerService.registerCustomer(request);

        Map<String, Object> response = Map.of(
                "message", "Registration successful",
                "customerId", customer.getId(),
                "name", customer.getName(),
                "email", customer.getEmail()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Customer login API
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginCustomer(
            @Valid @RequestBody CustomerLoginRequest request) {

        Customer customer = customerService.loginCustomer(request);

        Map<String, Object> response = Map.of(
                "message", "Login successful",
                "customerId", customer.getId(),
                "name", customer.getName(),
                "email", customer.getEmail()
        );

        return ResponseEntity.ok(response);
    }
}
