/*
    BetterKMR for Chrome
    Copyright (C) 2024 InterLabs

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

/* logintitle.js - src/modules/logintitle.js */
const logintitle = document.getElementsByClassName("modal-title")[0];
if (logintitle) {
    const intHTML2 = `
        <img src="https://photos.fife.usercontent.google.com/pw/AP1GczNe5bF2vaOrQLA6wj08tK-J77BSAsAFopeAu4-JZ_z9KFLborpgOQE=w1500-h332-s-no-gm" alt="BetterKMR" class="loglogo" style="
            height: 60px;
        ">
    `
    logintitle.innerHTML = intHTML2;
}
