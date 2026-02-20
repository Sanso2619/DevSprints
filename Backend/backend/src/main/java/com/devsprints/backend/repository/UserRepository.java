package com.devsprints.backend.repository;

import com.devsprints.backend.entity.User; // Import the User entity class
import org.springframework.beans.factory.annotation.Value; // For injecting configuration properties
import org.springframework.stereotype.Repository; // Marks this class as a Spring Repository

import java.sql.*; // Import all necessary JDBC classes
import java.util.ArrayList; // For creating a list of users
import java.util.List; // For the return type of findAll()
import java.util.Optional; // To handle cases where a user might not be found by ID

// Marks this class as a Spring component that handles data access.
// Spring can automatically discover and manage this bean.
@Repository
public class UserRepository {

    // Injects the database URL from application.properties.
    @Value("${spring.datasource.url}")
    private String dbUrl;

    // Injects the database username from application.properties.
    @Value("${spring.datasource.username}")
    private String dbUsername;

    // Injects the database password from application.properties.
    @Value("${spring.datasource.password}")
    private String dbPassword;

    // A private helper method to establish a database connection.
    // It uses the injected properties to connect to the database.
    private Connection getConnection() throws SQLException {
        // DriverManager attempts to establish a connection to the given database URL.
        return DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
    }

    // Retrieves all users from the database.
    // Returns a List of User objects.
    public List<User> findAll() {
        List<User> users = new ArrayList<>(); // Initialize an empty list to store users.
        // The SQL query to select all columns for all users from the 'user' table, including email.
        // Ensure your table name is 'user' and column names match your schema.
        String sql = "SELECT id, name, password, level, email FROM user";

        // try-with-resources statement ensures that Connection, Statement, and ResultSet
        // are automatically closed even if exceptions occur.
        try (Connection connection = getConnection(); // Get a new database connection.
             Statement statement = connection.createStatement(); // Create a statement object for executing SQL.
             ResultSet resultSet = statement.executeQuery(sql)) { // Execute the query and get the results.

            // Iterate through each row in the ResultSet.
            while (resultSet.next()) {
                User user = new User(); // Create a new User object for each row.
                // Retrieve data from the current row of the ResultSet by column name
                // and set it to the corresponding User object field.
                user.setId(resultSet.getInt("id"));
                user.setName(resultSet.getString("name"));
                user.setPassword(resultSet.getString("password"));
                user.setLevel(resultSet.getInt("level"));
                user.setEmail(resultSet.getString("email"));
                users.add(user); // Add the populated User object to the list.
            }
        } catch (SQLException e) {
            // Catches any SQL-related exceptions during the process.
            // Prints an error message to the console. In a production app, you would
            // use a proper logging framework (e.g., SLF4J, Logback) and potentially
            // rethrow a custom, more descriptive exception.
            System.err.println("Error fetching all users: " + e.getMessage());
        }
        return users; // Return the list of users.
    }

