package com.devsprints.backend.service;

import org.springframework.stereotype.Service;
import java.util.List; 

import com.devsprints.backend.entity.Hackathon;
import com.devsprints.backend.payload.request.CreateHackathonRequest;
import com.devsprints.backend.payload.request.SearchHackathonRequest;
import com.devsprints.backend.repository.HackathonRepository;

@Service
public class HackathonService {
    private final HackathonRepository hackathonRepository;

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
}
