package com.devsprints.backend.payload.request;

public class SearchHackathonRequest {
    private Integer id;
    private String city;
    private String hackathonMode;
    private Integer minTeamSize;
    private Integer maxTeamSize;
    private String hackathonName;

    public SearchHackathonRequest() {}

    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getHackathonMode() { return hackathonMode; }
    public void setHackathonMode(String hackathonMode) { this.hackathonMode = hackathonMode; }
    public Integer getMinTeamSize() { return minTeamSize; }
    public void setMinTeamSize(Integer minTeamSize) { this.minTeamSize = minTeamSize; }
    public Integer getMaxTeamSize() { return maxTeamSize; }
    public void setMaxTeamSize(Integer maxTeamSize) { this.maxTeamSize = maxTeamSize; }
    public String getHackathonName() { return hackathonName; }
    public void setHackathonName(String hackathonName) { this.hackathonName = hackathonName; }
}