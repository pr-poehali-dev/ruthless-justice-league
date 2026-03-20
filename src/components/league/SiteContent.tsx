import Icon from '@/components/ui/icon';
import { CHARACTERS, CITY_IMG, GROUP_IMG, LOCK_IMG } from './data';

interface SiteContentProps {
  scrollTo: (id: string) => void;
}

export default function SiteContent({ scrollTo }: SiteContentProps) {
  return (
    <>
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
              <div key={char.name} className="char-card bg-league-black group">
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
                  { label: 'ЮГ', top: '25%', left: '50%', color: '#ffffff' },
                  { label: 'ЦЕНТР', top: '50%', left: '50%', color: '#888888' },
                  { label: 'СЕВЕР', top: '72%', left: '50%', color: '#c0161a' },
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
    </>
  );
}
