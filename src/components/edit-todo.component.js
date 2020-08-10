import React, { Component } from "react";
import axios from "axios";
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";

export default class EditTodo extends Component {
  constructor(props) {
    super(props);

    this.onChangeActivity = this.onChangeActivity.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      activity: "",
    };

    this.onInitActivity();
  }

  onInitActivity = () => {
    const id = this.props.match.params.id;
    axios.get(`http://localhost:5000/todos/${id}`).then((res) => {
      this.setState({
        activity: res.data.activity
      })
    });
   
  }

  onChangeActivity(e) {
    this.setState({
      activity: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const activityvar = {
      activity: this.state.activity,
    };

    console.log(activityvar);

    const id = this.props.match.params.id;
    axios.post(`http://localhost:5000/todos/update/${id}`, activityvar).then((res) => {
      window.location = "/";
    });
  }

  render() {
    return (
      <div>
        <h3>Edit Task</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Edit Task: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.activity}
              onChange={this.onChangeActivity}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Edit Activity Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
