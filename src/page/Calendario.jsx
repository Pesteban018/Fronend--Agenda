import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-modal';
import { useTasks } from '../context/TasksContext';
import Toolbar from 'react-big-calendar/lib/Toolbar';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Importa los iconos según tu elección

moment.locale('es');

const localizer = momentLocalizer(moment);

Modal.setAppElement('#root');
class CustomToolbar extends Toolbar {
  render() {
    const { localizer: { messages }, onNavigate, label } = this.props;

    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button type="button" onClick={() => onNavigate('PREV')}>
            <FaChevronLeft />
          </button>
          <button type="button" onClick={() => onNavigate('TODAY')}>
            {messages.today}
          </button>
          <button type="button" onClick={() => onNavigate('NEXT')}>
            <FaChevronRight />
          </button>
        </span>
        <span className="rbc-toolbar-label">{label}</span>
      </div>
    );
  }
}

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

const CalendarComponent = ({ isNavVisible }) => {
  const { tasks, getTasks } = useTasks();

  useEffect(() => {
    const fetchData = async () => {
      await getTasks();
    };

    fetchData(); // Llama a getTasks después de montar el componente
  }, []);

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];

    if (storedEvents.length > 0) {
      setEvents(storedEvents);
    }
  }, []);

  useEffect(() => {
    // Verifica si tasks no es undefined antes de intentar mapearlo
    if (tasks) {
      const taskEvents = tasks.map((task) => ({
        id: task._id,
        title: task.title,
        description: task.description,
        start: new Date(task.date),
        end: new Date(task.date),
      }));

      setEvents(taskEvents);
      localStorage.setItem('calendarEvents', JSON.stringify(taskEvents));
    }
  }, [tasks]);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };
  return (
    <div className={`fixed bg-white ${isNavVisible ? 'right-[0%] left-[1%] relative' : ' relative left-[-24%] -mr-[22%]'} transition-all duration-300 ease-in-out h-max mr-3 rounded-lg`}>
      <div className='ml-[2%] mr-10 w-auto items-center justify-between absol mt-12 bg'>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent}
          onSelecting={() => false}
          style={{ height: '500px' }}
          formats={{
            eventTimeRangeFormat: ({ start, end }, culture, local) =>
              `${moment(start).format('LT')} - ${moment(end).format('LT')}`,
          }}
          components={{
            toolbar: CustomToolbar,
          }}
          messages={messages}  // Agregar los mensajes personalizados aquí
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