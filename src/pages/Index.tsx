import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const IMG_HERO = "https://cdn.poehali.dev/projects/3f792b21-d338-4186-a2a6-6c21df1b4449/files/08d4cb1b-fc43-427a-b5f6-395386202d29.jpg";
const IMG_MESH = "https://cdn.poehali.dev/projects/3f792b21-d338-4186-a2a6-6c21df1b4449/files/00131e4e-8fa1-42bd-a17d-60e57e2a8636.jpg";
const IMG_TEAM = "https://cdn.poehali.dev/projects/3f792b21-d338-4186-a2a6-6c21df1b4449/files/19912d2e-496e-41a2-9268-f7e32bc30cda.jpg";
const IMG_TRAY = "https://cdn.poehali.dev/projects/3f792b21-d338-4186-a2a6-6c21df1b4449/files/d261fcd8-c0fc-4c68-aeb2-34569b918cbf.jpg";

const CATALOG_TABS = ["Все", "Клипсаторы", "Сетка", "Плёнка", "Лотки", "Мешки"];

const PRODUCTS = [
  {
    id: 1, name: "Клипсатор КС-500А", category: "Клипсаторы",
    img: IMG_HERO, price: "от 380 000 ₽",
    desc: "Полуавтомат, 500 уп/час, без компрессора, сетка Ø60–200 мм",
  },
  {
    id: 2, name: "Сеточный упаковщик СУ-1200", category: "Сетка",
    img: IMG_MESH, price: "от 890 000 ₽",
    desc: "Автомат, 1200 уп/час, двойная подача, встроенная маркировка",
  },
  {
    id: 3, name: "Термоусадочная линия ТУ-600", category: "Плёнка",
    img: IMG_TRAY, price: "от 540 000 ₽",
    desc: "600 уп/час, ПВХ/ПОФ-плёнка, формат 200–600 мм",
  },
  {
    id: 4, name: "Лотковый упаковщик ЛУ-800", category: "Лотки",
    img: IMG_TRAY, price: "Запросить цену",
    desc: "Автомат, 800 лотков/час, черри, клубника, зелень",
  },
  {
    id: 5, name: "Мешкозашивочная машина МЗ-200", category: "Мешки",
    img: IMG_MESH, price: "от 120 000 ₽",
    desc: "200 мешков/час, джутовые и полипропиленовые мешки",
  },
  {
    id: 6, name: "Клипсатор КС-800П Про", category: "Клипсаторы",
    img: IMG_HERO, price: "от 620 000 ₽",
    desc: "Полный автомат, 800 уп/час, этикетка wine-glass, без компрессора",
  },
];

const PROBLEMS = [
  { icon: "Timer", title: "Ручная фасовка не справляется", desc: "Срывы сроков, потери клиентов, переработки персонала" },
  { icon: "ClipboardX", title: "Упаковка не проходит аудит сетей", desc: "Отказы от листинга в федеральных ритейлерах" },
  { icon: "TrendingDown", title: "Высокий расход материалов", desc: "Перерасход сетки и клипс на 20–35% от нормы" },
  { icon: "AlertTriangle", title: "Оборудование простаивает", desc: "Потери 30% рабочего времени из-за поломок и переналадок" },
];

const UTP_EQUIP = [
  { icon: "Layers", text: "Двойная подача сетки — 0 остановок на перезарядку" },
  { icon: "Wind", text: "Работа без компрессора — экономия 80–150 тыс. руб./год" },
  { icon: "Tag", text: "Встроенная маркировка — этикетка прямо при упаковке" },
  { icon: "Heart", text: "Бережная упаковка — бой черри снижается с 8% до 1,5%" },
  { icon: "Zap", text: "Быстрая переналадка — смена формата за 15 минут" },
  { icon: "ShoppingBag", text: "Этикетка wine-glass — соответствие требованиям сетей" },
];

const UTP_COMPANY = [
  "20 лет на рынке упаковочного оборудования",
  "Склад запчастей в РФ — поставка 1–3 рабочих дня",
  "Пусконаладка и обучение персонала в комплекте",
  "Расходники у одного поставщика — без поиска",
  "Линии «под ключ» — от проекта до запуска",
  "Сервисные инженеры по всей РФ, выезд 24–48 ч",
];

