---
title: "Functional multi-armed bandit and the best function identification problems"
authors:
  ["Yuriy Dorn", "Aleksandr Katrutsa", "Ilgam Latypov", "Anastasiia Soboleva"]
date: 2026-05-25
venue: "AAMAS 2026"
tag: "Paper"
type: "paper"
area: "bandits"
featured: true
featuredOrder: 1
span: 2
tags:
  [
    "Multi-armed bandits",
    "functional multi-armed bandits",
    "best function identification",
  ]
arxiv: "2503.00509"
links:
  - { label: "DOI", url: "https://doi.org/10.65109/SFMN9947" }
summary: "We propose two new classes of problems: the functional multi-armed bandit problem (FMAB) and the best function identification problem."
heroSummary: "Finding the best model usually means training every candidate to the finish. That is slow and expensive. We treat model selection as a guided search instead, so an algorithm spends its limited compute budget where it counts and reaches the best option much faster than brute force."
ru:
  tags:
    "Multi-armed bandits": "многорукие бандиты"
    "functional multi-armed bandits": "функциональные многорукие бандиты"
    "best function identification": "идентификация наилучшей функции"
  title: "Функциональный многорукий бандит и задачи идентификации наилучшей функции"
  summary: "Мы предлагаем два новых класса задач: задачу функционального многорукого бандита (FMAB) и задачу идентификации наилучшей функции."
  heroSummary: "Поиск лучшей модели обычно означает обучение каждого кандидата до конца. Это медленно и дорого. Мы вместо этого рассматриваем выбор модели как направленный поиск, так что алгоритм расходует ограниченный вычислительный бюджет там, где это важно, и достигает лучшего варианта гораздо быстрее полного перебора."
  body: |
    Мы рассматриваем задачу выбора модели, в которой задано множество кандидатных параметрических функций и требуется найти функцию с наименьшим минимумом и соответствующую точку минимума. Эта задача возникает при состязательном обучении нейронных сетей, где задан набор кандидатов, а ограниченный вычислительный бюджет не позволяет использовать полный перебор. Чтобы решить эту задачу, мы предлагаем обобщения классических постановок многорукого бандита (MAB) и идентификации лучшей руки (BAI), поскольку использование классических постановок MAB и BAI приводит к недопустимым вычислительным затратам. Мы называем предложенные постановки задачей функционального многорукого бандита (FMAB) и задачей идентификации наилучшей функции (BFI) соответственно. Для этих задач мы устанавливаем нижние оценки регрета для различных классов кандидатных функций. Для решения задач FMAB и BFI мы предлагаем новую схему сведения для построения алгоритма F-LCB — алгоритма типа UCB, основанного на базовых алгоритмах нелинейной оптимизации с известными скоростями сходимости. Алгоритм F-LCB объединяет шаг выбора руки и обновление текущего приближения оптимума. Мы приводим верхние оценки регрета для F-LCB на основе известных скоростей сходимости лежащих в основе базовых алгоритмов. Верхние оценки регрета совпадают с выведенными нижними оценками с точностью до логарифмического множителя. Численные эксперименты подтверждают, что предложенный подход корректно определяет оптимальную функцию и находит её точку минимума как в гладком, так и в негладком выпуклом случаях. Аналогично, F-LCB сходится быстрее алгоритмов SuccessiveHalving и Hyperband для задачи выбора модели, где кандидатные функции — это нейронные сети и доступна лишь стохастическая оценка градиента.
---

We consider the model selection problem, where we have a set of candidate parametric functions and need to identify the function with the smallest minimum and corresponding minimizer. This problem arises in the competitive training of neural networks, where a set of candidates is given, and the limited computational budget prevents the use of a brute-force search. To address this problem, we propose generalizations of the classical multi-armed bandit (MAB) and best arm identification (BAI) setups, since using classical MAB and BAI setups leads to infeasible computational costs. We refer to the proposed setups as the functional multi-armed bandit problem (FMAB) and the best function identification (BFI) problems, respectively. For these problems, we establish lower regret bounds for different classes of candidate functions. To solve FMAB and BFI problems, we propose a novel reduction scheme to construct the F-LCB algorithm, which is a UCB-type algorithm based on basic algorithms for nonlinear optimization with known convergence rates. The F-LCB algorithm combines the arm selection step and the update of the current optimum approximation. We provide regret upper bounds for F-LCB based on the known convergence rates of the underlying base algorithms. The regret upper bounds match with the derived lower bounds up to the logarithmic factor. Numerical experiments confirm that the proposed approach correctly identifies the optimal function and provides the minimizer for it in both smooth and non-smooth convex cases. Similarly, F-LCB converges faster than SuccessiveHalving and Hyperband algorithms for the model selection problem, where the candidate functions are neural networks and only a stochastic gradient estimate is available.
