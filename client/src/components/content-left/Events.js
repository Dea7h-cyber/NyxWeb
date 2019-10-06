import React, { Fragment, useState, useEffect } from 'react'
// import axios from 'axios'
import moment from 'moment'

function Events() {
  const [events, setEvents] = useState([])
  const [render, setRender] = useState([])

  useEffect(() => {
    const data = [
      { name: 'Blood Castle', hours: ['00:30', '02:30', '04:30', '06:30', '08:30', '10:30', '12:30', '14:30', '16:30', '18:30', '20:30', '22:30'] },
      { name: 'Devil Square', hours: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'] },
      { name: 'Chaos Castle', hours: ['17:00', '19:00', '21:00'] },
    ]

    setEvents(data)

    // const interval = setInterval(() => {
    //   console.log(events);

    //   setEvents(data)
    //   setRender([])
    // }, 1000);
    // return () => clearInterval(interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [])

  useEffect(() => {
    function findRemainingTime(hours = []) {
      const date = moment()
      const timeSinceMidnight = Number(date.format('HH')) * 60 + Number(date.format('mm'))

      const hoursToMinutes = hours.map(hour => {
        const [hours, min] = hour.split(':')
        return Number(hours) * 60 + Number(min) - timeSinceMidnight
      }).sort((a, b) => a - b).filter(mins => mins > 0)[0]

      return {
        minutes: minsToHours(hoursToMinutes),
        format: moment(date.add(hoursToMinutes, 'minutes')).format('HH:mm')
      }
    }

    function calcNewRender() {
      return events.map(event => {
        const remainig = findRemainingTime(event.hours);
        return {
          name: event.name,
          remainig: remainig.minutes,
          format: remainig.format
        }
      })
    }

    setRender(calcNewRender())

    setInterval(() => {
      setRender(calcNewRender())
    }, 1000)

  }, [events])

  function minsToHours(time) {
    const addZero = time => time < 10 ? `0${time}` : time
    const hours = addZero(time / 60 | 0)
    const mins = addZero(time % 60 | 0)

    return `${hours}:${mins}:${addZero(60 - moment().format('ss'))}`
  }

  return (
    <Fragment>
      <h1 className="content-title">event timers</h1>
      <section className="content-body padding">
        {/* {render.map((event, key) => <div key={key}>{event.name} | {event.remainig} at {event.format}</div>)} */}
      </section>
    </Fragment>
  )
}

export default Events;