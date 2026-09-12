---
title: "UCB-type Algorithm for Budget-Constrained Expert Learning"
authors:
  [
    "Ilgam Latypov",
    "Alexandra Suvorikova",
    "Alexey Kroshnin",
    "Alexander Gasnikov",
    "Yuriy Dorn",
  ]
date: 2025-10-26
venue: "arXiv"
tag: "Paper"
type: "preprint"
area: "bandits"
featured: true
span: 2
tags:
  ["expert algorithms", "budget-constrained learning", "multi-armed bandits"]
arxiv: "2510.22654"
summary: "We introduce M-LCB, a computationally efficient UCB-style meta-algorithm that provides anytime regret guarantees."
ru:
  tags:
    "expert algorithms": "экспертные алгоритмы"
    "budget-constrained learning": "обучение с ограничением бюджета"
    "multi-armed bandits": "многорукие бандиты"
  authors:
    "Alexandra Suvorikova": "Александра Суворикова"
    "Alexey Kroshnin": "Алексей Крошнин"
    "Alexander Gasnikov": "Александр Гасников"
  title: "Алгоритм типа UCB для обучения экспертов с ограничением по бюджету"
  summary: "Мы представляем M-LCB — вычислительно эффективный мета-алгоритм в стиле UCB, обеспечивающий гарантии регрета в любой момент времени."
  body: |
    Во многих современных приложениях система должна динамически выбирать между несколькими адаптивными алгоритмами обучения, которые обучаются онлайн. Примеры включают выбор модели в потоковых средах, переключение между торговыми стратегиями в финансах и оркестрацию нескольких агентов контекстных бандитов или обучения с подкреплением. На каждом раунде обучающаяся система должна выбрать один предиктор среди $K$ адаптивных экспертов для формирования прогноза, имея возможность обновить не более $M \le K$ из них при фиксированном бюджете обучения.

    Мы рассматриваем эту задачу в _стохастической постановке_ и представляем **M-LCB** — вычислительно эффективный мета-алгоритм в стиле UCB, обеспечивающий гарантии регрета в любой момент времени. Его доверительные интервалы строятся непосредственно из реализованных потерь, не требуют дополнительной оптимизации и точно отражают свойства сходимости лежащих в основе экспертов.

    Если каждый эксперт достигает внутреннего регрета $\widetilde{O}(T^{\alpha})$, то **M-LCB** обеспечивает общий регрет, ограниченный

    $$
    \widetilde{O}\!\left(\sqrt{\tfrac{KT}{M}} \,+\, (K/M)^{1-\alpha}\, T^{\alpha}\right).
    $$

    Насколько нам известно, это первый результат, устанавливающий гарантии регрета при одновременном обучении нескольких адаптивных экспертов в условиях бюджетных ограничений на каждый раунд. Мы иллюстрируем фреймворк двумя представительными случаями: (i) параметрические модели, обучаемые онлайн со стохастическими потерями, и (ii) эксперты, которые сами являются алгоритмами многоруких бандитов. Эти примеры показывают, как **M-LCB** расширяет классическую парадигму бандитов на более реалистичный сценарий координации состоятельных самообучающихся экспертов при ограниченных ресурсах.
---

In many modern applications, a system must dynamically choose between several adaptive learning algorithms that are trained online. Examples include model selection in streaming environments, switching between trading strategies in finance, and orchestrating multiple contextual bandit or reinforcement learning agents. At each round, a learner must select one predictor among $K$ adaptive experts to make a prediction, while being able to update at most $M \le K$ of them under a fixed training budget.

We address this problem in the _stochastic setting_ and introduce **M-LCB**, a computationally efficient UCB-style meta-algorithm that provides _anytime regret guarantees_. Its confidence intervals are built directly from realized losses, require no additional optimization, and seamlessly reflect the convergence properties of the underlying experts.

If each expert achieves internal regret $\widetilde{O}(T^{\alpha})$, then **M-LCB** ensures overall regret bounded by

$$
\widetilde{O}\!\left(\sqrt{\tfrac{KT}{M}} \,+\, (K/M)^{1-\alpha}\, T^{\alpha}\right).
$$

To our knowledge, this is the first result establishing regret guarantees when multiple adaptive experts are trained simultaneously under per-round budget constraints. We illustrate the framework with two representative cases: (i) parametric models trained online with stochastic losses, and (ii) experts that are themselves multi-armed bandit algorithms. These examples highlight how **M-LCB** extends the classical bandit paradigm to the more realistic scenario of coordinating stateful, self-learning experts under limited resources.
