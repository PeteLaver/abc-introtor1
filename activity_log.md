### [🏠 Main Readme](README.md) | [📋 Activity Log](activity_log.md)
---

### Type: Teaching

# NEXT STEPS

# FLAGS

# 2026-10-20

- Google form responses - published to the web:
https://docs.google.com/spreadsheets/d/e/2PACX-1vRl5tqiZveofYdRG4UKR--v1oE4QNKPQrfDRSsYNaEu5S56f4xkEIwyPXjMaCCtQZJQWrD1W8zzvsKI/pub?gid=2097952417&single=true&output=csv

1KmkVZbqQi645h3KcF7YbfGjo1xLEL4uIVEvt5u-E86k

Responder's link to the form.
https://docs.google.com/forms/d/e/1FAIpQLScoCB8qP_F7_PQibXlbrCcta610dhzCR0mNN62F40K2f-iTGQ/viewform?usp=publish-editor

<script src="gauge-animation.js"></script>
<script src="gauge-from-form.js"></script>

```{r}
#| label: radial-percentage-chart
#| echo: false
#| message: false
#| warning: false

library(echarts4r)

e_charts(elementId = "plotCompletion") |> 
  e_gauge(
    value = 0, 
    name = "You",
    min = 0,
    max = 100,
    startAngle = 90,
    endAngle = -270,
    # Customize the ring track layout
    progress = list(show = TRUE, width = 32, itemStyle = list(color = "#2b6cb0")), 
    axisLine = list(lineStyle = list(width = 32, color = list(list(1, "#e2e8f0")))),
    # Hide traditional dial elements to make it a clean ring
    pointer = list(show = FALSE), 
    axisTick = list(show = FALSE),
    splitLine = list(show = FALSE),
    axisLabel = list(show = FALSE),
    title = list(
      show = TRUE,
      fontSize = 40,
      fontWeight = "bold",
      color = "#4a5568",
      offsetCenter = list(0, "15%")  # Shifts the label down below the center
    ),
    # Center typography
    detail = list(
      valueAnimation = TRUE, 
      formatter = "{value}%", 
      offsetCenter = list(0, "-15%"),
      fontSize = 50
    ),
    animation = TRUE
  )

```

```{=html}
<p id="gauge-caption" style="text-align:center; font-size:1.5em; color:#4a5568;"></p>
```

          
          <script>
          // Helper math functions for median and IQR
          function getMedian(arr) {
            if (arr.length === 0) return 0;
            const sorted = [...arr].sort((a, b) => a - b);
            const mid = Math.floor(sorted.length / 2);
            return sorted.length % 2 !== 0 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
          }

          function getPercentile(arr, p) {
            if (arr.length === 0) return 0;
            const sorted = [...arr].sort((a, b) => a - b);
            const pos = (sorted.length - 1) * p;
            const base = Math.floor(pos);
            const rest = pos - base;
            return Math.round(sorted[base + 1] !== undefined ? sorted[base] + rest * (sorted[base + 1] - sorted[base]) : sorted[base]);
          }

          // Fetch live data and update chart
          async function updateLiveGauge() {
            const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRl5tqiZveofYdRG4UKR--v1oE4QNKPQrfDRSsYNaEu5S56f4xkEIwyPXjMaCCtQZJQWrD1W8zzvsKI/pub?gid=2097952417&single=true&output=csv";
            
            try {
              const response = await fetch(csvUrl);
              const data = await response.text();
              
              // Parse CSV rows (assuming timestamp is col 1, guess is col 2)
              const rows = data.split("\n").slice(1); // skip header
              let guesses = [];
              rows.forEach(row => {
                const cols = row.split(",");
                if (cols.length >= 2) {
                  let val = parseFloat(cols[1]); // Adjust index based on your form columns
                  if (!isNaN(val)) guesses.push(val);
                }
              });

              if (guesses.length === 0) return;

              const medVal = getMedian(guesses);
              const q25 = getPercentile(guesses, 0.25);
              const q75 = getPercentile(guesses, 0.75);

              // Target the ECharts instance
              const ec = document.getElementById('plotCompletion');
              if (!ec) return;
              const chart = echarts.getInstanceByDom(ec);
              if (!chart) return;

              // Update chart options dynamically with live stats
              chart.setOption({
                series: [{
                  data: [{ value: medVal, name: `Audience Median (IQR: ${q25}%–${q75}%)` }]
                }]
              }, false);

            } catch (error) {
              console.error("Error fetching live audience data:", error);
            }
          }

          // Trigger update when navigating to the target slide
          document.addEventListener('DOMContentLoaded', function () {
            if (typeof Reveal !== 'undefined') {
              Reveal.on('slidechanged', function (event) {
                if (event.currentSlide.id !== 'a-crisis-in-science') return;
                updateLiveGauge();
              });
            }
          });
          </script>

