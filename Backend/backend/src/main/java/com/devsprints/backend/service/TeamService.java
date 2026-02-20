package com.devsprints.backend.service;

import com.devsprints.backend.entity.Team; // Import the Team entity
import com.devsprints.backend.repository.TeamRepository; // Import the TeamRepository
import com.devsprints.backend.payload.request.AddTeamMemberRequest;
import com.devsprints.backend.payload.request.TeamCreateRequest; // Import TeamCreateRequest DTO
import org.springframework.stereotype.Service; // Marks this class as a Spring Service

import java.util.List;
import java.util.Optional; // For handling Optional return types

// Marks this class as a Spring Service component.
// Services typically contain business logic and act as an intermediary
// between controllers and repositories.
@Service
public class TeamService {

    private final TeamRepository teamRepository;

    // Constructor for dependency injection.
    public TeamService(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    public List<Team> getAllTeamsService(){
        return teamRepository.findAllTeamsRepo(); // Corrected method call
    }

    // Handles the business logic for creating a new team.
    public Team createTeamService(TeamCreateRequest teamCreateRequest) { // Using Service suffix
        // Check if a team with the given name already exists
        Optional<Team> existingTeam = teamRepository.findByTeamNameRepo(teamCreateRequest.getTeamName());
        if (existingTeam.isPresent()) {
            // Team name already exists. In a real app, you'd throw a custom exception.
            throw new RuntimeException("Team name already exists: " + teamCreateRequest.getTeamName());
        }

        Team newTeam = new Team();
        newTeam.setTeamName(teamCreateRequest.getTeamName());
        newTeam.setCreatorId(teamCreateRequest.getCreatorId());
        // numOfMembers will use the default value 1 if not provided, or the provided value.
        newTeam.setNumOfMembers(teamCreateRequest.getNumOfMembers());

        // Save the new team to the database.
        Team savedTeam = teamRepository.saveTeamRepo(newTeam);

        // Re-fetch the team to ensure we have the most up-to-date representation
        Optional<Team> fetchedTeamOptional = teamRepository.findByTeamNameRepo(savedTeam.getTeamName());
        if (fetchedTeamOptional.isPresent()) {
            return fetchedTeamOptional.get();
        } else {
            System.err.println("Error: Team saved but could not be re-fetched by name: " + savedTeam.getTeamName());
            return savedTeam; // Fallback
        }
    }

    public boolean addteammemberService(AddTeamMemberRequest addTeamMemberRequest){
        return teamRepository.addteammemberRepo(addTeamMemberRequest.getTeamId(), addTeamMemberRequest.getCreatorId(), addTeamMemberRequest.getNewMemberId());
    }
}
// Meaning of each line:
// - `package com.devsprints.backend.service;`: Declares the package.
// - `import com.devsprints.backend.entity.Team;`: Imports Team entity.
// - `import com.devsprints.backend.repository.TeamRepository;`: Imports TeamRepository.
// - `import com.devsprints.backend.payload.request.TeamCreateRequest;`: Imports TeamCreateRequest DTO.
// - `import org.springframework.stereotype.Service;`: Imports Service annotation.
// - `import java.util.Optional;`: Imports Optional.
// - `@Service`: Marks this class as a Spring Service.
// - `public class TeamService {`: Defines the TeamService class.
// - `private final TeamRepository teamRepository;`: Injects TeamRepository.
// - `public TeamService(TeamRepository teamRepository) { ... }`: Constructor for DI.
// - `public Team createTeamService(TeamCreateRequest teamCreateRequest) { ... }`: Creates a new team.
// - `Optional<Team> existingTeam = teamRepository.findByTeamNameRepo(teamCreateRequest.getTeamName());`: Checks for existing team name.
// - `if (existingTeam.isPresent()) { throw new RuntimeException(...); }`: Throws exception if team name exists.
// - `Team newTeam = new Team();`: Creates a new Team entity.
// - `newTeam.setTeamName(teamCreateRequest.getTeamName());`: Sets team name.
// - `newTeam.setCreatorId(teamCreateRequest.getCreatorId());`: Sets creator ID.
// - `newTeam.setNumOfMembers(teamCreateRequest.getNumOfMembers());`: Sets number of members.
// - `Team savedTeam = teamRepository.saveTeamRepo(newTeam);`: Saves the new team.
// - `Optional<Team> fetchedTeamOptional = teamRepository.findByTeamNameRepo(savedTeam.getTeamName());`: Re-fetches the saved team.
// - `if (fetchedTeamOptional.isPresent()) { ... } else { ... }`: Returns re-fetched team or fallback.
