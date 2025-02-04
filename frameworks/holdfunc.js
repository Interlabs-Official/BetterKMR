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

/* holdfunc.js - frameworks/holdfunc.js */

/* A small framework that holds some things BetterKMR uses, especially debugging */
function notify(message) {
    console.log(`%c[BetterKMR ⚡] ` + `%c` + message, 'color:rgb(214, 211, 0)', 'color: #fff');
}

window.holdfunc = {
    notify: notify
};

notify("All console logs displayed here will be shown in English.");