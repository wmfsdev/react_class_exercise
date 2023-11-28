import React, { Component } from "react";

export class Counter extends Component {
    constructor(props) {
      super(props) 
  
  }
  
    render() {
      return (
        <h3>{this.props.count.length}</h3> 
      )
    }
  }