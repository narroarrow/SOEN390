import { Paper, FormControlLabel, FormControl, FormLabel, Checkbox, FormGroup} from '@mui/material'; 
import React, { useState, useEffect } from "react";
import * as moment from "moment";

const TimeSlotDayTable = (props) => {
  // Object destructuring, get the day and timeSlots properties from props, which we passed in when we used .map in the TimeSlotCalendar component
  const { day, slots, handleChange } = props;

  return (
    <div className="time-slot-day">
      <h1>{day}</h1>

      <div className="time-slot-intervals">
        {slots.map((timeSlot) => (
          <FormControlLabel key={`${day} - ${timeSlot.label}`} control={<Checkbox />} onChange={(event) => handleChange(event, timeSlot)} label={timeSlot.label} />
        ))}
      </div>
    </div>
  );
};

const TimeSlotCalendar = () => {
  const DAYS_TO_DISPLAY = 5; // update this to change how many days you show automatically
  const TIME_SLOT_INTERVAL_IN_MINUTES = 30;
  const currentDate = moment().local().startOf("day");
  const [timeSlotsPerDay, setTimeSlotsPerDay] = useState([]);
  const selectedTimeSlots = [];

  const handleChange = (event, timeSlot) => {
    if (event.target.checked) {
      selectedTimeSlots.push(timeSlot);
    } else {
      const indexToRemove = selectedTimeSlots.indexOf(timeSlot);
      if (indexToRemove > -1) {
        selectedTimeSlots.splice(indexToRemove, 1); // 2nd parameter means remove one item only
      }
    }
  };

  const calculateTimeSlots = (startHour, endHour) => {
    const calculatedTimeSlots = [];
    // 17 - 8 = 9, 9 / 0.5 = 18 - 2 = 16, since you don't want to count 8 and 17 hours, but double check with other calculations
    const numberOfTimeSlots = (endHour - startHour) / (TIME_SLOT_INTERVAL_IN_MINUTES / 60);
    for (var i = 0; i < DAYS_TO_DISPLAY; i++) {
      let day = currentDate.add(i, "days");
      console.log(day)
      
      let timeSlots = {
        day: day.format("dddd"),
        slots: [],
      };

      // the date will be Date-00-00-00, whatever, midnight, so add enough hours to get to your start time, so 8 am
      let incrementedTime = moment(day).add(startHour, "h");

      for (var j = 0; j < numberOfTimeSlots; j++) {
        let intervalEnd = moment(incrementedTime).add(TIME_SLOT_INTERVAL_IN_MINUTES, "m");
  
        timeSlots.slots.push({
          label: `${incrementedTime.format("hh:mm")} - ${intervalEnd.format("hh:mm")}`,
          day: `${day.format("dddd")}`,
          startTime: incrementedTime,
          endTime: intervalEnd,
        });

        incrementedTime.add(TIME_SLOT_INTERVAL_IN_MINUTES, "m");
      }

      calculatedTimeSlots.push(timeSlots);
    }

    setTimeSlotsPerDay(calculatedTimeSlots);
  };

  useEffect(() => {
    calculateTimeSlots(8, 17);
  }, []);

  return <div>{timeSlotsPerDay.length > 0 && timeSlotsPerDay.map((timeSlotsOnDay, index) => <TimeSlotDayTable handleChange={handleChange} key={`${index}`} day={timeSlotsOnDay.day} slots={timeSlotsOnDay.slots} />)}</div>;
};

export default TimeSlotCalendar;






// currentDate = new Date();
// days = [];

// for (var i = 0; i < 5; i++) {
// days.push(new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + i)).toDateString());
// }



// const DAYS_TO_DISPLAY = 5; // update this to change how many days you show automatically
// const TIME_SLOT_INTERVAL_IN_MINUTES = 30; 
// const currentDate = new Date();
// const timeSlotsPerDay = [];

// const CalculateTimeSlots = (startHour, endHour) => {
// // 17 - 8 = 9, 9 / 0.5 = 18 - 2 = 16, since you don't want to count 8 and 17 hours, but double check with other calculations
// const timeSlots = ((endHour - startHour) / (60 / TIME_SLOT_INTERVAL_IN_MINUTES)) - 2;
// for (var i = 0; i < DAYS_TO_DISPLAY ; i++) {
//     day = currentDate.AddDays(i);
//     let timeSlots = {
//         day: day.getDate, // look up how to get the day's name from the date
//         slots: [],
//     }

//     // the date will be Date-00-00-00, whatever, midnight, so add enough hours to get to your start time, so 8 am
//     let incrementedTime = day.AddHours(startHour);
    
//     for (var j = 0; j < timeSlots ; j++) {
//         // format the getTime, I don't remember what the function is for it to do that, you'll have to look it up
//         timeSlots.slots.push({ 
//             label: `${incrementedTime.getTime} - ${incrementedTime.addMinuts(TIME_SLOT_INTERVAL_IN_MINUTES).getTime}`, 
//             startTime : incrementedTime.getTime,
//             endTime : incrementedTime.addMinuts(TIME_SLOT_INTERVAL_IN_MINUTES).getTime
//         });

//         incrementedTime = incrementedTime.addMinutes(TIME_SLOT_INTERVAL_IN_MINUTES).getTime;
//     }
// }
// }



// export default function DoctorSchedule(){

//         return (

//             <div align="Center">
//             <Paper elevation={24} component="form" sx={{ width: 1400, height: 1000, mt: 10}}>
//             <h1>Doctor Schedule</h1>

//             <Box sx = {{ display: 'flex', justifyContent: 'center'}}>
        
