import React, { Component } from "react";
import axios from "axios";
import Charts from "./Charts";

class DashboardPage extends Component {
  state = {
    title: "",
    value: "",
    data: {
      labels: [],
      datasets: [
        {
          label: [],
          data: [],
          backgroundColor: [],
        },
      ],
    },
  };

  async componentDidMount() {
    let token = localStorage.getItem("jwt");
    console.log("http://173.94.80.104/budget/"+localStorage.getItem("userId"))
    const res = await axios.get("http://173.94.80.104/budget/"+localStorage.getItem("userId"), {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    let tempData = this.state.data;
    for (let i = 0; i < res.data.length; i++) {
      tempData.datasets[0].data[i] = res.data[i].value;
      tempData.labels[i] = res.data[i].title;
      tempData.datasets[0].backgroundColor[i] = res.data[i].color;
    }

    this.setState({
      data: Object.assign({}, this.state.data, {
        data: tempData,
      }),
    });
  }

  handleTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  handleValue = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event) => {
    console.log(this.state.title);
    console.log(this.state.value);
    let token = localStorage.getItem("jwt");
    let color =
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    axios
      .post("http://104.131.54.49/addBudget", {
        title: this.state.title,
        value: this.state.value,
        color: color,
        userId: localStorage.getItem("userId")
      },
      { headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log(res);
        let tempData = this.state.data;

        tempData.datasets[0].data.push(res.data[0].value);
        tempData.labels.push(res.data[0].title);
        tempData.datasets[0].backgroundColor[0] = res.data[0].color;
        this.setState({ data: tempData });
        console.log(this.state.data);
      })
      .catch((err) => {
        console.log(err);
      });

    event.preventDefault();
  };

  render() {
    return (
      <div>
        <h1>Make a chart for your budget here!</h1>
        <h2>After submitting, refresh the page to see your personal budget charts!</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="budget">
          <div className="title">
            <label htmlFor="title">Enter budget name: </label>
            <input
              type="text"
              value={this.state.title}
              onChange={this.handleTitle}
            />
          </div>

          <div className="value">
            <label htmlFor="value">Enter budget value: </label>
            <input
              type="number"
              value={this.state.value}
              onChange={this.handleValue}
            />
          </div>

          <div className="submit">
            <input type="submit" value="Submit!" />
          </div>
          </div>
        </form>
        <Charts chartData={this.state.data} />
      </div>
    );
  }
}
export default DashboardPage;
