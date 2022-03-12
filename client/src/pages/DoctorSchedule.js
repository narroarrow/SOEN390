import {Paper, FormControlLabel, FormControl, FormLabel, Checkbox, Button} from '@mui/material';
import React, {useState, useEffect} from "react";
import * as moment from "moment";
import Axios from "axios";
import { Box } from '@mui/system';

const TimeSlotDayTable = (props) => {
    // Object destructuring, get the day and timeSlots properties from props, which we passed in when we used .map in the TimeSlotCalendar component
    const {day, slots, handleChange} = props;

    return (

        <div className="time-slot-day">
            <h1>{day}</h1>

            <div className="time-slot-intervals">
                {slots.map((timeSlot) => (
                    <FormControlLabel key={`${day} - ${timeSlot.label}`} control={<Checkbox/>}
                                      onChange={(event) => handleChange(event, timeSlot)} label={timeSlot.label}/>
                ))}
            </div>
        </div>


    );
};

const TimeSlotCalendar = () => {
    const DAYS_TO_DISPLAY = 5; // update this to change how many days you show automatically
    const TIME_SLOT_INTERVAL_IN_MINUTES = 30;
    const currentDate = moment().isoWeekday(0).startOf("day");
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
        // 17 - 8 = 9, 9 / 0.5 = 18 - 2 = 16, since you don't want to count 8 and 17 hours,
        const numberOfTimeSlots = (endHour - startHour) / (TIME_SLOT_INTERVAL_IN_MINUTES / 60);
        for (var i = 0; i < DAYS_TO_DISPLAY; i++) {
            let day = currentDate.add(1, "days");


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
    const submit = () => {

        let backendTimeSlots = [];
        selectedTimeSlots.forEach(timeSlot => {
            backendTimeSlots.push({
                day: timeSlot.day.substr(0, 3),
                doctorID: 1,
                startTime: timeSlot.label.substr(0, 5).concat(":00"),
                endTime: timeSlot.label.substr(8, 14).concat(":00")
            })
        })

        let doctorScheduleData = {backendTimeSlots}

        Axios.post('http://localhost:8080/doctorAppointments(JEFF-METHOD-NAME)', doctorScheduleData, {withCredentials: true}).then(res => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        });

    }
    useEffect(() => {
        calculateTimeSlots(8, 17);
    }, []);

    return <Box sx={{ p: 10 }}>
        {timeSlotsPerDay.length > 0 && timeSlotsPerDay.map((timeSlotsOnDay, index) => <TimeSlotDayTable
            handleChange={handleChange} key={`${index}`} day={timeSlotsOnDay.day} slots={timeSlotsOnDay.slots}/>)}

        <Button type="submit" variant="contained" sx={{mt: 3, mb: 2}} onClick={submit}>
            Submit
        </Button>
    </Box>;
};

export default TimeSlotCalendar;