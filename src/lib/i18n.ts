export type Locale = "en" | "ru";

const russian: Record<string, string> = {
  "Conference link": "Сайт конференции",
  OO: "ОО",
  AARG: "ИПИГ",
  OOAARG: "ООИПИГ",
  "Online Optimization And Applications Research Group":
    "Исследовательская Группа Онлайн Оптимизация И Приложения",
  "Online Optimization And Applications Research Group.":
    "Исследовательская Группа Онлайн Оптимизация И Приложения.",
  "Online Optimization & Applications Research Group":
    "Исследовательская Группа Онлайн Оптимизация И Приложения",
  "et al.": "и др.",
  Oral: "Устный доклад",
  Spotlight: "Краткий доклад",
  Journal: "Журнальная статья",
  Read: "Читать",
  Conference: "Конференция",
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
  "404 · not found": "404 · страница не найдена",
  "No regret bound at this URL.": "По этому адресу ничего не найдено.",
  "The page you were looking for doesn't exist. Try one of the destinations below.":
    "Такой страницы нет. Перейдите в один из разделов ниже.",
  "Site navigation": "Навигация по сайту",
  "Mobile navigation": "Мобильная навигация",
  "OOAARG home": "ООИПИГ — главная",
  "Open menu": "Открыть меню",
  "Close menu": "Закрыть меню",
  "Featured paper": "Избранная публикация",
  "Featured papers": "Избранные публикации",
  "Venue and keywords": "Издание и ключевые слова",
  "Publication details": "О публикации",
  "View paper": "Читать статью",
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
  "No papers match these filters.": "По выбранным фильтрам ничего не найдено.",
  Done: "Готово",
  "No matches.": "Совпадений нет.",
  Clear: "Сбросить",
  Any: "Все",
  selected: "выбрано",
  Results: "Результаты",
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
  "Sequential decision-making under partial information: multi-armed bandits, contextual bandits, and adversarial online learning with provable regret guarantees.":
    "Последовательное принятие решений при неполной информации: многорукие и контекстные бандиты, онлайн-обучение с противником и доказуемыми гарантиями регрета.",
  "Auction-time bidding, ad pacing, and online ranking under budget and ROI constraints. Bringing online learning to the systems that decide what users see.":
    "Ставки на аукционах, распределение рекламного бюджета и онлайн-ранжирование с ограничениями по бюджету и окупаемости. Онлайн-обучение в системах, определяющих, что увидят пользователи.",
  "Online query optimization, adaptive buffer management and more: pushing online learning into the heart of modern database systems.":
    "Онлайн-оптимизация запросов, адаптивное управление буферами и другие применения онлайн-обучения в современных СУБД.",
  "Convex and non-convex optimization theory, lower bounds, and parameter-free methods. The structural foundations under everything else we build.":
    "Теория выпуклой и невыпуклой оптимизации, нижние оценки и методы без настройки параметров. Математическая основа наших исследований.",
};

export function translate(text: string, locale: Locale): string {
  return locale === "ru" ? (russian[text] ?? text) : text;
}

export function localeFromUrl(url: URL): Locale | undefined {
  const locale = url.searchParams.get("lang");
  return locale === "en" || locale === "ru" ? locale : undefined;
}

export function languageUrl(url: URL, locale: Locale): URL {
  const next = new URL(url);
  next.searchParams.set("lang", locale);
  return next;
}

export function readLocale(): Locale {
  // Shared links take precedence over this browser's saved preference.
  if (typeof window !== "undefined") {
    const locale = localeFromUrl(new URL(window.location.href));
    if (locale) return locale;
  }
  try {
    return localStorage.getItem("ooaarg-language") === "ru" ? "ru" : "en";
  } catch {
    return "en";
  }
}
