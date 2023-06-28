import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";
import Navigation from "../Navigation/Navigation";
import { ADD_EVENT } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    start: "",
    end: "",
    eventTitle: "",
  });

  const { loading, data } = useQuery(QUERY_ME);
  const dataEvents = data?.me.events || [];

  useEffect(() => {
    if (dataEvents.length) {
      const newEvents = dataEvents.map((event) => ({
        start: new Date(parseInt(event.start)).toLocaleDateString(),
        end: new Date(parseInt(event.end)).toLocaleDateString(),
        eventTitle: event.eventTitle,
      }));
      setEvents(newEvents);
    }
  }, [dataEvents]);

  useEffect(() => {
    // console.log(events);
    // if (events.length > 0){
    //   const newEvents = events.map(event => ({start: event.start, end: event.end, title: event.eventTitle}))
    //   setEvents(newEvents)
    // }
  }, [events]);

  const [addEvent, { errors }] = useMutation(ADD_EVENT);

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();

      const parsedStart = moment(newEvent.start).toDate();
      const parsedEnd = moment(newEvent.end).toDate();

      const updatedEvent = { ...newEvent, start: parsedStart, end: parsedEnd };
      console.log(updatedEvent);
      if (selectedEvent) {
        // Editing existing event
        const updatedEvents = events.map((event) =>
          event === selectedEvent ? { ...updatedEvent } : event
        );
        // add query
        const { data } = await addEvent({
          variables: {
            ...updatedEvent,
          },
        });
        setEvents(updatedEvents);
        setSelectedEvent(null);
      } else {
        // add query
        const { data } = await addEvent({
          variables: {
            ...updatedEvent,
          },
        });
        // Adding new event
        setEvents([...events, updatedEvent]);
      }
//trying to figure this ish out
      setNewEvent({ start: "", end: "", eventTitle: "" });
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditEventClick = (event) => {
    const { start, end, eventTitle } = event;
    const formattedStart = moment(start).format("YYYY-MM-DDTHH:mm");
    const formattedEnd = moment(end).format("YYYY-MM-DDTHH:mm");

    setNewEvent({ start: formattedStart, end: formattedEnd, eventTitle });
    setSelectedEvent(event);
    setShowForm(true);
  };

  const handleDeleteEventClick = (event) => {
    const updatedEvents = events.filter((e) => e !== event);
    setEvents(updatedEvents);

    // Clear newEvent state if the deleted event was being edited or added
    if (selectedEvent === event) {
      setNewEvent({ start: "", end: "", eventTitle: "" }); // Clear the newEvent state
      setSelectedEvent(null);
    }
  };

  const handleDeleteButtonClick = () => {
    if (selectedEvent) {
      handleDeleteEventClick(selectedEvent);
    } else {
      setNewEvent({ start: "", end: "", eventTitle: "" }); // Clear the newEvent state
      setShowForm(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEventClick = () => {
    setSelectedEvent(null);
    setShowForm(true);
  };

  return (
    <div>
      <Navigation />
      {!showForm && (
        <button id="add-event-button" onClick={handleAddEventClick}>
          Add Event
        </button>
      )}

      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <input
            className="input-box"
            type="text"
            name="eventTitle"
            placeholder="Event Title"
            value={newEvent.eventTitle}
            onChange={handleInputChange}
          />
          <br />
          <label>Start Date and Time:</label>
          <br />
          <input
            className="input-box"
            type="datetime-local"
            name="start"
            value={newEvent.start}
            onChange={handleInputChange}
          />
          <br />
          <label>End Date and Time:</label>
          <br />
          <input
            className="input-box"
            type="datetime-local"
            name="end"
            value={newEvent.end}
            onChange={handleInputChange}
          />
          <br />
          <button id="update-event-button" type="submit">
            {selectedEvent ? "Update Event" : "Save Event"}
          </button>
          <button
            className="cancel-btn"
            type="button"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
          <button
            className="delete-btn"
            type="button"
            onClick={handleDeleteButtonClick}
          >
            Delete Event
          </button>
        </form>
      )}
      {events ? (
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          views={["month", "week", "day", "agenda"]} // Include agenda view
          events={events}
          titleAccessor="title"
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleEditEventClick}
          components={{
            event: (props) => (
              <EventComponent
                {...props}
                onDeleteEvent={handleDeleteEventClick}
              />
            ),
          }}
          style={{ height: "500px" }}
        />
      ) : (
        <div>Inside calender loading LOL</div>
      )}
    </div>
  );
};

const EventComponent = (props) => {
  // console.log(props);
  const { eventTitle: title } = props.event;
  // console.log(title);
  return (
    <div>
      <strong>{title}</strong>
    </div>
  );
};

export default MyCalendar;
