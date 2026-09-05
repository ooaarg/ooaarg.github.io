---
title: "A duration-dependent flood depth-damage function calibrated using FEMA NFIP claims from three U.S. hurricanes"
authors:
  [
    "Ivan Novikov",
    "Nikita Lazarichev",
    "Denis Ayvazov",
    "Aleksandr Popov",
    "Yuriy Dorn",
    "Roman Sultimov",
    "Aleksandr Volkov",
    "Andrei Osiptsov",
    "Yury Maximov",
  ]
date: 2026-05-01
venue: "Natural Hazards Research"
tag: "Journal"
type: "paper"
area: "misc"
span: 2
tags: ["flood damage", "depth-damage curves", "climate risk", "credit risk"]
doi: "10.1016/j.nhres.2026.05.003"
summary: "We calibrate a duration-dependent flood depth-damage function on 317,943 FEMA NFIP claims from three U.S. hurricanes, showing prolonged flooding raises damage up to 2.6× at the same depth and enabling integration into banks' credit risk models."
---

Standard depth-damage functions used in climate risk assessment — including those underpinning CLIMADA and JRC impact models — treat flood damage as an instantaneous function of water depth, ignoring the duration of inundation.

We extend the generalised logistic (Richards) function with duration-dependent parameters and calibrate it on 317,943 insurance claims from the FEMA National Flood Insurance Program, spanning three major US hurricanes: Sandy (2012, ~36 h), Harvey (2017, ~288 h), and Katrina (2005, ~120 h). To bridge residential calibration to non-residential assets, we introduce a sector adjustment multiplier $\kappa$, calibrated on 82,650 NFIP claims grouped by building stories and coverage, combined with coverage-gradient extrapolation to corporate scale.

Prolonged flooding increases the structural damage factor **2.6×** at the same water depth; this effect operates exclusively through a shift of the curve's inflection point ($\lambda = 0.46$), while the fundamental shape remains universal across events. The model reduces mean absolute error by about 50% relative to standard curves and achieves Spearman $\rho = 0.949$ ($p < 0.001$) against actual financial damage at 301 ZIP codes. Out-of-sample validation on 24 companies across six flood events yields a median predicted-to-actual ratio of 0.90× (23/24 within 0.4–2.5×), with no loss disclosures entering calibration.

Duration is a first-order determinant that existing vulnerability frameworks systematically miss. We demonstrate the full pipeline on Archer Daniels Midland's 12 flood-exposed Midwest facilities, producing facility-level damage estimates with duration effects, CapEx/OpEx decomposition, and offsets. The framework translates physical damage into shifts in probability of default via the interest coverage ratio approach, enabling direct integration into banks' internal credit risk models.
