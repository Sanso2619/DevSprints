package com.devsprints.backend.controller;

import com.devsprints.backend.entity.User; // Import the User entity
import com.devsprints.backend.payload.request.LoginRequest; // Import LoginRequest DTO
import com.devsprints.backend.payload.request.SignInRequest; // Import SignInRequest DTO
import com.devsprints.backend.service.UserService; // Import the UserService
import org.springframework.http.HttpStatus; // For HTTP status codes
import org.springframework.http.ResponseEntity; // For creating HTTP responses
import org.springframework.web.bind.annotation.GetMapping; // For mapping HTTP GET requests
import org.springframework.web.bind.annotation.PathVariable; // For extracting variables from the URI path
import org.springframework.web.bind.annotation.PostMapping; // For mapping HTTP POST requests
import org.springframework.web.bind.annotation.RequestBody; // For binding request body to method parameter
import org.springframework.web.bind.annotation.RequestMapping; // For mapping web requests
import org.springframework.web.bind.annotation.RestController; // Marks this class as a REST Controller

import java.util.List; 
import java.util.Optional;

// Marks this class as a REST Controller, meaning it handles incoming HTTP requests
// and builds RESTful web services. It automatically serializes return objects to JSON/XML.
@RestController
// Maps all requests starting with "/api/users" to this controller.
// This creates a base path for all endpoints defined within this controller.
@RequestMapping("/api/users")
public class UserController {

    // Dependency Injection: Spring will automatically provide an instance
    // of UserService to this field through constructor injection.
    private final UserService userService;

    // Constructor for dependency injection.
    // Spring calls this constructor and injects the UserService.
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Maps HTTP GET requests to "/api/users/allusers" to this method.
    @GetMapping("/allusers")
    public ResponseEntity<List<User>> getAllUsers() {
        // Calls the UserService to retrieve all users from the database.
        List<User> users = userService.getAllUsers();
        // Returns an HTTP 200 OK status code along with the list of users in the response body.
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // Maps HTTP GET requests to "/api/users/{id}" to this method.
    // The '{id}' is a path variable that will be extracted from the URI.
    @GetMapping("/{id}")
    // This method handles the request to get a single user by their ID.
    // @PathVariable annotation binds the 'id' from the URI path to the 'id' method parameter.
    // It returns a ResponseEntity<User> with HttpStatus.OK if the user is found,
    // or HttpStatus.NOT_FOUND if the user is not found.
    public ResponseEntity<User> getUserByIdCon(@PathVariable Integer id) { // Changed method name
        // Calls the UserService to retrieve a user by ID.
        // The service returns an Optional<User> to gracefully handle non-existent users.
        Optional<User> user = userService.getUserById(id);

        // Checks if the Optional contains a user.
        if (user.isPresent()) {
            // If the user is found, return HTTP 200 OK with the user object.
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {
            // If no user is found, return HTTP 404 NOT FOUND.
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Maps HTTP POST requests to "/api/users/login" to this method.
    @PostMapping("/login")
    // This method handles user login requests.
    // @RequestBody annotation binds the HTTP request body to the LoginRequest object.
    // It returns a ResponseEntity<User> with HttpStatus.OK if login is successful,
    // or HttpStatus.UNAUTHORIZED if credentials are invalid.
    public ResponseEntity<User> loginCon(@RequestBody LoginRequest loginRequest) { // Changed method name
        // Calls the UserService to attempt user login.
        Optional<User> user = userService.loginService(loginRequest);

        if (user.isPresent()) {
            // If login is successful, return HTTP 200 OK with the authenticated user.
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {
            // If login fails (user not found or invalid credentials), return HTTP 401 UNAUTHORIZED.
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    // Maps HTTP POST requests to "/api/users/signin" to this method.
    @PostMapping("/signin")
    // This method handles new user registration requests.
    // @RequestBody annotation binds the HTTP request body to the SignInRequest object.
    // It returns a ResponseEntity<User> with HttpStatus.CREATED upon successful registration.
    public ResponseEntity<User> registerCon(@RequestBody SignInRequest signInRequest) { // Changed method name
        // Calls the UserService to register a new user.
        User newUser = userService.signInService(signInRequest);
        // Returns HTTP 201 CREATED status code along with the newly created user in the response body.
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }
}
