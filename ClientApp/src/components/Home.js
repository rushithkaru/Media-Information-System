import React, { Component } from 'react';
import { FetchData } from './FetchData';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0)'}} >
        <FetchData/>
      </div>
    );
  }
}
