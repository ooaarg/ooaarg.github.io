---
title: "Power of Generalized Smoothness in Stochastic Convex Optimization: First- and Zero-Order Algorithms"
authors: ["Aleksandr Lobanov", "Alexander Gasnikov"]
date: 2025-01-30
venue: "arXiv"
tag: "Paper"
type: "preprint"
area: "optimization"
featured: true
span: 2
tags: ["stochastic optimization", "gradient descent"]
arxiv: "2501.18198"
summary: "This paper is devoted to the study of stochastic optimization problems under the generalized smoothness assumption."
---

This paper is devoted to the study of stochastic optimization problems under the generalized smoothness assumption. By considering the unbiased gradient oracle in Stochastic Gradient Descent, we provide strategies to achieve in bounds the summands describing linear rate. In particular, in the case $L_0 = 0$, we obtain in the convex setup the iteration complexity: $N = \mathcal{O}\left(L_1R \log\frac{1}{\varepsilon} + \frac{L_1 c R^2}{\varepsilon}\right)$ for Clipped Stochastic Gradient Descent and $N = \mathcal{O}\left(L_1R \log\frac{1}{\varepsilon}\right)$ for Normalized Stochastic Gradient Descent. Furthermore, we generalize the convergence results to the case with a biased gradient oracle, and show that the power of $(L_0,L_1)$-smoothness extends to zero-order algorithms. Finally, we demonstrate the possibility of linear convergence in the convex setup through numerical experimentation, which has aroused some interest in the machine learning community.
