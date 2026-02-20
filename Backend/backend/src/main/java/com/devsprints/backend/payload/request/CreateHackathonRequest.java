package com.devsprints.backend.payload.request;

import java.time.LocalDateTime;
import java.math.BigDecimal;

// Represents the request body for creating a new hackathon.
public class CreateHackathonRequest {

    // The name of the hackathon.
    private String hackathonName;

    // The mode of the hackathon (online, onsite, hybrid).
    private String hackathonMode;

    // The duration of the hackathon (e.g., 24hrs).
    private String duration;

    // The last date for registration.
    private LocalDateTime lastRegistrationDate;

    // The starting date and time of the hackathon.
    private LocalDateTime startDate;

    // The ending date and time of the hackathon.
    private LocalDateTime endDate;

    // The physical address or "Online".
    private String locationAddress;

    // The Google Maps link for the location.
    private String locationLink;

    // The participation fees.
    private BigDecimal fees;

    // The minimum number of members per team.
    private Integer minTeamSize;

    // The maximum number of members per team.
    private Integer maxTeamSize;

    // The total limit of participants for the event.
    private Integer totalParticipantLimit;

    // The ID of the user creating the hackathon.
    private Integer creatorId;

    public CreateHackathonRequest() {
    }

    public CreateHackathonRequest(String hackathonName, String hackathonMode, String duration, 
                                  LocalDateTime lastRegistrationDate, LocalDateTime startDate, 
                                  LocalDateTime endDate, String locationAddress, String locationLink, 
                                  BigDecimal fees, Integer minTeamSize, Integer maxTeamSize, 
                                  Integer totalParticipantLimit, Integer creatorId) {
        this.hackathonName = hackathonName;
        this.hackathonMode = hackathonMode;
        this.duration = duration;
        this.lastRegistrationDate = lastRegistrationDate;
        this.startDate = startDate;
        this.endDate = endDate;
        this.locationAddress = locationAddress;
        this.locationLink = locationLink;
        this.fees = fees;
        this.minTeamSize = minTeamSize;
        this.maxTeamSize = maxTeamSize;
        this.totalParticipantLimit = totalParticipantLimit;
        this.creatorId = creatorId;
    }

    public String getHackathonName() {
        return hackathonName;
    }

    public void setHackathonName(String hackathonName) {
        this.hackathonName = hackathonName;
    }

    public String getHackathonMode() {
        return hackathonMode;
    }

    public void setHackathonMode(String hackathonMode) {
        this.hackathonMode = hackathonMode;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public LocalDateTime getLastRegistrationDate() {
        return lastRegistrationDate;
    }

    public void setLastRegistrationDate(LocalDateTime lastRegistrationDate) {
        this.lastRegistrationDate = lastRegistrationDate;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public String getLocationAddress() {
        return locationAddress;
    }

    public void setLocationAddress(String locationAddress) {
        this.locationAddress = locationAddress;
    }

    public String getLocationLink() {
        return locationLink;
    }

    public void setLocationLink(String locationLink) {
        this.locationLink = locationLink;
    }

    public BigDecimal getFees() {
        return fees;
    }

    public void setFees(BigDecimal fees) {
        this.fees = fees;
    }

    public Integer getMinTeamSize() {
        return minTeamSize;
    }

    public void setMinTeamSize(Integer minTeamSize) {
        this.minTeamSize = minTeamSize;
    }

    public Integer getMaxTeamSize() {
        return maxTeamSize;
    }

    public void setMaxTeamSize(Integer maxTeamSize) {
        this.maxTeamSize = maxTeamSize;
    }

    public Integer getTotalParticipantLimit() {
        return totalParticipantLimit;
    }

    public void setTotalParticipantLimit(Integer totalParticipantLimit) {
        this.totalParticipantLimit = totalParticipantLimit;
    }

    public Integer getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Integer creatorId) {
        this.creatorId = creatorId;
    }

    @Override
    public String toString() {
        return "CreateHackathonRequest{" +
               "hackathonName='" + hackathonName + '\'' +
               ", hackathonMode='" + hackathonMode + '\'' +
               ", startDate=" + startDate +
               ", creatorId=" + creatorId +
               '}';
    }
}