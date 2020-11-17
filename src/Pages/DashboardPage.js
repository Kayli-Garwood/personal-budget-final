import React, { Component, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Chart from "./Charts";

// function DashboardPage() {
//   const [title, setTitle] = useState({});
//   const [value, setValue] = useState({});

//   const history = useHistory();

//   const handleTitle = (event) => {
//     setTitle(event.target.value);
//   };

//   const handleValue = (event) => {
//     setValue(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     console.log(title);
//     console.log(value);
//     axios
//       .post("http://localhost:4000/addBudget", { title, value })
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     event.preventDefault();
//   };
//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div className="email">
//           <label htmlFor="email">Enter budget name: </label>
//           <input type="text" onChange={handleTitle} />
//         </div>

//         <div className="pass">
//           <label htmlFor="password">Enter budget value: </label>
//           <input type="number" onChange={handleValue} />
//         </div>
//         <div className="login">
//           <input type="submit" value="Submit!" />
//         </div>
//       </form>
//       <Chart />
//     </div>
//   );
// }
class DashboardPage extends Component {
  state = {};
  componentDidMount() {
    axios.get("http://localhost:4000/budget").then((res) => {
      console.log(res);
    });
  }
   handleTitle = (event) => {
      setTitle(event.target.value);
      };
    
     handleValue = (event) => {
        setValue(event.target.value);
      };
  render(){
    return{
      <div>
      <form onSubmit={handleSubmit}>
        <div className="email">
          <label htmlFor="email">Enter budget name: </label>
          <input type="text" onChange={handleTitle} />
        </div>

        <div className="pass">
          <label htmlFor="password">Enter budget value: </label>
          <input type="number" onChange={handleValue} />
        </div>
        <div className="login">
          <input type="submit" value="Submit!" />
        </div>
      </form>
      <Chart />
    </div>
    }
  }
}
export default DashboardPage;
