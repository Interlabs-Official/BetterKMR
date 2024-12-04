const nceaqualeng1 = document.getElementsByClassName("ncea-qualification-table")[0];
const intHTML1 = `
<table class="table sk_table ncea-qualification-table">
        <tbody>
            <tr class="sk_thead">
                <th colspan="3">NCEA&nbsp;Qualification <small>(80&nbsp;credits&nbsp;required)</small></th>
                <th class="icon-cell"><div class="svg-icon info-icon" data-html="true" data-template="<div class='tooltip html-tooltip tooltip-large' role='tooltip'><div class='arrow'></div><div class='tooltip-inner'></div></div>" data-toggle="tooltip" title="" data-original-title="<h5 class='ncea-title'>How to achieve NCEA</h5><div class='ncea-content'><div class='ncea-block'><p class='ncea-title'>Level One: 80 credits</p><p>60 credits at any Level</p><b>Plus</b><br><small>10 Literacy or Te Reo Matatini credits, and 10 Numeracy or Te Pāngarau credits</small></div><div class='ncea-block'><p class='ncea-title'>Level Two: 69 credits</p><p>60 credits at Level 2 or above</p><b>Plus</b><br><small>10 Literacy or Te Reo Matatini credits, and 10 Numeracy or Te Pāngarau credits</small></div><div class='ncea-block'><p class='ncea-title'>Level Three: 80 credits</p><p>60 credits at Level 3 or above</p><b>Plus</b><br><small>10 Literacy or Te Reo Matatini credits, and 10 Numeracy or Te Pāngarau credits</small></div></div>"><!--?xml version="1.0" encoding="UTF-8"?-->
<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path id="Path" stroke="none" d="M 49.200001 99.349335 L 49.200001 95.647995 C 55.904003 94.837326 56.602665 94.367996 56.602665 86.165329 L 56.602665 63.269333 C 56.602665 55.637337 55.792004 55.290665 50.240002 54.368004 L 50.240002 51.002663 C 57.173336 50.192001 64.810669 48.687996 71.285332 46.837334 L 71.285332 86.160004 C 71.285332 94.138657 71.861336 94.714676 78.799995 95.64267 L 78.799995 99.344002 L 49.200001 99.344002 Z M 54.863998 31.455994 C 54.863998 26.832001 58.682667 23.360008 63.077332 23.360008 C 67.706665 23.360008 71.290665 26.832001 71.290665 31.455994 C 71.290665 35.855995 67.706665 39.557335 62.965332 39.557335 C 58.682667 39.557335 54.863998 35.855995 54.863998 31.455994 Z"></path>
    <path id="path1" stroke="none" d="M 64.005333 128 C 28.714666 128 0 99.290672 0 64 C 0 28.709328 28.714666 0 64.005333 0 C 99.290672 0 128 28.709328 128 64 C 128 99.290672 99.290672 128 64.005333 128 Z M 64.005333 5.333336 C 31.653334 5.333336 5.333333 31.653328 5.333333 64 C 5.333333 96.346672 31.653334 122.666664 64.005333 122.666664 C 96.346672 122.666664 122.666664 96.346672 122.666664 64 C 122.666664 31.653328 96.346672 5.333336 64.005333 5.333336 Z"></path>
</svg>
</div></th>
            </tr>
            <tr>
                <td class="th-cell">Numeracy&nbsp;Co-RequisiteGGGGGGG (10&nbsp;credits)</td>
                <td>NZQA  (2022)</td>
                <td>10 credits</td>
                <td class="icon-cell"><div class="svg-icon green-tick"><!--?xml version="1.0" standalone="no"?-->
<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="63.000000pt" height="62.000000pt" viewBox="0 0 63.000000 62.000000" preserveAspectRatio="xMidYMid meet">
<g transform="translate(0.000000,62.000000) scale(0.100000,-0.100000)">
<path fill="#888888" class="fm_fill" d="M453 455 c-52 -41 -111 -101 -165 -170 -69 -87 -85 -102 -93 -89 -43
70 -81 89 -120 60 -18 -13 -18 -15 10 -47 15 -19 41 -62 56 -97 16 -34 32 -62
37 -62 22 0 64 46 98 107 51 90 137 204 217 287 37 38 67 70 67 72 0 15 -37
-6 -107 -61z"></path>
</g>
</svg>
</div></td>
            </tr>
            <tr>
                <td class="th-cell">Literacy&nbsp;Co-Requisite (10&nbsp;credits)</td>
                <td>NZQA  (2024)</td>
                <td>10 credits</td>
                <td class="icon-cell"><div class="svg-icon green-tick"><!--?xml version="1.0" standalone="no"?-->
<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="63.000000pt" height="62.000000pt" viewBox="0 0 63.000000 62.000000" preserveAspectRatio="xMidYMid meet">
<g transform="translate(0.000000,62.000000) scale(0.100000,-0.100000)">
<path fill="#888888" class="fm_fill" d="M453 455 c-52 -41 -111 -101 -165 -170 -69 -87 -85 -102 -93 -89 -43
70 -81 89 -120 60 -18 -13 -18 -15 10 -47 15 -19 41 -62 56 -97 16 -34 32 -62
37 -62 22 0 64 46 98 107 51 90 137 204 217 287 37 38 67 70 67 72 0 15 -37
-6 -107 -61z"></path>
</g>
</svg>
</div></td>
            </tr>
            <tr>
                <td class="th-cell">Working&nbsp;Towards&nbsp;Level (60&nbsp;credits)</td>
                <td>Level One</td>
                <td>0 credits</td>
                <td class="icon-cell"><div class="svg-icon red-tick"><!--?xml version="1.0" encoding="utf-8"?-->
<svg version="1.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24">
<polygon points="21.172,0 12,9.171 2.829,0 0,2.828 9.172,12 0,21.172 2.828,24 12,14.828 21.173,23.999 
	24.001,21.171 14.828,12 24,2.828 "></polygon>
</svg>
</div></td>
            </tr>
            <tr>
                <td class="th-cell">Highest Awarded Attainment Level</td>
                <td></td>
                <td></td>
                <td class="icon-cell"></td>
            </tr>
        </tbody>
    </table>
`
nceaqualeng1.innerHTML = intHTML1;
