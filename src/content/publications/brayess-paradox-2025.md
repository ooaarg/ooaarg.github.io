---
title: "Identification of the Braess paradox in a stable dynamic model in network with one source and multiple sinks"
authors: ["Oleg Shitikov", "Yuriy Dorn"]
date: 2026-01-09
venue: "Journal of Mathematical Sciences"
tag: "Journal"
type: "paper"
area: "optimization"
featured: true
span: 3
tags: ["Optimization", "Transportation Modeling"]
doi: "10.1007/s10958-025-08162-9"
links:
  - {
      label: "Dataset",
      url: "https://github.com/bstabler/TransportationNetworks",
    }
summary: "We study the problem of identifying edges in a transportation graph where the introduction of an additional toll would enhance the efficiency of network usage within the Nesterov–de Palma equilibrium model."
heroSummary: "Adding a road can sometimes make traffic worse for everyone. It is called the Braess paradox. We work out where a well-placed toll would do the opposite and ease congestion, and give an algorithm that finds those spots."
ru:
  tags:
    "Optimization": "оптимизация"
    "Transportation Modeling": "моделирование транспортных потоков"
  authors:
    "Oleg Shitikov": "Олег Шитиков"
  links:
    "Dataset": "Датасет"
  title: "Идентификация парадокса Браесса в устойчивой динамической модели в сети с одним источником и несколькими стоками"
  summary: "Мы изучаем задачу выявления рёбер транспортного графа, введение дополнительной платы на которых повысило бы эффективность использования сети в рамках равновесной модели Нестерова — де Пальмы."
  heroSummary: "Иногда добавление дороги делает пробки хуже для всех. Это называется парадоксом Браесса. Мы выясняем, где удачно выбранная плата даст обратный эффект и снизит загруженность, и предлагаем алгоритм поиска таких мест."
  venue: "Журнал математических наук"
  body: |
    Мы изучаем задачу выявления рёбер транспортного графа, введение дополнительной платы на которых повысило бы эффективность использования сети в рамках равновесной модели Нестерова — де Пальмы. Полученные авторами результаты для случая одной пары «источник — сток», включая связь между временами движения по рёбрам остаточного пути и временем движения по сети, обобщаются на более общие сценарии, в частности на сеть с одним источником и несколькими стоками. Мы устанавливаем связь между чувствительностью суммарных затрат к изменениям затрат на рёбрах и чувствительностью загрузки рёбер к изменениям потока в сети. Мы предлагаем алгоритм выявления неэффективных рёбер, использующий влияние малых изменений суммарного потока в сети на поток по отдельным рёбрам графа.
---

We study the problem of identifying edges in a transportation graph where the introduction of an additional toll would enhance the efficiency of network usage within the Nesterov–de Palma equilibrium model. The results of the authors for the single OD pair case, including the relationship between the travel times of the edges on the residual path and the travel time of the network, are extended to more general scenarios, specifically a network with one source and multiple sinks. We establish a connection between the sensitivity of total costs to changes in edge costs and the sensitivity of edge load to changes in network flow. We propose an algorithm to identify inefficient edges by exploiting the impact of small changes in the total network flow on the flow across individual graph edges.
