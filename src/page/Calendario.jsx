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

const messages = {
  allDay: 'Todo el día',
  previous: 'Anterior',
  next: 'Siguiente',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  showMore: total => `+ Ver más (${total})`, 
  noEventsInRange: 'No hay eventos en este rango',  
};

moment.updateLocale('es', {
  weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  months: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ],
  monthsShort: [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
  ],
});

const CalendarComponent = () => {
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
      start: moment(task.date).toDate(),
      end: moment(task.date).toDate(),
    }));

    setEvents(taskEvents);

    localStorage.setItem('calendarEvents', JSON.stringify(taskEvents));
  }, [tasks]);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };
  

  return (
    <div className=' ml-[2%] mr-10 items-center justify-between absol mt-12'>
      <h1>Calendario</h1>
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
        messages={messages}
      />

      {selectedEvent && (
        <Modal
        isOpen={true}
        onRequestClose={() => setSelectedEvent(null)}
        contentLabel="Detalles del Evento"
        className=' ml-[40%] bg-white p-8 rounded shadow-md max-w-md mx-auto overflow-auto'
        overlayClassName='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'
      >
        <div className="max-w-md" style={{ maxHeight: '80vh' }}>
          <h2 className='text-2xl font-bold mb-4'>
            {selectedEvent?.title}
          </h2>
          <p className='text-gray-700 mb-4 whitespace-pre-line'>
            Descripción: {selectedEvent?.description}
          </p>
          <p className='text-gray-700 mb-4'>
            Fecha: {moment(selectedEvent?.start).format('LLL')}
          </p>
          <p className='text-gray-700 mb-4'>
            Hora: {moment(selectedEvent?.start).format('LT')}
          </p>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded '
            onClick={() => setSelectedEvent(null)}
          >
            Cerrar
          </button >
        </div>
      </Modal>
      )}
    </div>
  );
};

export default CalendarComponent;
