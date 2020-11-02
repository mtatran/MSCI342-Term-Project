import React, { Component, Fragment } from "react";
import queryString from 'query-string'
import _ from 'lodash';

import "./AppointmentList.scss";
import UserTypes from '../../constants/userTypes.json';

const axios = require('axios').default;
var moment = require('moment');

export default class AppointmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: []
    }
  }

  // Make a call to get all the appointments for the user.
  componentDidMount() {
    var params = { accessToken: this.props.user.accessToken };

    // Passes in the appropriate parameter depending on the type of user.
    if (this.props.user.userType === UserTypes.student) params.studentId = this.props.user.personId;
    else params.workerId = this.props.user.personId;

    axios.get(`/api/appointments/?${queryString.stringify(params)}`)
      .then(res => {
        // Only stores the appointment data if no error occured and the data is not null.
        // Else, shows no upcoming appointments and logs the error.
        if (_.isNil(res.error) && !_.isNil(res.data)) {
          this.setState({
            appointments: res.data,
          });
        } else {
          console.log('Error occurred when mounting the AppointmentList ', res.error);
        }
      });
  }

  render() {
    // Display a message to the user if they do not have any appointments.
    if (_.isEmpty(this.state.appointments)) return <h3>No Upcoming Appointments!</h3>

    // Render their appointments in tablular form.
    else {
      return (
        <div className="appointmentList">
          <h3>Upcoming Appointments: </h3>
          <ul>
            {
              this.state.appointments.map((appointment) => (
                <li className="appointment" id={appointment.appointmentId}>
                  <div className="first-row">
                    <div className="specific-date">{moment(appointment.date).format('dddd, MMM D, YYYY')}</div>
                    {/* Display either the student name or worker name depending on the specific user. */}
                    {this.props.user.userType === UserTypes.student ?
                      <div className="person-name">{appointment.worker.firstName} {appointment.worker.lastName}</div>
                      :
                      <div className="person-name">{appointment.student.firstName} {appointment.student.lastName}</div>
                    }
                  </div>
                  <div className="times">{appointment.startTime.substring(0, 5)} to {appointment.endTime.substring(0, 5)}</div>
                </li>
              ))
            }
          </ul>
        </div>
      )
    }
  }
}