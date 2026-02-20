package com.devsprints.backend.controller;

import com.devsprints.backend.entity.Team; // Import the Team entity
import com.devsprints.backend.payload.request.AddTeamMemberRequest;
import com.devsprints.backend.payload.request.TeamCreateRequest; // Import TeamCreateRequest DTO
import com.devsprints.backend.service.TeamService; // Import the TeamService

import java.util.List; // Import List for returning collections of Teams
// Removed unused import java.util.ArrayList;

import org.springframework.http.HttpStatus; // For HTTP status codes
import org.springframework.http.ResponseEntity; // For creating HTTP responses
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping; // For mapping HTTP POST requests
import org.springframework.web.bind.annotation.RequestBody; // For binding request body to method parameter
import org.springframework.web.bind.annotation.RequestMapping; // For mapping web requests
import org.springframework.web.bind.annotation.RestController; // Marks this class as a REST Controller

// Marks this class as a REST Controller, meaning it handles incoming HTTP requests
// and builds RESTful web services. It automatically serializes return objects to JSON/XML.
@RestController
// Maps all requests starting with "/api/teams" to this controller. (Corrected from /api/team)
@RequestMapping("/api/team")
public class TeamController {

    private final TeamService teamService;

    // Constructor for dependency injection.
    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    // Maps HTTP GET requests to "/api/teams/allteams" to this method.
    @GetMapping("/allteams")
    public ResponseEntity<List<Team>> allteamsCon(){
        List<Team> teams = teamService.getAllTeamsService();
        return new ResponseEntity<>(teams, HttpStatus.OK);
    }

    // Maps HTTP POST requests to "/api/teams/createteam" to this method.
    @PostMapping("/createteam")
    public ResponseEntity<Team> createTeamCon(@RequestBody TeamCreateRequest teamCreateRequest) { // Using Con suffix
        try {
            Team newTeam = teamService.createTeamService(teamCreateRequest);
            return new ResponseEntity<>(newTeam, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            // Handle cases like team name already exists
            return new ResponseEntity<>(HttpStatus.CONFLICT); // Returning CONFLICT without a body
        }
    }

    @PostMapping("/addteammember")
    public boolean addteammemberCon(@RequestBody AddTeamMemberRequest addTeamMemberRequest){
        return teamService.addteammemberService(addTeamMemberRequest);
    }
}
// Meaning of each line:
// - `package com.devsprints.backend.controller;`: Declares the package.
// - `import com.devsprints.backend.entity.Team;`: Imports Team entity.
// - `import com.devsprints.backend.payload.request.TeamCreateRequest;`: Imports TeamCreateRequest DTO.
// - `import com.devsprints.backend.service.TeamService;`: Imports TeamService.
// - `import java.util.List;`: Imports List for collections.
// - `import org.springframework.http.HttpStatus;`: Imports HttpStatus.
// - `import org.springframework.http.ResponseEntity;`: Imports ResponseEntity.
// - `import org.springframework.web.bind.annotation.GetMapping;`: Imports GetMapping.
// - `import org.springframework.web.bind.annotation.PostMapping;`: Imports PostMapping.
// - `import org.springframework.web.bind.annotation.RequestBody;`: Imports RequestBody.
// - `import org.springframework.web.bind.annotation.RequestMapping;`: Imports RequestMapping.
// - `import org.springframework.web.bind.annotation.RestController;`: Imports RestController.
// - `@RestController`: Marks as a REST Controller.
// - `@RequestMapping("/api/teams")`: Base path for team endpoints (corrected to plural).
// - `public class TeamController {`: Defines TeamController class.
// - `private final TeamService teamService;`: Injects TeamService.
// - `public TeamController(TeamService teamService) { ... }`: Constructor for DI.
// - `@GetMapping("/allteams")`: Maps GET requests to /api/teams/allteams.
// - `public ResponseEntity<List<Team>> allteamsCon() { ... }`: Returns all teams (corrected to List<Team> and Con suffix).
// - `List<Team> teams = teamService.getAllTeamsService();`: Calls service to get all teams.
// - `return new ResponseEntity<>(teams, HttpStatus.OK);`: Returns 200 OK with list of teams.
// - `@PostMapping("/createteam")`: Maps POST requests to /api/teams/createteam.
// - `public ResponseEntity<Team> createTeamCon(@RequestBody TeamCreateRequest teamCreateRequest) { ... }`: Handles team creation request.
// - `try { ... } catch (RuntimeException e) { ... }`: Try-catch block for handling exceptions.
// - `Team newTeam = teamService.createTeamService(teamCreateRequest);`: Calls service to create team.
// - `return new ResponseEntity<>(newTeam, HttpStatus.CREATED);`: Returns 201 CREATED with new team.
// - `return new ResponseEntity<>(HttpStatus.CONFLICT);`: Returns 409 CONFLICT on error.