const CASES = [
  {
    product: "Картофель 5 кг",
    was: "Ручная фасовка: 2 бригады по 6 человек, 800 уп/смену",
    became: "Автомат КС-800П: 1 оператор, 2 400 уп/смену",
    result: "Выработка ×3, ФОТ −75%, окупаемость 5 мес.",
    icon: "🥔",
  },
  {
    product: "Лук репчатый 1 кг",
    was: "Фасовка в мешки, отказ 3 сетей из-за маркировки",
    became: "Сеточный упаковщик с wine-glass этикеткой",
    result: "Листинг в Магните, Пятёрочке, Ленте за 2 месяца",
    icon: "🧅",
  },
  {
    product: "Черри-томаты 250 г",
    was: "Бой 8%, ручная укладка в лотки, 200 лотков/час",
    became: "Лотковый упаковщик ЛУ-800, бережная подача",
    result: "Бой 1,5%, производительность ×5, экспорт в ОАЭ",
    icon: "🍅",
  },
];

const SUPPLIES = [
  { name: "Сетка-рукав", desc: "Полипропиленовая, Ø60–240 мм, все цвета", icon: "🕸️" },
  { name: "Клипсы", desc: "Алюминиевые, пластиковые, под любой клипсатор", icon: "📎" },
  { name: "Этикетки wine-glass", desc: "Сертифицированы для федеральных сетей", icon: "🏷️" },
  { name: "Плёнка ПВХ/ПОФ", desc: "Термоусадочная, ширина 200–600 мм", icon: "📦" },
  { name: "Лотки", desc: "Вспенённый ПС, БОПП, картон — любые размеры", icon: "🍱" },
];

const STEPS = [
  { num: "01", title: "Заявка", desc: "Оставляете запрос онлайн или звоните" },
  { num: "02", title: "Подбор", desc: "Менеджер подбирает модель за 15 минут" },
  { num: "03", title: "Договор", desc: "Согласуем условия, подписываем договор" },
  { num: "04", title: "Доставка", desc: "Отгрузка со склада, доставка по РФ" },
  { num: "05", title: "Запуск", desc: "Пусконаладка и обучение в вашем цехе" },
];

const FAQS = [
  { q: "Нужен ли компрессор?", a: "Нет. Все наши клипсаторы серии КС работают без компрессора — на электроприводе. Это экономит 80–150 тыс. руб./год на обслуживании." },
  { q: "Встроена ли маркировка?", a: "Да. Начиная с модели КС-500А маркировочный модуль встроен в линию. Этикетка наносится в момент упаковки без остановок." },
  { q: "Подходит для федеральных сетей?", a: "Да. Наше оборудование формирует упаковку с этикеткой wine-glass, которая соответствует требованиям Магнита, Пятёрочки, Ленты и X5." },
  { q: "За какой срок окупится оборудование?", a: "Средний срок окупаемости — 4–8 месяцев. Рассчитаем индивидуально с учётом вашего объёма и текущих затрат на ФОТ и материалы." },
  { q: "Есть ли гарантия и сервис?", a: "Гарантия 12 месяцев на всё оборудование. Сервисные инженеры — во всех федеральных округах. Выезд в течение 24–48 часов." },
  { q: "Можно посмотреть машину в работе?", a: "Да. Проводим видеодемонстрацию онлайн и очные показы на производстве. Запишитесь через форму — согласуем удобное время." },
];

const NAV = [
  { label: "Оборудование", href: "#catalog" },
  { label: "Преимущества", href: "#advantages" },
  { label: "Как работаем", href: "#steps" },
  { label: "Контакты", href: "#contacts" },
];

const PACK_TYPES = ["Картофель", "Морковь", "Лук", "Свёкла", "Черри-томаты", "Огурцы", "Зелень", "Другое"];

