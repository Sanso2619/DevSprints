package com.devsprints.backend.entity;

// Represents a User entity in the application, mapping to a database table.
public class User {

    // Unique identifier for the user. Maps to the primary key in the database.
    private Integer id;

    // The user's name.
    private String name;

    // The user's password.
    private String password = "null";

    // The user's level, defaulting to 1.
    private Integer level;

    // The user's unique email.
    private String email;

    // Default constructor (required by some frameworks like Spring/JPA).
    public User() {
    }

    // Constructor with all fields for easy object creation.
    public User(Integer id, String name, String password, Integer level, String email) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.level = level;
        this.email = email;
    }

    // Getter for id.
    public Integer getId() {
        return id;
    }

    // Setter for id.
    public void setId(Integer id) {
        this.id = id;
    }

    // Getter for name.
    public String getName() {
        return name;
    }

    // Setter for name.
    public void setName(String name) {
        this.name = name;
    }

    // Getter for password.
    public String getPassword() {
        return password;
    }

    // Setter for password.
    public void setPassword(String password) {
        this.password = password;
    }

    // Getter for level.
    public Integer getLevel() {
        return level;
    }

    // Setter for level.
    public void setLevel(Integer level) {
        this.level = level;
    }

    // Getter for username.
    public String getEmail() {
        return email;
    }

    // Setter for username.
    public void setEmail(String email) {
        this.email = email;
    }

    // toString method for easy printing and debugging.
    @Override
    public String toString() {
        return "User{" +
               "id=" + id +
               ", name='" + name + '\'' +
               ", password='" + password + '\'' +
               ", level=" + level +
               ", email='" + email + '\'' +
               '}';
    }
}
// Meaning of each line:
// - `package com.devsprints.backend.entity;`: Declares the package this class belongs to, organizing code.
// - `public class User {`: Defines a public class named User, making it accessible from other classes.
// - `private Integer id;`: Declares a private field 'id' of type Integer to store the user's ID. 'private' restricts direct access.
// - `private String name;`: Declares a private field 'name' of type String to store the user's name.
// - `private String password;`: Declares a private field 'password' of type String to store the user's password.
// - `private Integer level;`: Declares a private field 'level' of type Integer to store the user's level.
// - `private String email;`: Declares a private field 'email' of type String to store the user's email (changed from username).
// - `public User() {`: Defines a public no-argument constructor, often required by frameworks for object instantiation.
// - `public User(Integer id, String name, String password, Integer level, String email) {`: Defines a public constructor that initializes all fields of the User object, including 'email'.
// - `this.id = id;`: Assigns the value passed to the constructor's 'id' parameter to the 'id' field of the current object. This pattern applies to all fields in this constructor.
// - `public Integer getId() {`: Defines a public method to retrieve the value of the 'id' field.
// - `return id;`: Returns the current value of the 'id' field. This pattern applies to all getters.
// - `public void setId(Integer id) {`: Defines a public method to set the value of the 'id' field.
// - `this.id = id;`: Assigns the value passed to the setter's 'id' parameter to the 'id' field of the current object. This pattern applies to all setters.
// - `@Override`: Annotation indicating that this method overrides a method in a superclass (Object class in this case).
// - `public String toString() {`: Defines a public method that returns a string representation of the User object.
// - `return "User{" + ... + '}';`: Constructs and returns the string representation, useful for logging and debugging.
