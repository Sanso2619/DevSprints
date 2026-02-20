package com.devsprints.backend.entity;

import java.time.LocalDateTime;
import java.math.BigDecimal;

public class Hackathon {

    private Integer id;

    private String hackathonName;

    private String hackathonDesc;

    private String hackathonMode;

    private String duration;

    private LocalDateTime lastRegistrationDate;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private String city;

    private String locationAddress;

    private String locationLink;

    private BigDecimal fees;

    private Integer minTeamSize;

    private Integer maxTeamSize;

    private Integer totalParticipantLimit;

    private Integer creatorId;

    public Hackathon() {
    }

    public Hackathon(Integer id, String hackathonName, String hackathonDesc, String hackathonMode, String duration, 
                     LocalDateTime lastRegistrationDate, LocalDateTime startDate, LocalDateTime endDate, 
                     String city, String locationAddress, String locationLink, BigDecimal fees, 
                     Integer minTeamSize, Integer maxTeamSize, Integer totalParticipantLimit, Integer creatorId) {
        this.id = id;
        this.hackathonName = hackathonName;
        this.hackathonDesc = hackathonDesc;
        this.hackathonMode = hackathonMode;
        this.duration = duration;
        this.lastRegistrationDate = lastRegistrationDate;
        this.startDate = startDate;
        this.endDate = endDate;
        this.city = city;
        this.locationAddress = locationAddress;
        this.locationLink = locationLink;
        this.fees = fees;
        this.minTeamSize = minTeamSize;
        this.maxTeamSize = maxTeamSize;
        this.totalParticipantLimit = totalParticipantLimit;
        this.creatorId = creatorId;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getHackathonName() { return hackathonName; }
    public void setHackathonName(String hackathonName) { this.hackathonName = hackathonName; }

    public String gethackathonDesc() { return hackathonDesc; }
    public void sethackathonDesc(String hackathonDesc) { this.hackathonDesc = hackathonDesc; }

    public String getHackathonMode() { return hackathonMode; }
    public void setHackathonMode(String hackathonMode) { this.hackathonMode = hackathonMode; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public LocalDateTime getLastRegistrationDate() { return lastRegistrationDate; }
    public void setLastRegistrationDate(LocalDateTime lastRegistrationDate) { this.lastRegistrationDate = lastRegistrationDate; }

    public LocalDateTime getStartDate() { return startDate; }
    public void setStartDate(LocalDateTime startDate) { this.startDate = startDate; }

    public LocalDateTime getEndDate() { return endDate; }
    public void setEndDate(LocalDateTime endDate) { this.endDate = endDate; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getLocationAddress() { return locationAddress; }
    public void setLocationAddress(String locationAddress) { this.locationAddress = locationAddress; }

    public String getLocationLink() { return locationLink; }
    public void setLocationLink(String locationLink) { this.locationLink = locationLink; }

    public BigDecimal getFees() { return fees; }
    public void setFees(BigDecimal fees) { this.fees = fees; }

    public Integer getMinTeamSize() { return minTeamSize; }
    public void setMinTeamSize(Integer minTeamSize) { this.minTeamSize = minTeamSize; }

    public Integer getMaxTeamSize() { return maxTeamSize; }
    public void setMaxTeamSize(Integer maxTeamSize) { this.maxTeamSize = maxTeamSize; }

    public Integer getTotalParticipantLimit() { return totalParticipantLimit; }
    public void setTotalParticipantLimit(Integer totalParticipantLimit) { this.totalParticipantLimit = totalParticipantLimit; }

    public Integer getCreatorId() { return creatorId; }
    public void setCreatorId(Integer creatorId) { this.creatorId = creatorId; }

    @Override
    public String toString() {
        return "Hackathon{" +
                "id=" + id +
                ", hackathonName='" + hackathonName + '\'' +
                ", hackathonMode='" + hackathonMode + '\'' +
                ", city='" + city + '\'' +
                ", fees=" + fees +
                ", startDate=" + startDate +
                '}';
    }
}