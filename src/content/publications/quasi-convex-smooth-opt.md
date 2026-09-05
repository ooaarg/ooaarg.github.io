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
---

Frequently, when dealing with many machine learning models, optimization problems appear to be challenging due to a limited understanding of the constructions and characterizations of the objective functions in these problems. Therefore, major complications arise when dealing with first-order algorithms, in which gradient computations are challenging or even impossible in various scenarios. For this reason, we resort to derivative-free methods (zeroth-order methods). This paper is devoted to an approach to minimizing quasi-convex functions using a recently proposed comparison oracle only. This oracle compares function values at two points and tells which is larger, thus by the proposed approach, the comparisons are all we need to solve the optimization problem under consideration. The proposed algorithm to solve the considered problem is based on the technique of comparison-based gradient direction estimation and the comparison-based approximation normalized gradient descent. The normalized gradient descent algorithm is an adaptation of gradient descent, which updates according to the direction of the gradients, rather than the gradients themselves. We proved the convergence rate of the proposed algorithm when the objective function is smooth and strictly quasi-convex in $R^n$, this algorithm needs $O(\frac{nD^2}{ε^2}*\log(\frac{nD}{ε}))$ comparison queries to find an $ε$-approximate of the optimal solution, where $D$ is an upper bound of the distance between all generated iteration points and an optimal solution.
