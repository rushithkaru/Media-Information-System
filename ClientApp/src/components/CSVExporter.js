import React from 'react';

// Component to export data to CSV format
class CSVExporter extends React.Component {
  constructor(props) {
    super(props);
    // Initialize component state with data passed as props
    this.state = {
      data: props.data,
    };
  }

  // Function to trigger CSV download
  downloadCSV = () => {
    const { data } = this.state;
    // Convert data to CSV format
    const csvContent = this.convertToCSV(data);
    // Create a Blob from the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv' });
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    // Create an anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'race_results.csv';
    // Append the anchor element to the document body, trigger click, and remove the element
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // Revoke the URL to release resources
    URL.revokeObjectURL(url);
  };

  // Function to convert data to CSV format
  convertToCSV = (data) => {
    // Extract header and rows from the data
    const header = Object.keys(data[0]).join(',');
    const rows = data.map((row) => Object.values(row).join(','));
    // Concatenate header and rows with line breaks
    return `${header}\n${rows.join('\n')}`;
  };

  // Render button to export data as CSV
  render() {
    return (
      <button onClick={this.downloadCSV}>
        Export data as a CSV file
      </button>
    );
  }
}

export default CSVExporter;
