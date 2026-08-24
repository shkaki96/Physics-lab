import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { Waves, Activity, Play, Pause } from 'lucide-react';

interface Props {
  lang: Language;
  onLogMeasurement?: (data: any) => void;
}

export default function NormalModesSim({ lang, onLogMeasurement }: Props) {
  const [harmonicMode, setHarmonicMode] = useState<number>(1); // n = 1, 2, 3, 4, 5, 6
  const [tension, setTension] = useState<number>(100); // N
  const [linearDensity, setLinearDensity] = useState<number>(0.01); // kg/m
  const [length, setLength] = useState<number>(1.5); // meters
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [time, setTime] = useState<number>(0);

  // Wave speed v = sqrt(T / mu)
  const waveSpeed = Math.sqrt(tension / linearDensity); // m/s
  // Resonant frequency fn = n * v / (2 * L)
  const frequency = (harmonicMode * waveSpeed) / (2 * length);
  // Wavelength lambda_n = 2 * L / n
  const wavelength = (2 * length) / harmonicMode;

  useEffect(() => {
    let animationId: number;
    let lastTime = performance.now();

    const loop = (t: number) => {
      const dt = (t - lastTime) / 1000;
      lastTime = t;
      if (isPlaying) {
        setTime((prev) => prev + dt * frequency * 2 * Math.PI);
      }
      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [isPlaying, frequency]);

  // Generate standing wave points
  const pointsCount = 100;
  const wavePoints = Array.from({ length: pointsCount }).map((_, i) => {
    const xRatio = i / (pointsCount - 1);
    const xPos = xRatio * length;
    // Standing wave envelope: y(x, t) = A * sin(n * pi * x / L) * cos(omega * t)
    const envelope = Math.sin((harmonicMode * Math.PI * xPos) / length);
    const yVal = 40 * envelope * Math.cos(time);
    return { x: xRatio * 100, y: 60 + yVal };
  });

  const pathD = wavePoints.reduce(
    (acc, pt, i) => (i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`),
    ''
  );

  const handleLog = () => {
    if (onLogMeasurement) {
      onLogMeasurement({
        experiment: 'normal_modes_standing_waves',
        parameters: {
          Harmonic_n: harmonicMode,
          Tension_T_N: tension,
          LinearDensity_mu_kg_m: linearDensity,
          Length_L_m: length,
          WaveSpeed_v_m_s: parseFloat(waveSpeed.toFixed(1)),
        },
        measuredValue: parseFloat(frequency.toFixed(2)),
        theoreticalValue: parseFloat(((harmonicMode * Math.sqrt(tension / linearDensity)) / (2 * length)).toFixed(2)),
        unit: 'Hz',
        variableName: 'Resonant_Frequency_fn',
        equation: 'fₙ = n · v / (2L)',
      });
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5 shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Waves className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              {lang === 'ar' ? 'الأنماط الطبيعية للاهتزاز (الموجات الموقوفة)' : 'Normal Modes & Standing Waves'}
            </h3>
            <p className="text-xs text-slate-400 font-mono">fₙ = n · v / (2L) = (n/2L) · √(T/μ)</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow flex items-center gap-1.5 transition-all ${
              isPlaying ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? (lang === 'ar' ? 'إيقاف' : 'Pause') : (lang === 'ar' ? 'تشغيل' : 'Play')}</span>
          </button>
          <button
            onClick={handleLog}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow flex items-center gap-1.5 transition-all"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'تسجيل القياس' : 'Log'}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between min-h-[300px] relative overflow-hidden">
          {/* Harmonics Badge Selector */}
          <div className="flex items-center gap-1.5 z-10 flex-wrap">
            <span className="text-xs text-slate-400 font-medium mr-1">
              {lang === 'ar' ? 'رتبة النغمة التوافقية (n):' : 'Harmonic (n):'}
            </span>
            {[1, 2, 3, 4, 5, 6].map((mode) => (
              <button
                key={mode}
                onClick={() => setHarmonicMode(mode)}
                className={`px-3 py-1 text-xs rounded-lg font-bold transition-all ${
                  harmonicMode === mode
                    ? 'bg-indigo-600 text-white shadow ring-2 ring-indigo-400'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                n = {mode}
              </button>
            ))}
          </div>

          {/* Canvas Standing Wave Visual */}
          <div className="relative my-6 h-36 flex items-center justify-center">
            <svg viewBox="0 0 100 120" preserveAspectRatio="none" className="w-full h-full">
              {/* String Anchor Endpoints */}
              <circle cx="0" cy="60" r="3" fill="#f43f5e" />
              <circle cx="100" cy="60" r="3" fill="#f43f5e" />

              {/* Equilibrium center dashed line */}
              <line x1="0" y1="60" x2="100" y2="60" stroke="#334155" strokeDasharray="2,2" strokeWidth="0.75" />

              {/* Standing wave path */}
              <path d={pathD} fill="none" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Wave properties summary */}
          <div className="grid grid-cols-3 gap-2 bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl text-center text-xs font-mono">
            <div>
              <span className="text-slate-400 text-[10px] block">{lang === 'ar' ? 'التردد الرنان (fₙ)' : 'Resonant Freq'}</span>
              <span className="text-indigo-300 font-bold">{frequency.toFixed(1)} Hz</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">{lang === 'ar' ? 'الطول الموجي (λ)' : 'Wavelength'}</span>
              <span className="text-sky-300 font-bold">{wavelength.toFixed(2)} m</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">{lang === 'ar' ? 'سرعة الموجة (v)' : 'Wave Speed'}</span>
              <span className="text-emerald-300 font-bold">{waveSpeed.toFixed(1)} m/s</span>
            </div>
          </div>
        </div>

        {/* Inputs Controls */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-3">
            <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
              {lang === 'ar' ? 'المتغيرات القابلة للتحكم' : 'Simulation Inputs'}
            </h4>

            {/* Tension */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">{lang === 'ar' ? 'قوة الشد في الوتر (T):' : 'String Tension (T):'}</span>
                <span className="font-mono text-indigo-400 font-bold">{tension} N</span>
              </div>
              <input
                type="range"
                min="20"
                max="300"
                step="10"
                value={tension}
                onChange={(e) => setTension(parseInt(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>

            {/* String Length */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">{lang === 'ar' ? 'طول الوتر (L):' : 'String Length (L):'}</span>
                <span className="font-mono text-sky-400 font-bold">{length.toFixed(2)} m</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.1"
                value={length}
                onChange={(e) => setLength(parseFloat(e.target.value))}
                className="w-full accent-sky-500"
              />
            </div>

            {/* Linear Density */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">{lang === 'ar' ? 'الكثافة الخطية (μ):' : 'Linear Density (μ):'}</span>
                <span className="font-mono text-amber-400 font-bold">{(linearDensity * 1000).toFixed(1)} g/m</span>
              </div>
              <input
                type="range"
                min="0.002"
                max="0.04"
                step="0.002"
                value={linearDensity}
                onChange={(e) => setLinearDensity(parseFloat(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
