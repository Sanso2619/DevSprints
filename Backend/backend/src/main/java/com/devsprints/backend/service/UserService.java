package com.devsprints.backend.service;

import com.devsprints.backend.entity.User; // Import the User entity
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
}
// Meaning of each line:
// - `package com.devsprints.backend.service;`: Declares the package this class belongs to.
// - `import com.devsprints.backend.entity.User;`: Imports the User entity class.
// - `import com.devsprints.backend.repository.UserRepository;`: Imports the UserRepository, which this service will use.
// - `import org.springframework.stereotype.Service;`: Imports the Service annotation.
// - `import java.util.List;`: Imports the List interface.
// - `import java.util.Optional;`: Imports Optional to handle possible absence of return values.
// - `@Service`: Annotation tells Spring that this class is a service component, suitable for containing business logic.
// - `public class UserService {`: Defines a public class for user-related business operations.
// - `private final UserRepository userRepository;`: Declares a private, final field to hold an instance of UserRepository. 'final' ensures it's initialized once.
// - `public UserService(UserRepository userRepository) {`: Defines a constructor for UserService, used by Spring for dependency injection.
// - `this.userRepository = userRepository;`: Assigns the injected UserRepository instance to the 'userRepository' field.
// - `public List<User> getAllUsers() {`: Public method to retrieve all users.
// - `return userRepository.findAll();`: Delegates the call to the 'findAll()' method of 'userRepository' and returns its result.
// - `public Optional<User> getUserById(Integer id) {`: Public method to retrieve a user by their ID.
// - `return userRepository.findById(id);`: Delegates the call to the 'findById()' method of 'userRepository' and returns its result.