export default function Index() {
  const [activeTab, setActiveTab] = useState("Все");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", pack: "", comment: "" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const filtered = activeTab === "Все" ? PRODUCTS : PRODUCTS.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">

      {/* ── HEADER ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-[0_2px_16px_rgba(0,0,0,0.1)]" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-16 gap-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 flex-shrink-0 mr-auto">
            <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: "var(--orange)" }}>
              <Icon name="Package" size={18} className="text-white" />
            </div>
            <span className="font-bold text-lg leading-tight text-[#1A1A1A]">
              Техно<span style={{ color: "var(--orange)" }}>-Сиб</span>
            </span>
          </a>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                className="text-sm font-medium text-[#444] hover:text-orange-600 transition-colors">
                {l.label}
              </button>
            ))}
          </nav>

          {/* Phone + CTA */}
          <div className="hidden md:flex items-center gap-4 ml-4">
            <a href="tel:88005004054" className="text-sm font-semibold text-[#1A1A1A] hover:text-orange-600 transition-colors">
              8-800-500-40-54
            </a>
            <button onClick={() => scrollTo("#contacts")} className="btn-orange text-sm py-2 px-5">
              Оставить заявку
            </button>
          </div>

          {/* Burger */}
          <button className="md:hidden ml-auto" onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={24} className="text-[#1A1A1A]" />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3">
            {NAV.map(l => (
              <button key={l.href} onClick={() => scrollTo(l.href)}
                className="text-left text-base font-medium text-[#444] py-2 border-b border-gray-100">
                {l.label}
              </button>
            ))}
            <a href="tel:88005004054" className="text-base font-bold text-[#1A1A1A] py-2">8-800-500-40-54</a>
            <button onClick={() => scrollTo("#contacts")} className="btn-orange w-full mt-1">Оставить заявку</button>
          </div>
        )}
      </header>

      {/* ── БЛОК 1: БАННЕР ── */}
      <section id="hero" className="pt-16 min-h-[88vh] flex items-center bg-[#F7F7F7] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-0 items-center py-12 lg:py-0">

          {/* Text 60% */}
          <div className="lg:col-span-3 pr-0 lg:pr-12 fade-up">
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: "rgba(255,102,0,0.08)", color: "var(--orange)" }}>
              <span className="w-2 h-2 rounded-full inline-block" style={{ background: "var(--orange)" }} />
              Официальный дилер • 20 лет на рынке
            </div>

            <h1 className="text-[clamp(28px,4.5vw,52px)] font-bold leading-[1.15] mb-5 text-[#1A1A1A]">
              Оборудование для<br />
              <span style={{ color: "var(--orange)" }}>упаковки овощей</span><br />
              и фруктов
            </h1>

            <p className="text-lg text-[#555] mb-8 max-w-xl leading-relaxed">
              Клипсаторы, упаковщики в сетку, плёнку и лотки — от полуавтоматов до линий.
              Подберём решение за 1 день.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <button onClick={() => scrollTo("#contacts")} className="btn-orange text-base px-8 py-3.5">
                Получить КП
              </button>
              <button onClick={() => scrollTo("#catalog")} className="btn-outline-orange text-base px-8 py-3.5">
                Смотреть каталог
              </button>
            </div>

            <div className="flex flex-wrap gap-6">
              {[["1 200+", "единиц в наличии"], ["20 лет", "на рынке"], ["4–8 мес.", "окупаемость"]].map(([v, l]) => (
                <div key={l}>
                  <div className="text-2xl font-bold" style={{ color: "var(--orange)" }}>{v}</div>
                  <div className="text-sm text-[#888] mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image 40% */}
          <div className="lg:col-span-2 relative fade-up-1">
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-auto lg:h-[520px]">
              <img src={IMG_HERO} alt="Клипсатор для овощей" loading="lazy"
                className="w-full h-full object-cover" />
            </div>
            {/* Float card */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-5 py-3 flex items-center gap-3 hidden lg:flex">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,102,0,0.1)" }}>
                <Icon name="TrendingUp" size={20} style={{ color: "var(--orange)" }} />
              </div>
              <div>
                <div className="text-xs text-[#888]">Производительность</div>
                <div className="font-bold text-[#1A1A1A]">до 1 200 уп/час</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── БЛОК 2: ПРОБЛЕМЫ ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--orange)" }}>Знакомые проблемы?</p>
            <h2 className="section-title">С чем сталкиваются производители</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROBLEMS.map((p, i) => (
              <div key={i} className="card-hover rounded-xl border border-gray-100 p-6 bg-white">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(255,102,0,0.08)" }}>
                  <Icon name={p.icon} fallback="AlertCircle" size={24} style={{ color: "var(--orange)" }} />
                </div>
                <h3 className="font-bold text-[#1A1A1A] text-base mb-2">{p.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── БЛОК 3: КАТАЛОГ ── */}
      <section id="catalog" className="py-16 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase mb-1" style={{ color: "var(--orange)" }}>Каталог</p>
              <h2 className="section-title mb-0">Оборудование</h2>
            </div>
            <p className="text-sm text-[#888]">Данные из YML-фида, обновляются ежедневно</p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATALOG_TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={activeTab === tab
                  ? { background: "var(--orange)", color: "#fff" }
                  : { background: "#fff", color: "#555", border: "1px solid #E0E0E0" }}>
                {tab}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(prod => (
              <div key={prod.id} className="card-hover bg-white rounded-xl overflow-hidden border border-gray-100">
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={prod.img} alt={prod.name} loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold mb-1" style={{ color: "var(--orange)" }}>{prod.category}</p>
                  <h3 className="font-bold text-[#1A1A1A] text-base mb-2">{prod.name}</h3>
                  <p className="text-sm text-[#666] mb-4 leading-relaxed">{prod.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg" style={{ color: "var(--orange)" }}>{prod.price}</span>
                    <button onClick={() => scrollTo("#contacts")}
                      className="text-sm font-semibold px-4 py-2 rounded-lg transition-all"
                      style={{ background: "rgba(255,102,0,0.08)", color: "var(--orange)" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,102,0,0.18)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,102,0,0.08)"; }}>
                      Подробнее →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── БЛОК 4: УТП ОБОРУДОВАНИЯ ── */}
      <section id="advantages" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--orange)" }}>Технологии</p>
            <h2 className="section-title">Почему наше оборудование лучше</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {UTP_EQUIP.map((u, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 bg-[#F7F7F7] card-hover">
                <div className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: "var(--orange)" }}>
                  <Icon name={u.icon} fallback="Check" size={20} className="text-white" />
                </div>
                <p className="text-base text-[#333] font-medium leading-relaxed">{u.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── БЛОК 5: УТП КОМПАНИИ ── */}
      <section className="py-16 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Photo */}
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
              <img src={IMG_TEAM} alt="Команда Техно-Сиб" loading="lazy" className="w-full h-full object-cover" />
            </div>
            {/* List */}
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--orange)" }}>Компания</p>
              <h2 className="section-title mb-6">Почему выбирают Техно-Сиб</h2>
              <ul className="space-y-4">
                {UTP_COMPANY.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: "var(--orange)" }}>
                      <Icon name="Check" size={13} className="text-white" />
                    </div>
                    <span className="text-base text-[#333]">{item}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => scrollTo("#contacts")} className="btn-orange mt-8">
                Получить консультацию
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── БЛОК 6: CTA-РАЗДЕЛИТЕЛЬ ── */}
      <section className="py-16" style={{ background: "var(--orange)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-[clamp(22px,3.5vw,34px)] font-bold text-white mb-4">
            Не знаете, какая машина нужна?
          </h2>
          <p className="text-lg text-white/85 mb-8">
            Расскажите, что упаковываете — подберём решение за 15 минут.
          </p>
          <button onClick={() => scrollTo("#contacts")} className="btn-white text-base px-10 py-3.5">
            Помогите подобрать
          </button>
        </div>
      </section>

      {/* ── БЛОК 7: КЕЙСЫ ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--orange)" }}>Результаты клиентов</p>
            <h2 className="section-title">Кейсы было → стало</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CASES.map((c, i) => (
              <div key={i} className="card-hover rounded-xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="px-6 py-5 flex items-center gap-3" style={{ background: "var(--orange)" }}>
                  <span className="text-3xl">{c.icon}</span>
                  <h3 className="font-bold text-white text-lg">{c.product}</h3>
                </div>
                <div className="p-6 bg-white space-y-4">
                  <div>
                    <p className="text-xs font-bold uppercase text-[#999] mb-1">Было</p>
                    <p className="text-sm text-[#555] leading-relaxed">{c.was}</p>
                  </div>
                  <div className="border-t border-gray-100" />
                  <div>
                    <p className="text-xs font-bold uppercase text-[#999] mb-1">Стало</p>
                    <p className="text-sm text-[#555] leading-relaxed">{c.became}</p>
                  </div>
                  <div className="rounded-lg px-4 py-3" style={{ background: "rgba(255,102,0,0.07)" }}>
                    <p className="text-xs font-bold uppercase mb-1" style={{ color: "var(--orange)" }}>Результат</p>
                    <p className="text-sm font-semibold text-[#1A1A1A]">{c.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── БЛОК 8: РАСХОДНИКИ ── */}
      <section className="py-14 bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--orange)" }}>Расходные материалы</p>
            <h2 className="section-title">Расходники у одного поставщика</h2>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            {SUPPLIES.map((s, i) => (
              <div key={i} className="card-hover bg-white rounded-xl border border-gray-100 px-6 py-5 flex items-center gap-4 min-w-[200px]">
                <span className="text-3xl">{s.icon}</span>
                <div>
                  <p className="font-bold text-[#1A1A1A] text-base">{s.name}</p>
                  <p className="text-xs text-[#888] mt-0.5 max-w-[160px] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── БЛОК 9: ЭТАПЫ ── */}
      <section id="steps" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--orange)" }}>Процесс</p>
            <h2 className="section-title">Как мы работаем</h2>
            <p className="text-[#888] mt-2">От заявки до запуска — от 5 рабочих дней</p>
          </div>

          {/* Desktop horizontal */}
          <div className="hidden md:grid grid-cols-5 gap-4">
            {STEPS.map((step, i) => (
              <div key={i} className="relative text-center">
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div className="absolute top-6 left-[calc(50%+28px)] right-[calc(-50%+28px)] h-0.5" style={{ background: "linear-gradient(90deg, var(--orange), #ffcc99)" }} />
                )}
                {/* Circle */}
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 font-bold text-white text-sm" style={{ background: "var(--orange)" }}>
                  {step.num}
                </div>
                <h3 className="font-bold text-[#1A1A1A] mb-1">{step.title}</h3>
                <p className="text-xs text-[#888] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Mobile vertical */}
          <div className="md:hidden space-y-4">
            {STEPS.map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white text-sm" style={{ background: "var(--orange)" }}>
                  {step.num}
                </div>
                <div className="pt-1">
                  <h3 className="font-bold text-[#1A1A1A] mb-0.5">{step.title}</h3>
                  <p className="text-sm text-[#888]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── БЛОК 10: FAQ ── */}
      <section className="py-16 bg-[#F7F7F7]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--orange)" }}>Вопросы и ответы</p>
            <h2 className="section-title">FAQ</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left gap-4 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-[#1A1A1A] text-base">{faq.q}</span>
                  <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-200"
                    style={{
                      background: openFaq === i ? "var(--orange)" : "#F0F0F0",
                      transform: openFaq === i ? "rotate(45deg)" : "none",
                    }}>
                    <Icon name="Plus" size={14} style={{ color: openFaq === i ? "#fff" : "#999" }} />
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-[#555] leading-relaxed text-base">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── БЛОК 11: ФОРМА ── */}
      <section id="contacts" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left text */}
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: "var(--orange)" }}>Бесплатно</p>
              <h2 className="section-title mb-4">Получите подбор и расчёт окупаемости</h2>
              <p className="text-lg text-[#555] mb-8 leading-relaxed">
                Опишите, что и в каком объёме упаковываете. Менеджер подберёт оборудование
                и рассчитает окупаемость — в течение 15 минут.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "Phone", label: "8-800-500-40-54", sub: "Бесплатно по РФ" },
                  { icon: "Mail", label: "info@techno-sib.ru", sub: "Ответ в течение часа" },
                  { icon: "MapPin", label: "Новосибирск, ул. Станционная, 60А", sub: "Центральный офис" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(255,102,0,0.08)" }}>
                      <Icon name={c.icon} fallback="Circle" size={18} style={{ color: "var(--orange)" }} />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1A1A1A]">{c.label}</p>
                      <p className="text-xs text-[#888]">{c.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="bg-[#F7F7F7] rounded-2xl p-7 border border-gray-100">
              <h3 className="font-bold text-xl text-[#1A1A1A] mb-6">Отправить заявку</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#888] uppercase tracking-wide mb-1.5 block">Ваше имя</label>
                  <input type="text" placeholder="Иван Петров"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#1A1A1A] text-base outline-none focus:border-orange-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#888] uppercase tracking-wide mb-1.5 block">Телефон</label>
                  <input type="tel" placeholder="+7 (___) ___-__-__"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#1A1A1A] text-base outline-none focus:border-orange-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#888] uppercase tracking-wide mb-1.5 block">Что упаковываете?</label>
                  <select
                    value={formData.pack}
                    onChange={e => setFormData({ ...formData, pack: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-base outline-none focus:border-orange-400 transition-colors"
                    style={{ color: formData.pack ? "#1A1A1A" : "#9CA3AF" }}
                  >
                    <option value="" disabled>Выберите продукт</option>
                    {PACK_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#888] uppercase tracking-wide mb-1.5 block">Комментарий</label>
                  <textarea rows={3} placeholder="Объём, формат упаковки, особые требования..."
                    value={formData.comment}
                    onChange={e => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-[#1A1A1A] text-base outline-none focus:border-orange-400 transition-colors resize-none"
                  />
                </div>
                <button className="btn-orange w-full py-3.5 text-base font-bold">
                  Отправить заявку
                </button>
                <p className="text-center text-xs text-[#AAA]">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ФУТЕР ── */}
      <footer className="py-10 bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Col 1: Logo + desc */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: "var(--orange)" }}>
                  <Icon name="Package" size={15} className="text-white" />
                </div>
                <span className="font-bold text-lg">Техно<span style={{ color: "var(--orange)" }}>-Сиб</span></span>
              </div>
              <p className="text-sm text-white/55 leading-relaxed max-w-xs">
                Поставка и сервис оборудования для упаковки овощей и фруктов. 20 лет на рынке.
              </p>
            </div>

            {/* Col 2: Nav */}
            <div>
              <p className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-4">Навигация</p>
              <ul className="space-y-2">
                {NAV.map(l => (
                  <li key={l.href}>
                    <button onClick={() => scrollTo(l.href)}
                      className="text-sm text-white/65 hover:text-white transition-colors">
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Contacts */}
            <div>
              <p className="text-sm font-semibold text-white/40 uppercase tracking-widest mb-4">Контакты</p>
              <ul className="space-y-3">
                <li>
                  <a href="tel:88005004054" className="text-sm text-white/65 hover:text-white transition-colors flex items-center gap-2">
                    <Icon name="Phone" size={14} className="text-orange-500" />
                    8-800-500-40-54
                  </a>
                </li>
                <li>
                  <a href="mailto:info@techno-sib.ru" className="text-sm text-white/65 hover:text-white transition-colors flex items-center gap-2">
                    <Icon name="Mail" size={14} className="text-orange-500" />
                    info@techno-sib.ru
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="MapPin" size={14} className="text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-white/65">Новосибирск, ул. Станционная, 60А</span>
                </li>
              </ul>
              <div className="flex gap-3 mt-4">
                {[
                  { icon: "MessageCircle", label: "Telegram" },
                  { icon: "Send", label: "WhatsApp" },
                ].map(s => (
                  <button key={s.label}
                    className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--orange)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
                  >
                    <Icon name={s.icon} size={16} className="text-white" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 text-center">
            <p className="text-xs text-white/35">© 2024 Техно-Сиб. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
