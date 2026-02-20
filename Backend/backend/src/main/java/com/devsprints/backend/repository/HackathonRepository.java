package com.devsprints.backend.repository;

import java.sql.*; 
import java.util.ArrayList; 
import java.util.List; 
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import com.devsprints.backend.entity.Hackathon;
import com.devsprints.backend.entity.Team;
import com.devsprints.backend.entity.User;
import com.devsprints.backend.payload.request.CreateHackathonRequest;
import com.devsprints.backend.payload.request.SearchHackathonRequest;

@Repository
public class HackathonRepository {

    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Value("${spring.datasource.username}")
    private String dbUsername;

    @Value("${spring.datasource.password}")
    private String dbPassword;

    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
    }

    TeamRepository teamRepository;

    public List<Hackathon> getAllHackathonsRepo() {
    List<Hackathon> hackathons = new ArrayList<>();
    String SqlQuery = "SELECT * FROM hackathon";

    try (Connection connection = getConnection();
         Statement statement = connection.createStatement();
         ResultSet resultSet = statement.executeQuery(SqlQuery)) {

        while (resultSet.next()) {
            Hackathon hackathon = new Hackathon();

            hackathon.setId(resultSet.getInt("id"));
            hackathon.setHackathonName(resultSet.getString("hackathonName"));
            hackathon.setHackathonMode(resultSet.getString("hackathonMode"));
            hackathon.setDuration(resultSet.getString("duration"));
            
            if (resultSet.getTimestamp("lastRegistrationDate") != null) {
                hackathon.setLastRegistrationDate(resultSet.getTimestamp("lastRegistrationDate").toLocalDateTime());
            }
            if (resultSet.getTimestamp("startDate") != null) {
                hackathon.setStartDate(resultSet.getTimestamp("startDate").toLocalDateTime());
            }
            if (resultSet.getTimestamp("endDate") != null) {
                hackathon.setEndDate(resultSet.getTimestamp("endDate").toLocalDateTime());
            }

            hackathon.setLocationAddress(resultSet.getString("locationAddress"));
            hackathon.sethackathonDesc(resultSet.getString("hackathonDesc"));
            hackathon.setCity(resultSet.getString("city"));
            hackathon.setLocationLink(resultSet.getString("locationLink"));
            hackathon.setFees(resultSet.getBigDecimal("fees"));
            hackathon.setMinTeamSize(resultSet.getInt("minTeamSize"));
            hackathon.setMaxTeamSize(resultSet.getInt("maxTeamSize"));
            hackathon.setTotalParticipantLimit(resultSet.getInt("totalParticipantLimit"));
            hackathon.setCreatorId(resultSet.getInt("creatorId"));

            hackathons.add(hackathon);
        }
        } catch (SQLException e) {
            e.printStackTrace(); 
        }

        return hackathons;
    }

    public Boolean saveHackathonRepo(CreateHackathonRequest request) {
        String sql = "INSERT INTO hackathon (hackathonName, hackathonMode, duration, lastRegistrationDate, " +
                    "startDate, endDate, locationAddress, locationLink, fees, minTeamSize, maxTeamSize, " +
                    "totalParticipantLimit, creatorId, hackathonDesc, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try (Connection connection = getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(sql)) {

            preparedStatement.setString(1, request.getHackathonName());
            preparedStatement.setString(2, request.getHackathonMode());
            preparedStatement.setString(3, request.getDuration());
            preparedStatement.setTimestamp(4, Timestamp.valueOf(request.getLastRegistrationDate()));
            preparedStatement.setTimestamp(5, Timestamp.valueOf(request.getStartDate()));
            preparedStatement.setTimestamp(6, Timestamp.valueOf(request.getEndDate()));
            preparedStatement.setString(7, request.getLocationAddress());
            preparedStatement.setString(8, request.getLocationLink());
            preparedStatement.setBigDecimal(9, request.getFees());
            preparedStatement.setInt(10, request.getMinTeamSize());
            preparedStatement.setInt(11, request.getMaxTeamSize());
            preparedStatement.setInt(12, request.getTotalParticipantLimit());
            preparedStatement.setInt(13, request.getCreatorId());
            preparedStatement.setString(14, request.gethackathonDesc());
            preparedStatement.setString(15, request.getCity());

            int rowsAffected = preparedStatement.executeUpdate();
            return rowsAffected > 0;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<Hackathon> getFilteredHackathonsRepo(SearchHackathonRequest request) {
        List<Hackathon> hackathons = new ArrayList<>();
        
        StringBuilder sql = new StringBuilder("SELECT * FROM hackathon WHERE 1=1 ");
        
        // Dynamically append conditions
        if (request.getId() != null) sql.append(" AND id = ?");
        if (request.getCity() != null) sql.append(" AND city = ?");
        if (request.getHackathonMode() != null) sql.append(" AND hackathonMode = ?");
        if (request.getMinTeamSize() != null) sql.append(" AND minTeamSize >= ?");
        if (request.getMaxTeamSize() != null) sql.append(" AND maxTeamSize <= ?");
        if (request.getHackathonName() != null) sql.append(" AND hackathonName LIKE ?");

        try (Connection connection = getConnection();
            PreparedStatement pstmt = connection.prepareStatement(sql.toString())) {

            int paramIndex = 1;
            // Bind parameters in the exact same order they were appended
            if (request.getId() != null) pstmt.setInt(paramIndex++, request.getId());
            if (request.getCity() != null) pstmt.setString(paramIndex++, request.getCity());
            if (request.getHackathonMode() != null) pstmt.setString(paramIndex++, request.getHackathonMode());
            if (request.getMinTeamSize() != null) pstmt.setInt(paramIndex++, request.getMinTeamSize());
            if (request.getMaxTeamSize() != null) pstmt.setInt(paramIndex++, request.getMaxTeamSize());
            if (request.getHackathonName() != null) pstmt.setString(paramIndex++, "%" + request.getHackathonName() + "%");

            try (ResultSet resultSet = pstmt.executeQuery()) {
                while (resultSet.next()) {
                    Hackathon hackathon = new Hackathon();
                    hackathon.setId(resultSet.getInt("id"));
                    hackathon.setHackathonName(resultSet.getString("hackathonName"));
                    hackathon.sethackathonDesc(resultSet.getString("hackathonDesc"));
                    hackathon.setCity(resultSet.getString("city"));
                    hackathon.setHackathonMode(resultSet.getString("hackathonMode"));
                    hackathon.setMinTeamSize(resultSet.getInt("minTeamSize"));
                    hackathon.setMaxTeamSize(resultSet.getInt("maxTeamSize"));
                    hackathons.add(hackathon);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return hackathons;
    }

    public boolean enrollTeamRepo(Integer hackathonId, Integer teamId, Integer teamSize) {
        String updateLimitSql = "UPDATE hackathon SET totalParticipantLimit = totalParticipantLimit - ? " +
                                "WHERE id = ? AND totalParticipantLimit >= ?";
        String enrollSql = "INSERT INTO enrolledHackathons (hackathonId, teamId) VALUES (?, ?)";

        try (Connection connection = getConnection()) {
            connection.setAutoCommit(false);

            try (PreparedStatement updateStmt = connection.prepareStatement(updateLimitSql);
                PreparedStatement enrollStmt = connection.prepareStatement(enrollSql)) {

                updateStmt.setInt(1, teamSize);
                updateStmt.setInt(2, hackathonId);
                updateStmt.setInt(3, teamSize);
                
                int rowsUpdated = updateStmt.executeUpdate();
                if (rowsUpdated == 0) {
                    connection.rollback();
                    return false;
                }

                enrollStmt.setInt(1, hackathonId);
                enrollStmt.setInt(2, teamId);
                enrollStmt.executeUpdate();

                connection.commit();
                return true;

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