//             <FormGroup sx={{ px:5,  border: 1}}>
//             <FormLabel component="legend">Monday</FormLabel>
               
//                 <FormControlLabel control={<Checkbox/>} label="8:00 - 8:30" />
//                 <FormControlLabel control={<Checkbox/>} label="8:30 - 9:00" />
//                 <FormControlLabel control={<Checkbox/>} label="9:00 - 9:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="9:30 - 10:00" />
//                 <FormControlLabel control={<Checkbox/>} label="10:00 - 10:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="10:30 - 11:00" />
//                 <FormControlLabel control={<Checkbox/>} label="11:00 - 11:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="11:30 - 12:00" />
//                 <FormControlLabel control={<Checkbox/>} label="12:00 - 12:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="12:30 - 13:00" />
//                 <FormControlLabel control={<Checkbox/>} label="13:00 - 13:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="13:30 - 14:00" />
//                 <FormControlLabel control={<Checkbox/>} label="14:00 - 14:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="15:30 - 16:00" />
//                 <FormControlLabel control={<Checkbox/>} label="16:00 - 16:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="16:30 - 17:00" />
               
                
//             </FormGroup>

//             <FormGroup sx={{ px:5, textAlign:"center"}}>
//             <FormLabel component="legend">Tuesday</FormLabel>
//             <FormControlLabel control={<Checkbox/>} label="8:00 - 8:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="8:30 - 9:00" />
//                 <FormControlLabel control={<Checkbox/>} label="9:00 - 9:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="9:30 - 10:00" />
//                 <FormControlLabel control={<Checkbox/>} label="10:00 - 10:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="10:30 - 11:00" />
//                 <FormControlLabel control={<Checkbox/>} label="11:00 - 11:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="11:30 - 12:00" />
//                 <FormControlLabel control={<Checkbox/>} label="12:00 - 12:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="12:30 - 13:00" />
//                 <FormControlLabel control={<Checkbox/>} label="13:00 - 13:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="13:30 - 14:00" />
//                 <FormControlLabel control={<Checkbox/>} label="14:00 - 14:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="15:30 - 16:00" />
//                 <FormControlLabel control={<Checkbox/>} label="16:00 - 16:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="16:30 - 17:00" />
                
//             </FormGroup>

//             <FormGroup sx={{ px:5}}>
//             <FormLabel component="legend">Wednesday</FormLabel>
//             <FormControlLabel control={<Checkbox/>} label="8:00 - 8:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="8:30 - 9:00" />
//                 <FormControlLabel control={<Checkbox/>} label="9:00 - 9:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="9:30 - 10:00" />
//                 <FormControlLabel control={<Checkbox/>} label="10:00 - 10:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="10:30 - 11:00" />
//                 <FormControlLabel control={<Checkbox/>} label="11:00 - 11:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="11:30 - 12:00" />
//                 <FormControlLabel control={<Checkbox/>} label="12:00 - 12:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="12:30 - 13:00" />
//                 <FormControlLabel control={<Checkbox/>} label="13:00 - 13:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="13:30 - 14:00" />
//                 <FormControlLabel control={<Checkbox/>} label="14:00 - 14:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="15:30 - 16:00" />
//                 <FormControlLabel control={<Checkbox/>} label="16:00 - 16:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="16:30 - 17:00" />
                
//             </FormGroup>

//             <FormGroup sx={{ px:5}}>
//             <FormLabel component="legend">Thursday</FormLabel>
//             <FormControlLabel control={<Checkbox/>} label="8:00 - 8:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="8:30 - 9:00" />
//                 <FormControlLabel control={<Checkbox/>} label="9:00 - 9:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="9:30 - 10:00" />
//                 <FormControlLabel control={<Checkbox/>} label="10:00 - 10:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="10:30 - 11:00" />
//                 <FormControlLabel control={<Checkbox/>} label="11:00 - 11:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="11:30 - 12:00" />
//                 <FormControlLabel control={<Checkbox/>} label="12:00 - 12:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="12:30 - 13:00" />
//                 <FormControlLabel control={<Checkbox/>} label="13:00 - 13:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="13:30 - 14:00" />
//                 <FormControlLabel control={<Checkbox/>} label="14:00 - 14:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="15:30 - 16:00" />
//                 <FormControlLabel control={<Checkbox/>} label="16:00 - 16:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="16:30 - 17:00" />
                
//             </FormGroup>

//             <FormGroup sx={{ px:5}}>
//             <FormLabel component="legend">Friday</FormLabel>
//             <FormControlLabel control={<Checkbox/>} label="8:00 - 8:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="8:30 - 9:00" />
//                 <FormControlLabel control={<Checkbox/>} label="9:00 - 9:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="9:30 - 10:00" />
//                 <FormControlLabel control={<Checkbox/>} label="10:00 - 10:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="10:30 - 11:00" />
//                 <FormControlLabel control={<Checkbox/>} label="11:00 - 11:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="11:30 - 12:00" />
//                 <FormControlLabel control={<Checkbox/>} label="12:00 - 12:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="12:30 - 13:00" />
//                 <FormControlLabel control={<Checkbox/>} label="13:00 - 13:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="13:30 - 14:00" />
//                 <FormControlLabel control={<Checkbox/>} label="14:00 - 14:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="15:30 - 16:00" />
//                 <FormControlLabel control={<Checkbox/>} label="16:00 - 16:30"/>
//                 <FormControlLabel control={<Checkbox/>} label="16:30 - 17:00" />
                
//             </FormGroup>
          
//             </Box>
            
//             <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
//           Submit
//         </Button>

//               </Paper>
//             </div>
//           );
//         }
  

