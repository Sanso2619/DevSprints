package com.devsprints.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List; 

import com.devsprints.backend.entity.Hackathon;
import com.devsprints.backend.entity.Team;
import com.devsprints.backend.payload.request.CreateHackathonRequest;
import com.devsprints.backend.payload.request.SearchHackathonRequest;
import com.devsprints.backend.repository.HackathonRepository;
import com.devsprints.backend.repository.TeamRepository;
import java.util.Optional; 

@Service
public class HackathonService {
    @Autowired
    private HackathonRepository hackathonRepository;

    @Autowired
    private TeamRepository teamRepository;

    public HackathonService(HackathonRepository hackathonRepository){
        this.hackathonRepository = hackathonRepository;
    }

    public List<Hackathon> getAllHackathonsService(){
        return hackathonRepository.getAllHackathonsRepo();
    }

    public Boolean createHackathonService(CreateHackathonRequest request) {
        return hackathonRepository.saveHackathonRepo(request);
    }

    public List<Hackathon> searchHackathonsService(SearchHackathonRequest request) {
        return hackathonRepository.getFilteredHackathonsRepo(request);
    }

    public boolean joinHackathonService(Integer userId, Integer teamId, Integer hackathonId) {
        Optional<Team> teamOpt = teamRepository.findByIdTeamRepo(teamId);
        
        if (teamOpt.isEmpty()) {
            throw new RuntimeException("Team not found.");
        }
        
        Team team = teamOpt.get();

        if (!team.getCreatorId().equals(userId)) {
            throw new RuntimeException("Only the team creator can enroll the team.");
        }

        Integer teamSize = team.getNumOfMembers(); 

        return hackathonRepository.enrollTeamRepo(hackathonId, teamId, teamSize);
    }
}
