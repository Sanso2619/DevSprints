package com.devsprints.backend.service;

import com.devsprints.backend.entity.User; // Import the User entity
import com.devsprints.backend.payload.request.LoginRequest; // Import LoginRequest DTO
import com.devsprints.backend.payload.request.SignInRequest; // Import SignInRequest DTO
import com.devsprints.backend.repository.UserRepository; // Import the UserRepository
import org.springframework.stereotype.Service; // Marks this class as a Spring Service
import java.util.List; // For returning a list of users
import java.util.Optional; // Import for Optional return type

// Marks this class as a Spring Service component.
// Services typically contain business logic and act as an intermediary
// between controllers and repositories.
@Service
public class UserService {

    // Dependency Injection: Spring will automatically provide an instance
    // of UserRepository to this field.
    private final UserRepository userRepository;

    // Constructor for dependency injection.
    // Spring calls this constructor and injects the UserRepository.
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Retrieves all users by delegating the call to the UserRepository.
    // This method might contain additional business logic before or after
    // calling the repository (e.g., data validation, transformation).
    public List<User> getAllUsers() {
        return userRepository.findAll(); // Calls the repository to get all users.
    }

    // Retrieves a user by their ID, delegating to the UserRepository.
    // Returns an Optional<User> to handle cases where the user might not be found.
    public Optional<User> getUserById(Integer id) {
        return userRepository.findById(id); // Calls the repository to get a user by ID.
    }

    // Handles user login logic.
    // Finds a user by email and verifies the password.
    public Optional<User> loginService(LoginRequest loginRequest) {
        // Attempt to find the user by their email.
        Optional<User> userOptional = userRepository.getUserByEmailRepo(loginRequest.getEmail());

        // If user is found and password matches, return the user.
        if (userOptional.isPresent() && userOptional.get().getPassword().equals(loginRequest.getPassword())) {
            return userOptional;
        }
        return Optional.empty(); // Return empty if user not found or password doesn't match.
    }

    // Handles user registration (sign-in) logic.
    // Creates a new User object from SignInRequest data, saves it, and then re-fetches it.
    public User signInService(SignInRequest signInRequest) {
        // 1. Create a new User entity from the SignInRequest DTO.
        User newUser = new User();
        newUser.setName(signInRequest.getName());
        newUser.setPassword(signInRequest.getPassword());
        newUser.setLevel(signInRequest.getLevel() != null ? signInRequest.getLevel() : 1); // Use default if level is null
        newUser.setEmail(signInRequest.getEmail());

        // 2. Save the new user to the database via the repository.
        // The 'savedUser' object will now have its ID populated.
        User savedUser = userRepository.save(newUser);

        // 3. Re-fetch the user from the database using its email to ensure
        //    we have the most up-to-date representation directly from the database.
        //    This is useful if the database modifies other fields (e.g., timestamps).
        Optional<User> fetchedUserOptional = userRepository.getUserByEmailRepo(savedUser.getEmail());

        // 4. Return the fetched user (or handle if for some reason it's not found, though unlikely after a save).
        if (fetchedUserOptional.isPresent()) {
            return fetchedUserOptional.get();
        } else {
            // This case should ideally not happen if save was successful and email is unique.
            // You might want to throw an exception or log an error here.
            System.err.println("Error: User saved but could not be re-fetched by email: " + savedUser.getEmail());
            return savedUser; // Fallback to returning the directly saved user
        }
    }
}
