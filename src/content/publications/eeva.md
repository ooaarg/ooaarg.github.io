---
title: "EEvA: Fast Expert-Based Algorithms for Buffer Page Replacement"
authors:
  [
    "Alexander Demin",
    "Yuriy Dorn",
    "Aleksandr Katrutsa",
    "Daniil Kazantsev",
    "Ilgam Latypov",
    "Yulia Maximlyuk",
    "Denis Ponomaryov",
  ]
date: 2024-04-30
venue: "arXiv"
tag: "Paper"
type: "preprint"
area: "dbms"
featured: false
span: 2
tags: ["databases", "buffer page replacement"]
arxiv: "2405.00154"
summary: "In this paper, we propose a new family of page replacement algorithms for DB buffer manager which demonstrate a superior performance wrt competitors on custom data access patterns and imply a low computational overhead on TPC-C."
---

Optimal page replacement is an important problem in efficient buffer management. The range of replacement strategies known in the literature varies from simple but efficient FIFO-based algorithms to more accurate but potentially costly methods tailored to specific data access patterns. The principal issue in adopting a pattern-specific replacement logic in a DB buffer manager is to guarantee non-degradation in general high-load regimes. In this paper, we propose a new family of page replacement algorithms for DB buffer manager which demonstrate a superior performance wrt competitors on custom data access patterns and imply a low computational overhead on TPC-C. We provide theoretical foundations and an extensive experimental study on the proposed algorithms which covers synthetic benchmarks and an implementation in an open-source DB kernel evaluated on TPC-C.
