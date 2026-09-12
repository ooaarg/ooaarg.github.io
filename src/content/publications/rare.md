---
title: "RARe: Raising Ad Revenue Framework with Context-Aware Reranking"
authors:
  [
    "Ekaterina Solodneva",
    "Aleksandra Khirianova",
    "Aleksandr Katrutsa",
    "Roman Loginov",
    "Andrey Tikhanov",
    "Egor Samosvat",
    "Yuriy Dorn",
  ]
date: 2025-10-9
venue: "AAMAS 2026"
tag: "Paper"
type: "preprint"
area: "autobidding"
featured: true
span: 2
tags: ["reranking", "click model", "online advertising", "revenue maximization"]
arxiv: "2510.08788"
links:
  - { label: "GitHub", url: "https://github.com/IAIOnline/RobustBid" }
summary: "We propose and compare two different click models that take into account the context of items in a search result."
ru:
  tags:
    "reranking": "переранжирование"
    "click model": "кликовая модель"
    "online advertising": "онлайн-реклама"
    "revenue maximization": "максимизация выручки"
  authors:
    "Roman Loginov": "Роман Логинов"
    "Andrey Tikhanov": "Андрей Тиханов"
  title: "RARe: фреймворк повышения рекламной выручки с контекстно-зависимым переранжированием"
  summary: "Мы предлагаем и сравниваем две различные кликовые модели, учитывающие контекст элементов в результатах поиска."
  body: |
    Современные рекомендательные системы отлично оптимизируют релевантность результатов поиска для платформ электронной коммерции. Поддерживая эту релевантность, платформы ищут возможности максимизировать выручку за счёт корректировки результатов поиска. Чтобы разрешить компромисс между релевантностью и выручкой, мы предлагаем фреймворк **RARe** (**R**aising **A**dvertisement **Re**venue). **RARe** объединяет кликовую модель и модель переранжирования. Мы обучаем фреймворк **RARe** с функцией потерь для поиска компромиссов между выручкой и релевантностью. Согласно нашему опыту, кликовая модель играет ключевую роль во фреймворке **RARe**. Мы предлагаем и сравниваем две различные кликовые модели, учитывающие контекст элементов в результатах поиска. Первая кликовая модель — Gradient-Boosting Decision Tree with Concatenation (GBDT-C), которая включает контекст в традиционную модель GBDT для предсказания кликов. Вторая модель, SAINT-Q, адаптирует модель Sequential Attention для учёта влияний между результатами поиска. Наши эксперименты показывают, что предложенные кликовые модели превосходят базовые и улучшают общее качество нашего фреймворка. Эксперименты на промышленном наборе данных, который будет опубликован, демонстрируют значительный рост выручки у **RARe** при сохранении высокой релевантности.
---

Modern recommender systems excel at optimizing search result relevance for e-commerce platforms. While maintaining this relevance, platforms seek opportunities to maximize revenue through search result adjustments. To address the trade-off between relevance and revenue, we propose the **RARe** (**R**aising **A**dvertisement **Re**venue) framework. **RARe** stacks a click model and a reranking model. We train the **RARe** framework with a loss function to find revenue and relevance trade-offs. According to our experience, the click model is crucial in the **RARe** framework. We propose and compare two different click models that take into account the context of items in a search result. The first click model is a Gradient-Boosting Decision Tree with Concatenation (GBDT-C), which includes a context in the traditional GBDT model for click prediction. The second model, SAINT-Q, adapts the Sequential Attention model to capture influences between search results. Our experiments indicate that the proposed click models outperform baselines and improve the overall quality of our framework. Experiments on the industrial dataset, which will be released publicly, show **RARe**'s significant revenue improvements while preserving a high relevance.
