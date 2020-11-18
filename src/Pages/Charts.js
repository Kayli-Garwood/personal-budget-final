// import axios from "axios";
import React, { Component, componentDidMount } from "react";
import { Doughnut } from "react-chartjs-2";

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
    return <Doughnut data={this.props.chartData} />;
  }
}

export default Charts;
