import { Chart } from "chart.js/auto"; 

chrome.storage.sync.get('exp_results-summary', function(data) {
  if (data['exp_results-summary'] == true) {
    if (
      window.location.href.includes("results_list") ||
      window.location.href.includes("results_all") ||
      window.location.href.includes("results_summary")
    ) {
      const targetBox = document.querySelector(".page-title");

      if (targetBox) {

        targetBox.innerHTML = ""; 

        targetBox.style.backgroundColor = "rgb(0 0 0 / 35%)"; 
        targetBox.style.border = "1px solid rgba(255, 255, 255, 0.1)";
        targetBox.style.padding = "20px";
        targetBox.style.color = "white";
        targetBox.style.position = "relative"; 
        targetBox.style.fontFamily =
          "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        targetBox.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.35)";
        targetBox.style.marginTop = "20px";
        targetBox.style.marginBottom = "20px";
        targetBox.style.textAlign = "left"; 

        const styles = `
                .page-title .credits-summary-header-inline {
                    display: flex;
                    justify-content: center;
                    text-align: center;
                    align-items: center;
                    cursor: pointer;
                }
                .page-title .summary-title-inline {
                    margin: 0;
                    font-size: 1.4em;
                    font-weight: 600;
                    color: #ffffff;
                }
                .page-title .toggle-details-btn-inline {
                    background: none;
                    border: none;
                    font-size: 1.5em;
                    cursor: pointer;
                    color: #a0a0a0; 
                    transition: transform 0.3s ease, color 0.3s ease;
                    padding: 0 5px;
                }
                .page-title .toggle-details-btn-inline:hover {
                    color: #ecf0f1;
                }
                .page-title .toggle-details-btn-inline.expanded {
                    transform: rotate(180deg);
                }
                .page-title .credits-summary-content-inline {
                    display: none;
                    padding-top: 10px;
                    animation: fadeInInline 0.4s ease-out;
                }
                @keyframes fadeInInline {
                    from { opacity: 0; transform: translateY(-12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .page-title .credits-summary-content-inline.open {
                    display: block;
                }
                .page-title #creditsChartContainerInline {
                    margin-bottom: 18px;
                    border-radius: 8px;
                    padding: 5px; 
                    min-height: 220px; 
                    position: relative; 
                }
                .page-title #creditsChartInline {
                    max-width: 100%;
                    height: auto !important;
                }
                .page-title .credits-stats-inline {
                    text-align: left;
                }
                .page-title .credits-stats-inline p {
                    margin: 9px 0;
                    font-size: 1em;
                    color: #bdc3c7;
                }
                .page-title .credits-stats-inline strong {
                    color: #ecf0f1;
                    font-weight: 600;
                }
            `;
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);

        targetBox.innerHTML = `
                <div class="credits-summary-header-inline" id="credits-summary-header-toggle-inline" role="button" tabindex="0" aria-expanded="false">
                    <h4 class="summary-title-inline">Credits Summary</h4>
                    <button class="toggle-details-btn-inline" id="toggle-details-btn-inline" title="Show/Hide Details" aria-hidden="true" tabindex="-1">▼</button>
                </div>
                <div class="credits-summary-content-inline" id="credits-summary-details-inline" aria-hidden="true">
                    <div id="creditsChartContainerInline">
                        <canvas id="creditsChartInline"></canvas>
                    </div>
                    <div class="credits-stats-inline"></div>
                </div>
            `;

        const cells = document.getElementsByClassName("result-value");
        const results = {
          Excellence: 0,
          Merit: 0,
          Achieved: 0,
          "Not Achieved": 0,
        };
        let totalResultsFoundOnPage = 0;

        Array.from(cells).forEach((cell) => {
          const kbd = cell.parentElement.querySelector(".result_title").querySelector("kbd");
          if (kbd.innerHTML == "A" || kbd.innerHTML == "U") {
            const text = cell.textContent.trim();
            const lowerText = text.toLowerCase();
            let foundCategory = false;

            if (lowerText.includes("excellence")) {
                results["Excellence"]++;
                foundCategory = true;
            } else if (lowerText.includes("merit")) {
                results["Merit"]++;
                foundCategory = true;
            } else if (lowerText.includes("not achieved")) {
                results["Not Achieved"]++;
                foundCategory = true;
            } else if (lowerText.includes("achieved")) {
                results["Achieved"]++;
                foundCategory = true;
            }

            if (foundCategory) {
                totalResultsFoundOnPage++;
            }
          }
        });

        const chartCanvas = document.getElementById("creditsChartInline");
        const statsDiv = targetBox.querySelector(".credits-stats-inline");
        const chartContainer = targetBox.querySelector(
          "#creditsChartContainerInline",
        );

        if (totalResultsFoundOnPage === 0) {
          statsDiv.innerHTML =
            "<p>No NCEA results data found on this page to display.</p>";
          chartContainer.style.display = "none";
        } else {

        const chartLabels = [];
        const chartDataValues = [];  // Ensure this is always initialized
        const backgroundColors = [];
        const colorMap = {
          Excellence: "#FFC107",
          Merit: "#2196F3",
          Achieved: "#4CAF50",
          "Not Achieved": "#9E9E9E",
        };

        try {
          const displayOrder = ["Excellence", "Merit", "Achieved", "Not Achieved"];
          displayOrder.forEach((key) => {
            if (results[key] > 0) {
              chartLabels.push(key);
              chartDataValues.push(results[key]);
              backgroundColors.push(colorMap[key]);
            }
          });

          if (chartDataValues.length > 0) {
            const chartConfigData = {
              labels: chartLabels,
              datasets: [
                {
                  data: chartDataValues,
                  backgroundColor: backgroundColors,
                  borderColor: "rgba(35, 40, 50, 0.92)", 
                  borderWidth: 2,
                },
              ],
            };

            new Chart(chartCanvas, {
              type: "pie",
              data: chartConfigData,
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: "NCEA Credits",
                    color: "#ecf0f1",
                    align: "center",
                    font: {
                      size: 15,
                      weight: "600",
                    },
                    padding: {
                      top: 5,
                      bottom: 15,
                    },
                  },
                  legend: {
                    display: true,
                    position: "left",
                    align: "center", 
                    labels: {
                      color: "#bdc3c7",
                      font: {
                        size: 11,
                      },
                      boxWidth: 12,
                      padding: 10,
                      usePointStyle: true,
                      pointStyle: "rectRounded",
                    },
                  },
                  tooltip: {
                    backgroundColor: "rgba(0,0,0,0.8)",
                    titleColor: "#ffffff",
                    bodyColor: "#ffffff",
                    callbacks: {
                      label: function (context) {
                        let label = "";
                        if (label) {
                          label += ": ";
                        }
                        if (context.parsed !== null) {
                          label += context.parsed;
                        }
                        const total = context.dataset.data.reduce(
                          (a, b) => a + b,
                          0,
                        );
                        const percentage =
                          total > 0
                            ? ((context.parsed / total) * 100).toFixed(1) + "%"
                            : "0%";
                        label += ` (${percentage})`;
                        return label;
                      },
                    },
                  },
                },
              },
            });
          } else {
            chartContainer.innerHTML =
              "<p style='text-align:center; padding-top:20px;'>No data available for chart.</p>";
          }
        } catch (error) {
            console.error("Error while processing chart data:", error);
            chartContainer.innerHTML = "<p style='text-align:center; padding-top:20px;'>Error creating chart visualization.</p>";
        }

          const totalCreditsForStats = chartDataValues.reduce((a, b) => a + b, 0);
          let statsHTML = `<p><strong>Total Results Analysed:</strong> ${totalCreditsForStats}</p>`;
          if (totalCreditsForStats > 0) {
            if (results["Excellence"] > 0)
              statsHTML += `<p><strong>Excellence:</strong> ${results["Excellence"]}</p>`;
            if (results["Merit"] > 0)
              statsHTML += `<p><strong>Merit:</strong> ${results["Merit"]}</p>`;
            if (results["Achieved"] > 0)
              statsHTML += `<p><strong>Achieved:</strong> ${results["Achieved"]}</p>`;
            if (results["Not Achieved"] > 0)
              statsHTML += `<p><strong>Not Achieved:</strong> ${results["Not Achieved"]}</p>`;
          } else if (
            totalResultsFoundOnPage > 0 &&
            totalCreditsForStats === 0
          ) {
            statsHTML = `<p>Found ${totalResultsFoundOnPage} results, but none matched the standard NCEA grades for statistics.</p>`;
          }
          statsDiv.innerHTML = statsHTML;
        }

        const headerToggle = targetBox.querySelector(
          "#credits-summary-header-toggle-inline",
        );
        const detailsContent = targetBox.querySelector(
          "#credits-summary-details-inline",
        );
        const toggleButtonIcon = targetBox.querySelector(
          "#toggle-details-btn-inline",
        );

        const toggleDetails = () => {
          const isOpen = detailsContent.classList.toggle("open");
          toggleButtonIcon.classList.toggle("expanded", isOpen);
          toggleButtonIcon.innerHTML = isOpen ? "▲" : "▼";
          headerToggle.setAttribute("aria-expanded", isOpen.toString());
          detailsContent.setAttribute("aria-hidden", (!isOpen).toString());
        };

        headerToggle.addEventListener("click", toggleDetails);
        headerToggle.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            toggleDetails();
            event.preventDefault();
          }
        });

        if (chartDataValues.length > 0) {
          detailsContent.classList.add("open");
          toggleButtonIcon.classList.add("expanded");
          toggleButtonIcon.innerHTML = "▲";
          headerToggle.setAttribute("aria-expanded", "true");
          detailsContent.setAttribute("aria-hidden", "false");
        } else {

          detailsContent.classList.remove("open");
          toggleButtonIcon.classList.remove("expanded");
          toggleButtonIcon.innerHTML = "▼";
          headerToggle.setAttribute("aria-expanded", "false");
          detailsContent.setAttribute("aria-hidden", "true");
        }
      } else {
        console.warn(
          "'.page-title' element not found. Credits summary cannot be displayed.",
        );
      }
    }
  }
});