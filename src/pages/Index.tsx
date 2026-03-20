import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const PASSWORD = 'amberveil';

const CHARACTERS = [
  {
    name: 'Ванесса Валтер',
    age: 22,
    role: 'Основатель Лиги',
    weapon: 'Тактические топоры',
    desc: 'Бывшая шпионка, выжившая после резни на острове Ностадор. Хладнокровный стратег, скрывающийся за маской жизнерадостной девчонки.',
    color: '#c0161a',
  },
  {
    name: 'Джеронимо Мэйдэй',
    age: 26,
    role: 'Правая рука',
    weapon: 'Топор + рукопашный бой',
    desc: 'Бывший журналист, оклеветанный в убийстве. Носит белую маску. Взрывной, замкнутый, но бесконечно преданный своим.',
    color: '#ffffff',
  },
  {
    name: 'Саймон Ленгли',
    age: 29,
    role: 'Снайпер',
    weapon: 'Снайперская винтовка',
    desc: 'Спокоен, расчётлив, холоден. Идеальный прицел и абсолютное самообладание. Искупает вину молчания, прикрывая спину Рыжика.',
    color: '#888888',
  },
  {
    name: 'Лиззи Нортман',
    age: 21,
    role: 'Подрывник',
    weapon: 'Взрывчатка',
    desc: 'Изгнанная родителями пироманка. Энергичная, шумная, невыносимая для врагов. Её взрывы — это искусство.',
    color: '#ff6b00',
  },
  {
    name: 'Мэри Кэмбэлл',
    age: 32,
    role: 'Врач и токсиколог',
    weapon: 'Яды и антидоты',
    desc: 'Потеряла дочь из-за мести бывшего мужа. Тихая, мудрая, материнская фигура Лиги. Знает цену жизни и смерти.',
    color: '#4a9eff',
  },
  {
    name: 'Шон Рид',
    age: 34,
    role: 'Защита',
    weapon: 'Молот',
    desc: 'Бывший телохранитель мафии, преданный своим же. Молчаливый, жёсткий, надёжный как скала.',
    color: '#888888',
  },
  {
    name: 'Джокич Акияма',
    age: 29,
    role: 'Ликвидатор',
    weapon: 'Тихие методы',
    desc: 'Эмигрант из Японии, изгой. Специалист по тихим ликвидациям. Внешне спокоен — внутри садист.',
    color: '#c0161a',
  },
  {
    name: 'Лаура Вест',
    age: 27,
    role: 'IT-гений',
    weapon: 'Код и взлом',
    desc: 'Бывший полицейский хакер. Глаза и уши Лиги. Видит всё через камеры, взламывает серверы, держит Улей на связи.',
    color: '#00ff88',
  },
];

const NAV_ITEMS = [
  { id: 'home', label: 'Главная' },
  { id: 'about', label: 'О проекте' },
  { id: 'characters', label: 'Персонажи' },
  { id: 'world', label: 'Мир' },
  { id: 'story', label: 'История' },
  { id: 'gallery', label: 'Галерея' },
  { id: 'contacts', label: 'Контакты' },
];

const CITY_IMG = 'https://cdn.poehali.dev/projects/4e25525f-c967-48af-9de7-a29b0be644f6/files/994c2402-d6e0-491f-938a-f0b617679c0d.jpg';
const GROUP_IMG = 'https://cdn.poehali.dev/projects/4e25525f-c967-48af-9de7-a29b0be644f6/files/4240bcc4-47a9-40a4-b425-c66792e357ef.jpg';
const LOCK_IMG = 'https://cdn.poehali.dev/projects/4e25525f-c967-48af-9de7-a29b0be644f6/files/5d0c24f5-5f1a-4780-88e1-e852b8ce6896.jpg';

