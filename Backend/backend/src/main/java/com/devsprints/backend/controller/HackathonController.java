package com.devsprints.backend.controller;


import org.springframework.http.HttpStatus; 
import org.springframework.http.ResponseEntity; 
import org.springframework.web.bind.annotation.GetMapping; 
import org.springframework.web.bind.annotation.PathVariable; 
import org.springframework.web.bind.annotation.PostMapping; 
import org.springframework.web.bind.annotation.RequestBody; 
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController; 

import com.devsprints.backend.service.HackathonService;
import com.devsprints.backend.entity.Hackathon;
import com.devsprints.backend.payload.request.CreateHackathonRequest;
import com.devsprints.backend.payload.request.JoinHackathonRequest;
import com.devsprints.backend.payload.request.SearchHackathonRequest;

import java.util.List; 
import java.util.Optional;

@RestController
@RequestMapping("/api/hackathon")
public class HackathonController {

    private final HackathonService hackathonService;

    public HackathonController(HackathonService hackathonService){
        this.hackathonService = hackathonService;
    }

    @GetMapping("/getallhackathons")
    public ResponseEntity<List<Hackathon>> getAllhackathonsCon(){
        List<Hackathon> hackathons = hackathonService.getAllHackathonsService();

        return new ResponseEntity<>(hackathons, HttpStatus.OK);
    }

    @PostMapping("/createhackathon")
    public ResponseEntity<Boolean> createHackathonCon(@RequestBody CreateHackathonRequest request) {
        boolean isCreated = hackathonService.createHackathonService(request);
        if (isCreated) {
            return new ResponseEntity<>(true, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/searchhackathons")
    public ResponseEntity<List<Hackathon>> searchHackathons(@RequestBody SearchHackathonRequest request) {
        List<Hackathon> results = hackathonService.searchHackathonsService(request);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }

    @PostMapping("/joinhackathon")
    public ResponseEntity<String> joinHackathonCon(@RequestBody JoinHackathonRequest request) {
        try {
            // Pass the DTO values to the service
            boolean success = hackathonService.joinHackathonService(
                request.getUserId(), 
                request.getTeamId(), 
                request.getHackathonId()
            );
            
            if (success) {
                return new ResponseEntity<>("Team enrolled successfully!", HttpStatus.OK);
            }
            return new ResponseEntity<>("Enrollment failed.", HttpStatus.BAD_REQUEST);
        } catch (RuntimeException e) {
            // Returns the "Only creator can enroll" error
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        }
    }

}
