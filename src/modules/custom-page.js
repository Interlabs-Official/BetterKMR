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

/* custom-page.js - src/modules/custom-page.js */
if (window.location.pathname == "/example-page") {
    const sk_text = document.getElementsByClassName("sk_text")[0];
    const sk_main = document.getElementsByClassName("sk-main")[0];
    sk_text.remove();

    console.log(sk_main);
    /* sk_main.innerHTML = marked.parse(`
    <div class="sk_text sk_page sk-main-content">
        <br>
        <h1>Welcome to your custom BetterKMR page!</h1>
        <p>Here, you can define your own HTML as well as extra JavaScript and CSS.<br>
        If a page defined already exists, BetterKMR will automatically override it.</p>
	</div>
    # What's up?
    `) */
    sk_main.innerHTML = marked.parse("# Welcome to your custom BetterKMR page! \nHere, you can define your own HTML as well as extra JavaScript and CSS.\n\nIf a page defined already exists, BetterKMR will automatically override it.\n\nCustom HTML pages also support standard markdown, too!")
    sk_main.style.color = "#ffffff"
    console.log(sk_main.innerHTML);
}