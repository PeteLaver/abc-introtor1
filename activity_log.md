### [🏠 Main Readme](README.md) | [📋 Activity Log](activity_log.md)
---

### Type: Teaching

# NEXT STEPS

# FLAGS

# 2026-10-21

There are several reasons for the reproducibility or replicability crisis in science. These include perverse incentives around publication, hiring, and promotion practices; poor study design where studies have low power, and researcher degrees of freedom (choices) are unconstrained; psychology of researchers around self-deception, hypothesis myopia, and confirmation bias; poor statistical practice and inference including p-hacking, HARKing, and conflation of exploration with confirmation; and methodological opacity where data, methods, analytical code, or reagents are not sufficiently or transparently documented or available. 

- missing terms
  - repeatability (same researcher, short space of time - internal precision)
  - Reusability (portability) - is my work structured cleanly enough that someone else can build on top of it - documentation and design
  - Reliability - overall consistency - is our testing apparatus or code consistently free from random measurement errors
  - internal validity - conceptual - causal accuracy - are we certain that x caused y or did an outside factor interfere
  - construct validity - conceptual - does our practical experiment actually map onto the theoretical idea we are studying


3. Structural "Credibility Indicators" in Modern Science

Because assessing this entire spectrum manually is incredibly difficult, metascience has developed shorthand indicators—often called Credibility Revolution initiatives—to signal that a paper has respected the matrix:
• Pre-registration: Registering the hypotheses and analysis plan before data collection. This ensures internal validity by preventing researchers from changing their stories after seeing the results.
• Open Science Badges: Visual badges on papers for "Open Data" and "Open Materials" that guarantee immediate reproducibility and reusability.
• Registered Reports: A publishing format where a journal agrees to publish a study before the results are known, purely based on the rigour of its methodology. This eliminates publication bias and dramatically increases the credibility of the literature.



- Google spreadsheet with audience responses and other data: https://docs.google.com/spreadsheets/d/1KmkVZbqQi645h3KcF7YbfGjo1xLEL4uIVEvt5u-E86k/edit?resourcekey=&gid=1283318485#gid=1283318485

- Nosek et al 2022 - Replicability, Robustness, and Reproducibility in Psychological Science
- https://www.annualreviews.org/docserver/fulltext/psych/73/1/annurev-psych-020821-114157.pdf?expires=1792482421&id=id&accname=ar-246440&checksum=2C9334B122951CEAB00174D586CF5D8A

- Fabrigar et al 2020 - A validity-based framework for understanding replication in psychology
- https://richardepetty.com/wp-content/uploads/2020/11/2020-pspr-fabrigar-wegener-petty-validities-framework.pdf



# 2026-10-20

- Google form responses - published to the web:
https://docs.google.com/spreadsheets/d/e/2PACX-1vRl5tqiZveofYdRG4UKR--v1oE4QNKPQrfDRSsYNaEu5S56f4xkEIwyPXjMaCCtQZJQWrD1W8zzvsKI/pub?gid=2097952417&single=true&output=csv

1KmkVZbqQi645h3KcF7YbfGjo1xLEL4uIVEvt5u-E86k

Responder's link to the form.
https://docs.google.com/forms/d/e/1FAIpQLScoCB8qP_F7_PQibXlbrCcta610dhzCR0mNN62F40K2f-iTGQ/viewform?usp=publish-editor

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
