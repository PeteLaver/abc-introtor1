### [🏠 Main Readme](README.md) | [📋 Activity Log](activity_log.md)
---

# Project title

e.g. Analysis pipeline for investigating relationships between ETCO2 and intracranial pressure (ICP) using high-frequency physiological data.

e.g. The project includes preprocessing, spectral analysis, coherence estimation, and Bayesian modeling workflows implemented in R and Docker.

## Collaborators



## Stakeholders



## Objectives

e.g. 
- Quantify relationships between ETCO2 and ICP
- Investigate temporal dynamics and coherence structures
- Compare signal characteristics across outcome groups
- Develop reproducible Bayesian modeling workflows

## Repository Structure

```
├── abc-projecttemplate.Rproj
├── data/                     
│   ├── intermediate/
│   ├── processed/
│   └── raw/                  # Immutable source data
├── docker/
├── documentation/
├── output/
│   ├── figures/
│   ├── manuscripts/
│   ├── reports/
│   ├── slides/
│   └── tables/
├── R/                        # Re-usable functions
├── README.md
├── renv/
├── renv.lock
└── scripts/                  # Pipeline execution scripts
```

## Reproducibility

### Local Setup

Requirements:

- R
- Docker
- Git
- renv

Restore the R environment:

```r
renv::restore()
```
### Docker setup

To add

## Data notes

e.g. 
- Data are not stored here in GitHub
- Data exported from ICM+ (medians over 10 seconds)
- Data cleaned by Devon van Eck (for artefacts)
- Data cleaned by Pete Laver (for outliers or dataframe issues)
- Data stored then as .rds files for use in analysis

## Pipeline description

e.g. 
1. Data ingestion
2. Signal preprocessing
3. Detrending
4. Spectral/coherence analysis
5. Bayesian modeling
6. Figure generation

## Computationally expensive steps

Intermediate .rds files are used to avoid recomputing expensive processing steps and Bayesian model fits. 

## Important dependencies

### Key packages

- brms

## Usage examples

Running the pipeline:

```bash
Rscript scripts/run_pipeline.R
```

Generate report:

```bash
quarto render reports/analysis.qmd
```

## Methodological notes

e.g. 
- Spectral analyses sensitive to window length
- Bayesian models remain exploratory

## TODO / Roadmap

To add

## License

To add






