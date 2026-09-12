---
title: "γ-Competitiveness: An Approach to Multi-Objective Optimization with High Computation Costs in Lipschitz Functions"
authors: ["Ilgam Latypov", "Yuriy Dorn"]
date: 2025-01-14
venue: "Operations Research Forum"
tag: "Paper"
type: "paper"
area: "optimization"
featured: true
span: 2
tags: ["multi-objective optimization"]
arxiv: "2410.03023"
summary: "We introduce an extension of the concept of competitive solutions and propose the Scalarization With Competitiveness Method (SWCM) for multi-criteria problems."
ru:
  tags:
    "multi-objective optimization": "многокритериальная оптимизация"
  title: "γ-конкурентоспособность: подход к многокритериальной оптимизации с высокими вычислительными затратами для липшицевых функций"
  summary: "Мы вводим расширение понятия конкурентных решений и предлагаем метод скаляризации с конкурентоспособностью (SWCM) для многокритериальных задач."
  body: |
    В практической инженерии и оптимизации решение задач многокритериальной оптимизации (MOO) обычно включает методы скаляризации, преобразующие многокритериальную задачу в однокритериальную. Будучи эффективными, эти методы часто требуют значительных вычислительных затрат из-за итеративных вычислений и дополнительно усложняются необходимостью настройки гиперпараметров. В этой работе мы вводим расширение понятия конкурентных решений и предлагаем метод скаляризации с конкурентоспособностью (SWCM) для многокритериальных задач. Этот метод обладает высокой интерпретируемостью и устраняет необходимость настройки гиперпараметров. Кроме того, мы предлагаем решение для случаев, когда целевые функции липшицевы и могут быть вычислены только один раз, — аппроксимацию конкурентоспособности на липшицевых функциях (CAoLF). Этот подход особенно полезен, когда вычислительные ресурсы ограничены или повторное вычисление невозможно. На вычислительных экспериментах на задаче о потоке минимальной стоимости с параллельными путями мы демонстрируем эффективность и масштабируемость предложенного метода, подчёркивая его потенциал для решения вычислительных задач MOO в различных приложениях.
---

In practical engineering and optimization, solving multi-objective optimization (MOO) problems typically involves scalarization methods that convert a multi-objective problem into a single-objective one. While effective, these methods often incur significant computational costs due to iterative calculations and are further complicated by the need for hyperparameter tuning. In this paper, we introduce an extension of the concept of competitive solutions and propose the Scalarization With Competitiveness Method (SWCM) for multi-criteria problems. This method is highly interpretable and eliminates the need for hyperparameter tuning. Additionally, we offer a solution for cases where the objective functions are Lipschitz continuous and can only be computed once, termed Competitiveness Approximation on Lipschitz Functions (CAoLF). This approach is particularly useful when computational resources are limited or re-computation is not feasible. Through computational experiments on the minimum-cost concurrent flow problem, we demonstrate the efficiency and scalability of the proposed method, underscoring its potential for addressing computational challenges in MOO across various applications.
