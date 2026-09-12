---
title: "Uncertainty Quantification of Click and Conversion Estimates for the Autobidding"
authors:
  ["Ivan Zhigalskii", "Andrey Pudovikov", "Aleksandr Katrutsa", "Egor Samosvat"]
date: 2026-08-17
venue: "UAI 2026"
tag: "Paper"
type: "paper"
area: "autobidding"
featured: true
span: 2
tags: ["autobidding problem", "uncertainty quantification"]
arxiv: "2603.01825"
links:
  - { label: "Paper", url: "https://proceedings.mlr.press/v337/zhigalskii26a.html" }
summary: "We propose the DenoiseBid method, which corrects the generated CTRs and CVRs to make the resulting bids more efficient in auctions."
ru:
  tags:
    "autobidding problem": "задача автоматических ставок"
    "uncertainty quantification": "квантификация неопределённости"
  authors:
    "Ivan Zhigalskii": "Иван Жигальский"
  title: "Квантификация неопределённости оценок кликов и конверсий для автоматических ставок"
  summary: "Мы предлагаем метод DenoiseBid, который корректирует сгенерированные CTR и CVR, делая итоговые ставки более эффективными на аукционах."
  body: |
    Современные платформы электронной коммерции используют различные аукционные механизмы для распределения платных слотов под данный товар. Чтобы масштабировать этот подход на миллионы аукционов, платформы предлагают инструменты продвижения на основе алгоритмов автоматических ставок. Эти алгоритмы обычно зависят от оценок кликабельности (CTR) и конверсии (CVR), предоставляемых предобученной моделью машинного обучения. Однако прогнозы таких моделей неопределённы и могут существенно влиять на работу алгоритма автоматических ставок. Чтобы решить эту проблему, мы предлагаем метод DenoiseBid, который корректирует сгенерированные CTR и CVR, делая итоговые ставки более эффективными на аукционах. Основная идея нашего метода — применить байесовский подход и заменить зашумлённые оценки CTR или CVR оценками из восстановленных распределений. Чтобы продемонстрировать эффективность предложенного подхода, мы проводим обширные эксперименты на синтетическом наборе данных, iPinYou и BAT. Для оценки устойчивости нашего подхода к масштабу шума мы используем синтетический шум и шум, оценённый по прогнозам предобученной модели машинного обучения.
---

Modern e-commerce platforms employ various auction mechanisms to allocate paid slots for a given item. To scale this approach to the millions of auctions, the platforms suggest promotion tools based on the autobidding algorithms. These algorithms typically depend on the Click-Through-Rate (CTR) and Conversion-Rate (CVR) estimates provided by a pre-trained machine learning model. However, the predictions of such models are uncertain and can significantly affect the performance of the autobidding algorithm. To address this issue, we propose the DenoiseBid method, which corrects the generated CTRs and CVRs to make the resulting bids more efficient in auctions. The underlying idea of our method is to employ a Bayesian approach and replace noisy CTR or CVR estimates with those from recovered distributions. To demonstrate the performance of the proposed approach, we perform extensive experiments on the synthetic, iPinYou, and BAT datasets. To evaluate the robustness of our approach to the noise scale, we use synthetic noise and noise estimated from the predictions of the pre-trained machine learning model.
