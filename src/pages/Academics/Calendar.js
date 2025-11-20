import React from 'react';

const academicYear = new Date().getFullYear();
const nextYear = academicYear + 1;

const events = [
  {
    id: 1,
    title: 'Commencement of Academic Year',
    date: `01-06-${academicYear}`,
    category: 'academic',
    description: 'Beginning of the academic year for all programs.'
  },
  {
    id: 2,
    title: 'Orientation Program',
    date: `05-06-${academicYear}`,
    category: 'event',
    description: 'Orientation program for first-year students.'
  },
  {
    id: 3,
    title: 'Mid-Term Examinations',
    date: `15-09-${academicYear}`,
    endDate: `30-09-${academicYear}`,
    category: 'exam',
    description: 'Mid-term examinations for all semesters.'
  },
  {
    id: 4,
    title: 'Technical Symposium',
    date: `15-10-${academicYear}`,
    endDate: `17-10-${academicYear}`,
    category: 'event',
    description: 'Annual technical symposium featuring workshops and competitions.'
  },
  {
    id: 5,
    title: 'End Semester Examinations',
    date: `01-12-${academicYear}`,
    endDate: `20-12-${academicYear}`,
    category: 'exam',
    description: 'End semester examinations for all programs.'
  },
  {
    id: 6,
    title: 'Winter Break',
    date: `25-12-${academicYear}`,
    endDate: `01-01-${nextYear}`,
    category: 'holiday',
    description: 'College remains closed for winter vacation.'
  },
  {
    id: 7,
    title: 'Commencement of Even Semester',
    date: `10-01-${nextYear}`,
    category: 'academic',
    description: 'Beginning of even semester for all programs.'
  },
  {
    id: 8,
    title: 'Republic Day',
    date: `26-01-${nextYear}`,
    category: 'holiday',
    description: 'Republic Day - College remains closed.'
  },
  {
    id: 9,
    title: 'Mid-Term Examinations',
    date: `15-03-${nextYear}`,
    endDate: `30-03-${nextYear}`,
    category: 'exam',
    description: 'Mid-term examinations for all semesters.'
  },
  {
    id: 10,
    title: 'Cultural Fest',
    date: `05-04-${nextYear}`,
    endDate: `07-04-${nextYear}`,
    category: 'event',
    description: 'Annual cultural festival featuring various events and performances.'
  },
  {
    id: 11,
    title: 'End Semester Examinations',
    date: `01-05-${nextYear}`,
    endDate: `20-05-${nextYear}`,
    category: 'exam',
    description: 'End semester examinations for all programs.'
  },
  {
    id: 12,
    title: 'Summer Vacation',
    date: `25-05-${nextYear}`,
    endDate: `31-05-${nextYear}`,
    category: 'holiday',
    description: 'Summer vacation for students.'
  }
];

const Calendar = () => {
  // Group events by month
  const eventsByMonth = events.reduce((acc, event) => {
    const date = new Date(event.date.split('-').reverse().join('-'));
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(event);
    return acc;
  }, {});

  const getEventIcon = (category) => {
    switch (category) {
      case 'exam':
        return '📝';
      case 'event':
        return '🎉';
      case 'holiday':
        return '🎊';
      case 'academic':
        return '🏫';
      default:
        return '📅';
    }
  };

  const getEventClass = (category) => {
    switch (category) {
      case 'exam':
        return 'exam-event';
      case 'event':
        return 'special-event';
      case 'holiday':
        return 'holiday-event';
      case 'academic':
        return 'academic-event';
      default:
        return '';
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr.split('-').reverse().join('-'));
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="academic-calendar">
      <h2>Academic Calendar {academicYear} - {nextYear}</h2>
      <div className="calendar-legend">
        <div className="legend-item"><span className="legend-icon exam"></span> Examinations</div>
        <div className="legend-item"><span className="legend-icon event"></span> Events</div>
        <div className="legend-item"><span className="legend-icon holiday"></span> Holidays</div>
        <div className="legend-item"><span className="legend-icon academic"></span> Academic</div>
      </div>

      <div className="calendar-container">
        {Object.entries(eventsByMonth).map(([monthYear, monthEvents]) => (
          <div key={monthYear} className="month-section">
            <h3>{monthYear}</h3>
            <div className="events-list">
              {monthEvents.map((event) => (
                <div key={event.id} className={`event-item ${getEventClass(event.category)}`}>
                  <div className="event-date">
                    <span className="event-icon">{getEventIcon(event.category)}</span>
                    {event.endDate 
                      ? `${formatDate(event.date)} - ${formatDate(event.endDate)}` 
                      : formatDate(event.date)}
                  </div>
                  <div className="event-details">
                    <h4>{event.title}</h4>
                    <p>{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="download-section">
        <h3>Download Academic Calendar</h3>
        <p>Download the complete academic calendar in PDF format for your reference.</p>
        <button className="btn btn-primary">
          <i className="fas fa-download"></i> Download Calendar (PDF)
        </button>
      </div>

      <div className="disclaimer">
        <p><strong>Note:</strong> The academic calendar is subject to change. Please check back regularly for updates.</p>
      </div>
    </div>
  );
};

export default Calendar;
