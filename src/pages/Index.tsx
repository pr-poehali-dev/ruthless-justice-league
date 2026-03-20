import { useState, useEffect, useRef } from 'react';
import { PASSWORD, NAV_ITEMS } from '@/components/league/data';
import PasswordScreen from '@/components/league/PasswordScreen';
import SiteNav from '@/components/league/SiteNav';
import SiteContent from '@/components/league/SiteContent';

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
      <PasswordScreen
        password={password}
        setPassword={setPassword}
        error={error}
        attempts={attempts}
        accessDenied={accessDenied}
        passwordVisible={passwordVisible}
        setPasswordVisible={setPasswordVisible}
        onSubmit={handlePassword}
        inputRef={inputRef}
      />
    );
  }

  return (
    <div className="min-h-screen bg-league-black text-league-white">
      <SiteNav
        activeSection={activeSection}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
      />
      <SiteContent scrollTo={scrollTo} />
    </div>
  );
}
