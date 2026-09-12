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
ru:
  tags:
    "databases": "базы данных"
    "buffer page replacement": "замена страниц буфера"
  authors:
    "Daniil Kazantsev": "Даниил Казанцев"
    "Yulia Maximlyuk": "Юлия Максимлюк"
  title: "EEvA: быстрые экспертные алгоритмы замены страниц в буферном пуле"
  summary: "В этой работе мы предлагаем новое семейство алгоритмов замены страниц для буферного менеджера СУБД, которые демонстрируют превосходную производительность по сравнению с конкурентами на нестандартных шаблонах доступа к данным и обеспечивают низкие вычислительные накладные расходы на TPC-C."
  body: |
    Оптимальная замена страниц — важная задача эффективного управления буфером. Известные в литературе стратегии замены варьируются от простых, но эффективных алгоритмов на основе FIFO до более точных, но потенциально дорогостоящих методов, ориентированных на конкретные шаблоны доступа к данным. Основная проблема внедрения логики замены, специфичной для шаблона, в буферный менеджер СУБД — гарантировать отсутствие деградации в общих режимах высокой нагрузки. В этой работе мы предлагаем новое семейство алгоритмов замены страниц для буферного менеджера СУБД, которые демонстрируют превосходную производительность по сравнению с конкурентами на нестандартных шаблонах доступа к данным и обеспечивают низкие вычислительные накладные расходы на TPC-C. Мы приводим теоретические обоснования и обширное экспериментальное исследование предложенных алгоритмов, охватывающее синтетические бенчмарки и реализацию в ядре СУБД с открытым исходным кодом, оценённую на TPC-C.
---

Optimal page replacement is an important problem in efficient buffer management. The range of replacement strategies known in the literature varies from simple but efficient FIFO-based algorithms to more accurate but potentially costly methods tailored to specific data access patterns. The principal issue in adopting a pattern-specific replacement logic in a DB buffer manager is to guarantee non-degradation in general high-load regimes. In this paper, we propose a new family of page replacement algorithms for DB buffer manager which demonstrate a superior performance wrt competitors on custom data access patterns and imply a low computational overhead on TPC-C. We provide theoretical foundations and an extensive experimental study on the proposed algorithms which covers synthetic benchmarks and an implementation in an open-source DB kernel evaluated on TPC-C.
