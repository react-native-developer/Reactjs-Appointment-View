import React from 'react';
import '../Style/App.css';
import ActivityData from '../Fixtures/activityData';
import {diff_hours, getPreviousDate, getNextDate} from '../Utils/util';
import ActivityCard from '../Components/activityCard';
var moment = require('moment');

class ProgressDash extends React.Component {
  state = {
    selectedDate: null,
    activities: ActivityData.activities,
    newActivities: [],
    hourRange: [ {hour: "10 AM"},
      {hour: "11 AM"},
      {hour: "12 AM"},
      {hour: "1 PM"},
      {hour: "2 PM"},
      {hour: "3 PM"},
      {hour: "4 PM"},
      {hour: "5 PM"}
    ],
    initialTime: 10,
    activeActivityName: ""
  };

  componentDidMount() {
    this.setDate();
  }

  // for setDate
  setDate = (newDate) => {
    const {  activities } = this.state
    const date = newDate || new Date(activities[0].startdate);
    
    let resultArray = activities.filter((data) => {
      if( moment(data.startdate).format('L') === moment(date).format('L')){
        data.timeSlots = diff_hours( new Date(data.enddate), new Date(data.startdate)) * 12.5;
        data.slotLeftAlign = (parseInt(moment(data.startdate).utc().format('HH')) - this.state.initialTime ) * 12.5;
        return data;
      }
    });

    this.setState({
      newActivities: resultArray,
      selectedDate:
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    });
  };

  render() {
    const { selectedDate, newActivities, hourRange } = this.state;

    // activitylist view condition
    let activityList;
    if(newActivities.length > 0){
    activityList = newActivities.map((list, index) => {
        return(
          <li key={index} className={this.state.activeActivityName === list.name ? 'active' : ''} onClick={() => {this.setState({activeActivityName: list.name })}}>
              <h2 className="text-with-dots">{list.name}:</h2>
              <p className="text-with-dots">{list.description}</p>
          </li>
        )
    })} else{
      activityList = <div className="noactivity">No Activity Found</div>;
    }

    // processbar view condition
    let processBar;
    if(newActivities.length > 0){
      processBar = newActivities.map((list, index) => {
        let lightClrPercentage;
        if( list.progress != 100 ){
          lightClrPercentage = <div className="boxinnerother" style={{ width: (list.timeSlots * (100 - list.progress)/100) + "%" }}>{100- list.progress}%</div>;
        } else{
          lightClrPercentage = null;
        }
        return(
          <div className="box" key={index}><div className="boxinner" style={{ width: (list.timeSlots * list.progress/100) +"%", marginLeft: list.slotLeftAlign +"%" }}>{list.progress}%</div>{lightClrPercentage}</div>
        )
    })
    } else{
      processBar = <div className="noData">NO Data found</div>
    }
   
    return (
      <div className="activitybox">
        <div className="activityboxleft">
          <h1>Activity/hourly</h1>
          <ul className="activitylist">
            {activityList}
          </ul>
        </div>
        <div className="activityboxright">
          <div className="mainhead">
            <div className="headdate">
              <a onClick={() => {this.setDate(getPreviousDate(selectedDate))}}> <i className="fa fa-caret-left fa-lg"></i>  </a>
              <span>{moment(selectedDate).format('dddd')} | {moment(selectedDate).format('LL')}</span>
              <a onClick={() => {this.setDate(getNextDate(selectedDate))} }> <i className="fa fa-caret-right fa-lg"></i>  </a>
            </div>
            <div className="activitygraph">
              <ul className="hours">
                {hourRange.map((list, index) => {
                  return <ActivityCard list={list} key={index}/>
                })}
              </ul>            
            </div>
          </div>
            <div className="mainactivitygraph">
              <ul className="hoursgraph">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              {processBar}
            </div>
          </div>
      </div>
    );
  }
}

export default ProgressDash;