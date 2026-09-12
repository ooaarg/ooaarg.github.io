---
title: "Implicitly normalized forecaster with clipping for linear and non-linear heavy-tailed multi-armed bandits"
authors:
  [
    "Yuriy Dorn",
    "Nikita Kornilov",
    "Nikolay Kutuzov",
    "Alexander Nazin",
    "Eduard Gorbunov",
    "Alexander Gasnikov",
  ]
date: 2024-01-29
venue: "Computational Management Science"
tag: "Journal"
type: "paper"
area: "bandits"
featured: false
span: 2
tags: ["multi-armed bandits"]
arxiv: "2305.06743"
summary: "In this paper, we propose a new version of INF called the Implicitly Normalized Forecaster with clipping (INF-clip) for MAB problems with heavy-tailed reward distributions."
ru:
  tags:
    "multi-armed bandits": "многорукие бандиты"
  authors:
    "Nikita Kornilov": "Никита Корнилов"
    "Nikolay Kutuzov": "Николай Кутузов"
    "Alexander Nazin": "Александр Назин"
    "Eduard Gorbunov": "Эдуард Горбунов"
    "Alexander Gasnikov": "Александр Гасников"
  title: "Неявно нормализованный прогнозист с клиппированием для линейных и нелинейных многоруких бандитов с тяжёлыми хвостами"
  summary: "В этой работе мы предлагаем новую версию INF — Implicitly Normalized Forecaster with clipping (INF-clip) — для задач MAB с распределениями награды с тяжёлыми хвостами."
  body: |
    Алгоритм Implicitly Normalized Forecaster (INF) считается оптимальным решением для состязательных задач многоруких бандитов (MAB). Однако большинство существующих результатов о сложности INF опираются на ограничительные предположения, такие как ограниченность наград. Недавно был предложен родственный алгоритм, работающий как в состязательной, так и в стохастической постановке MAB с тяжёлыми хвостами. Однако этот алгоритм не использует доступные данные в полной мере. В этой работе мы предлагаем новую версию INF — Implicitly Normalized Forecaster with clipping (INF-clip) — для задач MAB с распределениями награды с тяжёлыми хвостами. Мы устанавливаем результаты сходимости при мягких предположениях о распределении награды и демонстрируем, что INF-clip оптимален для линейных стохастических задач MAB с тяжёлыми хвостами и хорошо работает для нелинейных. Кроме того, мы показываем, что INF-clip превосходит алгоритм best-of-both-worlds в случаях, когда различные «руки» трудно различить.
---

The Implicitly Normalized Forecaster (INF) algorithm is considered to be an optimal solution for adversarial multi-armed bandit (MAB) problems. However, most of the existing complexity results for INF rely on restrictive assumptions, such as bounded rewards. Recently, a related algorithm was proposed that works for both adversarial and stochastic heavy-tailed MAB settings. However, this algorithm fails to fully exploit the available data. In this paper, we propose a new version of INF called the Implicitly Normalized Forecaster with clipping (INF-clip) for MAB problems with heavy-tailed reward distributions. We establish convergence results under mild assumptions on the rewards distribution and demonstrate that INF-clip is optimal for linear heavy-tailed stochastic MAB problems and works well for non-linear ones. Furthermore, we show that INF-clip outperforms the best-of-both-worlds algorithm in cases where it is difficult to distinguish between different arms.
