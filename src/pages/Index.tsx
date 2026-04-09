import { useState } from "react";
import Icon from "@/components/ui/icon";

const PORTFOLIO = [
  {
    id: 1,
    title: "Дубовая маршевая",
    desc: "Частный дом, Подмосковье",
    year: "2024",
    images: [
      "https://cdn.poehali.dev/projects/e30f204b-61ac-4ac4-b994-089a68e5005a/files/ffb6c89b-0ffc-4d48-b9c2-678dc5123ef3.jpg",
      "https://cdn.poehali.dev/projects/e30f204b-61ac-4ac4-b994-089a68e5005a/files/6bb68052-3dd9-4be8-91a4-76f9dd6cac69.jpg",
      "https://cdn.poehali.dev/projects/e30f204b-61ac-4ac4-b994-089a68e5005a/files/d9918d66-03b7-4a84-951a-0cd1827d7665.jpg",
    ],
  },
  {
    id: 2,
    title: "Спираль с металлом",
    desc: "Таунхаус, Сочи",
    year: "2024",
    images: [
      "https://cdn.poehali.dev/projects/e30f204b-61ac-4ac4-b994-089a68e5005a/files/7673b643-8aeb-49a8-9327-04930e389081.jpg",
      "https://cdn.poehali.dev/projects/e30f204b-61ac-4ac4-b994-089a68e5005a/files/2c0464c2-b24f-4318-884a-fd84bf3fce76.jpg",
      "https://cdn.poehali.dev/projects/e30f204b-61ac-4ac4-b994-089a68e5005a/files/ff4fa933-83ff-48bf-8aa9-af3d021dff64.jpg",
    ],
  },
  {
    id: 3,
    title: "Консольная со стеклом",
    desc: "Апартаменты, Москва",
    year: "2023",
    images: [
      "https://cdn.poehali.dev/projects/e30f204b-61ac-4ac4-b994-089a68e5005a/files/bd4203e8-fcdb-4571-b79b-8b853204e8a7.jpg",
      "https://cdn.poehali.dev/projects/e30f204b-61ac-4ac4-b994-089a68e5005a/files/a41544e3-5ee8-4ca1-9051-4256c1f98604.jpg",
      "https://cdn.poehali.dev/projects/e30f204b-61ac-4ac4-b994-089a68e5005a/files/20cab88b-1f5b-4b6c-b57a-7fca66191518.jpg",
    ],
  },
];

