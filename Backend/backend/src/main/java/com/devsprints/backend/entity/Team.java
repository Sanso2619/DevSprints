package com.devsprints.backend.entity;

// Represents a Team entity in the application, mapping to a database table.
public class Team {

    // Unique identifier for the team. Maps to the primary key in the database.
    private Integer id;

    // The name of the team. Must be unique.
    private String teamName;

    // The number of members in the team. Defaults to 1.
    private Integer numOfMembers; // Using Integer for consistency and common practice

    // The ID of the user who created this team. Foreign key to the user table.
    private Integer creatorId;

    // Default constructor (often required by frameworks like Spring/JPA).
    public Team() {
    }

    // Constructor with all fields for easy object creation.
    public Team(Integer id, String teamName, Integer numOfMembers, Integer creatorId) {
        this.id = id;
        this.teamName = teamName;
        this.numOfMembers = numOfMembers;
        this.creatorId = creatorId;
    }

    // Getter for id.
    public Integer getId() {
        return id;
    }

    // Setter for id.
    public void setId(Integer id) {
        this.id = id;
    }

    // Getter for teamName.
    public String getTeamName() {
        return teamName;
    }

    // Setter for teamName.
    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    // Getter for numOfMembers.
    public Integer getNumOfMembers() {
        return numOfMembers;
    }

    // Setter for numOfMembers.
    public void setNumOfMembers(Integer numOfMembers) {
        this.numOfMembers = numOfMembers;
    }

    // Getter for creatorId.
    public Integer getCreatorId() {
        return creatorId;
    }

    // Setter for creatorId.
    public void setCreatorId(Integer creatorId) {
        this.creatorId = creatorId;
    }

    // toString method for easy printing and debugging.
    @Override
    public String toString() {
        return "Team{" +
               "id=" + id +
               ", teamName='" + teamName + ' ' +
               ", numOfMembers=" + numOfMembers +
               ", creatorId=" + creatorId +
               '}';
    }
}
// Meaning of each line:
// - `package com.devsprints.backend.entity;`: Declares the package this class belongs to.
// - `public class Team {`: Defines a public class named Team.
// - `private Integer id;`: Declares a private field 'id' for team's ID.
// - `private String teamName;`: Declares a private field 'teamName' for the team's name.
// - `private Integer numOfMembers;`: Declares a private field 'numOfMembers' for the number of members.
// - `private Integer creatorId;`: Declares a private field 'creatorId' for the ID of the team creator.
// - `public Team() {`: Default constructor.
// - `public Team(Integer id, String teamName, Integer numOfMembers, Integer creatorId) {`: Constructor to initialize all fields.
// - `public Integer getId() { ... }`: Getter for id.
// - `public void setId(Integer id) { ... }`: Setter for id.
// - `public String getTeamName() { ... }`: Getter for teamName.
// - `public void setTeamName(String teamName) { ... }`: Setter for teamName.
// - `public Integer getNumOfMembers() { ... }`: Getter for numOfMembers.
// - `public void setNumOfMembers(Integer numOfMembers) { ... }`: Setter for numOfMembers.
// - `public Integer getCreatorId() { ... }`: Getter for creatorId.
// - `public void setCreatorId(Integer creatorId) { ... }`: Setter for creatorId.
// - `@Override`: Annotation for overriding Object's toString method.
// - `public String toString() { ... }`: Provides a string representation of the Team object.
