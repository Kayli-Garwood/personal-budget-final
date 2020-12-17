import React, { Component } from "react";
import { Doughnut, Pie, Polar } from "react-chartjs-2";

class Charts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Doughnut width={450} height={250} data={this.props.chartData} />
        <Pie width={450} height={250} data={this.props.chartData} />
        {/* <Polar data={this.props.chartData}/> */}
      </div>
    );
  }
}

export default Charts;
