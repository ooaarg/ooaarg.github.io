---
title: "Optimal Traffic Allocation for Multi-Slot Sponsored Search: Balance of Efficiency and Fairness"
authors:
  [
    "Anastasiia Soboleva",
    "Alexander Ledovsky",
    "Yuriy Dorn",
    "Egor Samosvat",
    "Andrey Tikhanov",
    "Fyodor Prazdnikov",
  ]
date: 2025-02-03
venue: "arXiv"
tag: "Paper"
type: "preprint"
area: "optimization"
featured: true
span: 2
tags: ["CTR model", "Optimization"]
arxiv: "2502.01862"
summary: "We propose a novel ad allocation model that departs from traditional auction mechanics."
ru:
  tags:
    "CTR model": "модель CTR"
    "Optimization": "оптимизация"
  authors:
    "Alexander Ledovsky": "Александр Ледовский"
    "Andrey Tikhanov": "Андрей Тиханов"
    "Fyodor Prazdnikov": "Фёдор Праздников"
  title: "Оптимальное распределение трафика для многоместной спонсируемой поисковой выдачи: баланс эффективности и справедливости"
  summary: "Мы предлагаем новую модель распределения рекламы, отходящую от традиционных аукционных механизмов."
  body: |
    Большинство онлайн-площадок предлагают продавцам программы продвижения для привлечения дополнительных покупателей на их товары. Эти программы, как правило, позволяют продавцам распределять рекламные бюджеты на продвижение товаров, причём больший бюджет обычно коррелирует с улучшением эффективности рекламы. Для реализации таких рекламных систем часто применяются аукционные механизмы с управлением темпом расходования бюджета. Хотя аукционы обеспечивают удовлетворительную среднюю эффективность, эффективность рекламы при распределённых бюджетах на практике может быть несправедливой. Чтобы решить эту проблему, мы предлагаем новую модель распределения рекламы, отходящую от традиционных аукционных механизмов. Наш подход сосредоточен на решении глобальной задачи оптимизации, которая балансирует распределение трафика с учётом эффективности платформы и ограничений справедливости. В работе представлены следующие вклады. Во-первых, мы вводим метрику справедливости на основе индекса Джини. Во-вторых, мы формулируем задачу оптимизации с целями эффективности и справедливости. В-третьих, мы предлагаем онлайн-алгоритм для решения этой задачи оптимизации. Наконец, мы демонстрируем, что наш подход достигает более высокой справедливости по сравнению с базовыми аукционными алгоритмами, не жертвуя эффективностью. Мы утверждаем, что предложенный метод может эффективно применяться в сценариях распределения рекламы в реальном времени, а также в качестве офлайн-бенчмарка для оценки компромисса между справедливостью и эффективностью существующих аукционных систем.
---

The majority of online marketplaces offer promotion programs to sellers to acquire additional customers for their products. These programs typically allow sellers to allocate advertising budgets to promote their products, with higher budgets generally correlating to improve ad performance. Auction mechanisms with budget pacing are commonly employed to implement such ad systems. While auctions deliver satisfactory average effectiveness, ad performance under allocated budgets can be unfair in practice. To address this issue, we propose a novel ad allocation model that departs from traditional auction mechanics. Our approach focuses on solving a global optimization problem that balances traffic allocation while considering platform efficiency and fairness constraints. This study presents the following contributions. First, we introduce a fairness metric based on the Gini index. Second, we formulate the optimization problem incorporating efficiency and fairness objectives. Third, we offer an online algorithm to solve this optimization problem. Finally, we demonstrate that our approach achieves superior fairness compared to baseline auction-based algorithms without sacrificing efficiency. We contend that our proposed method can be effectively applied in real-time ad allocation scenarios and as an offline benchmark for evaluating the fairness-efficiency trade-off of existing auction-based systems.