    // Retrieves a user by their ID from the database.
    // Returns an Optional<User> to indicate if a user was found or not.
    public Optional<User> findById(Integer id) {
        String sql = "SELECT id, name, password, level, email FROM user WHERE id = ?"; // Selects user by ID, including email field
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setInt(1, id); // Set the 'id' parameter for the WHERE clause.
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) { // If a row is found...
                    User user = new User();
                    user.setId(resultSet.getInt("id"));
                    user.setName(resultSet.getString("name"));
                    user.setPassword(resultSet.getString("password"));
                    user.setLevel(resultSet.getInt("level"));
                    user.setEmail(resultSet.getString("email"));
                    return Optional.of(user); // Wrap the user in an Optional and return it.
                }
            }
        } catch (SQLException e) {
            System.err.println("Error fetching user by ID: " + e.getMessage());
        }
        return Optional.empty(); // If no user is found or an error occurs, return an empty Optional.
    }

    public Optional<User> getUserByEmailRepo(String email){
        String SqlQuery = "SELECT id, name, password, level, email FROM user WHERE email = ?";

        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(SqlQuery)) {

            
                preparedStatement.setString(1, email);
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    User user = new User();
                    user.setId(resultSet.getInt("id"));
                    user.setName(resultSet.getString("name"));
                    user.setPassword(resultSet.getString("password"));
                    user.setLevel(resultSet.getInt("level"));
                    user.setEmail(resultSet.getString("email"));
                    return Optional.of(user);
                }
            }
        } catch (SQLException e) {
            System.err.println("Error fetching user by email: " + e.getMessage());
        }
        return Optional.empty();
}


    // Saves a user (either inserts a new user or updates an existing one).
    // Returns the saved User object, potentially with a newly generated ID.
    public User save(User user) {
        // If the user ID is null, it's a new user to be inserted.
        if (user.getId() == null) {
            // SQL for inserting a new user. 'name', 'password', 'level', 'email' are columns.
            String sql = "INSERT INTO user (name, password, level, email) VALUES (?, ?, ?, ?)";
            try (Connection connection = getConnection();
                 // PreparedStatement for parameterized query, and request generated keys for new ID.
                 PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

                // Set parameters for the INSERT statement.
                preparedStatement.setString(1, user.getName());
                preparedStatement.setString(2, user.getPassword());
                preparedStatement.setInt(3, user.getLevel());
                preparedStatement.setString(4, user.getEmail()); // Set email

                preparedStatement.executeUpdate(); // Execute the insert statement.

                // Retrieve the auto-generated ID for the new user.
                try (ResultSet generatedKeys = preparedStatement.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        user.setId(generatedKeys.getInt(1)); // Set the generated ID back to the user object.
                    }
                }
            } catch (SQLException e) {
                System.err.println("Error inserting user: " + e.getMessage());
                // In a real application, proper exception handling and logging would be here.
            }
        } else {
            // If the user ID is not null, it's an existing user to be updated.
            // SQL for updating an existing user based on their ID.
            String sql = "UPDATE user SET name = ?, password = ?, level = ?, email = ? WHERE id = ?";
            try (Connection connection = getConnection();
                 PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

                // Set parameters for the UPDATE statement.
                preparedStatement.setString(1, user.getName());
                preparedStatement.setString(2, user.getPassword());
                preparedStatement.setInt(3, user.getLevel());
                preparedStatement.setString(4, user.getEmail()); // Set email
                preparedStatement.setInt(5, user.getId()); // Set the WHERE clause parameter (user ID).

                preparedStatement.executeUpdate(); // Execute the update statement.
            } catch (SQLException e) {
                System.err.println("Error updating user: " + e.getMessage());
                // In a real application, proper exception handling and logging would be here.
            }
        }
        return user; // Return the user object (with updated ID if it was an insert).
    }
}
// Meaning of each line:
// - `package com.devsprints.backend.repository;`: Declares the package this class belongs to.
// - `import com.devsprints.backend.entity.User;`: Imports the User entity class, allowing its use.
// - `import org.springframework.beans.factory.annotation.Value;`: Imports Value annotation for injecting properties.
// - `import org.springframework.stereotype.Repository;`: Imports Repository annotation, marking the class as a Spring bean for data access.
// - `import java.sql.*;`: Imports all classes from the java.sql package for JDBC operations.
// - `import java.util.ArrayList;`: Imports ArrayList for creating mutable lists.
// - `import java.util.List;`: Imports List interface.
// - `import java.util.Optional;`: Imports Optional to handle possible absence of return values.
// - `@Repository`: Annotation tells Spring that this class is a data repository.
// - `public class UserRepository {`: Defines a public class for user data operations.
// - `@Value("${spring.datasource.url}")`: Injects the value of 'spring.datasource.url' from application.properties into dbUrl.
// - `private String dbUrl;`: Declares a private field to hold the database URL. This pattern applies to dbUsername and dbPassword.
// - `private Connection getConnection() throws SQLException {`: Defines a private method to get a database connection, potentially throwing SQLException.
// - `return DriverManager.getConnection(dbUrl, dbUsername, dbPassword);`: Establishes and returns a database connection using the provided credentials.
// - `public List<User> findAll() {`: Public method to retrieve all users, returning a List of User objects.
// - `List<User> users = new ArrayList<>();`: Initializes an empty ArrayList to store User objects.
// - `String sql = "SELECT id, name, password, level, email FROM user";`: Defines the SQL query to fetch all user data, now including 'email'.
// - `try (Connection connection = getConnection(); ... ) {`: A try-with-resources block for automatic management of JDBC resources.
// - `Connection connection = getConnection();`: Obtains a database connection.
// - `Statement statement = connection.createStatement();`: Creates a Statement object to execute SQL queries.
// - `ResultSet resultSet = statement.executeQuery(sql)) {`: Executes the SQL query and stores the results in a ResultSet.
// - `while (resultSet.next()) {`: Loops through each row in the ResultSet.
// - `User user = new User();`: Creates a new User object for each database row.
// - `user.setId(resultSet.getInt("id"));`: Retrieves the integer value from the "id" column of the current row and sets it to the user's id field. This pattern applies to all fields.
// - `user.setName(resultSet.getString("name"));`: Retrieves the string value from the "name" column and sets it.
// - `user.setPassword(resultSet.getString("password"));`: Retrieves the string value from the "password" column and sets it.
// - `user.setLevel(resultSet.getInt("level"));`: Retrieves the integer value from the "level" column and sets it.
// - `user.setEmail(resultSet.getString("email"));`: Retrieves the string value from the "email" column and sets it.
// - `users.add(user);`: Adds the populated User object to the list.
// - `} catch (SQLException e) {`: Catches and handles any SQLException that occurs.
// - `System.err.println("Error fetching all users: " + e.getMessage());`: Prints the error message to the console.
// - `return users;`: Returns the list of users.
// - `public Optional<User> findById(Integer id) {`: Public method to find a user by ID, returning an Optional User.
// - `String sql = "SELECT id, name, password, level, email FROM user WHERE id = ?";`: Defines the SQL query with a placeholder for the ID, now including 'email'.
// - `PreparedStatement preparedStatement = connection.prepareStatement(sql)) {`: Creates a PreparedStatement to execute parameterized queries.
// - `preparedStatement.setInt(1, id);`: Sets the first parameter (?) in the SQL query to the given ID.
// - `try (ResultSet resultSet = preparedStatement.executeQuery()) {`: Executes the parameterized query.
// - `if (resultSet.next()) {`: Checks if a row was returned (i.e., user found).
// - `user.setName(resultSet.getString("name"));`: Retrieves the string value from the "name" column and sets it.
// - `user.setPassword(resultSet.getString("password"));`: Retrieves the string value from the "password" column and sets it.
// - `user.setLevel(resultSet.getInt("level"));`: Retrieves the integer value from the "level" column and sets it.
// - `user.setEmail(resultSet.getString("email"));`: Retrieves the string value from the "email" column and sets it.
// - `return Optional.of(user);`: Returns an Optional containing the found user.
// - `return Optional.empty();`: Returns an empty Optional if no user was found.
// - `public User save(User user) {`: Public method to save (insert or update) a user.
// - `if (user.getId() == null) {`: Checks if the user is new (no ID yet).
// - `String sql = "INSERT INTO user (name, password, level, email) VALUES (?, ?, ?, ?)";`: SQL for inserting a new user with all fields.
// - `preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {`: Prepares insert statement, requesting generated keys.
// - `preparedStatement.setString(1, user.getName());`: Sets parameter for user's name.
// - `preparedStatement.setString(2, user.getPassword());`: Sets parameter for user's password.
// - `preparedStatement.setInt(3, user.getLevel());`: Sets parameter for user's level.
// - `preparedStatement.setString(4, user.getEmail());`: Sets parameter for user's email.
// - `preparedStatement.executeUpdate();`: Executes the insert statement.
// - `try (ResultSet generatedKeys = preparedStatement.getGeneratedKeys()) {`: Retrieves any auto-generated keys.
// - `if (generatedKeys.next()) { user.setId(generatedKeys.getInt(1)); }`: Sets the user's ID with the generated key.
// - `else {`: If user has an ID, it's an update.
// - `String sql = "UPDATE user SET name = ?, password = ?, level = ?, email = ? WHERE id = ?";`: SQL for updating an existing user with all fields.
// - `preparedStatement = connection.prepareStatement(sql)) {`: Prepares update statement.
// - `preparedStatement.setString(1, user.getName());`: Sets parameter for user's name.
// - `preparedStatement.setString(2, user.getPassword());`: Sets parameter for user's password.
// - `preparedStatement.setInt(3, user.getLevel());`: Sets parameter for user's level.
// - `preparedStatement.setString(4, user.getEmail());`: Sets parameter for user's email.
// - `preparedStatement.setInt(5, user.getId());`: Sets parameter for user's ID in WHERE clause.
// - `return user;`: Returns the saved (inserted or updated) user object.
