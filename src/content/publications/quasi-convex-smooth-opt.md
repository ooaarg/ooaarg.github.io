---
title: "On quasi-convex smooth optimization problems by a comparison oracle"
authors:
  [
    "Alexander Gasnikov",
    "Mohammad Alkousa",
    "Aleksandr Lobanov",
    "Yuriy Dorn",
    "Fedor Stonyakin",
    "Ilya Kuruzov",
    "Sanjeev Singh",
  ]
date: 2024-12-28
venue: "Russian Journal of Nonlinear Dynamics"
tag: "Journal"
type: "paper"
area: "optimization"
featured: true
span: 2
tags:
  [
    "quasi-convex function",
    "gradient-free algorithm",
    "smooth function",
    "comparison oracle",
    "normalized gradient descent",
  ]
arxiv: "2502.01862"
summary: "This paper is devoted to an approach to minimizing quasi-convex functions using a recently proposed comparison oracle only."
ru:
  tags:
    "quasi-convex function": "квазивыпуклая функция"
    "gradient-free algorithm": "безградиентный алгоритм"
    "smooth function": "гладкая функция"
    "comparison oracle": "оракул сравнения"
    "normalized gradient descent": "нормализованный градиентный спуск"
  authors:
    "Alexander Gasnikov": "Александр Гасников"
    "Mohammad Alkousa": "Мохаммад Алькуса"
    "Fedor Stonyakin": "Фёдор Стонякин"
    "Ilya Kuruzov": "Илья Курузов"
    "Sanjeev Singh": "Санджив Сингх"
  title: "О задачах квазивыпуклой гладкой оптимизации с помощью оракула сравнения"
  summary: "Эта работа посвящена подходу к минимизации квазивыпуклых функций с использованием только недавно предложенного оракула сравнения."
  venue: "Русский журнал нелинейной динамики"
  body: |
    Часто при работе со многими моделями машинного обучения задачи оптимизации оказываются сложными из-за ограниченного понимания конструкций и характеристик целевых функций. Поэтому серьёзные затруднения возникают при использовании алгоритмов первого порядка, в которых вычисление градиента сложно или даже невозможно в различных сценариях. По этой причине мы обращаемся к методам без производных (методам нулевого порядка). Эта работа посвящена подходу к минимизации квазивыпуклых функций с использованием только недавно предложенного оракула сравнения. Этот оракул сравнивает значения функции в двух точках и сообщает, какое из них больше; таким образом, при предложенном подходе сравнения — это всё, что нужно для решения рассматриваемой задачи оптимизации. Предлагаемый алгоритм решения рассматриваемой задачи основан на технике оценки направления градиента на основе сравнений и нормализованном градиентном спуске на основе сравнений. Алгоритм нормализованного градиентного спуска — это адаптация градиентного спуска, которая обновляется в направлении градиентов, а не по самим градиентам. Мы доказали скорость сходимости предложенного алгоритма, когда целевая функция гладкая и строго квазивыпуклая в $R^n$; этому алгоритму требуется $O(\frac{nD^2}{ε^2}*\log(\frac{nD}{ε}))$ запросов сравнения, чтобы найти $ε$-приближение оптимального решения, где $D$ — верхняя граница расстояния между всеми генерируемыми точками итераций и оптимальным решением.
---

Frequently, when dealing with many machine learning models, optimization problems appear to be challenging due to a limited understanding of the constructions and characterizations of the objective functions in these problems. Therefore, major complications arise when dealing with first-order algorithms, in which gradient computations are challenging or even impossible in various scenarios. For this reason, we resort to derivative-free methods (zeroth-order methods). This paper is devoted to an approach to minimizing quasi-convex functions using a recently proposed comparison oracle only. This oracle compares function values at two points and tells which is larger, thus by the proposed approach, the comparisons are all we need to solve the optimization problem under consideration. The proposed algorithm to solve the considered problem is based on the technique of comparison-based gradient direction estimation and the comparison-based approximation normalized gradient descent. The normalized gradient descent algorithm is an adaptation of gradient descent, which updates according to the direction of the gradients, rather than the gradients themselves. We proved the convergence rate of the proposed algorithm when the objective function is smooth and strictly quasi-convex in $R^n$, this algorithm needs $O(\frac{nD^2}{ε^2}*\log(\frac{nD}{ε}))$ comparison queries to find an $ε$-approximate of the optimal solution, where $D$ is an upper bound of the distance between all generated iteration points and an optimal solution.
