---
title: "Zeroth-order methods for non-smooth stochastic problems under heavy-tailed noise"
authors: ["Nail Bashirov", "Alexander Gasnikov", "Aleksandr Lobanov"]
date: 2026-02-05
venue: "Optimization Methods and Software"
tag: "Journal"
type: "paper"
area: "optimization"
featured: true
span: 2
tags:
  [
    "zeroth-order methods",
    "convex optimization",
    "saddle point problems",
    "stochastic optimization",
    "heavy-tailed noise",
  ]
doi: "10.1080/10556788.2026.2617623"
summary: "We propose gradient-free algorithms with zeroth-order oracle under adversarial noise with unbounded variance, for non-smooth convex and convex-concave optimization problems."
ru:
  tags:
    "zeroth-order methods": "методы нулевого порядка"
    "convex optimization": "выпуклая оптимизация"
    "saddle point problems": "задачи седловой точки"
    "stochastic optimization": "стохастическая оптимизация"
    "heavy-tailed noise": "шум с тяжёлыми хвостами"
  authors:
    "Nail Bashirov": "Наиль Баширов"
    "Alexander Gasnikov": "Александр Гасников"
  title: "Методы нулевого порядка для негладких стохастических задач при шуме с тяжёлыми хвостами"
  summary: "Мы предлагаем безградиентные алгоритмы с оракулом нулевого порядка при состязательном шуме с неограниченной дисперсией для негладких выпуклых и выпукло-вогнутых задач оптимизации."
  body: |
    В последнее время безградиентные методы оптимизации стали важным инструментом в обучении с подкреплением и энергоэффективной донастройке LLM. В стандартной постановке с равномерно ограниченной дисперсией шума был получен оптимальный ускоренный алгоритм. Однако предположение об ограниченной дисперсии является строгим и обычно не выполняется на практике. Поэтому мы ослабляем его, допуская распределение шума с тяжёлыми хвостами и тем самым расширяя класс решаемых задач. Мы предлагаем безградиентные алгоритмы с оракулом нулевого порядка при состязательном шуме с неограниченной дисперсией для негладких выпуклых и выпукло-вогнутых задач оптимизации. Мы применяем оператор клиппирования для борьбы с тяжёлыми хвостами и батчирование для эффективных вычислений за счёт параллелизации. Наш анализ даёт асимптотические оценки для таких ключевых параметров, как сложность по числу итераций, сложность по числу обращений к оракулу и максимальный уровень состязательного шума.
---

Recently gradient-free optimization methods have become a major tool in reinforcement learning and memory-efficient LLM fine-tuning. Under the standard setting of uniformly bounded noise variance an optimal accelerated algorithm has been derived. However, the assumption of bounded variance is strict and usually is not fulfilled in practice. Therefore, we will relax it, allowing the noise distribution to be heavy-tailed and, thus, broadening the class of problems to be solved. We propose gradient-free algorithms with zeroth-order oracle under adversarial noise with unbounded variance, for non-smooth convex and convex-concave optimization problems. We apply clipping operator to deal with heavy-tailedness and batching to allow efficient computation via parallelization. Our analysis provides asymptotic bounds for such key parameters as iteration complexity, oracle complexity and maximal adversarial noise level.
