import React, { useEffect, useState } from 'react'
// import axios from 'axios'
import moment from 'moment'

// const minsToHours = time => {
//   const addZero = time => (time < 10 ? '0' + time : time)
//   const hours = addZero((time / 60) | 0)
//   const mins = addZero(time % 60 | 0)

//   return `${hours}:${mins}:${addZero(60 - moment().format('ss'))}`
// }

export default () => {
  const [events, setEvents] = useState([])

  const data = [
    { name: 'Blood Castle', hours: ['00:30', '06:30', '18:30'] },
    { name: 'Devil Square', hours: ['16:00', '22:00'] },
    { name: 'Chaos Castle', hours: ['18:00'] }
  ]

  const secondsAfterMidnight = time => {
    const [hours, minutes] = time.split(':')
    return Number(hours) * 60 * 60 + Number(minutes) * 60 - moment().seconds()
  }

  const getClosestTime = hours => {
    const currentSecondsAfterMidnight =
      Number(moment().hours()) * 60 * 60 +
      Number(moment().minutes() * 60) +
      Number(moment().seconds())
    const time = hours.find(
      hour => secondsAfterMidnight(hour) > currentSecondsAfterMidnight
    )

    return {
      seconds: time
        ? secondsAfterMidnight(time)
        : secondsAfterMidnight(hours[0]) + 24 * 60 * 60,
      display: time || hours[0]
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const eventsList = []
      data.forEach(event => {
        const time = getClosestTime(event.hours)
        eventsList.push([event.name, time.seconds, time.display])
      })
      setEvents(eventsList)
    }, 1000)

    return () => clearInterval(interval)
  })

  return (
    <>
      <h1 className='content-title'>event timers</h1>
      <section className='content-body'>
        {events.map((event, key) => (
          <Event key={key} event={event} />
        ))}
      </section>
    </>
  )
}

const Event = ({ event }) => {
  const timeLeft = time => {
    const currentSecondsAfterMidnight =
      Number(moment().hour()) * 60 * 60 + Number(moment().minutes() * 60)

    return time - currentSecondsAfterMidnight > 0
      ? time - currentSecondsAfterMidnight
      : time + 24 * 60 * 60 - currentSecondsAfterMidnight
  }

  return (
    <div className='event-container'>
      <div className='name'>{event[0]}</div>
      <div className='start'>{event[2]}</div>
      <div className='left'>
        {moment.utc(timeLeft(event[1]) * 1000).format('HH:mm:ss')}
      </div>
    </div>
  )
}
