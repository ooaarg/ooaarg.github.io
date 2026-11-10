---
title: "Cold-Start Constrained Autobidding via Implied-Dual Calibration"
authors:
  [
    "Andrey Pudovikov",
    "Aleksandr Katrutsa",
    "Egor Samosvat",
    "Yuriy Dorn",
  ]
date: 2026-11-07
venue: "CIKM 2026"
tag: "Paper"
type: "paper"
area: "autobidding"
featured: true
span: 2
tags: ["autobidding", "cold start", "constrained bidding", "first-price auctions", "hybrid auctions", "winning-price prediction", "online advertising"]
summary: "When a new ad enters an existing auction market, an autobidding system must choose its first constrained bid before observing feedback from that ad. We study this cold-start decision under budget and CPC-style constraints."
doi: "10.1145/3799682.3841153"
links:
  - {
      label: "GitHub",
      url: "https://github.com/ooaarg/coldstart_autobid",
    }
ru:
  tags:
    "autobidding": "автоматическое назначение ставок"
    "cold start": "холодный старт"
    "constrained bidding": "назначение ставок с учётом ограничений"
    "first-price auctions": "аукционы первой цены"
    "hybrid auctions": "гибридные аукционы"
    "winning-price prediction": "прогнозирование цены выигрыша"
    "online advertising": "интернет-реклама"
  title: "Автоматическое назначение ставок в условиях холодного старта с ограничениями с помощью калибровки по неявным двойственным переменным"
  summary: "Когда новое рекламное объявление появляется на существующем аукционном рынке, система автоматического назначения ставок должна определить первую ставку с учётом ограничений, ещё не имея обратной связи по этому объявлению. Мы исследуем эту задачу холодного старта в условиях ограничений на бюджет и стоимость клика."
  body: |
    Когда новое рекламное объявление появляется на существующем аукционном рынке, система автоматического назначения ставок должна определить первую ставку с учётом ограничений, ещё не имея обратной связи по этому объявлению. Мы исследуем эту задачу холодного старта в условиях ограничений на бюджет и стоимость клика (CPC). Стандартный подход к инициализации заключается в повторном использовании исторической стратегии назначения ставок с ограничениями. Он эффективен при стационарных условиях, но чувствителен к изменениям цен и зависимостей отклика. Вместо повторного использования полной исторически оптимальной стратегии мы предлагаем калибровку неявных двойственных переменных (IDVC) — метод, который обучает допустимую низкоразмерную поверхность неявных двойственных переменных на основе исторических контекстов. Для ограничений CPC используется следующая функция маржи: $m = s(z)v + \alpha(z)C\mu$, где $s(z)>0$, $\alpha(z)\in[0,1]$, $v = \mathrm{CTR} \cdot \mathrm{CVR}$, а $\mu = \mathrm{CTR}$. В аукционах SPA/VCG эта маржа может непосредственно использоваться в качестве ставки, тогда как для аукционов первой цены и гибридных аукционов требуется обоснованное отображение маржи в ставку. Мы теоретически доказываем, что ошибки калибровки и отображения маржи в ставку определяют границы ошибок ставки, вознаграждения и соблюдения ограничений в первом периоде при условии локальной поддержки данных. На общедоступном наборе данных BAT мы оцениваем калибровку относительно эталонных целевых значений. В полусинтетических экспериментах, построенных на основе структуры BAT, с известными преобразованиями и проверенными функциями отображения маржи в ставку метод guarded IDVC демонстрирует более эффективное назначение ставок на ранних этапах при соблюдении ограничений по сравнению с повторным использованием исторической стратегии.
---

When a new ad enters an existing auction market, an autobidding system must choose its first constrained bid before observing feedback from that ad. We study this cold-start decision under budget and CPC-style constraints. The standard warm start is to reuse a historical constrained policy, which is strong under stationarity although sensitive to shifted prices or response curves. Instead of replaying the full historical optimum, we propose implied-dual variable calibration (IDVC), which learns an admissible, low-dimensional implied-dual surface from historical contexts. For CPC constraints, the reusable margin is $m = s(z)v + \alpha(z)C\mu$, where $s(z)>0$, $\alpha(z)\in[0,1]$, $v = \mathrm{CTR} \cdot \mathrm{CVR}$, and $\mu = \mathrm{CTR}$. SPA/VCG auctions can bid this margin directly, and first-price/hybrid auctions require a supported map from margin to bid. We prove that calibration and bid-map error control first-period bid, reward, and constraint error under local support. On the public BAT dataset, we report benchmark-target calibration; in BAT-shaped semi-synthetic known-transform studies with validated bid maps, guarded IDVC improves early constrained bidding relative to historical reuse.
