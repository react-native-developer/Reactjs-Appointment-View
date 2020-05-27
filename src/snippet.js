import React from 'react';
import logo from './logo.svg';
import './App.css';
var moment = require('moment');
class Snippet extends React.Component {
  state = {
    selectedDate: null,
    activities: [
      {
        "name": "Activity 01",
        "description": "A short description",
        "startdate": "2020-04-30T10:00:00.000Z",
        "enddate": "2020-04-30T15:00:00.000Z",
        "progress": 100
      },
      {
        "name": "The second activity",
        "description": "This description is going to be longer and will most likely spread across many lines. An ellipsis is probably needed. ",
        "startdate": "2020-04-30T15:00:00.000Z",
        "enddate": "2020-04-30T18:00:00.000Z",
        "progress": 75
      },
      {
        "name": "The third activity",
        "description": "A much shorter description for three. ",
        "startdate": "2020-05-01T10:00:00.000Z",
        "enddate": "2020-05-01T12:00:00.000Z",
        "progress": 100
      },
      {
        "name": "ACTIVITY 04",
        "description": "This description is going to be much longer and will most likely spread across many lines. If an ellipsis is not used then it risks looking silly compared to the rest of the boxes. It is possible on bigger screen sizes that this may not be an issue but on the minimum size for this interface it will overflow.  ",
        "startdate": "2020-05-01T10:00:00.000Z",
        "enddate": "2020-05-01T13:00:00.000Z",
        "progress": 100
      },
      {
        "name": "ACT 5",
        "description": "A description on activity five. ",
        "startdate": "2020-05-01T11:30:00.000Z",
        "enddate": "2020-05-01T14:00:00.000Z",
        "progress": 80
      },
      {
        "name": "A much longer activity long for activity 6",
        "description": "Another generic description. ",
        "startdate": "2020-05-01T12:00:00.000Z",
        "enddate": "2020-05-01T16:00:00.000Z",
        "progress": 75
      },
      {
        "name": "Activity 7",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi id neque maximus, lobortis risus et, finibus tortor. Aenean id enim nisi. Fusce at mauris posuere eros egestas convallis et vel quam. Phasellus blandit rhoncus arcu, non ultrices libero pretium et. Proin posuere laoreet nulla facilisis tincidunt. className aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque viverra purus id efficitur viverra. Nam dapibus mauris id nisl aliquam varius. Vivamus ullamcorper ex non dignissim ultrices. Mauris consequat nisi a massa accumsan, nec pellentesque erat egestas. className aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin consequat, arcu a imperdiet mattis, risus justo scelerisque justo, vitae iaculis felis ipsum a metus. Etiam erat neque, auctor placerat lacinia vel, venenatis efficitur velit. Donec a tellus eget ex pharetra sodales.",
        "startdate": "2020-05-01T14:00:00.000Z",
        "enddate": "2020-05-01T18:00:00.000Z",
        "progress": 25
      },
      {
        "name": "ACTIVITY 8",
        "description": "Activity 8",
        "startdate": "2020-05-01T15:30:00.000Z",
        "enddate": "2020-05-01T18:00:00.000Z",
        "progress": 20
      },
      {
        "name": "ACT 9",
        "description": "Activity 9 has a small discription ",
        "startdate": "2020-05-04T10:00:00.000Z",
        "enddate": "2020-05-04T16:00:00.000Z",
        "progress": 15
      },
      {
        "name": "Activity 10",
        "description": "Act 10 description here",
        "startdate": "2020-05-04T16:00:00.000Z",
        "enddate": "2020-05-04T18:00:00.000Z",
        "progress": 0
      }
    ],
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
      endTime: 6
  };

  // life cycle method
  componentDidMount() {
    this.setDate();
  }

  // function for setDate
  setDate = (newDate) => {
    const {  activities } = this.state
    const date = newDate || new Date('2020-04-30T10:00:00.000Z');
    
    let resultArray = activities.filter((data) => {
      if( moment(data.startdate).format('L') === moment(date).format('L')){
        data.timeSlots = this.diff_hours( new Date(data.enddate), new Date(data.startdate)) * 12.5;
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

  // function to find different btw hour
  diff_hours = (dt2, dt1) => {
    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
  }

  // function to get previous date
  getPreviousDate = () => {
    const { selectedDate } = this.state;
    const currentDayInMilli = new Date(selectedDate).getTime()
    const oneDay = 1000 * 60 * 60 * 24
    const previousDayInMilli = currentDayInMilli - oneDay
    const previousDate = new Date(previousDayInMilli);
    this.setDate(previousDate);
  }

  // function to get next date
  getNextDate = () => {
    const { selectedDate } = this.state;
    const currentDayInMilli = new Date(selectedDate).getTime()
    const oneDay = 1000 * 60 * 60 * 24
    const nextDayInMilli = currentDayInMilli + oneDay
    const nextDate = new Date(nextDayInMilli);
    this.setDate(nextDate);
  }

  // render view
  render() {
    const { selectedDate, newActivities, hourRange, endTime } = this.state;
    let activityList;
    if(newActivities.length > 0){
    activityList = newActivities.map((list, index) => {
        return(
          <li key={index}>
              <h2>{list.name}:</h2>
              <p className="text-with-dots">{list.description}</p>
          </li>
        )
    })} else{
      activityList = <div className="noactivity">No Activity Found</div>;
    }

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
              <a onClick={this.getPreviousDate}> <i className="fa fa-caret-left fa-lg"></i>  </a>
              <span>{moment(selectedDate).format('dddd')} | {moment(selectedDate).format('LL')}</span>
              <a onClick={this.getNextDate}> <i className="fa fa-caret-right fa-lg"></i>  </a>
            </div>
            <div className="activitygraph">
              <ul className="hours">
                {hourRange.map((list, index) => {
                  return(
                    <li key={index}>
                        {list.hour}
                    </li>
                  )
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

export default Snippet;