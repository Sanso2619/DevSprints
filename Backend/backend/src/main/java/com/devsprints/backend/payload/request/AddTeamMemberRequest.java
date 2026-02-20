package com.devsprints.backend.payload.request;

public class AddTeamMemberRequest {
    private Integer teamId;
    private Integer creatorId;
    private Integer newMemberId;

    public AddTeamMemberRequest() {}

    public AddTeamMemberRequest(Integer creatorId, Integer newMemberId, Integer teamId) {
        this.creatorId = creatorId;
        this.newMemberId = newMemberId;
        this.teamId = teamId;
    }

    public Integer getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Integer creatorId) {
        this.creatorId = creatorId;
    }

    public Integer getNewMemberId() {
        return newMemberId;
    }

    public void setNewMemberId(Integer newMemberId) {
        this.newMemberId = newMemberId;
    }

    public Integer getTeamId(){
        return teamId;
    }

    public void setTeamId(Integer teamId){
        this.teamId = teamId;
    }

    @Override
    public String toString() {
        return "AddTeamMemberRequest{" +
                "teamId=" + teamId +
                ", creatorId=" + creatorId +
                ", newMemberId=" + newMemberId +
                '}';
    }

}
