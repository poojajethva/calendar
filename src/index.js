import { generateCalendarHtml } from '../src/templates/generateHtml.js'
import { domeEvents } from './dom.js';
import { currentDate } from './helpers/date.js';

window.addEventListener('DOMContentLoaded', (event) => {
    domeEvents();
    generateCalendarHtml(currentDate());
});
