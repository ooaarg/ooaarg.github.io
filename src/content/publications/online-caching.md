---
title: "Learning-Augmented Online Caching: New Upper Bounds"
authors:
  ["Daniel Skachkov", "Denis Ponomaryov", "Yuriy Dorn", "Alexander Demin"]
date: 2024-10-02
venue: "arXiv"
tag: "Paper"
type: "preprint"
area: "dbms"
featured: false
span: 2
tags: ["databases", "online chaching"]
arxiv: "2410.01760"
summary: "We address the problem of learning-augmented online caching for DBMS in the scenario when each request is accompanied by a prediction of the next occurrence of the requested page."
ru:
  tags:
    "databases": "базы данных"
    "online chaching": "онлайн-кэширование"
  title: "Онлайн-кэширование с обучением: новые верхние оценки"
  summary: "Мы рассматриваем задачу онлайн-кэширования с обучением для СУБД в сценарии, когда каждый запрос сопровождается предсказанием следующего обращения к запрошенной странице."
  body: |
    Мы рассматриваем задачу онлайн-кэширования с обучением в сценарии, когда каждый запрос сопровождается предсказанием следующего обращения к запрошенной странице. Мы улучшаем известные на данный момент оценки конкурентного отношения алгоритма BlindOracle, который вытесняет страницу, предсказанную как запрашиваемую последней. Мы также доказываем нижнюю оценку конкурентного отношения для любого рандомизированного алгоритма и показываем, что комбинация BlindOracle с алгоритмом Marker достигает конкурентного отношения, оптимального с точностью до некоторой константы.
---

We address the problem of learning-augmented online caching in the scenario when each request is accompanied by a prediction of the next occurrence of the requested page. We improve currently known bounds on the competitive ratio of the BlindOracle algorithm, which evicts a page predicted to be requested last. We also prove a lower bound on the competitive ratio of any randomized algorithm and show that a combination of the BlindOracle with the Marker algorithm achieves a competitive ratio that is optimal up to some constant.
