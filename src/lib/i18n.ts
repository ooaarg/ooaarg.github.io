export type Locale = "en" | "ru";

const russian: Record<string, string> = {
  "Conference link": "Сайт конференции",
  "Online Optimization And Applications Research Group":
    "Исследовательская Группа Онлайн Оптимизация И Приложения",
  "Online Optimization And Applications Research Group.":
    "Исследовательская группа по онлайн-оптимизации и её приложениям.",
  "Online Optimization & Applications Research Group":
    "Исследовательская Группа Онлайн Оптимизация И Приложения",
  "et al.": "и др.",
  Oral: "Устный доклад",
  Spotlight: "Краткий доклад",
  Journal: "Журнальная статья",
  Read: "Читать",
  Conference: "Конференция",
  "Opens in new tab": "Открывается в новой вкладке",
  "View profile": "Открыть профиль",
  Website: "Сайт",
  paper: "статья",
  preprint: "препринт",
  code: "код",
  talk: "доклад",
  "Show featured paper": "Показать публикацию",
  Home: "Главная",
  Blog: "Блог",
  Publications: "Публикации",
  About: "О группе",
  "About the researcher": "Об исследователе",
  Contact: "Контакты",
  Primary: "Основная навигация",
  "Toggle theme": "Сменить тему",
  Research: "Исследования",
  Group: "Группа",
  Elsewhere: "Другие ресурсы",
  "Join us": "Присоединиться",
  "What we work on": "Над чем мы работаем",
  "Out of the lab": "Новые публикации",
  "All publications": "Все публикации",
  "Let's work together": "Давайте работать вместе",
  "Find an adviser": "Найти научного руководителя",
  "Industry partnerships": "Сотрудничество с компаниями",
  "Browse our research": "Наши исследования",
  "We do science for both academia and industry, and we read every application. Whether you're a prospective student, a collaborator, or a company with a hard problem, we'd love to hear from you.":
    "Мы работаем для науки и бизнеса и читаем каждое обращение. Ищете научного руководителя, партнёра по исследованиям или решение сложной задачи? Напишите нам.",
  Lead: "Руководитель",
  Staff: "Команда",
  Partners: "Партнёры",
  Alumni: "Выпускники",
  "A research group studying decisions under uncertainty. Theory, algorithms, and the messy real-world problems that motivate both.":
    "Мы исследуем принятие решений в условиях неопределённости: теорию, алгоритмы и сложные практические задачи, которые их вдохновляют.",
  "Latest news": "Последние новости",
  "News and updates from our research group.": "Новости нашей исследовательской группы.",
  Filter: "Фильтр",
  "Search the corpus": "Поиск публикаций",
  "Filter by area, type, author, year, or venue — or just type a few words.":
    "Выберите направление, тип, автора, год или издание — или просто введите несколько слов.",
  "Page not found": "Страница не найдена",
  "This page may have moved, or the link may be incorrect.":
    "Возможно, страница переместилась или в ссылке есть ошибка.",
  "Back to home": "На главную",
  "Find a publication": "Найти публикацию",
  "Site navigation": "Навигация по сайту",
  "Mobile navigation": "Мобильная навигация",
  "OOAARG home": "OOAARG — главная",
  "Open menu": "Открыть меню",
  "Close menu": "Закрыть меню",
  "Featured paper": "Избранная публикация",
  "Featured papers": "Избранные публикации",
  "Venue and keywords": "Издание и ключевые слова",
  "Publication details": "О публикации",
  "View paper": "Читать статью",
  "Read paper": "Читать статью",
  "View code": "Смотреть код",
  "Carousel controls": "Управление каруселью",
  "Previous featured paper": "Предыдущая публикация",
  "Next featured paper": "Следующая публикация",
  All: "Все",
  of: "из",
  posts: "записей",
  Area: "Направление",
  Type: "Тип",
  Author: "Автор",
  Year: "Год",
  Venue: "Издание",
  Tag: "Тег",
  Paper: "Статья",
  Preprint: "Препринт",
  Code: "Код",
  Talk: "Доклад",
  "Bandits and Online Learning": "Бандиты и онлайн-обучение",
  "Autobidding, Ranking and Recommender Systems": "Автоставки, ранжирование и рекомендательные системы",
  DBMS: "СУБД",
  Optimization: "Оптимизация",
  Miscellaneous: "Разное",
  "Search titles, abstracts, authors, tags…": "Поиск по названиям, аннотациям, авторам, тегам…",
  "Search publications": "Поиск публикаций",
  Filters: "Фильтры",
  "Sort by date": "Сортировка по дате",
  Newest: "Сначала новые",
  Oldest: "Сначала старые",
  "No publications match this search.": "По этому запросу публикаций не найдено.",
  "Reset search and filters": "Сбросить поиск и фильтры",
  "No papers match these filters.": "По выбранным фильтрам ничего не найдено.",
  Done: "Готово",
  "No matches.": "Совпадений нет.",
  Clear: "Сбросить",
  Any: "Все",
  selected: "выбрано",
  "No publications found": "Публикации не найдены",
  for: "по запросу",
  "Cite this publication": "Цитировать публикацию",
  "Citation format": "Формат цитирования",
  "APA-style": "Стиль APA",
  "Download .bib": "Скачать .bib",
  Close: "Закрыть",
  Copy: "Копировать",
  Copied: "Скопировано",
  "Copy failed. Select and copy the citation manually.":
    "Не удалось скопировать. Выделите и скопируйте ссылку вручную.",
  Cite: "Цитировать",
  "In development": "В разработке",
  "Clear all filters": "Сбросить все фильтры",
  News: "Новости",
  Posted: "Дата публикации",
  Category: "Категория",
  Published: "Опубликовано",
  Keywords: "Ключевые слова",
  "Bio coming soon.": "Биография скоро появится.",
  "No publications listed yet.": "Публикаций пока нет.",
  "Last build:": "Последняя сборка:",
  "CC BY 4.0 unless noted": "CC BY 4.0, если не указано иное",
  "DBMS Optimization": "Оптимизация СУБД",
  "Papers:": "Статей:",
  latest: "последняя",
  "Cite this paper": "Цитировать статью",
  "Sequential decisions under partial information, with provable regret guarantees.":
    "Последовательные решения при неполной информации — с доказуемыми гарантиями регрета.",
  "Learning to bid, pace budgets, and rank recommendations under budget and ROI constraints.":
    "Обучение стратегиям ставок, распределению бюджета и ранжированию с ограничениями по расходам и окупаемости.",
  "Online learning for query optimization and adaptive buffer management in databases.":
    "Онлайн-обучение для оптимизации запросов и адаптивного управления буферами в базах данных.",
  "Convex and non-convex optimization, lower bounds, and parameter-free methods.":
    "Выпуклая и невыпуклая оптимизация, нижние оценки и методы без настройки параметров.",
};

export function translate(text: string, locale: Locale): string {
  return locale === "ru" ? (russian[text] ?? text) : text;
}

export function localeFromUrl(url: URL): Locale {
  return url.pathname === "/ru" || url.pathname.startsWith("/ru/") ? "ru" : "en";
}

export function languageUrl(url: URL, locale: Locale): URL {
  const next = new URL(url);
  let path = next.pathname.replace(/^\/(?:en|ru)(?=\/|$)/, "") || "/";
  if (/^\/404(?:\.html)?\/?$/.test(path)) path = "/404/";
  next.pathname = "/" + locale + path;
  next.searchParams.delete("lang");
  return next;
}

export function localizedHref(href: string, locale: Locale): string {
  if (!href.startsWith("/") || href.startsWith("//") || /\.[a-z0-9]+(?:[?#]|$)/i.test(href)) return href;
  const url = languageUrl(new URL(href, "https://ooaarg.github.io"), locale);
  return url.pathname + url.search + url.hash;
}

export function publicationNoun(count: number, locale: Locale): string {
  if (locale === "en") return count === 1 ? "publication" : "publications";
  const category = new Intl.PluralRules("ru").select(count);
  return category === "one" ? "публикация" : category === "few" ? "публикации" : "публикаций";
}
