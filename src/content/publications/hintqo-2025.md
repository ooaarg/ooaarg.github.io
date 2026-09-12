---
title: "Hint Based Query Optimization with LLM Agent and Plan Similarity"
authors: ["Nikita Vasilenko", "Alexander Demin", "Vladimir Burlakov"]
date: 2025-11-14
venue: "APEIE 2025"
tag: "Paper"
type: "paper"
area: "dbms"
featured: true
span: 2
tags:
  [
    "databases",
    "query optimization",
    "language models",
    "embeddings",
    "agent guided search",
  ]
doi: "10.1109/APEIE66761.2025.11289347"
summary: "A two-path architecture for query-optimizer hint selection that combines fast nearest-neighbor transfer in an LLM-derived plan-embedding space with a budgeted LLM agent that searches the hint space under DBMS feedback."
ru:
  tags:
    "databases": "базы данных"
    "query optimization": "оптимизация запросов"
    "language models": "языковые модели"
    "embeddings": "эмбеддинги"
    "agent guided search": "поиск под управлением агента"
  authors:
    "Nikita Vasilenko": "Никита Василенко"
  title: "Оптимизация запросов на основе хинтов с помощью LLM-агента и схожести планов"
  summary: "Двухпутевая архитектура выбора хинтов оптимизатора запросов, сочетающая быстрый перенос по ближайшим соседям в пространстве эмбеддингов планов, полученных от LLM, с LLM-агентом с бюджетом, который ищет пространство хинтов по обратной связи СУБД."
  body: |
    Оптимизаторы SQL на основе стоимостей остаются хрупкими при работе с реальными данными и разнообразием движков; небольшие ошибки в оценках кардинальности или стоимости могут каскадно приводить к плохим планам. Мы предлагаем концептуальную архитектуру оптимизации запросов на основе хинтов и подробно описываем два модуля: быстрый модуль, который кодирует физические планы в виде текста, получает эмбеддинги с помощью предобученной языковой модели, находит ближайших соседей и формирует компактный бинарный вектор хинтов с проверкой безопасности относительно плана по умолчанию; и модуль под управлением агента на основе дообученной большой языковой модели, который уточняет хинты посредством итеративного поиска с обратной связью от базы данных в рамках строгого бюджета вычислений. Мы описываем интерфейсы, потоки данных и политики принятия решений для обоих модулей и намечаем интеграцию через стандартные механизмы хинтов без изменений движка. Предварительные результаты на уровне модулей на JOB CEB показывают примерно двадцатипроцентное сокращение среднего времени выполнения для быстрого модуля и меньше пробных запусков, чем у жадного базового метода, для модуля под управлением агента. Статья сосредоточена на архитектуре и поведении модулей, а не на едином сквозном развёртывании, поэтому общесистемное тестирование намеренно вынесено за рамки.
---

Cost based SQL optimizers remain brittle under
real world data and engine diversity; small errors in cardinality
or cost estimates can cascade into poor plans. We propose a
conceptual architecture for hint based query optimization and
describe two modules in detail: a fast module which encodes
physical plans as text, embeds with a pretrained language model,
retrieves nearest neighbors, and produces a compact binary hint
vector with a safety check against the default plan; and an
agent guided module powered by a fine tuned Large Language
Model, which refines hints through iterative search with database
feedback under a strict evaluation budget. We specify interfaces,
data flow, and decision policies for both modules, and outline
integration through standard hint mechanisms without engine
changes. Preliminary module level results on JOB CEB indicate
roughly twenty percent average runtime reduction for the fast
module and fewer trial executions than a greedy baseline for
the agent guided module. The paper focuses on architecture and
module behavior rather than a single end to end deployment, so
system wide testing is intentionally out of scope.
