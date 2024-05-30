using Microsoft.AspNetCore.Mvc;
using MyMarathonApp.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;

[ApiController]
[Route("[controller]")]
public class RaceResultsController : ControllerBase
{
    private RaceResults _results;

    // Constructor to initialize and load race results
    public RaceResultsController()
    {
        _results = new RaceResults();
        LoadRaceResults(); // Load race results from JSON file
        SanitiseData(ref _results); // Sanitize loaded data
    }

    // Load race results from JSON file
    private void LoadRaceResults()
    {
        var jsonFilePath = Path.Combine(Directory.GetCurrentDirectory(), "DataFiles", "MarathonResults.json");

        // Read JSON file and deserialize into RaceResults object
        using (StreamReader r = new StreamReader(jsonFilePath))
        {
            string json = r.ReadToEnd();        
            _results = JsonConvert.DeserializeObject<RaceResults>(json); 
        }
    }

    // Get all race results
    [HttpGet]
    public ActionResult<RaceResults> Get()
    {
        return Ok(_results);
    }

    // Get list of athlete data
    [HttpGet("athletes")]
    public IActionResult GetAthleteData()
    {
        List<Athlete> athletes = _results.results.athletes;
        return Ok(athletes);
    }

    // Get race data
    [HttpGet("racedata")]
    public IActionResult GetRaceData()
    {
        var nonAthleteData = new
        {
            _results.results.raceName,
            _results.results.raceStatus,
            _results.results.gender,
            _results.results.tod,
            _results.results.lastUpdated,
            _results.results.raceLength
        };

        return Ok(nonAthleteData);
    }

    // Get race name
    [HttpGet("race-name")]
    public IActionResult GetRaceName()
    {
        return Ok(_results.results.raceName);
    }

    // Method to remove leading zeros from a string
    public static string RemoveLeadingZeros(string input)
    {
        input = input.TrimStart('0');

        if (input == "")
            input = "0";

        return input;
    }

    // Method to remove "Team " prefix from team name
    public static string RemoveTeamPrefix(string teamName)
    {
        if (teamName.StartsWith("Team ", StringComparison.OrdinalIgnoreCase))
        {
            return teamName.Substring(5); // Remove "Team " prefix
        }
        else
        {
            return teamName;
        }
    }

    // Sanitize race data by removing leading zeros from bib numbers and "Team " prefix from team names
    public static void SanitiseData(ref RaceResults results)
    {
        foreach (var athlete in results.results.athletes)
        {
            athlete.bibNumber = RemoveLeadingZeros(athlete.bibNumber);
            athlete.teamName = RemoveTeamPrefix(athlete.teamName);
        }
    }

}