- reproducibility metrics from NASEM (2019)
- Bayer - only reproduced 20 to 25% of published data (Prinz et al 2011)
- 441 biomedical studies published between 2000 and 2014 (Iqbal et al 2016)
  - 268 papers with empirical data
    - 1 included link to full study protocol
    - 0 provided access to raw data
- Economics (Chang and Li 2018)
  - 67 papers
  - 50% reproduced
- Economics (Dewald et al 1986)
  - 9 papers
  - 2 reproduced
  - 3 nearly reproduced
  - 4 not reproduced
- Ioannidis 2009 (genetics, preclinical)
  - Replication of data analyses provided in 18 articles on microarray-based gene expression studies
  - Of the 18 studies, 2 analyses (11%) were replicated; 6 were partially replicated or showed some discrepancies in results; and 10 could not be replicated
- Cobey et al 2023
  - data (re)-analysis projects 88.6% reproduced

- replicability metrics from NASEM (2019)
- Begley and Ellis, 2012 - biomedical (oncology, preclinical)
  - Attempt by Amgen team to reproduce the results of 53 “landmark” studies
  - Scientific results were confirmed in 11% of the studies.
- Open Science Collaboration, 2015 - experimental psychology
  - Attempt to independently replicate selected results from 100 studies in psychology 
  - 36% of the replication studies produced significant results, compared to 97% of the original studies. The mean effect sizes were halved.
  - 47% of the studies had effect sizes that were within the bounds of the 95% confidence interval of the original study
- Camerer et al 2018 - social science
  - Attempt to replicate 21 systematically selected experimental studies in the social sciences published in Nature and Science in 2010-2015
  - Found a significant effect in the same direction as the original study for 62% (13 of 21) studies, and the effect size of the replications was on average about 50% of the original effect size.
- Camerer et al 2016 - economics
  - An effort to replicate 18 studies published in the American Economic Review and the Quarterly Journal of Economics from 2011-2014
  - Significant effect in the same direction as the original study found for 11 replications (61%); on average, the replicated effect size was 66% of the original.

- Cobey et al 2023 (reproducibility studies, 2018–2019)
  - 53.7% reproduced
  - 20.3% failed to reproduce
  - 4.5% produced mixed results
  - 21.5% could not be assessed - incomplete or poor-quality reporting
  - health sciences 85.7%
  - economics 80%
  - inter-disciplinary studies 72.7%
  - biomedicine 66.7%
  - education 40%


# 2026-10-19

- Two 1-hour introductory sessions. 
- First one is the WHY. 
- Second one is the HOW to get started.

- The talk topic / title is actually a misnomer. Working with R requires an ecosystem-wide change to operating procedures.

- Session 1
  - Reproducibility crisis in science
    - reliable
    - robust
    - reproducible
  - Pain points (why coding)
    - Multiple versions of slightly edited or updated data files - FILE NAMING GRAVEYARD
    - each one with a name that isn't clear 6 months later
    - Re-do the analysis when a new batch of data are added or something is changed.
    - copy and paste from one app to the document writing or presentation app - COPY-PASTE LOOP
    - send your paper to a different journal
    - you do an analysis and then 6 months later have to write up the methods for a paper or grant but can't remember what you did - WHAT DID I DO? AMNESIA
  - There are many ways to skin a cat ... R and coding aren't the only solution here
  - How coding and R solve some of these pain points
    - why R?
  - There is a whole universe out there
    - Wow them with some demonstrations
      - presentations
      - manuscripts
      - applications
      - other?
  - If you want to publish in a leading journal you will need to provide your data and your code.

- Analogies
  - Cooking recipe (reproducible)
  - Lab protocol or standard operating procedure
  - Surgical tray preparation 
    - R packages and libraries with pre-loaded tools
    - often checked and published in peer-reviewed literature
  - Audit trail (version control)
  - Patient file with clinical notes
    - given the next person the information they need
    - hashtag comments
  - diagnostic panels or automated assays
    - instead of manually testing each sample by hand
    - run a designated panel
    - reliably do that for thousands of patients
  - interactive patient decision tools
