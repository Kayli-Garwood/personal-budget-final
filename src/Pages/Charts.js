// import axios from "axios";
import React, { Component } from "react";
import { Doughnut, Radar } from "react-chartjs-2";
//  const Charts = (props) => {

// const [chartData, setChartState] = useState(props.data);
// useEffect(() => {
//   // Note: the backend server is now on port 3001 since React defaults to 3000
//   setChartState(props.data);
// });

//   return (
//     <Doughnut data={props.chartData} />
//   );
// }

class Charts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Doughnut data={this.props.chartData} />
        {/* <Radar data={this.props.chartData} /> */}
      </div>
    );
  }
}

export default Charts;
