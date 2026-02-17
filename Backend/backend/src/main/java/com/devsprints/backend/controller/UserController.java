package com.devsprints.backend.controller;

import com.devsprints.backend.entity.User; // Import the User entity
import com.devsprints.backend.service.UserService; // Import the UserService
import org.springframework.http.HttpStatus; // For HTTP status codes
import org.springframework.http.ResponseEntity; // For creating HTTP responses
import org.springframework.web.bind.annotation.GetMapping; // For mapping HTTP GET requests
import org.springframework.web.bind.annotation.PathVariable; // For extracting variables from the URI path
import org.springframework.web.bind.annotation.RequestMapping; // For mapping web requests
import org.springframework.web.bind.annotation.RestController; // Marks this class as a REST Controller

import java.util.List; // For returning a list of users
import java.util.Optional; // For handling Optional return types from service

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
    // This method handles the request to get all users.
    // It returns a ResponseEntity, allowing customization of the HTTP response,
    // including the status code and the body.
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
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
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
}
// Meaning of each line:
// - `package com.devsprints.backend.controller;`: Declares the package this class belongs to.
// - `import com.devsprints.backend.entity.User;`: Imports the User entity class.
// - `import com.devsprints.backend.service.UserService;`: Imports the UserService, which this controller will use.
// - `import org.springframework.http.HttpStatus;`: Imports HttpStatus enum for status codes.
// - `import org.springframework.http.ResponseEntity;`: Imports ResponseEntity for creating HTTP responses.
// - `import org.springframework.web.bind.annotation.GetMapping;`: Imports GetMapping annotation.
// - `import org.springframework.web.bind.annotation.PathVariable;`: Imports PathVariable annotation for extracting URI variables.
// - `import org.springframework.web.bind.annotation.RequestMapping;`: Imports RequestMapping annotation.
// - `import org.springframework.web.bind.annotation.RestController;`: Imports RestController annotation.
// - `import java.util.List;`: Imports the List interface.
// - `import java.util.Optional;`: Imports Optional to handle possible absence of return values.
// - `@RestController`: Annotation marks this class as a RESTful web service controller.
// - `@RequestMapping("/api/users")`: Maps HTTP requests to /api/users to this controller.
// - `public class UserController {`: Defines a public class for handling user-related web requests.
// - `private final UserService userService;`: Declares a private, final field for the UserService.
// - `public UserController(UserService userService) {`: Constructor for dependency injection of UserService.
// - `this.userService = userService;`: Assigns the injected UserService instance.
// - `public ResponseEntity<List<User>> getAllUsers() {`: Defines a public method to get all users, returning a ResponseEntity with a list of User objects.
// - `List<User> users = userService.getAllUsers();`: Calls the UserService to fetch all users.
// - `return new ResponseEntity<>(users, HttpStatus.OK);`: Returns an HTTP 200 OK response with the list of users in the body.
// - `@GetMapping("/{id})`: Maps HTTP GET requests for /api/users/{id} to this method, where {id} is a path variable.
// - `public ResponseEntity<User> getUserById(@PathVariable Integer id) {`: Defines a public method to get a user by ID, extracting ID from the path.
// - `Optional<User> user = userService.getUserById(id);`: Calls the UserService to fetch a user by ID.
// - `if (user.isPresent()) {`: Checks if a user was found within the Optional.
// - `return new ResponseEntity<>(user.get(), HttpStatus.OK);`: If found, returns HTTP 200 OK with the User object.
// - `else {`: If no user was found.
// - `return new ResponseEntity<>(HttpStatus.NOT_FOUND);`: Returns HTTP 404 NOT FOUND status.
