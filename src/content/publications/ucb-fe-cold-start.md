---
title: "UCB-Based Feature Engineering for Cold-Start in Recommenders"
authors:
  [
    "Anastasiia Soboleva",
    "Andrey Pudovikov",
    "Aleksandr Katrutsa",
    "Roman Snetkov",
    "Alina Babenko",
    "Egor Samosvat",
    "Yuriy Dorn",
  ]
date: 2026-08-08
venue: "KDD 2026"
tag: "Paper"
type: "paper"
area: "autobidding"
span: 2
tags: ["cold-start", "CTR prediction", "multi-armed bandits", "feature engineering"]
doi: "10.1145/3770855.3817886"
summary: "We introduce UCB-FE, a model-agnostic technique that transforms behavioral features with position-aware upper confidence bounds, boosting cold items in CTR ranking without any weight or architecture changes."
heroSummary: "CTR models rank new items poorly until they gather enough clicks. UCB-FE wraps any CTR model with position-aware upper confidence bounds at inference time, boosting cold items — no retraining, no architecture changes — and comes with a new coldNDCG metric to measure it."
---

Industrial ranking systems often rely on sorting by predicted Click-Through Rate (CTR). However, current CTR models heavily depend on features derived from user behavioral signals and struggle to accurately rank cold items in the case of insufficient user behavioral data.

To address this challenge, we introduce **UCB-FE**, a model-agnostic technique that seamlessly integrates with CTR models and does not require any modifications to their weights or architecture. UCB-FE transforms input behavioral features during inference using position-aware upper confidence bounds.

Our experimental evaluation on industrial and public datasets demonstrates boosting cold items without a drastic drop in overall search results quality. Moreover, to quantify search quality with respect to the increased importance of cold items performance, we propose the **coldNDCG** metric. In experiments, we confirm that UCB-FE significantly improves coldNDCG across state-of-the-art CTR prediction models, including gradient-boosting decision trees and tabular deep neural networks. We justify UCB-FE through the theoretical analysis of the position-aware UCB estimation for behavioral features.