export default function Index() {
  const [unlocked, setUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('lrj_access');
    if (saved === 'granted') setUnlocked(true);
  }, []);

  useEffect(() => {
    if (!unlocked) {
      setTimeout(() => inputRef.current?.focus(), 500);
    }
  }, [unlocked]);

  const handlePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.toLowerCase() === PASSWORD) {
      sessionStorage.setItem('lrj_access', 'granted');
      setUnlocked(true);
    } else {
      setError(true);
      setAttempts(prev => prev + 1);
      setAccessDenied(true);
      setTimeout(() => {
        setError(false);
        setAccessDenied(false);
      }, 1500);
      setPassword('');
    }
  };

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!unlocked) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [unlocked]);

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-league-black flex items-center justify-center relative overflow-hidden scanlines">
        <div className="absolute inset-0">
          <img src={LOCK_IMG} alt="" className="w-full h-full object-cover opacity-15 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        </div>

        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)',
          }}
        />

        <div className="relative z-20 text-center px-6 max-w-lg w-full animate-fade-in">
          <div className="mb-8">
            <div className="text-league-red text-xs font-courier tracking-[0.4em] mb-3 uppercase opacity-60">
              ■ CLASSIFIED ■
            </div>
            <h1
              className="font-oswald text-5xl font-bold text-league-white mb-1 tracking-widest glitch-text"
              data-text="ЛЖП"
            >
              ЛЖП
            </h1>
            <div className="text-league-gray text-sm font-courier tracking-[0.25em] mt-2">
              LEAGUE OF RUTHLESS JUSTICE
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-league-dark-gray" />
            <div className="w-2 h-2 bg-league-red rotate-45" />
            <div className="flex-1 h-px bg-league-dark-gray" />
          </div>

          <div className={`mb-6 transition-all duration-300 ${accessDenied ? 'opacity-100' : 'opacity-0'}`} style={{ minHeight: '1.5rem' }}>
            <p className="text-league-red font-courier text-sm tracking-widest uppercase">
              ⚠ ДОСТУП ЗАПРЕЩЁН — ПОПЫТКА {attempts}
            </p>
          </div>

          <form onSubmit={handlePassword} className="space-y-6">
            <div>
              <label className="block text-league-gray text-xs font-courier tracking-[0.3em] uppercase mb-3">
                Введите пароль доступа
              </label>
              <div className="relative">
                <input
                  ref={inputRef}
                  type={passwordVisible ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={`password-input ${error ? 'error' : ''}`}
                  placeholder="_ _ _ _ _ _ _ _ _"
                  autoComplete="off"
                  spellCheck={false}
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-league-gray hover:text-league-white transition-colors"
                >
                  <Icon name={passwordVisible ? 'EyeOff' : 'Eye'} size={16} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-league-red text-white font-oswald text-sm tracking-[0.3em] uppercase hover:bg-league-red-dark transition-colors duration-300"
            >
              Войти в Улей
            </button>
          </form>

          <div className="mt-8 text-xs font-courier" style={{ minHeight: '1.5rem' }}>
            {attempts > 2 && (
              <p className="text-league-gray animate-fade-in">
                Подсказка: название города
              </p>
            )}
          </div>
        </div>

        <div className="absolute top-6 left-6 text-league-red opacity-30 font-courier text-xs tracking-widest">
          SYS_LOCK::AMBERVEIL-7
        </div>
        <div className="absolute bottom-6 right-6 text-league-red opacity-30 font-courier text-xs tracking-widest">
          &gt;&gt; UNAUTHORIZED_ACCESS
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-league-black text-league-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-league-black/95 border-b border-league-dark-gray backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
          <button
            onClick={() => scrollTo('home')}
            className="font-oswald text-lg font-bold tracking-widest text-league-white hover:text-league-red transition-colors"
          >
            ЛЖП<span className="text-league-red">.</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link font-oswald text-xs tracking-widest uppercase transition-colors ${
                  activeSection === item.id ? 'text-league-red active' : 'text-league-gray hover:text-league-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-league-gray hover:text-league-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? 'X' : 'Menu'} size={20} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-league-black border-t border-league-dark-gray py-4 animate-fade-in">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`block w-full text-left px-6 py-3 font-oswald text-xs tracking-widest uppercase transition-colors ${
                  activeSection === item.id ? 'text-league-red' : 'text-league-gray hover:text-league-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HOME */}
      <section id="home" className="min-h-screen flex items-end relative overflow-hidden scanlines">
        <div className="absolute inset-0">
          <img src={CITY_IMG} alt="Амбервейл" className="w-full h-full object-cover grayscale opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-league-red" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 pt-32">
          <div className="max-w-3xl">
            <div className="text-league-red font-courier text-xs tracking-[0.4em] uppercase mb-4 animate-fade-in opacity-80">
              ■ Амбервейл, Ржавые Кварталы
            </div>
            <h1
              className="font-oswald font-bold text-league-white leading-none mb-4 animate-fade-in glitch-text"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', animationDelay: '0.2s', opacity: 0 }}
              data-text="ЛИГА"
            >
              ЛИГА
            </h1>
            <h1
              className="font-oswald font-bold leading-none mb-6 animate-fade-in"
              style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', color: '#c0161a', animationDelay: '0.4s', opacity: 0 }}
            >
              ЖЕСТОКОГО ПРАВОСУДИЯ
            </h1>
            <p
              className="font-cormorant text-league-gray text-xl italic leading-relaxed mb-8 animate-fade-in max-w-xl"
              style={{ animationDelay: '0.6s', opacity: 0 }}
            >
              «Они не супергерои. Они — порождение мира, который предал их,
              и теперь они возвращают долги с процентами.»
            </p>
            <div
              className="flex gap-4 animate-fade-in"
              style={{ animationDelay: '0.8s', opacity: 0 }}
            >
              <button
                onClick={() => scrollTo('about')}
                className="px-8 py-3 bg-league-red text-white font-oswald text-xs tracking-[0.3em] uppercase hover:bg-league-red-dark transition-all duration-300"
              >
                Войти в историю
              </button>
              <button
                onClick={() => scrollTo('characters')}
                className="px-8 py-3 border border-league-gray text-league-gray font-oswald text-xs tracking-[0.3em] uppercase hover:border-league-white hover:text-league-white transition-all duration-300"
              >
                Персонажи
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-league-gray animate-bounce">
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-league-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-league-red font-courier text-xs tracking-[0.3em] uppercase mb-3">О проекте</div>
              <div className="section-divider" />
              <h2 className="font-oswald text-5xl font-bold text-league-white mb-6 leading-tight">
                ИЗ ОБЛОМКОВ<br />
                <span className="text-league-red">— СЕМЬЯ.</span><br />
                ИЗ ЯРОСТИ<br />
                <span className="text-league-red">— СПРАВЕДЛИВОСТЬ.</span>
              </h2>
              <p className="font-cormorant text-league-gray text-lg leading-relaxed mb-6">
                «Лига Жестокого Правосудия» — мрачная, стильная и эмоционально насыщенная история
                о группе отверженных, которые, потеряв веру в официальную систему, создали
                собственное оружие возмездия.
              </p>
              <p className="font-cormorant text-league-gray text-lg leading-relaxed mb-8">
                Это история о том, как трудно оставаться человеком, когда ты уже стал чудовищем
                для тех, кого защищаешь. О цене справедливости. О границе между местью и правосудием.
              </p>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { num: '8', label: 'Персонажей' },
                  { num: '3', label: 'Района города' },
                  { num: '1', label: 'Цель' },
                ].map(item => (
                  <div key={item.label} className="border-t border-league-dark-gray pt-4">
                    <div className="font-oswald text-4xl font-bold text-league-red">{item.num}</div>
                    <div className="font-courier text-xs text-league-gray tracking-widest uppercase mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src={GROUP_IMG}
                alt="Лига"
                className="w-full aspect-[3/4] object-cover grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-4 right-4 border border-league-red px-3 py-1">
                <span className="font-courier text-league-red text-xs tracking-widest">УЛЕЙ — БАЗА ЛИГИ</span>
              </div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-league-red" />
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-league-red" />
            </div>
          </div>
        </div>
      </section>

      {/* CHARACTERS */}
      <section id="characters" className="py-24 bg-[#070707]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-league-red font-courier text-xs tracking-[0.3em] uppercase mb-3">Персонажи</div>
          <div className="section-divider" />
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-oswald text-5xl font-bold text-league-white leading-tight">
              ЧЛЕНЫ<br /><span className="text-league-red">ЛИГИ</span>
            </h2>
            <p className="font-cormorant text-league-gray text-lg italic max-w-sm text-right hidden md:block">
              Каждый из них был сломан системой.<br />
              Каждый восстал по-своему.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-league-dark-gray">
            {CHARACTERS.map((char, i) => (
              <div
                key={char.name}
                className="char-card bg-league-black group"
              >
                <div className="aspect-[3/4] bg-[#0d0d0d] relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="font-oswald font-bold opacity-5 select-none"
                      style={{ fontSize: '10rem', color: char.color, lineHeight: 1 }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div
                      className="w-8 h-px mb-2 transition-all duration-300 group-hover:w-full"
                      style={{ background: char.color }}
                    />
                    <div className="font-courier text-xs tracking-widest uppercase opacity-50" style={{ color: char.color }}>
                      {char.role}
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-[#0d0d0d]">
                  <h3 className="font-oswald text-lg font-bold text-league-white mb-1">{char.name}</h3>
                  <div className="font-courier text-xs text-league-gray mb-3">{char.age} лет · {char.weapon}</div>
                  <p className="font-cormorant text-sm text-league-gray leading-relaxed line-clamp-3">{char.desc}</p>
                  <button className="mt-3 font-courier text-xs tracking-widest uppercase transition-colors hover:text-league-red text-league-dark-gray group-hover:text-league-gray">
                    Читать досье →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORLD */}
      <section id="world" className="py-24 bg-league-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-league-red font-courier text-xs tracking-[0.3em] uppercase mb-3">Мир</div>
          <div className="section-divider" />
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-oswald text-5xl font-bold text-league-white mb-4 leading-tight">АМБЕРВЕЙЛ</h2>
              <p className="font-cormorant text-league-gray text-lg italic mb-8">
                Город — это не просто фон. Это живой организм, который давит, соблазняет, уничтожает.
              </p>
              <div className="space-y-8">
                {[
                  {
                    zone: 'Южный Амбервейл',
                    tag: 'ЗОНА ВЛАСТИ',
                    color: '#ffffff',
                    desc: 'Стерильный, богатый район, где власть принадлежит корпорациям и коррумпированным чиновникам. Здесь вершатся сделки и выносятся приговоры за деньги.',
                  },
                  {
                    zone: 'Центральный район',
                    tag: 'СЕРАЯ ЗОНА',
                    color: '#888888',
                    desc: 'Люди пытаются выжить, балансируя между иллюзией порядка и реальностью, в которой полиция не спешит помогать.',
                  },
                  {
                    zone: 'Ржавые Кварталы',
                    tag: 'СЕВЕР — ЗЕМЛЯ ЛИГИ',
                    color: '#c0161a',
                    desc: 'Руины, трущобы, территория банд. Здесь нет закона, но есть Лига. Здесь каждый день — битва за выживание. Здесь стоит Улей.',
                  },
                ].map(district => (
                  <div key={district.zone} className="district-card">
                    <div
                      className="font-courier text-xs tracking-widest uppercase mb-1"
                      style={{ color: district.color, opacity: 0.7 }}
                    >
                      {district.tag}
                    </div>
                    <h3 className="font-oswald text-2xl font-bold text-league-white mb-2">{district.zone}</h3>
                    <p className="font-cormorant text-league-gray text-lg leading-relaxed">{district.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="sticky top-20">
              <div className="relative bg-[#0d0d0d] aspect-square border border-league-dark-gray overflow-hidden">
                <img src={CITY_IMG} alt="Амбервейл" className="w-full h-full object-cover grayscale opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
                <div className="absolute top-6 left-6 right-6">
                  <div className="font-oswald text-2xl font-bold text-league-white text-center tracking-widest">АМБЕРВЕЙЛ</div>
                  <div className="font-courier text-xs text-league-gray text-center tracking-widest mt-1">КАРТА ГОРОДА</div>
                </div>
                {[
                  { label: 'ЮГ', sub: 'Власть', top: '25%', left: '50%', color: '#ffffff' },
                  { label: 'ЦЕНТР', sub: 'Серая зона', top: '50%', left: '50%', color: '#888888' },
                  { label: 'СЕВЕР', sub: 'Ржавые Кварталы', top: '72%', left: '50%', color: '#c0161a' },
                ].map(point => (
                  <div
                    key={point.label}
                    className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
                    style={{ top: point.top, left: point.left }}
                  >
                    <div className="w-2 h-2 rounded-full mx-auto mb-1 animate-pulse" style={{ background: point.color }} />
                    <div className="font-courier text-xs font-bold" style={{ color: point.color }}>{point.label}</div>
                  </div>
                ))}
                <div className="absolute bottom-6 right-6 border border-league-red px-2 py-1">
                  <div className="font-courier text-xs text-league-red tracking-widest">⬡ УЛЕЙ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="py-24 bg-[#070707]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-league-red font-courier text-xs tracking-[0.3em] uppercase mb-3">История</div>
          <div className="section-divider" />
          <div className="max-w-3xl mx-auto">
            <h2 className="font-oswald text-5xl font-bold text-league-white mb-12 leading-tight text-center">
              КАК ВСЁ<br /><span className="text-league-red">НАЧАЛОСЬ</span>
            </h2>
            <div className="space-y-0">
              {[
                {
                  phase: '01',
                  title: 'Остров Ностадор',
                  text: 'Резня, которую никто не должен был пережить. Ванесса Валтер выжила — и ушла в тень. Обломки прошлого стали фундаментом будущей Лиги.',
                },
                {
                  phase: '02',
                  title: 'Оклевётанный журналист',
                  text: 'Джеронимо Мэйдэй потерял всё — имя, работу, лицо. Белая маска скрывает не только шрамы, но и человека, которым он был. Встреча с Ванессой меняет траекторию судьбы.',
                },
                {
                  phase: '03',
                  title: 'Сбор Лиги',
                  text: 'Один за другим — отверженные, преданные, сломанные системой. Каждый с уникальным навыком. Каждый с личной причиной. Ржавые Кварталы становятся домом.',
                },
                {
                  phase: '04',
                  title: 'Улей',
                  text: 'Заброшенный склад в Северном Амбервейле превращается в крепость. Оперативный центр. Убежище. Единственное место, где отверженные становятся семьёй.',
                },
                {
                  phase: '05',
                  title: 'Война с Амбервейлом',
                  text: 'Лига начинает действовать. Коррупция, безнаказанность, корпоративные преступники — каждый должен ответить. Но цена справедливости выше, чем кажется.',
                },
              ].map(chapter => (
                <div
                  key={chapter.phase}
                  className="flex gap-6 py-8 border-b border-league-dark-gray last:border-0 group hover:pl-2 transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <div className="font-oswald text-4xl font-bold text-league-dark-gray group-hover:text-league-red transition-colors duration-300">
                      {chapter.phase}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-oswald text-xl font-bold text-league-white mb-2 group-hover:text-league-red transition-colors duration-300">
                      {chapter.title}
                    </h3>
                    <p className="font-cormorant text-league-gray text-lg leading-relaxed">{chapter.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 bg-league-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-league-red font-courier text-xs tracking-[0.3em] uppercase mb-3">Галерея</div>
          <div className="section-divider" />
          <h2 className="font-oswald text-5xl font-bold text-league-white mb-12">
            АТМОСФЕРА<br /><span className="text-league-red">АМБЕРВЕЙЛА</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            <div className="aspect-square relative group overflow-hidden col-span-2">
              <img src={CITY_IMG} alt="Амбервейл" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-league-red/0 group-hover:bg-league-red/10 transition-all duration-500" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="font-courier text-xs text-white tracking-widest uppercase bg-black/80 px-3 py-1">Амбервейл</span>
              </div>
            </div>
            <div className="aspect-square relative group overflow-hidden">
              <img src={GROUP_IMG} alt="Лига" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-league-red/0 group-hover:bg-league-red/10 transition-all duration-500" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="font-courier text-xs text-white tracking-widest uppercase bg-black/80 px-3 py-1">Лига</span>
              </div>
            </div>
            <div className="aspect-square relative group overflow-hidden">
              <img src={LOCK_IMG} alt="Улей" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-league-red/0 group-hover:bg-league-red/10 transition-all duration-500" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="font-courier text-xs text-white tracking-widest uppercase bg-black/80 px-3 py-1">Улей</span>
              </div>
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-[#0d0d0d] border border-league-dark-gray flex items-center justify-center group hover:border-league-red transition-colors duration-300 cursor-pointer"
              >
                <div className="text-center">
                  <div className="text-league-dark-gray group-hover:text-league-red transition-colors text-3xl mb-2">+</div>
                  <div className="font-courier text-xs text-league-dark-gray tracking-widest uppercase">Скоро</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-[#070707]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-league-red font-courier text-xs tracking-[0.3em] uppercase mb-3">Контакты</div>
            <div className="section-divider mx-auto" />
            <h2 className="font-oswald text-5xl font-bold text-league-white mb-6 leading-tight">
              СВЯЗАТЬСЯ<br /><span className="text-league-red">С ЛИГОЙ</span>
            </h2>
            <p className="font-cormorant text-league-gray text-lg mb-12">
              Есть вопросы, предложения по сотрудничеству или просто хотите узнать больше
              о вселенной Лиги? Напишите нам.
            </p>
            <div className="space-y-4 mb-8 text-left">
              <input
                type="text"
                placeholder="Ваше имя"
                className="w-full bg-transparent border border-league-dark-gray px-4 py-3 font-cormorant text-lg text-league-white placeholder:text-league-dark-gray focus:border-league-red outline-none transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent border border-league-dark-gray px-4 py-3 font-cormorant text-lg text-league-white placeholder:text-league-dark-gray focus:border-league-red outline-none transition-colors"
              />
              <textarea
                rows={4}
                placeholder="Сообщение"
                className="w-full bg-transparent border border-league-dark-gray px-4 py-3 font-cormorant text-lg text-league-white placeholder:text-league-dark-gray focus:border-league-red outline-none transition-colors resize-none"
              />
            </div>
            <button className="w-full py-4 bg-league-red text-white font-oswald text-sm tracking-[0.3em] uppercase hover:bg-league-red-dark transition-colors duration-300">
              Отправить сообщение
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-league-dark-gray py-8 bg-league-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-oswald text-lg font-bold tracking-widest text-league-white">
            ЛЖП<span className="text-league-red">.</span>
          </div>
          <div className="font-courier text-xs text-league-gray tracking-widest text-center">
            LEAGUE OF RUTHLESS JUSTICE · AMBERVEIL · {new Date().getFullYear()}
          </div>
          <div className="font-courier text-xs text-league-dark-gray tracking-widest">
            &gt;&gt; ALL RIGHTS RESERVED
          </div>
        </div>
      </footer>
    </div>
  );
}
