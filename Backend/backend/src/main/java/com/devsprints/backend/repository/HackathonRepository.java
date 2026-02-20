package com.devsprints.backend.repository;

import java.sql.*; 
import java.util.ArrayList; 
import java.util.List; 
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import com.devsprints.backend.entity.Hackathon;
import com.devsprints.backend.entity.User;
import com.devsprints.backend.payload.request.CreateHackathonRequest;

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
            
            // Converting SQL Datetime to Java LocalDateTime
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
                    "totalParticipantLimit, creatorId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        try (Connection connection = getConnection();
            PreparedStatement pstmt = connection.prepareStatement(sql)) {

            pstmt.setString(1, request.getHackathonName());
            pstmt.setString(2, request.getHackathonMode());
            pstmt.setString(3, request.getDuration());
            pstmt.setTimestamp(4, Timestamp.valueOf(request.getLastRegistrationDate()));
            pstmt.setTimestamp(5, Timestamp.valueOf(request.getStartDate()));
            pstmt.setTimestamp(6, Timestamp.valueOf(request.getEndDate()));
            pstmt.setString(7, request.getLocationAddress());
            pstmt.setString(8, request.getLocationLink());
            pstmt.setBigDecimal(9, request.getFees());
            pstmt.setInt(10, request.getMinTeamSize());
            pstmt.setInt(11, request.getMaxTeamSize());
            pstmt.setInt(12, request.getTotalParticipantLimit());
            pstmt.setInt(13, request.getCreatorId());

            int rowsAffected = pstmt.executeUpdate();
            return rowsAffected > 0;

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

}
