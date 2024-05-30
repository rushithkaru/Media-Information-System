namespace MyMarathonApp.Models
{
    public class Results
    {
        public string raceStatus { get; set; }
        public string gender { get; set; }
        public string raceName { get; set; }
        public string tod { get; set; }
        public string lastUpdated { get; set; }
        public double raceLength { get; set; }
        public List<Athlete> athletes { get; set; }
    }

    public class Athlete
    {
        public int rank { get; set; }
        public string firstName { get; set; }
        public string surname { get; set; }
        public string athleteId { get; set; }
        public string finishTime { get; set; }
        public string raceProgress { get; set; }
        public string teamName { get; set; }
        public string bibNumber { get; set; }
        public string flag { get; set; }
        public string countryname { get; set; }
    }

    public class RaceResults
    {
        public Results results { get; set; }
    }
}

