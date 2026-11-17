---
title: "Probe-Based Routing for Join Optimizer Selection"
authors:
  [
    "Vladimir Burlakov",
    "Alena Rybakina",
    "Sergey Kudashev",
    "Ilgam Latypov",
    "Konstantin Gilev",
    "Alexander Demin",
    "Denis Ponomaryov",
    "Yuriy Dorn",
  ]
date: 2026-11-11
venue: "arXiv"
tag: "Paper"
type: "preprint"
area: "dbms"
span: 2
tags:
  ["query optimization", "join ordering", "algorithm selection", "learned databases"]
arxiv: "2611.15263"
summary: "We introduce two landscape features that a probe computes from random join orders in microseconds, and a router that uses them plus the relation count to choose between DP, GEQO and MCTS per query, lowering mean end-to-end time on JOB and IMDb-CEB."
ru:
  tags:
    "query optimization": "оптимизация запросов"
    "join ordering": "упорядочивание соединений"
    "algorithm selection": "выбор алгоритма"
    "learned databases": "обучаемые базы данных"
  authors:
    "Alena Rybakina": "Алёна Рыбакина"
    "Sergey Kudashev": "Сергей Кудашев"
    "Ilgam Latypov": "Ильгам Латыпов"
    "Konstantin Gilev": "Константин Гилев"
    "Denis Ponomaryov": "Денис Пономарёв"
  title: "Маршрутизация на основе пробы для выбора оптимизатора соединений"
  summary: "Мы предлагаем две характеристики ландшафта, которые проба вычисляет по случайным порядкам соединения за микросекунды, и маршрутизатор, выбирающий между DP, GEQO и MCTS для каждого запроса по этим признакам и числу отношений, что снижает среднее сквозное время на JOB и IMDb-CEB."
  venue: "arXiv"
  body: |
    В оптимизаторах, которые выбирают алгоритм упорядочивания соединений по правилу размера, упорядочивание соединений превращается в задачу выбора алгоритма: динамическое программирование (DP), генетический поиск (GEQO) и поиск по дереву Монте-Карло (MCTS) выигрывают на разных запросах. Тем не менее PostgreSQL выбирает между ними только по числу отношений, хотя запросы с одинаковым числом отношений могут требовать разных алгоритмов.

    В этой работе вводятся две характеристики ландшафта, которые проба вычисляет по случайным порядкам соединения за микросекунды на запрос. Разрыв в хвосте $\alpha$ описывает, как распределены стоимости лучших найденных порядков, а неожиданность кроссовера $\theta$ — насколько стоимость потомка при кроссовере отклоняется от средней стоимости его родителей. Маршрутизатор кластеризует обучающие запросы по этим признакам и числу отношений, назначает алгоритм каждому кластеру, в котором этот алгоритм выигрывает по суммарному сквозному времени с запасом, и оставляет все остальные запросы правилу PostgreSQL по умолчанию. На JOB и IMDb-CEB маршрутизатор снижает среднее сквозное время относительно правила по умолчанию, а на IMDb-CEB признаки пробы почти вдвое увеличивают выигрыш, который даёт одно лишь число отношений, — то есть они несут информацию о запросах, которой числу отношений не хватает.
---

In optimizers that choose a join-order solver by a size rule, join ordering is an algorithm-selection problem, because dynamic programming (DP), genetic search (GEQO), and Monte Carlo tree search (MCTS) each win on different queries. PostgreSQL nevertheless chooses among them by relation count alone, although queries with the same relation count can favor different solvers.

This paper introduces two landscape features that a probe computes from random join orders in microseconds per query. The tail spacing $\alpha$ describes how the costs of the best sampled orders are spaced, and the crossover surprise $\theta$ describes how far the cost of a crossover child deviates from the mean cost of its parents. The router clusters training queries by these features and the relation count, assigns a solver to every cluster that this solver wins in total end-to-end time by a margin, and leaves all other queries to PostgreSQL's default rule. On JOB and IMDb-CEB, the router lowers mean end-to-end time relative to the default rule, and on IMDb-CEB the probe features nearly double the gain obtained from the relation count alone, so they carry information about the queries that the relation count lacks.
