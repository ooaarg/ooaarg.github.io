---
title: "RRE-GTC: A Geo-Temporal Cluster Dataset for Real-Estate PriceEstimation and Market-Aware Search"
authors:
  ["Irina Govorova", "Aleksandr Alekseitsev", "Irina Podlipnova", "Meruza Kubentayeva", "Yuriy Dorn"]
date: 2026-07-16
venue: "SIGIR 2026"
tag: "Paper"
type: "paper"
area: "autobidding"
featured: true
span: 2
tags:
  ["Real Estate Dataset", "Price Prediction", "Geo-temporal Modeling", "Urban Computing"]
doi: "10.1145/3805712.3808616"
summary: "We introduce RRE-GTC (Ru-Real-Estate Geo-Temporal Clusters), an open resource designed to benchmark ranking, pricing, and recommendation algorithms in dynamic spatial contexts."
heroSummary: "Search and recommender systems have produced highly relevant search results. A natural next step in the development of such systems in e-commerce is to rerank these results to increase the platform's revenue from paid promotion products."
links:
  - { label: "Dataset", url: "https://huggingface.co/datasets/cianml/ru-real-estate-geo-temporal-clusters" }
ru:
  tags:
    "Real Estate Dataset": "датасет недвижимости"
    "Price Prediction": "прогнозирование цен"
    "Geo-temporal Modeling": "гео-временное моделирование"
    "Urban Computing": "городские вычисления"
  authors:
    "Irina Govorova": "Ирина Говорова"
    "Aleksandr Alekseitsev": "Александр Алексеитцев"
    "Irina Podlipnova": "Ирина Подлипнова"
    "Meruza Kubentayeva": "Меруза Кубентаева"
  links:
    "Dataset": "Датасет"
  title: "RRE-GTC: набор данных гео-временных кластеров для оценки цен на недвижимость и поиска с учётом рынка"
  summary: "Мы представляем RRE-GTC (Ru-Real-Estate Geo-Temporal Clusters) — открытый ресурс для сравнения алгоритмов ранжирования, ценообразования и рекомендаций в динамических пространственных контекстах."
  heroSummary: "Поисковые и рекомендательные системы научились выдавать очень релевантные результаты. Естественный следующий шаг для таких систем в электронной коммерции — переранжировать результаты, чтобы увеличить выручку платформы от платных промо-продуктов."
  body: |
    Платформы недвижимости представляют собой сложную среду информационного поиска (IR), где релевантность для пользователя зависит от многомерных пересечений местоположения, времени и физических характеристик. Однако исследования в области геопространственного информационного поиска (GIR) и рекомендаций на основе местоположения в настоящее время затруднены из-за отсутствия открытых высококачественных наборов данных, отражающих как временную эволюцию рынков, так и детальные сигналы доступности. Чтобы восполнить этот пробел, мы представляем RRE-GTC (Ru-Real-Estate Geo-Temporal Clusters) — открытый ресурс для сравнения алгоритмов ранжирования, ценообразования и рекомендаций в динамических пространственных контекстах. Построенный на основе огромной коллекции объявлений о квартирах в крупных российских городах, RRE-GTC агрегирует 456 182 гео-временных кластера, предлагая конфиденциальность-сохраняющую альтернативу публикации данных на уровне отдельных объявлений. Набор данных предоставляет богатые и разнообразные признаки: (i) гео-временную динамику цен (стратифицированные процентили во времени), (ii) подробные метаданные объектов (жилой фонд, объём предложения) и (iii) сигналы транспортной доступности (например, близость, плотность транспорта). Уникально то, что ресурс включает ценовой сигнал «транспортной изоляции», полученный с помощью модели линейной атрибуции, что открывает новые исследования в области ранжирования на основе атрибутов и объяснимого поиска (например, разделение «ценности местоположения» и «внутреннего качества»). Выпущенный под лицензией Apache-2.0 и размещённый на Hugging Face, RRE-GTC снижает барьер для экспериментов с рекомендациями и поиском на основе контента, пространственно-временным ранжированием и рыночно-ориентированной фильтрацией поиска.
---

Real-estate platforms represent a complex Information Retrieval (IR) environment where user relevance depends on high-dimensional intersections of location, time, and physical attributes. However, research into Geo-spatial Information Retrieval (GIR) and location-based recommendations is currently impeded by a lack of open, high-quality datasets that capture both the temporal evolution of markets and granular accessibility signals. To bridge this gap, we introduce RRE-GTC (Ru-Real-Estate Geo-Temporal Clusters), an open resource designed to benchmark ranking, pricing, and recommendation algorithms in dynamic spatial contexts. Derived from a massive collection of apartment listings in major Russian cities, RRE-GTC aggregates 456,182 geo-temporal clusters, offering a privacy-preserving alternative to releasing raw listing-level data. The dataset provides rich and distinct features: (i) geo-temporal price dynamics (stratified percentiles over time), (ii) detailed item metadata (building stock, supply volume), and (iii) transport accessibility signals (e.g., proximity, transport density). Uniquely, the resource includes a ''transport-isolated'' price signal derived from a linear attribution model, enabling novel research into attribute-based ranking and explainable search (e.g., separating ''location value'' from ''intrinsic quality''). Released under the Apache-2.0 license and hosted on Hugging Face, RRE-GTC lowers the barrier for experimenting with content-based recommendation and retrieval, spatiotemporal ranking, and market-aware search filtration.
