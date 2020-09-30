import React, { useEffect, useState } from 'react';
import { Col, Row, Table, Container, Button } from 'react-bootstrap';
import moment from 'moment';
import sessions from '../../constants/data';

type TimetableGeneratorProps = {
  degree: string | null;
  semester: string | null;
  year: string | null;
  group: string | null;
  lecturer: string | null;
  isGenerate: boolean | null;
};

const TimetableGenerator: React.FC<TimetableGeneratorProps> = (props) => {

  const { group, year, semester, degree, lecturer, isGenerate } = props;
  const [columnsNo, setColumnsNo] = useState([1, 2, 3, 4, 5]);
  const [rowsNo, setRowsNo] = useState([]);
  const [startTime, setStartTime] = useState('08:30');
  const [endTime, setEndTime] = useState('17:30');
  const [timeSlotTime, setTimeSlotTime] = useState('60');
  const [finalSessionsLecturer, setFinalSessionsLecturer] = useState<[any[], any[], any[], any[], any[]] | null>(null);

  const getNoOfWorkingTime = (startTime, endTime) => {
    var startTime = startTime;
    var endTime = endTime;

    var todayDate = moment(new Date()).format('MM-DD-YYYY');

    var startDate = new Date(`${todayDate} ${startTime}`);
    var endDate = new Date(`${todayDate} ${endTime}`);
    var timeDiff = Math.abs(startDate.getTime() - endDate.getTime());

    var hh = Math.floor(timeDiff / 1000 / 60 / 60);
    hh = ('0' + hh).slice(-2);

    timeDiff -= hh * 1000 * 60 * 60;
    var mm = Math.floor(timeDiff / 1000 / 60);
    mm = ('0' + mm).slice(-2);

    timeDiff -= mm * 1000 * 60;
    var ss = Math.floor(timeDiff / 1000);
    ss = ('0' + ss).slice(-2);

    return ({ hours: hh, minutes: mm });
  };

  const generateNoOfTimeSlots = (timeSlotTime, startTime, endTime) => {
    const time = getNoOfWorkingTime(startTime, endTime);
    const tempHoursInMinutes = time.hours * 60;
    const slots = (parseInt(tempHoursInMinutes) + parseInt(time.minutes)) / timeSlotTime;
    return slots;
  };

  console.log(generateNoOfTimeSlots(60, '08:30:00', '17:30:00'));

  const generateTimeTableTimeColumn = () => {
    // const startTimeHours = start;
    const res = [...Array(generateNoOfTimeSlots(60, '08:30:00', '17:30:00'))].map((_, i) => {
      return (i);
    });
    setRowsNo(res);
  };

  useEffect(() => {
    generateTimeTableTimeColumn();
  }, []);

  const getSessionForLecturer = (sessions, lecturer, startTime) => {
    const sessinsForLecturer = sessions.filter((data) => data.lecturers[0] === lecturer);
    const sessionsForMonday = sessinsForLecturer.filter((data) => data.day === 'Monday');
    const sessionsForTuesday = sessinsForLecturer.filter((data) => data.day === 'Tuesday');
    const sessionsForWednesday = sessinsForLecturer.filter((data) => data.day === 'Wednesday');
    const sessionsForThursday = sessinsForLecturer.filter((data) => data.day === 'Thursday');
    const sessionsForFriday = sessinsForLecturer.filter((data) => data.day === 'Friday');
    let mondaySessionsFinal = [];

    const resMonday = [...Array(generateNoOfTimeSlots(60, '08:30:00', '17:30:00'))].map((_, i) => {

      const regex1 = /^([^:]+)/g;
      const regex2 = /[^:]+$/g;
      const hours = startTime.match(regex1);
      const minutes = startTime.match(regex2);
      let increasingHours = 0;
      if (timeSlotTime === '60') {
        if (!hours) {
          return;
        }
        // console.log(i);
        increasingHours = parseInt(hours[0]) + (i);
      }

      const sessions1 = sessionsForMonday.filter((data) => {
        const hoursData = data.startTime.match(regex1);
        // console.log(hoursData);
        // console.log(increasingHours);
        const minutesData = data.startTime.match(regex2);
        return (parseInt(hoursData[0]) === increasingHours);
      });

      // console.log(sessions1);
      return (sessions1);
    });

    const resTuesday = [...Array(generateNoOfTimeSlots(60, '08:30:00', '17:30:00'))].map((_, i) => {

      const regex1 = /^([^:]+)/g;
      const regex2 = /[^:]+$/g;
      const hours = startTime.match(regex1);
      const minutes = startTime.match(regex2);
      let increasingHours = 0;
      if (timeSlotTime === '60') {
        if (!hours) {
          return;
        }
        // console.log(i);
        increasingHours = parseInt(hours[0]) + (i);
      }

      const sessions1 = sessionsForTuesday.filter((data) => {
        const hoursData = data.startTime.match(regex1);
        // console.log(hoursData);
        // console.log(increasingHours);
        const minutesData = data.startTime.match(regex2);
        return (parseInt(hoursData[0]) === increasingHours);
      });

      // console.log(sessions1);
      return (sessions1);
    });

    const resWednesday = [...Array(generateNoOfTimeSlots(60, '08:30:00', '17:30:00'))].map((_, i) => {

      const regex1 = /^([^:]+)/g;
      const regex2 = /[^:]+$/g;
      const hours = startTime.match(regex1);
      const minutes = startTime.match(regex2);
      let increasingHours = 0;
      if (timeSlotTime === '60') {
        if (!hours) {
          return;
        }
        // console.log(i);
        increasingHours = parseInt(hours[0]) + (i);
      }

      const sessions1 = sessionsForWednesday.filter((data) => {
        const hoursData = data.startTime.match(regex1);
        // console.log(hoursData);
        // console.log(increasingHours);
        const minutesData = data.startTime.match(regex2);
        return (parseInt(hoursData[0]) === increasingHours);
      });

      // console.log(sessions1);
      return (sessions1);
    });

    const resThursday = [...Array(generateNoOfTimeSlots(60, '08:30:00', '17:30:00'))].map((_, i) => {

      const regex1 = /^([^:]+)/g;
      const regex2 = /[^:]+$/g;
      const hours = startTime.match(regex1);
      const minutes = startTime.match(regex2);
      let increasingHours = 0;
      if (timeSlotTime === '60') {
        if (!hours) {
          return;
        }
        // console.log(i);
        increasingHours = parseInt(hours[0]) + (i);
      }

      const sessions1 = sessionsForThursday.filter((data) => {
        const hoursData = data.startTime.match(regex1);
        // console.log(hoursData);
        // console.log(increasingHours);
        const minutesData = data.startTime.match(regex2);
        return (parseInt(hoursData[0]) === increasingHours);
      });

      // console.log(sessions1);
      return (sessions1);
    });

    const resFriday = [...Array(generateNoOfTimeSlots(60, '08:30:00', '17:30:00'))].map((_, i) => {

      const regex1 = /^([^:]+)/g;
      const regex2 = /[^:]+$/g;
      const hours = startTime.match(regex1);
      const minutes = startTime.match(regex2);
      let increasingHours = 0;
      if (timeSlotTime === '60') {
        if (!hours) {
          return;
        }
        // console.log(i);
        increasingHours = parseInt(hours[0]) + (i);
      }

      const sessions1 = sessionsForFriday.filter((data) => {
        const hoursData = data.startTime.match(regex1);
        // console.log(hoursData);
        // console.log(increasingHours);
        const minutesData = data.startTime.match(regex2);
        return (parseInt(hoursData[0]) === increasingHours);
      });

      // console.log(sessions1);
      return (sessions1);
    });

    let mondayFinal = [];
    let tuesdayFinal = [];
    let wednesdayFinal = [];
    let thursdayFinal = [];
    let fridayFinal = [];

    resMonday.map((data, index) => {
      mondayFinal.push(data[0]);
      return index;
    });
    resTuesday.map((data, index) => {
      tuesdayFinal.push(data[0]);
      return index;
    });
    resWednesday.map((data, index) => {
      wednesdayFinal.push(data[0]);
      return index;
    });
    resThursday.map((data, index) => {
      thursdayFinal.push(data[0]);
      return index;
    });
    resFriday.map((data, index) => {
      fridayFinal.push(data[0]);
      return index;
    });

    return [mondayFinal, tuesdayFinal, wednesdayFinal, thursdayFinal, fridayFinal];

  };

  useEffect(() => {
    // console.log(getSessionForLecturer(sessions, lecturer, startTime));
    if (lecturer != '') {
      console.log('effect');
      console.log(getSessionForLecturer(sessions, lecturer, startTime));
      setFinalSessionsLecturer(
        getSessionForLecturer(sessions, lecturer, startTime)
      );
    }
  }, [lecturer]);


  const generateTable = () => {
    console.log(finalSessionsLecturer);
    const table = (<Table striped bordered hover>
        <thead>
        <tr>
          <th>Time</th>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
        </tr>
        </thead>
        <tbody>

        <tr style={{ display: 'table-cell', width: '13%' }}>
          {
            rowsNo.map((index) => {
              const regex1 = /^([^:]+)/g;
              const regex2 = /[^:]+$/g;
              const hours = startTime.match(regex1);
              const minutes = startTime.match(regex2);
              let increasingHours = 0;
              if (timeSlotTime === '60') {
                if (!hours) {
                  return;
                }
                increasingHours = parseInt(hours[0]) + (index + 1);
              }

              if (!minutes) {
                return;
              }
              return (<td key={index} style={{ display: 'block', textAlign: 'center' }}>
                <span>{increasingHours - 1} : {minutes[0]}</span><span> - </span>
                <span>{increasingHours} : {minutes[0]}</span></td>);
            })
          }
        </tr>

        {
          columnsNo.map((index1) => {
            console.log(index1);
            return (
              <tr style={{ display: 'table-cell', width: '17%' }}>
                {finalSessionsLecturer &&
                finalSessionsLecturer[index1 - 1].map((data, index2) => {
                  if (!data) {
                    console.log('-----');
                    console.log();
                    if (!finalSessionsLecturer[index1 - 1][index2 - 1]) {
                      return (<td key={index2} style={{ display: 'block', textAlign: 'center' }}> - </td>);
                    }
                    if (finalSessionsLecturer[index1 - 1][index2 - 1].duration === '2') {
                      return (<td key={index2}
                                  style={{ display: 'block' }}>{finalSessionsLecturer[index1 - 1][index2 - 1].subjectRef}</td>);
                    }

                  }
                  return (<td key={index2} style={{ display: 'block' }}>{data.subjectRef}</td>);
                })
                }
              </tr>
            );
          })
        }
        </tbody>
      </Table>
    );

    return table;
  };

  return (
    <div>
      {isGenerate && generateTable()}
    </div>

  );
};

export default TimetableGenerator;
