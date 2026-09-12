---
title: "Fast UCB-type algorithms for stochastic bandits with heavy and super heavy symmetric noise"
authors:
  ["Yuriy Dorn", "Aleksandr Katrutsa", "Ilgam Latypov", "Andrey Pudovikov"]
date: 2025-06-05
venue: "AAMAS 2025"
tag: "Paper"
type: "paper"
area: "bandits"
featured: true
span: 2
tags:
  ["expert algorithms", "budget-constrained learning", "multi-armed bandits"]
arxiv: "2402.07062"
links:
  - { label: "GitHub", url: "https://github.com/tmpuser1233/Clipped-SGD-UCB" }
summary: "We propose a new method for constructing UCB-type algorithms for stochastic multi-armed bandits based on general convex optimization methods with an inexact oracle."
heroSummary: "Algorithms that learn by trial and error can struggle when results are noisy and sometimes wildly extreme. We introduce a faster, more reliable method for these heavy-tailed cases. It keeps making good choices even when individual outcomes swing all over the place."
ru:
  tags:
    "expert algorithms": "экспертные алгоритмы"
    "budget-constrained learning": "обучение с ограничением бюджета"
    "multi-armed bandits": "многорукие бандиты"
  title: "Быстрые алгоритмы типа UCB для стохастических бандитов с тяжёлым и сверхтяжёлым симметричным шумом"
  summary: "Мы предлагаем новый метод построения алгоритмов типа UCB для стохастических многоруких бандитов на основе общих методов выпуклой оптимизации с неточным оракулом."
  heroSummary: "Алгоритмы, обучающиеся методом проб и ошибок, могут испытывать трудности, когда результаты зашумлены и иногда крайне экстремальны. Мы предлагаем более быстрый и надёжный метод для таких случаев с тяжёлыми хвостами. Он продолжает делать хороший выбор, даже когда отдельные исходы сильно колеблются."
  body: |
    В этой работе мы предлагаем новый метод построения алгоритмов типа UCB для стохастических многоруких бандитов на основе общих методов выпуклой оптимизации с неточным оракулом. Мы выводим оценки регрета, соответствующие скоростям сходимости методов оптимизации. Мы предлагаем новый алгоритм Clipped-SGD-UCB и показываем как теоретически, так и эмпирически, что в случае симметричного шума в награде можно достичь оценки регрета $O(\log T\sqrt{KT\log T})$ вместо $O\left (T^{\frac{1}{1+\alpha}} K^{\frac{\alpha}{1+\alpha}} \right)$ для случая, когда распределение награды удовлетворяет $\mathbb{E}_{X \in D}[|X|^{1+\alpha}] \leq \sigma^{1+\alpha} (\alpha \in (0, 1])$, то есть работать лучше, чем предполагает общая нижняя оценка для бандитов с тяжёлыми хвостами. Более того, та же оценка сохраняется даже тогда, когда распределение награды не имеет математического ожидания, то есть когда $\alpha < 0$.
---

In this study, we propose a new method for constructing UCB-type algorithms for stochastic multi-armed bandits based on general convex optimization methods with an inexact oracle. We derive the regret bounds corresponding to the convergence rates of the optimization methods. We propose a new algorithm Clipped-SGD-UCB and show, both theoretically and empirically, that in the case of symmetric noise in the reward, we can achieve an $O(\log T\sqrt{KT\log T})$ regret bound instead of $O\left (T^{\frac{1}{1+\alpha}} K^{\frac{\alpha}{1+\alpha}} \right)$ for the case when the reward distribution satisfies $\mathbb{E}_{X \in D}[|X|^{1+\alpha}] \leq \sigma^{1+\alpha} (\alpha \in (0, 1])$, i.e. perform better than it is assumed by the general lower bound for bandits with heavy-tails. Moreover, the same bound holds even when the reward distribution does not have the expectation, that is, when $\alpha < 0$.
