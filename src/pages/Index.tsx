import { useState } from "react";
import Icon from "@/components/ui/icon";

const IMG_CNC = "https://cdn.poehali.dev/projects/3f792b21-d338-4186-a2a6-6c21df1b4449/files/a8ab594e-da17-459a-851d-4561281e75e4.jpg";
const IMG_LASER = "https://cdn.poehali.dev/projects/3f792b21-d338-4186-a2a6-6c21df1b4449/files/f30801b3-3681-4793-bfa2-66e7243772c4.jpg";
const IMG_PRESS = "https://cdn.poehali.dev/projects/3f792b21-d338-4186-a2a6-6c21df1b4449/files/904f7523-11c4-4f01-9f70-923f8661410b.jpg";
const IMG_CONVEYOR = "https://cdn.poehali.dev/projects/3f792b21-d338-4186-a2a6-6c21df1b4449/files/ac2b65b3-fd99-4ddd-a3ae-3d4516c7025c.jpg";

const CATEGORIES = ["Все", "ЧПУ станки", "Лазерная резка", "Прессы", "Конвейеры", "Сварочное"];

const PRODUCTS = [
  { id: 1, name: "Фрезерный ЧПУ-центр V5", category: "ЧПУ станки", price: "от 2 850 000 ₽", image: IMG_CNC, badge: "Хит продаж", specs: "Рабочая зона 1500×900 мм, шпиндель 12 000 об/мин" },
  { id: 2, name: "Лазерный комплекс LX-300", category: "Лазерная резка", price: "от 1 490 000 ₽", image: IMG_LASER, badge: "Новинка", specs: "Мощность 3 кВт, металл до 20 мм" },
  { id: 3, name: "Гидравлический пресс HP-500", category: "Прессы", price: "от 980 000 ₽", image: IMG_PRESS, badge: null, specs: "Усилие 500 тн, рабочий стол 1200×800 мм" },
  { id: 4, name: "Конвейер сборочный КС-12", category: "Конвейеры", price: "от 650 000 ₽", image: IMG_CONVEYOR, badge: "Акция", specs: "Длина 12 м, скорость 0.1–2 м/мин" },
  { id: 5, name: "Токарный ЧПУ ТН-460", category: "ЧПУ станки", price: "от 1 750 000 ₽", image: IMG_CNC, badge: null, specs: "Диаметр обработки 460 мм, длина 1000 мм" },
  { id: 6, name: "Волоконный лазер FX-200", category: "Лазерная резка", price: "от 890 000 ₽", image: IMG_LASER, badge: "Топ цена", specs: "Мощность 2 кВт, нержавейка до 12 мм" },
];

const ADVANTAGES = [
  { icon: "ShieldCheck", title: "Гарантия 3 года", desc: "На всё оборудование из каталога. Замена или ремонт за наш счёт." },
  { icon: "Truck", title: "Доставка по РФ", desc: "Собственный транспорт, монтаж и пусконаладка под ключ." },
  { icon: "HeadphonesIcon", title: "Техподдержка 24/7", desc: "Выездные инженеры в любую точку России в течение 48 часов." },
  { icon: "BadgePercent", title: "Лизинг от 0%", desc: "Работаем с ведущими лизинговыми компаниями. Одобрение за 1 день." },
  { icon: "Boxes", title: "1 200+ позиций", desc: "Склад в Москве. Наличие актуальное, отгрузка в день оплаты." },
  { icon: "Award", title: "15 лет на рынке", desc: "Официальный дилер 30+ мировых производителей промоборудования." },
];

const FAQS = [
  { q: "Как получить коммерческое предложение?", a: "Оставьте заявку через форму или позвоните нам. Менеджер свяжется в течение 15 минут и подготовит КП с актуальными ценами и условиями поставки." },
  { q: "Возможна ли интеграция с YML-фидом для нашей 1С?", a: "Да, мы предоставляем YML-фид с актуальным каталогом, ценами и остатками. Обновление происходит каждые 4 часа. Формат совместим с 1С, МойСклад и другими системами." },
  { q: "Какие условия оплаты?", a: "Наличный и безналичный расчёт, банковские карты, лизинг от 0%, рассрочка на 12 месяцев. Для постоянных клиентов — отсрочка платежа до 45 дней." },
  { q: "Есть ли обучение работе с оборудованием?", a: "Включено в стоимость пусконаладки. Дополнительно проводим корпоративное обучение на нашей базе или выездное обучение у клиента." },
  { q: "Как долго ждать поставки?", a: "Оборудование со склада — 1–3 рабочих дня. Под заказ из Европы и Азии — от 4 до 12 недель. Точный срок указывается в договоре и фиксируется штрафными санкциями." },
];

