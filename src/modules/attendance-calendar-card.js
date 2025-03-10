/*
    BetterKMR for Chrome
    Copyright (C) 2025 InterLabs

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* attendance-calendar-card.js - src/modules/attendance-calendar-card.js */
const calendarCard = document.querySelector(".card-body");
calendarCard.innerHTML += `
<br>
<img src="${/* webpackIgnore: true */ chrome.runtime.getURL("icon/icon_transparent_48.png")}" width="24px" height="24px">
<a href="https://support.google.com/calendar/answer/37118" target="_blank">
    Click here for instructions on importing into Google Calendar ꜛ
</a>`;