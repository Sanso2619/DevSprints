package com.devsprints.backend.payload.request;

// Represents the request body for a team to join a hackathon.
public class JoinHackathonRequest {
    private Integer userId;
    private Integer teamId;
    private Integer hackathonId;

    public JoinHackathonRequest() {}

    public JoinHackathonRequest(Integer userId, Integer teamId, Integer hackathonId) {
        this.userId = userId;
        this.teamId = teamId;
        this.hackathonId = hackathonId;
    }

    // Getters and Setters
    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }

    public Integer getTeamId() { return teamId; }
    public void setTeamId(Integer teamId) { this.teamId = teamId; }

    public Integer getHackathonId() { return hackathonId; }
    public void setHackathonId(Integer hackathonId) { this.hackathonId = hackathonId; }
}