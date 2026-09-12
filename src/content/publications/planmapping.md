---
title: "Training-Free Query Optimization via LLM-Based Plan Similarity"
authors: ["Nikita Vasilenko", "Alexander Demin", "Vladimir Burlakov"]
date: 2026-06-09
venue: "The Bulletin of Irkutsk State University. Series Mathematics"
tag: "Journal"
type: "paper"
area: "dbms"
featured: false
span: 4
tags: ["databases", "query optimization", "language models", "embeddings"]
arxiv: "2506.05853"
doi: 10.26516/1997-7670.2026.56.113
summary: "We introduce LLM-based Plan Mapping, a framework that embeds the default execution plan of a query, finds its k nearest neighbors among previously executed plans, and recommends database hintsets based on neighborhood voting."
ru:
  tags:
    "databases": "базы данных"
    "query optimization": "оптимизация запросов"
    "language models": "языковые модели"
    "embeddings": "эмбеддинги"
  authors:
    "Nikita Vasilenko": "Никита Василенко"
  title: "Оптимизация запросов без обучения на основе схожести планов с помощью LLM"
  summary: "Мы представляем Plan Mapping на основе LLM — фреймворк, который строит эмбеддинг плана выполнения запроса по умолчанию, находит k ближайших соседей среди ранее выполненных планов и рекомендует наборы хинтов базы данных на основе голосования по соседям."
  venue: "Известия Иркутского государственного университета. Серия Математика"
  body: |
    Эмбеддинги больших языковых моделей (LLM) открывают многообещающее новое направление для оптимизации запросов к базам данных. В этой работе мы исследуем, как предобученные эмбеддинги планов выполнения могут направлять выполнение SQL-запросов без необходимости дополнительного обучения модели. Мы представляем LLM-PM (LLM-based Plan Mapping) — фреймворк, который строит эмбеддинг плана выполнения запроса по умолчанию, находит k ближайших соседей среди ранее выполненных планов и рекомендует наборы хинтов базы данных на основе голосования по соседям. Лёгкая проверка согласованности валидирует выбранный хинт, а механизм отката при необходимости выполняет поиск по всему пространству хинтов. Оценённый на бенчмарке JOB-CEB с использованием OpenGauss, LLM-PM достигает среднего ускорения — сокращения задержки запроса на 21 %. Эта работа подчёркивает потенциал эмбеддингов на основе LLM для практического повышения производительности запросов и открывает новые направления для систем наставничества оптимизатора на основе эмбеддингов без обучения.
---

Large language model (LLM) embeddings offer a promising new avenue for database query optimization. In this paper, we explore how pre-trained execution plan embeddings can guide SQL query execution without the need for additional model training. We introduce LLM-PM (LLM-based Plan Mapping), a framework that embeds the default execution plan of a query, finds its k nearest neighbors among previously executed plans, and recommends database hintsets based on neighborhood voting. A lightweight consistency check validates the selected hint, while a fallback mechanism searches the full hint space when needed. Evaluated on the JOB-CEB benchmark using OpenGauss, LLM-PM achieves an average speed-up of 21% query latency reduction. This work highlights the potential of LLM-powered embeddings to deliver practical improvements in query performance and opens new directions for training-free, embedding-based optimizer guidance systems.