const NAV_LINKS = [
  { label: "Главная", href: "#hero" },
  { label: "Оборудование", href: "#catalog" },
  { label: "Преимущества", href: "#advantages" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contacts" },
];

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredProducts =
    activeCategory === "Все"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4" style={{ background: "rgba(8,12,24,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center animate-pulse-glow" style={{ background: "linear-gradient(135deg, #ff6b2b, #e55a1f)" }}>
            <Icon name="Cog" size={18} className="text-white" />
          </div>
          <span className="font-['Oswald'] text-xl font-semibold tracking-wider text-white">ПРОМТЕХ</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)} className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 tracking-wide">
              {l.label}
            </button>
          ))}
        </div>

        <button onClick={() => scrollTo("#contacts")} className="hidden md:block btn-primary px-5 py-2 rounded-lg text-sm text-white">
          Получить КП
        </button>

        <button className="md:hidden text-white/70 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 pt-20 px-6 pb-6 flex flex-col gap-4" style={{ background: "rgba(8,12,24,0.97)", backdropFilter: "blur(20px)" }}>
          {NAV_LINKS.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)} className="text-left text-2xl font-['Oswald'] font-medium text-white/80 hover:text-white border-b border-white/10 pb-4 tracking-wider">
              {l.label}
            </button>
          ))}
          <button onClick={() => scrollTo("#contacts")} className="btn-primary px-6 py-3 rounded-lg text-white mt-4 text-lg font-['Oswald'] tracking-wider">
            Получить КП
          </button>
        </div>
      )}

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center mesh-bg noise overflow-hidden">
        <div className="particles" />

        {/* Decorative lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,107,43,0.2), transparent)" }} />
          <div className="absolute bottom-1/3 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(43,143,255,0.2), transparent)" }} />
          <div className="absolute top-0 bottom-0 left-1/4 w-px" style={{ background: "linear-gradient(180deg, transparent, rgba(255,107,43,0.1), transparent)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-fade-up" style={{ background: "rgba(255,107,43,0.1)", border: "1px solid rgba(255,107,43,0.3)" }}>
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-sm font-medium text-orange-400">Официальный дилер • 15 лет на рынке</span>
            </div>

            <h1 className="font-['Oswald'] text-5xl lg:text-7xl font-bold leading-none mb-6 animate-fade-up-delay-1">
              <span className="text-white">ПРОМЫШЛЕННОЕ</span>
              <br />
              <span className="gradient-text">ОБОРУДОВАНИЕ</span>
              <br />
              <span className="text-white/60 text-4xl lg:text-5xl">ДЛЯ ПРОИЗВОДСТВА</span>
            </h1>

            <p className="text-white/55 text-lg leading-relaxed mb-10 max-w-lg animate-fade-up-delay-2">
              Поставка, монтаж и сервисное обслуживание промышленного оборудования. Более 1 200 позиций в наличии на складе в Москве.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up-delay-3">
              <button onClick={() => scrollTo("#catalog")} className="btn-primary px-8 py-4 rounded-xl text-white text-lg font-['Oswald'] tracking-wider">
                Смотреть каталог
              </button>
              <button onClick={() => scrollTo("#contacts")} className="btn-outline px-8 py-4 rounded-xl text-lg font-['Oswald'] tracking-wider">
                Получить КП
              </button>
            </div>

            <div className="flex items-center gap-8 mt-12 animate-fade-up-delay-4">
              {[["1 200+", "позиций в наличии"], ["15", "лет на рынке"], ["3 года", "гарантия"]].map(([val, label]) => (
                <div key={label}>
                  <div className="font-['Oswald'] text-2xl font-bold" style={{ color: "var(--neon-orange)" }}>{val}</div>
                  <div className="text-xs text-white/40 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image stack */}
          <div className="relative h-96 lg:h-[560px] animate-fade-in hidden lg:block">
            <div className="absolute inset-0 rounded-3xl overflow-hidden neon-border-orange">
              <img src={IMG_CNC} alt="ЧПУ станок" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(255,107,43,0.15) 0%, rgba(0,0,0,0.4) 100%)" }} />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-32 rounded-2xl overflow-hidden neon-border-blue" style={{ zIndex: 10 }}>
              <img src={IMG_LASER} alt="Лазер" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "rgba(43,143,255,0.2)" }} />
            </div>
            <div className="absolute -top-6 -left-6 w-36 h-24 rounded-2xl overflow-hidden neon-border-orange" style={{ zIndex: 10 }}>
              <img src={IMG_PRESS} alt="Пресс" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "rgba(255,107,43,0.2)" }} />
            </div>

            {/* Floating badge */}
            <div className="absolute bottom-12 -left-10 z-20 card-dark rounded-2xl px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(43,143,255,0.2)", border: "1px solid rgba(43,143,255,0.4)" }}>
                <Icon name="TrendingUp" size={20} style={{ color: "var(--neon-blue)" }} />
              </div>
              <div>
                <div className="text-xs text-white/40">Одобрено заявок</div>
                <div className="font-['Oswald'] text-white font-bold text-lg">2 400+</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-white/30 tracking-widest">ЛИСТАТЬ</span>
          <Icon name="ChevronDown" size={20} className="text-white/30" />
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="py-24 section-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-medium tracking-[0.3em] uppercase" style={{ color: "var(--neon-orange)" }}>Ассортимент</span>
            <h2 className="font-['Oswald'] text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">КАТАЛОГ ОБОРУДОВАНИЯ</h2>
            <p className="text-white/40 max-w-xl mx-auto">Актуальные цены, остатки обновляются каждые 4 часа. Интеграция через YML-фид.</p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 font-['Golos_Text']"
                style={activeCategory === cat ? {
                  background: "linear-gradient(135deg, var(--neon-orange), #e55a1f)",
                  color: "white",
                  boxShadow: "0 4px 20px rgba(255,107,43,0.4)",
                } : {
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, i) => (
              <div
                key={product.id}
                className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(8,12,24,0.9) 100%)" }} />
                  {product.badge && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold tracking-wide" style={{ background: "linear-gradient(135deg, var(--neon-orange), #e55a1f)", color: "white" }}>
                      {product.badge}
                    </div>
                  )}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(43,143,255,0.8)" }}>
                      <Icon name="ArrowUpRight" size={16} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="text-xs mb-2" style={{ color: "var(--neon-blue)" }}>{product.category}</div>
                  <h3 className="font-['Oswald'] text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-white/40 mb-4 leading-relaxed">{product.specs}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-['Oswald'] text-xl font-bold" style={{ color: "var(--neon-orange)" }}>{product.price}</span>
                    <button className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200" style={{ background: "rgba(255,107,43,0.1)", border: "1px solid rgba(255,107,43,0.3)", color: "var(--neon-orange)" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,107,43,0.2)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,107,43,0.1)"; }}
                    >
                      Узнать цену
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="btn-outline px-10 py-4 rounded-xl text-lg font-['Oswald'] tracking-wider">
              Загрузить полный каталог (YML)
            </button>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="py-24 relative overflow-hidden" style={{ background: "#080c18" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,107,43,0.06) 0%, transparent 70%)" }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-xs font-medium tracking-[0.3em] uppercase" style={{ color: "var(--neon-blue)" }}>Почему мы</span>
            <h2 className="font-['Oswald'] text-4xl lg:text-5xl font-bold text-white mt-3">НАШИ ПРЕИМУЩЕСТВА</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADVANTAGES.map((adv, i) => (
              <div
                key={adv.title}
                className="group p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] cursor-default"
                style={{
                  background: i % 2 === 0
                    ? "linear-gradient(135deg, rgba(255,107,43,0.06) 0%, rgba(255,255,255,0.02) 100%)"
                    : "linear-gradient(135deg, rgba(43,143,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                  border: `1px solid ${i % 2 === 0 ? "rgba(255,107,43,0.15)" : "rgba(43,143,255,0.15)"}`,
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: i % 2 === 0 ? "rgba(255,107,43,0.15)" : "rgba(43,143,255,0.15)",
                    border: `1px solid ${i % 2 === 0 ? "rgba(255,107,43,0.3)" : "rgba(43,143,255,0.3)"}`,
                  }}>
                  <Icon name={adv.icon} fallback="Star" size={22} style={{ color: i % 2 === 0 ? "var(--neon-orange)" : "var(--neon-blue)" }} />
                </div>
                <h3 className="font-['Oswald'] text-xl font-semibold text-white mb-2">{adv.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 section-dark">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-medium tracking-[0.3em] uppercase" style={{ color: "var(--neon-orange)" }}>Вопросы и ответы</span>
            <h2 className="font-['Oswald'] text-4xl lg:text-5xl font-bold text-white mt-3">FAQ</h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: openFaq === i ? "rgba(255,107,43,0.06)" : "rgba(255,255,255,0.03)",
                  border: openFaq === i ? "1px solid rgba(255,107,43,0.25)" : "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-['Oswald'] text-lg font-medium text-white">{faq.q}</span>
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: openFaq === i ? "rgba(255,107,43,0.2)" : "rgba(255,255,255,0.06)",
                      transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    <Icon name="Plus" size={16} style={{ color: openFaq === i ? "var(--neon-orange)" : "rgba(255,255,255,0.5)" }} />
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="text-white/55 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 relative overflow-hidden" style={{ background: "#080c18" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 right-0 h-64" style={{ background: "linear-gradient(0deg, rgba(255,107,43,0.08) 0%, transparent 100%)" }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs font-medium tracking-[0.3em] uppercase" style={{ color: "var(--neon-orange)" }}>Связаться с нами</span>
              <h2 className="font-['Oswald'] text-4xl lg:text-5xl font-bold text-white mt-3 mb-6">КОНТАКТЫ</h2>
              <p className="text-white/45 text-lg leading-relaxed mb-10">
                Оставьте заявку — менеджер свяжется в течение 15 минут и подготовит коммерческое предложение с актуальными ценами.
              </p>

              <div className="space-y-5">
                {[
                  { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
                  { icon: "Mail", label: "Email", value: "info@promtech.ru" },
                  { icon: "MapPin", label: "Офис", value: "Москва, ул. Промышленная, 1" },
                  { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 9:00 – 19:00" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,107,43,0.1)", border: "1px solid rgba(255,107,43,0.25)" }}>
                      <Icon name={c.icon} fallback="Circle" size={18} style={{ color: "var(--neon-orange)" }} />
                    </div>
                    <div>
                      <div className="text-xs text-white/30">{c.label}</div>
                      <div className="text-white font-medium">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="card-dark rounded-3xl p-8 neon-border-orange">
              <h3 className="font-['Oswald'] text-2xl font-semibold text-white mb-6">Получить коммерческое предложение</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-white/40 mb-2 block tracking-wider uppercase">Ваше имя</label>
                  <input
                    type="text"
                    placeholder="Иван Петров"
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-white/25 outline-none transition-all duration-200"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    onFocus={e => { (e.target as HTMLElement).style.borderColor = "rgba(255,107,43,0.5)"; (e.target as HTMLElement).style.boxShadow = "0 0 15px rgba(255,107,43,0.1)"; }}
                    onBlur={e => { (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.target as HTMLElement).style.boxShadow = "none"; }}
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40 mb-2 block tracking-wider uppercase">Телефон</label>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-white/25 outline-none transition-all duration-200"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    onFocus={e => { (e.target as HTMLElement).style.borderColor = "rgba(255,107,43,0.5)"; (e.target as HTMLElement).style.boxShadow = "0 0 15px rgba(255,107,43,0.1)"; }}
                    onBlur={e => { (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.target as HTMLElement).style.boxShadow = "none"; }}
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40 mb-2 block tracking-wider uppercase">Компания</label>
                  <input
                    type="text"
                    placeholder="ООО «Производство»"
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-white/25 outline-none transition-all duration-200"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    onFocus={e => { (e.target as HTMLElement).style.borderColor = "rgba(255,107,43,0.5)"; (e.target as HTMLElement).style.boxShadow = "0 0 15px rgba(255,107,43,0.1)"; }}
                    onBlur={e => { (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.target as HTMLElement).style.boxShadow = "none"; }}
                  />
                </div>
                <div>
                  <label className="text-xs text-white/40 mb-2 block tracking-wider uppercase">Интересующее оборудование</label>
                  <textarea
                    rows={3}
                    placeholder="Опишите, что вас интересует..."
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-white/25 outline-none transition-all duration-200 resize-none"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                    onFocus={e => { (e.target as HTMLElement).style.borderColor = "rgba(255,107,43,0.5)"; (e.target as HTMLElement).style.boxShadow = "0 0 15px rgba(255,107,43,0.1)"; }}
                    onBlur={e => { (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.target as HTMLElement).style.boxShadow = "none"; }}
                  />
                </div>
                <button className="btn-primary w-full py-4 rounded-xl text-white text-lg font-['Oswald'] tracking-wider">
                  Отправить заявку
                </button>
                <p className="text-center text-xs text-white/25">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t" style={{ borderColor: "rgba(255,255,255,0.06)", background: "#060912" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: "linear-gradient(135deg, #ff6b2b, #e55a1f)" }}>
              <Icon name="Cog" size={14} className="text-white" />
            </div>
            <span className="font-['Oswald'] font-semibold tracking-wider text-white/60">ПРОМТЕХ</span>
          </div>
          <p className="text-xs text-white/25">© 2024 ПромТех. Все права защищены.</p>
          <div className="flex gap-6">
            {["Главная", "Каталог", "Контакты"].map(link => (
              <span key={link} className="text-xs text-white/30 hover:text-white/60 cursor-pointer transition-colors">{link}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}