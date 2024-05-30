import React, { Component } from 'react';
import './Style.css';
import CSVExporterButton from './CSVExporterButton';

// Class component to fetch and display race data
export class FetchData extends Component {
  static displayName = FetchData.name;
  static columns = ["rank", "bibNumber", "firstName", "surname", "athleteId", "finishTime", "raceProgress", "teamName", "flag", "countryname"];
  static headerNames = ["Rank", "Bib Number", "First Name", "Surname", "Athlete Id", "Finish Time", "Race Progress", "Team Name", "Flag", "Country Name"];

  constructor(props) {
    super(props);
    // Initialize component state
    this.state = { 
      raceData: [], // Stores fetched race data
      loading: true, // Indicates if data is being loaded
      sortColumn: null, // Column used for sorting
      sortDirection: 'asc', // Sorting direction ('asc' or 'desc')
      raceName: 'Race Data' // Default race name
    };
  }

  // Lifecycle method, called after component is mounted
  componentDidMount() {
    // Fetch race data and race name
    this.populateWeatherData();
  }

  // Handle sorting of table columns
  handleSort = (column) => {
    // Sort only by rank or bib number
    if (column !== 'rank' && column !== 'bibNumber') return;

    const { sortColumn, sortDirection, raceData } = this.state;
    let newDirection = 'asc';

    // Toggle sorting direction if same column is clicked
    if (sortColumn === column && sortDirection === 'asc') {
      newDirection = 'desc';
    }

    // Sort data based on column and direction
    const sortedData = [...raceData].sort((a, b) => {
      const aValue = isNaN(parseInt(a[column])) ? a[column] : parseInt(a[column]);
      const bValue = isNaN(parseInt(b[column])) ? b[column] : parseInt(b[column]);

      if (aValue < bValue) {
        return newDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return newDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    // Update component state with sorted data and sorting details
    this.setState({ 
      raceData: sortedData,
      sortColumn: column,
      sortDirection: newDirection
    });
  }

  // Render table header and body
  static renderForecastsTable(raceData, sortColumn, sortDirection, handleSort) {
    return (
      <table className="table custom-table" aria-labelledby="tableLabel">
        <thead>
          <tr>
            {FetchData.headerNames.map((header, index) => (
              <th 
                key={header} 
                onClick={FetchData.columns[index] === 'rank' || FetchData.columns[index] === 'bibNumber' ? () => handleSort(FetchData.columns[index]) : undefined}
                style={FetchData.columns[index] === 'rank' || FetchData.columns[index] === 'bibNumber' ? { cursor: 'pointer' } : {}}
              >
                {header} {sortColumn === FetchData.columns[index] ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {raceData.map(row =>
            <tr key={row.athleteId}>
              {FetchData.columns.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  // Render component contents
  render() {
    const { loading, raceData, sortColumn, sortDirection } = this.state;
    // Display loading message if data is loading, otherwise render table
    let contents = loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(raceData, sortColumn, sortDirection, this.handleSort);
    // Render CSV export button if data is loaded
    let csvExportButton = !loading ? <CSVExporterButton data={raceData} /> : <></>;

    return (
      <div>
        {/* Display race name */}
        <h1 id="tableLabel" style={{ color: 'orange' }} >{this.state.raceName}</h1>
        {/* Instructions for sorting */}
        <p style={{ color: 'white' }} >Click on the relevant header to sort by either rank or bib number.</p>
        {/* Render table and CSV export button */}
        {contents}
        {csvExportButton}
      </div>
    );
  }

  // Fetch race data and race name from backend API
  async populateWeatherData() {
    // Fetch athletes' data
    const response = await fetch('raceresults/athletes');
    const data = await response.json();

    // Fetch race name
    const raceName = await fetch('raceresults/race-name');
    const raceNameString = await raceName.text();

    // Update component state with fetched data
    this.setState({ raceData: data, loading: false, raceName: raceNameString });
  }
}
