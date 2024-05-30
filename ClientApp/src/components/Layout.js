import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import './Style.css'

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div  className="full-height" style={{ backgroundColor: 'yellow'}}>
        <NavMenu />
        <div >
          <Container tag="main">
            {this.props.children}
          </Container>
        </div>
      </div>
    );
  }
}
