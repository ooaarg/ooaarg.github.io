---
title: "UCB-Based Feature Engineering for Cold-Start in Recommenders"
authors:
  [
    "Anastasiia Soboleva",
    "Andrey Pudovikov",
    "Aleksandr Katrutsa",
    "Roman Snetkov",
    "Alina Babenko",
    "Egor Samosvat",
    "Yuriy Dorn",
  ]
date: 2026-08-08
venue: "KDD 2026"
tag: "Paper"
type: "paper"
area: "autobidding"
span: 2
tags: ["cold-start", "CTR prediction", "multi-armed bandits", "feature engineering"]
doi: "10.1145/3770855.3817886"
summary: "We introduce UCB-FE, a model-agnostic technique that transforms behavioral features with position-aware upper confidence bounds, boosting cold items in CTR ranking without any weight or architecture changes."
heroSummary: "CTR models rank new items poorly until they gather enough clicks. UCB-FE wraps any CTR model with position-aware upper confidence bounds at inference time, boosting cold items — no retraining, no architecture changes — and comes with a new coldNDCG metric to measure it."
ru:
  tags:
    "cold-start": "холодный старт"
    "CTR prediction": "прогнозирование CTR"
    "multi-armed bandits": "многорукие бандиты"
    "feature engineering": "инженерия признаков"
  authors:
    "Roman Snetkov": "Роман Снетков"
    "Alina Babenko": "Алина Бабенко"
  title: "Инженерия признаков на основе UCB для холодного старта в рекомендательных системах"
  summary: "Мы представляем UCB-FE — модельно-агностичную технику, которая преобразует поведенческие признаки с помощью позиционно-зависимых верхних доверительных границ, повышая холодные товары в CTR-ранжировании без изменения весов или архитектуры."
  heroSummary: "CTR-модели плохо ранжируют новые товары, пока не накопят достаточно кликов. UCB-FE оборачивает любую CTR-модель позиционно-зависимыми верхними доверительными границами на этапе вывода, повышая холодные товары — без переобучения и изменений архитектуры — и сопровождается новой метрикой coldNDCG для её измерения."
  body: |
    Промышленные системы ранжирования часто полагаются на сортировку по прогнозируемой кликабельности (CTR). Однако современные CTR-модели сильно зависят от признаков, производных от поведенческих сигналов пользователей, и с трудом ранжируют холодные товары при недостатке поведенческих данных.

    Чтобы решить эту проблему, мы представляем **UCB-FE** — модельно-агностичную технику, которая легко интегрируется с CTR-моделями и не требует изменений их весов или архитектуры. UCB-FE преобразует входные поведенческие признаки во время вывода с помощью позиционно-зависимых верхних доверительных границ.

    Наша экспериментальная оценка на промышленных и публичных наборах данных демонстрирует повышение холодных товаров без резкого падения общего качества результатов поиска. Более того, чтобы количественно оценить качество поиска с учётом возросшей важности эффективности холодных товаров, мы предлагаем метрику **coldNDCG**. В экспериментах мы подтверждаем, что UCB-FE значительно улучшает coldNDCG для современных моделей прогнозирования CTR, включая градиентный бустинг на решающих деревьях и табличные глубокие нейронные сети. Мы обосновываем UCB-FE теоретическим анализом позиционно-зависимой UCB-оценки поведенческих признаков.
---

Industrial ranking systems often rely on sorting by predicted Click-Through Rate (CTR). However, current CTR models heavily depend on features derived from user behavioral signals and struggle to accurately rank cold items in the case of insufficient user behavioral data.

To address this challenge, we introduce **UCB-FE**, a model-agnostic technique that seamlessly integrates with CTR models and does not require any modifications to their weights or architecture. UCB-FE transforms input behavioral features during inference using position-aware upper confidence bounds.

Our experimental evaluation on industrial and public datasets demonstrates boosting cold items without a drastic drop in overall search results quality. Moreover, to quantify search quality with respect to the increased importance of cold items performance, we propose the **coldNDCG** metric. In experiments, we confirm that UCB-FE significantly improves coldNDCG across state-of-the-art CTR prediction models, including gradient-boosting decision trees and tabular deep neural networks. We justify UCB-FE through the theoretical analysis of the position-aware UCB estimation for behavioral features.
