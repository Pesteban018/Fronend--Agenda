// CalendarComponent.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-modal';
import { useTasks } from '../context/TasksContext';

moment.locale('es');

const localizer = momentLocalizer(moment);

Modal.setAppElement('#root');

const CalendarComponent = ({ isNavVisible }) => {
  const { tasks } = useTasks();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];

    if (storedEvents.length > 0) {
      setEvents(storedEvents);
    }
  }, []);

  useEffect(() => {
    const taskEvents = tasks.map((task) => ({
      id: task._id,
      title: task.title,
      description: task.description,
      start: new Date(task.date),
      end: new Date(task.date),
    }));

    setEvents(taskEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(taskEvents));
  }, [tasks]);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className={`fixed bg-white top-12 ${isNavVisible ? 'right-[0%] left-[26%]' : 'left-[7%] right-0'} transition-all duration-300 ease-in-out h-max mr-3 rounded-lg`}>
      <div className='ml-[2%] mr-10 w-auto items-center justify-between absol mt-12 bg'>
    
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent}
          onSelecting={() => false}
          style={{ height: '500px' }}
          views={['month', 'week', 'day']}
          formats={{
            eventTimeRangeFormat: ({ start, end }, culture, local) =>
              `${moment(start).format('LT')} - ${moment(end).format('LT')}`,
          }}
        />

        {selectedEvent && (
          <Modal
            isOpen={true}
            onRequestClose={() => setSelectedEvent(null)}
            contentLabel="Detalles del Evento"
            className='ml-[40%] bg-white p-8 rounded shadow-md max-w-md mx-auto overflow-auto'
            overlayClassName='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'
          >
            {/* Contenido del modal */}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default CalendarComponent;
