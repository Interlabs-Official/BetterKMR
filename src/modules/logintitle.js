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
        <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/160712468/391810722-2e12559e-427d-4a47-b3d0-b854b150e606.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&amp;X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20241208%2Fus-east-1%2Fs3%2Faws4_request&amp;X-Amz-Date=20241208T205656Z&amp;X-Amz-Expires=300&amp;X-Amz-Signature=6c22b20bfca275a90c1418f345e329f50f479649e8b240122d5a20209516375e&amp;X-Amz-SignedHeaders=host" alt="BetterKMR" class="loglogo" style="
            height: 60px;
        ">
    `
    logintitle.innerHTML = intHTML2;
}