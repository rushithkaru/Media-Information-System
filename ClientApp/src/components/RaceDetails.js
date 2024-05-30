import React, { Component } from 'react';

// Class component to display race details
export class RaceDetails extends Component {
  static displayName = RaceDetails.name;
  static columns = ["Race Name", "Race Status", "Gender", "TOD", "Last Updated", "Race Length"];

  constructor(props) {
    super(props);
    // Initialize component state
    this.state = {
      data: null, // Stores fetched race details
    };
    // Bind the method to the component instance
    this.populateRaceData = this.populateRaceData.bind(this);
  }

  // Lifecycle method, called after component is mounted
  componentDidMount() {
    // Fetch race details
    this.populateRaceData();
  }

  // Render race details table
  render() {
    const { data } = this.state;

    // Display loading message if data is not yet fetched
    if (!data) {
      return <div>Loading data...</div>;
    }

    // Render race details table with fetched data
    return (
      <div>
        <table className="table custom-table" aria-labelledby="tableLabel">
          <thead>
            <tr>
              {/* Render table header */}
              {this.constructor.columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* Render table rows with race details */}
              {Object.keys(data).map((key) => (
                <td key={key}>{typeof data[key] === 'string'
                ? data[key].toUpperCase() // Convert strings to uppercase
                : data[key]}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  // Method to fetch race data from backend API
  async populateRaceData() {
    // Fetch race data from backend API
    const response = await fetch('raceresults/racedata');
    const data = await response.json();
    console.log(data);
    // Update component state with fetched data
    this.setState({ data: data, loading: false });
    console.log(this.state.data);
  }
}
