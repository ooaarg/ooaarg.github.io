---
title: "Practical Training-Free MCTS Query Optimization"
authors:
  [
    "Vladimir Burlakov",
    "Alena Rybakina",
    "Sergey Kudashev",
    "Konstantin Gilev",
    "Alexander Demin",
    "Denis Ponomaryov",
    "Yuriy Dorn",
  ]
date: 2026-6-23
venue: "arXiv"
tag: "Paper"
type: "preprint"
area: "dbms"
featured: false
span: 2
tags:
  [
    "databases",
    "query optimization",
    "monte carlo tree search",
    "reproducibility",
  ]
arxiv: "2603.16474"
links:
  - { label: "GitHub", url: "https://github.com/ooaarg/tfmctsqo" }
summary: "This paper presents MCTS-Extreme, a training-free Monte Carlo Tree Search join optimizer that reuses PostgreSQL's own cost model and runs as a native planner extension, beating GEQO and DPSize on high-arity queries. A reproduction study finds the learned MCTS systems we could run did not beat the default optimizer."
---

Production query optimizers fall back to heuristic or randomized search, such as greedy ordering or GEQO, once a query joins more than about a dozen relations. This bounds planning time but often leaves plans far from the best available under the same cost model. Learned alternatives such as AlphaJoin and HyperQO can improve search quality, but they depend on workload-specific training, distribution-stable query patterns, and external hint-rewriting deployment. In a reproduction study, the learned MCTS systems we were able to run did not improve on PostgreSQL's default optimizer under these conditions.

We present MCTS-Extreme, a training-free Monte Carlo Tree Search join optimizer that reuses PostgreSQL's own cost model instead of replacing it with learned components. It combines a UCT-Extreme selection rule, which tracks each subtree's best plan so far rather than its average, with a configurable plan-shape parameter, and it runs natively as a PostgreSQL planner extension. We evaluate it against AlphaJoin, HyperQO, and PostgreSQL's DPSize and GEQO on the Join Order Benchmark (JOB), JOB-Complex, and a 200-query IMDb-CEB subset. In the high-arity regime where the planner already switches to GEQO, MCTS-Extreme produces faster end-to-end plans: 1.47x over GEQO on JOB queries with at least 12 relations, and 1.17x on the independent IMDb-CEB slice, with planning time comparable to GEQO's.
