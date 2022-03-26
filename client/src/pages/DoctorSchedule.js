import { FormControlLabel, Checkbox, Button, Typography, Grid } from '@mui/material';
import React, { useState, useEffect } from "react";
import * as moment from "moment";
import Axios from "axios";
import { Box } from '@mui/system';
import { Navigate } from "react-router-dom";



const TimeSlotCalendar = () => {
    const DAYS_TO_DISPLAY = 5; // Number of days being displayed on the page
    const TIME_SLOT_INTERVAL_IN_MINUTES = 30; // Size (in minutes) of how large the time interval is of each checkbox
    const currentDate = moment().isoWeekday(0).startOf("day"); // Setting the reference date to equal Sunday
    const [timeSlotsPerDay, setTimeSlotsPerDay] = useState([]);
    const selectedTimeSlots = []; // An array storing the data of each selected slot.
    const [previousSlots, setPreviousSlots] = useState([])
    // Display the appropriate time slots whenever a Docotr clicks on a checkbox
    const handleChange = (event, timeSlot) => {
        console.log(event.target.checked);
        console.log(previousSlots)
        console.log(previousSlots.findIndex(slot => slot.StartTime.substr(0,5) === timeSlot.label.substr(0,5) && slot.dayName === timeSlot.day.substr(0,3)))
         if (event.target.checked) {
            selectedTimeSlots.push(timeSlot);
        } else {
           console.log('spliced');
            console.log(previousSlots);
            previousSlots.splice(previousSlots.findIndex(slot => slot.StartTime.substr(0,5) === timeSlot.label.substr(0,5) && slot.dayName === timeSlot.day.substr(0,3)),1)

             const indexToRemove = selectedTimeSlots.indexOf(timeSlot);
            if (indexToRemove > -1) {
                selectedTimeSlots.splice(indexToRemove, 1); // 2nd parameter means remove one item only
            } }
        // previousSlots.splice(previousSlots.findIndex(slot => slot.StartTime.substr(0,5) === timeSlot.label.substr(0,5) && slot.dayName === timeSlot.day.substr(0,3)))
        console.log(selectedTimeSlots)
    };

    // Creates the collumn for each day - associates the day name ex. "Monday" with the time slots
    const calculateTimeSlots = (startHour, endHour) => {

        const calculatedTimeSlots = [];
        const numberOfTimeSlots = (endHour - startHour) / (TIME_SLOT_INTERVAL_IN_MINUTES / 60);

        // Loop that creates the day ex: "Monday" and each interation increments the day to store the next day.
        for (var i = 0; i < DAYS_TO_DISPLAY; i++) {
            let day = currentDate.add(1, "days");
            let timeSlots = {
                day: day.format("dddd"),
                slots: [],
            };


            // the date will be Date-00-00-00, whatever, midnight, so add enough hours to get to your start time, so 8 am
            let incrementedTime = moment(day).add(startHour, "h");

            // Loop to create the interval times aka 08:00 - 17:00 and stores them into an array of timeSlots, each interation of the loop increases the "startTime" by 30 minutes.
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

            // Pushing the data of the time slots for the day to a larger array, which will contain the times slots for each day
            calculatedTimeSlots.push(timeSlots);
        }
        setTimeSlotsPerDay(calculatedTimeSlots);
    };
    const getDoctorSchedule = () => {
        Axios.get("http://localhost:8080/doctorFilledSlots", { params: { id: localStorage.getItem('id') } }).then((response) => {
            setPreviousSlots(response.data);
            console.log(response.data);


        }).catch(alert);

    }
    const submit = () => {

        // Iterates through each selected time slot and sends the data to the database
        let backendTimeSlots = [];
        selectedTimeSlots.forEach(timeSlot => {
            backendTimeSlots.push({
                day: timeSlot.day.substr(0, 3),
                doctorID: localStorage.getItem('id'),
                startTime: timeSlot.label.substr(0, 5).concat(":00"),
                endTime: timeSlot.label.substr(8, 14).concat(":00")
            })
        })
    console.log('yo here');
        console.log(previousSlots)
        previousSlots.forEach(slot => {
            backendTimeSlots.push({
                day: slot.dayName,
                doctorID: localStorage.getItem('id'),
                startTime: slot.StartTime,
                endTime: slot.EndTime
            })
        })

        // Posts the json object containing the doctor's times to the server and awaits a confirmation response
        let doctorScheduleData = { backendTimeSlots }
        Axios.post('http://localhost:8080/doctorAvailbility', doctorScheduleData, { withCredentials: true }).then(res => {
            console.log(res)
            alert("New time slots properly registered");
            window.location.href = "/"
        }).catch((err) => {
            console.log(err)
        });

    }
    //runs the calculateTimeSlots function whenever this page is loaded
    useEffect(() => {
        getDoctorSchedule();
        calculateTimeSlots(8, 17);

    }, []);

console.log(!!previousSlots)
    // Returning the page - displaying each element such as day name, and all checkbox containers after passing in the data to TimeSLotDayTable which creates the HTML / MUI components
   while (!previousSlots){return <div> yo</div>} return <Box sx={{ p: 10 }}>
        {timeSlotsPerDay.length > 0 && timeSlotsPerDay.map((timeSlotsOnDay, index) =>
        <TimeSlotDayTable handleChange={handleChange} key={`${index}`} day={timeSlotsOnDay.day} slots={timeSlotsOnDay.slots} previousSlots = {previousSlots} />)}

        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, ml: 7 }} onClick={submit}>
            Submit
        </Button>
    </Box>;
};
const checkChange = e =>
    e.target.checked;

function TimeSlotDayTable (props){
    // Object destructuring, get the day and timeSlots properties from props, 
    //which we passed in when we used .map in the TimeSlotCalendar component
    const { day, slots, handleChange, previousSlots } = props;

    return (
        <>
            {
                localStorage.getItem("role") != 'Doctor' && <Navigate to={"/"} refresh={true} />
            }

            <Grid>
                <Typography component="h1" variant="h3" sx={{mt: 5, mb: 5, ml: 7}}>
                    {day}
                </Typography>
                <Grid>
                    {previousSlots.length}
                    {slots.map((timeSlot) => (
                        // Displaying the checkboxes
                        <FormControlLabel sx={{ml: 6}} key={`${day} - ${timeSlot.label}`} control={<Checkbox checked= {previousSlots && !!previousSlots.some(s => s.StartTime && s.StartTime.substr(0,5) ===
                            timeSlot.label.substr(0,5) &&
                            s.dayName === day.substr(0,3)) } />}
                            onChange={(event) => handleChange(event, timeSlot)} label={timeSlot.label} />
                    ))}
                </Grid>
            </Grid>
        </>
    );
};

export default TimeSlotCalendar;