import React from 'react';
import CSVExporter from './CSVExporter';

// Component to export data to CSV format
class CSVExporterButton extends React.Component {
  static columns = ["rank", "fullName", "finishTime", "flag"];
  static csvHeader = ["Rank", "Full Name", "Finish Time", "Country Code"];

  constructor(props) {
    super(props);
    // Initialize component state with transformed data
    this.state = {
      data: this.transformData(props.data),
    };
  }

  // Function to transform data to match the required format
  transformData = (data) => {
    return data.map((entry, index) => ({
      [CSVExporterButton.csvHeader[0]]: entry.rank,
      [CSVExporterButton.csvHeader[1]]: `${entry.firstName} ${entry.surname}`,
      [CSVExporterButton.csvHeader[2]]: entry.finishTime,
      [CSVExporterButton.csvHeader[3]]: entry.flag,
    }));
  };

  // Render CSVExporter component with transformed data
  render() {
    return (
      <div>
        <CSVExporter data={this.state.data} />
      </div>
    );
  }
}

export default CSVExporterButton;
