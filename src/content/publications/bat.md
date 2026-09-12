---
title: "Bat: Benchmark for auto-bidding task"
authors:
  [
    "Aleksandra Khirianova",
    "Ekaterina Solodneva",
    "Andrey Pudovikov",
    "Sergey Osokin",
    "Egor Samosvat",
    "Yuriy Dorn",
    "Alexander Ledovsky",
    "Yana Zenkova",
  ]
date: 2025-04-28
venue: "Proceedings of the ACM on Web Conference 2025"
tag: "Paper"
type: "paper"
area: "autobidding"
featured: true
span: 2
tags:
  [
    "autobidding problem",
    "robust optimization",
  ]
arxiv: "2505.08485"
doi: "10.1145/3696410.3714657"
links:
  - {
      label: "GitHub",
      url: "https://github.com/avito-tech/bat-autobidding-benchmark",
    }
  - {
      label: "HuggingFace",
      url: "https://huggingface.co/datasets/AvitoTech/BAT",
    }
  - { label: "Zenodo", url: "https://zenodo.org/records/14794182" }
summary: "An open benchmark and dataset for real-time ad-auction bidding, with baselines for budget pacing and cost-per-click constraints, so autobidding algorithms can be developed and compared on common ground."
heroSummary: "Autobidding algorithms are hard to compare without a shared, public testbed, and good data is scarce. BAT is an open benchmark and dataset for real-time ad auctions, so anyone can build a bidding strategy and see how it measures up against the rest."
ru:
  tags:
    "autobidding problem": "задача автоматических ставок"
    "robust optimization": "устойчивая оптимизация"
  authors:
    "Sergey Osokin": "Сергей Осокин"
    "Alexander Ledovsky": "Александр Ледовский"
    "Yana Zenkova": "Яна Зенкова"
  title: "Bat: бенчмарк для задачи автоматических ставок"
  summary: "Открытый бенчмарк и набор данных для ставок в рекламных аукционах в реальном времени с базовыми решениями для темпа расходования бюджета и ограничений по цене за клик, позволяющий разрабатывать и сравнивать алгоритмы автоматических ставок на общей основе."
  heroSummary: "Алгоритмы автоматических ставок трудно сравнивать без общего публичного стенда, а хороших данных не хватает. BAT — это открытый бенчмарк и набор данных для рекламных аукционов в реальном времени, позволяющий любому разработать стратегию ставок и оценить её на фоне остальных."
  body: |
    Оптимизация стратегий ставок на аукционах рекламных слотов представляет собой критическую задачу для множества цифровых площадок. Существенным препятствием для разработки, оценки и совершенствования алгоритмов автоматических ставок в реальном времени является нехватка комплексных наборов данных и стандартизированных бенчмарков. Чтобы устранить этот недостаток, мы представляем аукционный бенчмарк, охватывающий два наиболее распространённых формата аукционов. Мы реализуем серию устойчивых базовых решений на новом наборе данных, затрагивая наиболее значимые области задачи ставок в реальном времени (RTB): равномерность темпа расходования бюджета и оптимизацию ограничения по цене за клик (CPC). Этот бенчмарк предоставляет удобную и интуитивно понятную основу для исследователей и практиков, позволяющую разрабатывать и совершенствовать инновационные алгоритмы автоматических ставок и тем самым способствовать прогрессу в области программатик-рекламы.
---

The optimization of bidding strategies for online advertising slot auctions presents a critical challenge across numerous digital marketplaces. A significant obstacle to the development, evaluation, and refinement of real-time autobidding algorithms is the scarcity of comprehensive datasets and standardized benchmarks. To address this deficiency, we present an auction benchmark encompassing the two most prevalent auction formats. We implement a series of robust baselines on a novel dataset, addressing the most salient Real-Time Bidding (RTB) problem domains: budget pacing uniformity and Cost Per Click (CPC) constraint optimization. This benchmark provides a user-friendly and intuitive framework for researchers and practitioners to develop and refine innovative autobidding algorithms, thereby facilitating advancements in the field of programmatic advertising.
