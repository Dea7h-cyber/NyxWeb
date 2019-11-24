import React, { useEffect, useState } from 'react'
import moment from 'moment'

import config from '../../config/config.json'

export default () => {
  const [events, setEvents] = useState([])

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
      config.events.forEach(event => {
        const time = getClosestTime(event.hours)
        eventsList.push([event.name, time.seconds, time.display])
      })
      setEvents(eventsList)
    }, 1000)

    return () => clearInterval(interval)
  })

  return (
    <div>
      <h1 className='content-title'>event timers</h1>
      <section className='content-body'>
        <div className='content'>
          {events.map((event, key) => (
            <Event key={key} event={event} />
          ))}
        </div>
      </section>
    </div>
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
      <div className='starting-text'>starting in</div>
      <div className='starting-time'>
        {moment.utc(timeLeft(event[1]) * 1000).format('HH:mm:ss')}
      </div>
    </div>
  )
}
