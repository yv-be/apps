document.addEventListener('DOMContentLoaded', () => {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayNames = [
        'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
    ];

    const daysContainer = document.getElementById('calendar-days');
    const monthYear = document.getElementById('month-year');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const appointmentsContainer = document.getElementById('appointments');
    const addButton = document.getElementById('add-button');
    const popup = document.getElementById('popup');
    const closeBtn = document.querySelector('.close');
    const saveBtn = document.getElementById('save-appointment');
    const cancelBtn = document.getElementById('cancel-appointment');
    const selectedDayElement = document.getElementById('selected-day');
    const appointmentTitle = document.getElementById('appointment-title');
    const appointmentTime = document.getElementById('appointment-time');

    let selectedDay = null;
    let selectedDayDOM = null; // Keep track of the selected DOM element
    let currentDate = new Date();
    let appointments = {}; // Store appointments by date

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        monthYear.textContent = `${monthNames[month]} ${year}`;
        daysContainer.innerHTML = '';

        const firstDayOfMonth = (new Date(year, month, 1).getDay() + 6) % 7; // Adjust to start on Monday
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Render the day names
        const calendarWeekdays = document.querySelector('.calendar-weekdays');
        calendarWeekdays.innerHTML = '';
        dayNames.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.textContent = day;
            calendarWeekdays.appendChild(dayElement);
        });

        // Fill the calendar with empty slots for days of the previous month
        for (let i = 0; i < firstDayOfMonth; i++) {
            daysContainer.innerHTML += '<div></div>';
        }

        // Fill the calendar with actual days of the current month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.innerHTML = `<div class="day-content">${day}</div>`; // Use inner element

            if (day === new Date().getDate() &&
                month === new Date().getMonth() &&
                year === new Date().getFullYear()) {
                dayElement.classList.add('today');
            }

            dayElement.addEventListener('click', () => markDay(dayElement, day, month, year));

            daysContainer.appendChild(dayElement);
        }
    }

    function markDay(dayElement, day, month, year) {
        if (selectedDayDOM) {
            selectedDayDOM.classList.remove('selected');
        }
        selectedDay = new Date(year, month, day);
        selectedDayDOM = dayElement;
        dayElement.classList.add('selected');
        showAppointments(selectedDay);
    }

    function showAppointments(date) {
        const key = date.toDateString();
        const dayAppointments = appointments[key] || [];
        appointmentsContainer.innerHTML = dayAppointments.map(appt => `
            <div class="appointment">
                <div>${appt.time}</div>
                <div>${appt.title}</div>
            </div>
        `).join('');
        appointmentsContainer.style.display = dayAppointments.length > 0 ? 'block' : 'none';
    }

    function saveAppointment() {
        const title = appointmentTitle.value.trim();
        const time = appointmentTime.value.trim();

        if (!title || !validateTime(time)) {
            alert('Please insert a valid time.');
            return;
        }

        const key = selectedDay.toDateString();
        if (!appointments[key]) {
            appointments[key] = [];
        }
        appointments[key].push({ title, time });
        closePopup();
        showAppointments(selectedDay);
    }

    function validateTime(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
    }

    function openPopup() {
        if (!selectedDay) return;

        selectedDayElement.textContent = `${dayNames[selectedDay.getDay()]}::${selectedDay.getDate()}::${selectedDay.getMonth() + 1}::${selectedDay.getFullYear()}`;
        appointmentTitle.value = '';
        appointmentTime.value = '';
        popup.style.display = 'block';
    }

    function closePopup() {
        popup.style.display = 'none';
    }

    prevMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonthButton.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    addButton.addEventListener('click', openPopup);
    closeBtn.addEventListener('click', closePopup);
    cancelBtn.addEventListener('click', closePopup);
    saveBtn.addEventListener('click', saveAppointment);

    window.addEventListener('click', (event) => {
        if (event.target == popup) {
            closePopup();
        }
    });

    renderCalendar(currentDate);
});
