import Icon from '@/components/ui/icon';
import { NAV_ITEMS } from './data';

interface SiteNavProps {
  activeSection: string;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  scrollTo: (id: string) => void;
}

export default function SiteNav({ activeSection, menuOpen, setMenuOpen, scrollTo }: SiteNavProps) {
  return (
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
  );
}
