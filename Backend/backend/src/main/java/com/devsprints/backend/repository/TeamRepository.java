package com.devsprints.backend.repository;

import com.devsprints.backend.entity.Team; // Import the Team entity class
import org.springframework.beans.factory.annotation.Value; // For injecting configuration properties
import org.springframework.stereotype.Repository; // Marks this class as a Spring Repository

import java.sql.*; // Import all necessary JDBC classes
import java.util.ArrayList;
import java.util.List;
import java.util.Optional; // To handle cases where a team might not be found

// Marks this class as a Spring component that handles data access for Team entities.
@Repository
public class TeamRepository {

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
    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
    }

    public List<Team> findAllTeamsRepo(){
        String SqlQuery = "SELECT * FROM team";
        List<Team> teams = new ArrayList<>();

        try (Connection connection = getConnection();
             Statement statement = connection.createStatement();
             ResultSet resultSet = statement.executeQuery(SqlQuery)){
                
                while(resultSet.next()){
                    Team team = new Team();
                    team.setId(resultSet.getInt("id"));
                    team.setCreatorId(resultSet.getInt("creatorId"));
                    team.setTeamName(resultSet.getString("teamName"));
                    team.setNumOfMembers(resultSet.getInt("numOfMembers"));

                    teams.add(team);
                }

        }catch(SQLException e){
            System.out.println(e);
        }
        return teams;
    }

    // Saves a team (inserts a new team).
    // Returns the saved Team object, with its newly generated ID.
    public Team saveTeamRepo(Team team) {
        // SQL uses 'noOfMembers' to match your DB schema
        String sql = "INSERT INTO team (teamName, numOfMembers, creatorId) VALUES (?, ?, ?)";
        
        try (Connection connection = getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            preparedStatement.setString(1, team.getTeamName());
            
            if (team.getNumOfMembers() != null) {
                preparedStatement.setInt(2, team.getNumOfMembers());
            } else {
                preparedStatement.setInt(2, 1); 
            }
            preparedStatement.setInt(3, team.getCreatorId());

            preparedStatement.executeUpdate();

            try (ResultSet generatedKeys = preparedStatement.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    int newTeamId = generatedKeys.getInt(1);
                    team.setId(newTeamId); // Set the ID back to the object
                    
                    // 2. Automatically add the creator to the teamMembers table
                    // Passing newTeamId, creatorId as the owner, and creatorId as the new member
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return team;
    }

    // Retrieves a team by its teamName.
    // Returns an Optional<Team> to indicate if a team was found or not.
    public Optional<Team> findByTeamNameRepo(String teamName) { // Using Repo suffix for function name
        String sql = "SELECT id, teamName, numOfMembers, creatorId FROM team WHERE teamName = ?";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setString(1, teamName);
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    Team team = new Team();
                    team.setId(resultSet.getInt("id"));
                    team.setTeamName(resultSet.getString("teamName"));
                    team.setNumOfMembers(resultSet.getInt("numOfMembers"));
                    team.setCreatorId(resultSet.getInt("creatorId"));
                    return Optional.of(team);
                }
            }
        } catch (SQLException e) {
            System.err.println("Error fetching team by name: " + e.getMessage());
        }
        return Optional.empty();
    }

    public Optional<Team> findByIdTeamRepo(Integer id) { // Using Repo suffix for function name
        String sql = "SELECT id, teamName, numOfMembers, creatorId FROM team WHERE id = ?";
        try (Connection connection = getConnection();
             PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setInt(1, id);
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    Team team = new Team();
                    team.setId(resultSet.getInt("id"));
                    team.setTeamName(resultSet.getString("teamName"));
                    team.setNumOfMembers(resultSet.getInt("numOfMembers"));
                    team.setCreatorId(resultSet.getInt("creatorId"));
                    return Optional.of(team);
                }
            }
        } catch (SQLException e) {
            System.err.println("Error fetching team by name: " + e.getMessage());
        }
        return Optional.empty();
    }

    public boolean addteammemberRepo(Integer teamId, Integer creatorId, Integer newMemberId) {
        String selectCreatorSql = "SELECT creatorId FROM team WHERE id = ?";
        String insertMemberSql = "INSERT INTO teamMembers (teamId, userId) VALUES (?, ?)";
        String updateCountSql = "UPDATE team SET numOfMembers = numOfMembers + 1 WHERE id = ?";

        try (Connection connection = getConnection()) {
            connection.setAutoCommit(false);

            try (PreparedStatement selectStmt = connection.prepareStatement(selectCreatorSql);
                PreparedStatement insertStmt = connection.prepareStatement(insertMemberSql);
                PreparedStatement updateStmt = connection.prepareStatement(updateCountSql)) {

                selectStmt.setInt(1, teamId);
                try (ResultSet rs = selectStmt.executeQuery()) {
                    if (rs.next()) {
                        int dbCreatorId = rs.getInt("creatorId");
                        if (dbCreatorId != creatorId) {
                            System.err.println("Validation Failed: Provided creatorId does not match team owner.");
                            return false; 
                        }
                    } else {
                        System.err.println("Error: Team ID " + teamId + " not found.");
                        return false;
                    }
                }

                insertStmt.setInt(1, teamId);
                insertStmt.setInt(2, newMemberId);
                int rowsInserted = insertStmt.executeUpdate();

                updateStmt.setInt(1, teamId);
                updateStmt.executeUpdate();

                connection.commit(); 
                return rowsInserted > 0;

            } catch (SQLException e) {
                connection.rollback();
                e.printStackTrace();
                return false;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}
// Meaning of each line:
// - `package com.devsprints.backend.repository;`: Declares the package this class belongs to.
// - `import com.devsprints.backend.entity.Team;`: Imports the Team entity class.
// - `import org.springframework.beans.factory.annotation.Value;`: Imports Value annotation.
// - `import org.springframework.stereotype.Repository;`: Imports Repository annotation.
// - `import java.sql.*;`: Imports JDBC classes.
// - `import java.util.Optional;`: Imports Optional.
// - `@Repository`: Marks this class as a Spring Repository.
// - `public class TeamRepository {`: Defines the TeamRepository class.
// - `@Value("${spring.datasource.url}")`: Injects DB URL. (Same for username, password).
// - `private Connection getConnection() throws SQLException { ... }`: Helper for DB connection.
// - `public Team saveTeamRepo(Team team) { ... }`: Saves a new team.
// - `String sql = "INSERT INTO team (teamName, numOfMembers, creatorId) VALUES (?, ?, ?)";`: SQL for inserting a team.
// - `try (Connection connection = getConnection(); ... ) { ... }`: Try-with-resources for DB resources.
// - `PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {`: Prepares statement, requests generated keys.
// - `preparedStatement.setString(1, team.getTeamName());`: Sets teamName parameter.
// - `if (team.getNumOfMembers() != null) { ... } else { ... }`: Sets numOfMembers, handles null.
// - `preparedStatement.setInt(3, team.getCreatorId());`: Sets creatorId parameter.
// - `preparedStatement.executeUpdate();`: Executes the INSERT.
// - `try (ResultSet generatedKeys = preparedStatement.getGeneratedKeys()) { ... }`: Retrieves generated keys.
// - `if (generatedKeys.next()) { team.setId(generatedKeys.getInt(1)); }`: Sets generated ID to team object.
// - `catch (SQLException e) { ... }`: Handles SQL exceptions.
// - `return team;`: Returns the team with generated ID.
// - `public Optional<Team> findByTeamNameRepo(String teamName) { ... }`: Finds a team by name.
// - `String sql = "SELECT id, teamName, numOfMembers, creatorId FROM team WHERE teamName = ?";`: SQL for selecting by teamName.
// - `preparedStatement.setString(1, teamName);`: Sets teamName parameter.
// - `try (ResultSet resultSet = preparedStatement.executeQuery()) { ... }`: Executes query.
// - `if (resultSet.next()) { ... }`: If team found.
// - `team.setId(resultSet.getInt("id"));`: Populates team object from ResultSet. (Same for other fields).
// - `return Optional.of(team);`: Returns Optional containing the team.
// - `catch (SQLException e) { ... }`: Handles SQL exceptions.
// - `return Optional.empty();`: Returns empty Optional if team not found or error.
