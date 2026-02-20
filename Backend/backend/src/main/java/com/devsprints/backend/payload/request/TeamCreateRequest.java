package com.devsprints.backend.payload.request;

// Represents the request body for creating a new team.
public class TeamCreateRequest {
    // The name of the team.
    private String teamName;
    // The number of members in the team (optional, defaults to 1).
    private Integer numOfMembers;
    // The ID of the user creating the team.
    private Integer creatorId;

    public TeamCreateRequest() {
    }

    public TeamCreateRequest(String teamName, Integer numOfMembers, Integer creatorId) {
        this.teamName = teamName;
        this.numOfMembers = numOfMembers;
        this.creatorId = creatorId;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public Integer getNumOfMembers() {
        return numOfMembers;
    }

    public void setNumOfMembers(Integer numOfMembers) {
        this.numOfMembers = numOfMembers;
    }

    public Integer getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Integer creatorId) {
        this.creatorId = creatorId;
    }

    @Override
    public String toString() {
        return "TeamCreateRequest{" +
               "teamName='" + teamName + ' ' +
               ", numOfMembers=" + numOfMembers +
               ", creatorId=" + creatorId +
               '}';
    }
}
