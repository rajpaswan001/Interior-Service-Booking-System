
package com.livuc.interior_booking.service;

import com.livuc.interior_booking.dto.CustomerRegistrationRequest;
import com.livuc.interior_booking.dto.CustomerLoginRequest;
import com.livuc.interior_booking.entity.Customer;
import com.livuc.interior_booking.repository.CustomerRepository;

import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final PasswordService passwordService;

    public CustomerService(
            CustomerRepository customerRepository,
            PasswordService passwordService) {
        this.customerRepository = customerRepository;
        this.passwordService = passwordService;
    }

    // Customer registration
    public Customer registerCustomer(CustomerRegistrationRequest request) {

        if (customerRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email is already registered");
        }

        Customer customer = new Customer();
        customer.setName(request.getName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());

        // Password ko hash karke database mein save karna
        customer.setPassword(
                passwordService.hashPassword(request.getPassword()));

        return customerRepository.save(customer);
    }

    // Customer login
    public Customer loginCustomer(CustomerLoginRequest request) {

        Customer customer = customerRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Invalid email or password"));

        // Entered password ko stored hash se verify karna
        boolean passwordMatches = passwordService.verifyPassword(
                request.getPassword(),
                customer.getPassword());

        if (!passwordMatches) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid email or password");
        }

        return customer;
    }
}
