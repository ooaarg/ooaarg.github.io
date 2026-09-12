---
title: "Robust autobidding for noisy conversion prediction models"
authors:
  [
    "Andrey Pudovikov",
    "Aleksandra Khirianova",
    "Ekaterina Solodneva",
    "Gleb Molodtsov",
    "Aleksandr Katrutsa",
    "Yuriy Dorn",
    "Egor Samosvat",
  ]
date: 2026-05-25
venue: "AAMAS 2026"
tag: "Paper"
type: "paper"
area: "autobidding"
featured: true
featuredOrder: 2
span: 2
tags:
  [
    "autobidding problem",
    "robust optimization",
  ]
arxiv: "2510.08788"
links:
  - { label: "DOI", url: "https://doi.org/10.65109/RXYW3025" }
  - { label: "GitHub", url: "https://github.com/IAIOnline/RobustBid" }
summary: "We propose RobustBid, an efficient method for robust autobidding taking into account uncertainty in CTR and CVR predictions."
heroSummary: "Online ad systems set bids in real time from predicted click and conversion rates, but those predictions are never exact. RobustBid builds that uncertainty into the bid itself, so advertisers keep getting good results even when the estimates are off."
ru:
  tags:
    "autobidding problem": "задача автоматических ставок"
    "robust optimization": "устойчивая оптимизация"
  authors:
    "Gleb Molodtsov": "Глеб Молодцов"
  title: "Устойчивые автоматические ставки для шумных моделей прогнозирования конверсий"
  summary: "Мы предлагаем RobustBid — эффективный метод устойчивых автоматических ставок, учитывающий неопределённость в прогнозах CTR и CVR."
  heroSummary: "Онлайн-рекламные системы выставляют ставки в реальном времени на основе прогнозируемых кликабельности и конверсии, но эти прогнозы никогда не бывают точными. RobustBid закладывает эту неопределённость в саму ставку, так что рекламодатели получают хорошие результаты даже при неточных оценках."
  body: |
    Управление миллионами цифровых аукционов имеет ключевое значение для современных систем рекламных аукционов. Основной подход к управлению цифровыми аукционами — автоматические ставки, которые опираются на метрики кликабельности (CTR) и конверсии (CVR). Хотя эти величины оцениваются с помощью ML-моделей, неопределённость их прогнозов напрямую влияет на выручку рекламодателей и стратегии ставок. Чтобы решить эту проблему, мы предлагаем RobustBid — эффективный метод устойчивых автоматических ставок, учитывающий неопределённость в прогнозах CTR и CVR. Наш подход использует передовые методы устойчивой оптимизации, чтобы предотвратить большие ошибки в ставках при возмущении оценок CTR/CVR. Мы выводим аналитическое решение поставленной задачи устойчивой оптимизации, что повышает эффективность работы метода RobustBid. Синтетический бенчмарк, iPinYou и BAT используются в экспериментальной оценке RobustBid. Мы сравниваем наш метод с нестабильным базовым методом и алгоритмом RiskBid, используя общий объём конверсий (TCV) и среднюю цену за клик ($CPC_{avg}$) в качестве метрик производительности. Эксперименты демонстрируют, что RobustBid даёт ставки с большим TCV и меньшей $CPC_{avg}$, чем у конкурентов, в случае больших возмущений прогнозов CTR/CVR.
---

Managing millions of digital auctions is essential to modern advertising auction systems. The primary approach to managing digital auctions is autobidding, which relies on Click-Through Rate and Conversion Rate metrics. While these quantities are estimated with ML models, their prediction uncertainty directly impacts advertisers' revenue and bidding strategies. To address this issue, we propose RobustBid, an efficient method for robust autobidding taking into account uncertainty in CTR and CVR predictions. Our approach leverages advanced, robust optimization techniques to prevent large errors in bids if the estimates of CTR/CVR are perturbed. We derive an analytical solution to the stated robust optimization problem, which improves the runtime efficiency of the RobustBid method. The synthetic, iPinYou, and BAT benchmarks are used in our experimental evaluation of RobustBid. We compare our method with the non-robust baseline and the RiskBid algorithm using total conversion volume (TCV) and average cost-per-click ($CPC_{avg}$) as performance metrics. The experiments demonstrate that RobustBid provides bids that yield larger TCV and smaller $CPC_{avg}$ than competitors in the case of large perturbations in CTR/CVR predictions.
