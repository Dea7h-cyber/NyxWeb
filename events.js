if (typeof server_events !== 'undefined') {
  var initEvents = function () {
    var eventBody = $('.eventBody');
    $.each(server_events, function (eventName, event) {
      var eventClass = eventName.replace(/\s/g, '') + '-Event';
      eventBody.append("<li class='top-list " + eventClass + "'><span class='top-event-name'>" + eventName + "</span>&nbsp;<span class='top-event-time eventTime'>-</span></li>")
    });
  }

  var eventUpdate = function () {
    moment.tz.setDefault("Europe/Paris");

    var st = moment();
    var et = moment().endOf('day')

    var todayWeekday = st.day();

    var secondsUntilEndOfDay = moment.duration(et.diff(st)).asSeconds();

    $.each(server_events, function (eventName, event) {

      var eventClass = eventName.replace(/\s/g, '') + '-Event';
      var closestEvent = false;
      var eventDuration = false;
      var firstEvent = false;
      var dayIsSet = false;

      // search for closest time for each event
      $.each(event.times, function (index, time) {
        var t = moment(time, 'hh:mm');
        var duration = moment.duration(st.diff(t));
        var diff = duration.asSeconds();

        if ((closestEvent == false && diff < 0) || (diff > closestEvent && diff < 0)) {
          closestEvent = diff;
          eventDuration = duration;
        }
      });

      // if no event left for today, set first event for next day
      if (eventDuration == false) {

        $.each(event.times, function (index, time) {
          var h = time.substr(0, 2);
          var m = time.substr(3, 2);
          var t = moment().add(secondsUntilEndOfDay, 'seconds').add({ hours: h, minutes: m });
          var duration = moment.duration(st.diff(t));

          eventDuration = duration;

          return false;

        });

      }

      var hours = Math.abs(eventDuration.hours());
      var minutes = Math.abs(eventDuration.minutes());
      var seconds = Math.abs(eventDuration.seconds());

      if (event.days != 0) {
        $.each(event.days, function (index, day) {

          if (todayWeekday < day) {

            var wd = moment().weekday(day - 1).add({ hours: hours, minutes: minutes, seconds: seconds });

            var duration = moment.duration(st.diff(wd));

            eventDuration = duration;

            dayIsSet = true;

            return false;
          }

        });

        if (dayIsSet == false) {
          $.each(event.days, function (index, day) {
            var wd = moment().day(7 + day).add({ hours: hours, minutes: minutes, seconds: seconds });
            var duration = moment.duration(st.diff(wd));
            eventDuration = duration;
            return false;
          });
        }

      }

      var days = Math.abs(eventDuration.days());

      var eventTime = '';

      if (days > 0)
        eventTime = eventTime + days + 'd ';
      if (hours > 0)
        eventTime = eventTime + hours + 'h ';

      eventTime = eventTime + minutes + 'm ' + seconds + 's';

      var eventTimeString = eventTime;

      var openText = event.openText == true ? '(Opened) ' : '';

      if (days == 0 && hours == 0 && 60 > minutes)
        eventTimeString = "<span style='color:#ffb86b;'>" + eventTime + "</span>";

      if (days == 0 && hours == 0 && 30 > minutes)
        eventTimeString = "<span style='color:#fff548;'>" + eventTime + "</span>";

      if (days == 0 && hours == 0 && event.toOpen > minutes)
        eventTimeString = "<span style='color:#abff29;'>" + openText + eventTime + "</span>";

      $('.' + eventClass).find('span.eventTime').html(eventTimeString);

    });

  };
  initEvents();
  setInterval(eventUpdate, 1000);
}
