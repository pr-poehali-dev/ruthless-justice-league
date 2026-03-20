import { useRef } from 'react';
import Icon from '@/components/ui/icon';
import { PASSWORD, LOCK_IMG } from './data';

interface PasswordScreenProps {
  password: string;
  setPassword: (v: string) => void;
  error: boolean;
  attempts: number;
  accessDenied: boolean;
  passwordVisible: boolean;
  setPasswordVisible: (v: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export default function PasswordScreen({
  password,
  setPassword,
  error,
  attempts,
  accessDenied,
  passwordVisible,
  setPasswordVisible,
  onSubmit,
  inputRef,
}: PasswordScreenProps) {
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

        <form onSubmit={onSubmit} className="space-y-6">
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