function PortfolioCard({ item }: { item: typeof PORTFOLIO[0] }) {
  const [slide, setSlide] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlide((s) => (s - 1 + item.images.length) % item.images.length);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSlide((s) => (s + 1) % item.images.length);
  };

  return (
    <div className="portfolio-item group">
      <div className="relative overflow-hidden aspect-[3/4] bg-muted">
        {item.images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={item.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === slide ? "opacity-100" : "opacity-0"}`}
          />
        ))}

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 hover:bg-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Icon name="ChevronLeft" size={16} />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 hover:bg-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Icon name="ChevronRight" size={16} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          {item.images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setSlide(i); }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === slide ? "bg-background scale-125" : "bg-background/50"}`}
            />
          ))}
        </div>

        {/* Year overlay */}
        <div className="absolute top-4 right-4">
          <span className="text-background/70 text-xs tracking-[0.14em]">{item.year}</span>
        </div>
      </div>
      <div className="pt-4">
        <h3 className="font-display text-lg font-light text-foreground">{item.title}</h3>
        <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
      </div>
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-body">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="font-display text-xl font-light tracking-widest uppercase text-foreground"
          >
            Stair House
          </button>

          <div className="hidden md:flex items-center gap-10">
            {[
              { label: "О нас", id: "about" },
              { label: "Портфолио", id: "portfolio" },
              { label: "Контакты", id: "contacts" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="nav-link text-xs tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-background border-t border-border px-6 py-6 flex flex-col gap-5">
            {[
              { label: "О нас", id: "about" },
              { label: "Портфолио", id: "portfolio" },
              { label: "Контакты", id: "contacts" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left text-sm tracking-[0.14em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* BANNER */}
      <div className="w-full h-[70vh] md:h-screen relative overflow-hidden mt-16">
        <img
          src="https://cdn.poehali.dev/projects/e30f204b-61ac-4ac4-b994-089a68e5005a/files/ce3bde6e-6b42-4f78-a118-7c181997b8cb.jpg"
          alt="Лестница"
          className="w-full h-full object-cover animate-fade-in"
          style={{ opacity: 0, animationFillMode: "forwards" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-background/60" />
      </div>

      {/* HERO */}
      <section
        id="hero"
        className="flex flex-col pb-20 pt-16 px-6 md:px-16 max-w-6xl mx-auto"
      >
        <div className="animate-fade-up" style={{ opacity: 0, animationFillMode: "forwards" }}>
          <p className="text-xs tracking-[0.22em] uppercase text-muted-foreground mb-6">
            Ручное изготовление · с 2008 года
          </p>
        </div>
        <h1
          className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.92] font-light text-foreground animate-fade-up-d1"
          style={{ opacity: 0, animationFillMode: "forwards" }}
        >
          Лестницы,
          <br />
          <em className="italic">созданные</em>
          <br />
          вручную
        </h1>
        <div
          className="mt-10 flex flex-col sm:flex-row gap-4 items-start animate-fade-up-d2"
          style={{ opacity: 0, animationFillMode: "forwards" }}
        >
          <button
            onClick={() => scrollTo("portfolio")}
            className="px-8 py-3.5 bg-foreground text-background text-xs tracking-[0.16em] uppercase hover:opacity-75 transition-opacity duration-300"
          >
            Смотреть работы
          </button>
          <button
            onClick={() => scrollTo("contacts")}
            className="px-8 py-3.5 border border-border text-foreground text-xs tracking-[0.16em] uppercase hover:bg-secondary transition-colors duration-300"
          >
            Связаться с нами
          </button>
        </div>

        <div
          className="mt-20 h-px bg-border animate-line-grow"
          style={{ animationFillMode: "forwards", transformOrigin: "left" }}
        />
        <div
          className="mt-5 flex gap-12 text-xs text-muted-foreground animate-fade-up-d3"
          style={{ opacity: 0, animationFillMode: "forwards" }}
        >
          <div>
            <span className="font-display text-3xl font-light text-foreground">300+</span>
            <p className="mt-1 tracking-[0.1em]">проектов</p>
          </div>
          <div>
            <span className="font-display text-3xl font-light text-foreground">16</span>
            <p className="mt-1 tracking-[0.1em]">лет опыта</p>
          </div>
          <div>
            <span className="font-display text-3xl font-light text-foreground">12</span>
            <p className="mt-1 tracking-[0.1em]">мастеров</p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 px-6 md:px-16 max-w-6xl mx-auto border-t border-border">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          <div>
            <p className="text-xs tracking-[0.22em] uppercase text-muted-foreground mb-8">О нас</p>
            <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-tight font-light text-foreground">
              Мы делаем лестницы, которые служат поколениям
            </h2>
          </div>
          <div className="space-y-6 pt-2 md:pt-16">
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Артель основана в 2008 году. Мы специализируемся на изготовлении лестниц из массива дерева, металла и стекла для частных домов, таунхаусов и коммерческих пространств.
            </p>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Каждый проект начинается с выезда замерщика и бесплатного эскиза. Производство — в собственной мастерской в Подмосковье. Монтаж и гарантия 10 лет включены в стоимость.
            </p>
            <div className="pt-4 border-t border-border">
              <div className="grid grid-cols-2 gap-5 mt-6">
                {[
                  { icon: "TreePine", label: "Массив дерева" },
                  { icon: "Layers", label: "Металл и стекло" },
                  { icon: "Ruler", label: "Точные замеры" },
                  { icon: "ShieldCheck", label: "Гарантия 10 лет" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <Icon name={item.icon as "TreePine"} size={15} className="text-muted-foreground flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-20 px-6 md:px-16 max-w-6xl mx-auto border-t border-border">
        <div className="mb-12">
          <p className="text-xs tracking-[0.22em] uppercase text-muted-foreground mb-4">Портфолио</p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light text-foreground">Избранные работы</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PORTFOLIO.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-28 px-6 md:px-16 max-w-6xl mx-auto border-t border-border">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <p className="text-xs tracking-[0.22em] uppercase text-muted-foreground mb-8">Контакты</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-light text-foreground leading-tight">
              Обсудим ваш<br />проект
            </h2>
            <p className="mt-6 text-[15px] text-muted-foreground leading-relaxed">
              Оставьте заявку — мы свяжемся в течение дня, ответим на вопросы и назначим бесплатный выезд замерщика.
            </p>

            <div className="mt-10 space-y-5">
              <a href="tel:+74951234567" className="flex items-center gap-3 text-sm text-foreground hover:text-muted-foreground transition-colors">
                <Icon name="Phone" size={15} className="text-muted-foreground flex-shrink-0" />
                <span>+7 (495) 123-45-67</span>
              </a>
              <a href="mailto:info@artel-lestnic.ru" className="flex items-center gap-3 text-sm text-foreground hover:text-muted-foreground transition-colors">
                <Icon name="Mail" size={15} className="text-muted-foreground flex-shrink-0" />
                <span>info@artel-lestnic.ru</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-foreground">
                <Icon name="MapPin" size={15} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                <span>Московская обл., Красногорск,<br />ул. Производственная, 12</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground">
                <Icon name="Clock" size={15} className="text-muted-foreground flex-shrink-0" />
                <span>Пн–Пт: 9:00–18:00, Сб: 10:00–15:00</span>
              </div>
            </div>
          </div>

          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Спасибо! Мы свяжемся с вами в ближайшее время.");
                setForm({ name: "", phone: "", message: "" });
              }}
              className="space-y-5"
            >
              <div>
                <label className="block text-xs tracking-[0.14em] uppercase text-muted-foreground mb-2">
                  Ваше имя
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="Иван Петров"
                  className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors duration-300"
                />
              </div>
              <div>
                <label className="block text-xs tracking-[0.14em] uppercase text-muted-foreground mb-2">
                  Телефон
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                  placeholder="+7 (___) ___-__-__"
                  className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors duration-300"
                />
              </div>
              <div>
                <label className="block text-xs tracking-[0.14em] uppercase text-muted-foreground mb-2">
                  Расскажите о проекте
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  placeholder="Тип лестницы, материал, размеры..."
                  className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors duration-300 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-foreground text-background text-xs tracking-[0.18em] uppercase hover:opacity-75 transition-opacity duration-300"
              >
                Отправить заявку
              </button>
              <p className="text-xs text-muted-foreground/50 text-center">
                Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border px-6 md:px-16 py-8 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span className="font-display text-base tracking-widest uppercase text-muted-foreground">
            Stair House
          </span>
          <p className="text-xs text-muted-foreground/50">
            © 2008–2026 · Все права защищены
          </p>
        </div>
      </footer>
    </div>
  );
}