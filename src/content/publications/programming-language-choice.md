---
title: "Programming-Language Choice Under Reinforcement and Saturation: An Evolutionary Game with Delays and Switching Costs"
authors: ["Yuriy Dorn"]
date: 2026-11-17
venue: "Dynamic Games and Applications"
tag: "Journal"
type: "paper"
area: "misc"
featured: true
span: 2
tags:
  [
    "evolutionary games",
    "programming-language choice",
    "technology adoption",
    "switching costs",
    "learning delays",
    "network effects",
  ]
doi: "10.1007/s13235-026-00723-0"
links:
  - { label: "Code", url: "https://doi.org/10.5281/zenodo.19546678" }
summary: "We model programming-language choice as an evolutionary population game with reinforcement, saturation, learning delays and switching costs, prove uniqueness and stability of equilibria for K languages, and calibrate the model on demand, salary, usage and learner-interest data."
heroSummary: "Which programming language should you learn next? The answer depends on ecosystem size, competition for jobs, learning time and what you already know. We model developers as a population that switches between languages, show when coexistence is stable, and check the model against demand, salary, usage and learner-interest data."
ru:
  tags:
    "evolutionary games": "эволюционные игры"
    "programming-language choice": "выбор языка программирования"
    "technology adoption": "принятие технологий"
    "switching costs": "издержки переключения"
    "learning delays": "запаздывания обучения"
    "network effects": "сетевые эффекты"
  links:
    "Code": "Код"
  title: "Выбор языка программирования при подкреплении и насыщении: эволюционная игра с запаздываниями и издержками переключения"
  summary: "Мы моделируем выбор языка программирования как эволюционную игру популяции с подкреплением, насыщением, запаздываниями обучения и издержками переключения, доказываем единственность и устойчивость равновесий для K языков и калибруем модель на данных о спросе, зарплатах и использовании."
  heroSummary: "Какой язык программирования учить следующим? Это зависит от размера экосистемы, конкуренции за рабочие места, времени на обучение и уже имеющегося опыта. Мы описываем разработчиков как популяцию, выбирающую между языками, показываем, когда сосуществование языков устойчиво, и проверяем модель на данных о спросе, зарплатах и интересе к обучению."
  venue: "Динамические игры и приложения"
  body: |
    Выбор языка программирования, который стоит учить следующим, зависит от размера экосистемы, загруженности рынка, времени на обучение и уже имеющихся знаний. Мы формулируем эволюционную игру популяции, в которой агенты индексируются языком, задающим их текущее решение о пересмотре выбора. Выигрыши объединяют собственную ценность языка со средней ценностью экосистемы, что даёт подкрепление при низкой распространённости и насыщение, когда пользователи конкурируют за ограниченное число возможностей.

    При постоянных шоках равновесие репликаторной динамики для $K$ языков сводится к скалярному уравнению с общей платёжной функцией, что даёт условия единственности и множественность, зависящую от выбора ветвей. Для двух языков эволюционная устойчивость и локальная асимптотическая устойчивость совпадают с отрицательным наклоном платёжной функции в невырожденных внутренних равновесиях; точное условие на знак покрывает и вырожденные равновесия. Мы также анализируем асинхронный пересмотр выбора при ограниченном потоке.

    При убывающих кривых средней ценности логит-выбор индуцирует энтропийно регуляризованный потенциал и единственную глобально асимптотически устойчивую внутреннюю неподвижную точку, тогда как запаздывания обучения могут дестабилизировать сосуществование. Издержки перехода «источник — назначение» отражают зависимость от пути в обучении, а шоки, специфичные для языка, сдвигают его эффективную привлекательность. Калибровка на данных о спросе, зарплатах, использовании и интересе обучающихся помещает наблюдаемые зрелые экосистемы на сторону насыщения платёжной кривой и иллюстрирует сравнительную статику по шокам.
---

Choosing which programming language to learn next is shaped by ecosystem scale, congestion, learning time, and prior knowledge. We formulate an evolutionary population game in which agents are indexed by the language that anchors their current revision decision. Payoffs combine standalone value with average ecosystem value, allowing reinforcement at low adoption and saturation when users compete for limited opportunities.

Under constant shocks, the $K$-language replicator equilibrium reduces to a scalar common-payoff equation, yielding uniqueness conditions and branch-specific multiplicity. For two languages, evolutionary stability and local asymptotic stability coincide with a negative payoff slope at nondegenerate interior equilibria; an exact sign condition covers degenerate equilibria. We also analyze asynchronous bounded-flow revision.

With decreasing average-value curves, logit choice induces an entropy-regularized potential and a unique globally asymptotically stable interior fixed point, while learning delays can destabilize coexistence. Origin–destination costs capture path dependence in learning, and language-specific shocks shift effective attractiveness. A programming-language calibration using demand, salary, usage, and learner-interest data locates the observed mature ecosystems on the congestion side of the payoff curve and illustrates shock comparative statics.
