import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { Radiation, Activity, Play, Pause, RotateCcw, FastForward } from 'lucide-react';

interface Props {
  lang: Language;
  onLogMeasurement?: (data: any) => void;
}

interface IsotopePreset {
  id: string;
  nameAr: string;
  nameEn: string;
  nameKu: string;
  nameKmr: string;
  halfLifeSec: number; // in simulation seconds
  displayHalfLife: string;
  radiationType: string;
}

const ISOTOPES: IsotopePreset[] = [
  { id: 'c14', nameAr: 'الكربون-14 (C-14)', nameEn: 'Carbon-14 (¹⁴C)', nameKu: 'کاربۆن-14', nameKmr: 'Karbon-14', halfLifeSec: 10, displayHalfLife: '5,730 years', radiationType: 'β⁻' },
  { id: 'i131', nameAr: 'اليود-131 (I-131)', nameEn: 'Iodine-131 (¹³¹I)', nameKu: 'یۆد-131', nameKmr: 'Yod-131', halfLifeSec: 6, displayHalfLife: '8.02 days', radiationType: 'β⁻ + γ' },
  { id: 'rn222', nameAr: 'الرادون-222 (Rn-222)', nameEn: 'Radon-222 (²²²Rn)', nameKu: 'ڕادۆن-222', nameKmr: 'Radon-222', halfLifeSec: 4, displayHalfLife: '3.82 days', radiationType: 'α' },
  { id: 'co60', nameAr: 'الكوبالت-60 (Co-60)', nameEn: 'Cobalt-60 (⁶⁰Co)', nameKu: 'کۆباڵت-60', nameKmr: 'Kobalt-60', halfLifeSec: 8, displayHalfLife: '5.27 years', radiationType: 'β⁻ + γ' },
  { id: 'po218', nameAr: 'البولونيوم-218 (Po-218)', nameEn: 'Polonium-218 (²¹⁸Po)', nameKu: 'پۆلۆنیۆم-218', nameKmr: 'Polonyum-218', halfLifeSec: 3, displayHalfLife: '3.10 minutes', radiationType: 'α' },
];

export default function RadioactiveDecaySim({ lang, onLogMeasurement }: Props) {
  const translations = {
    ar: {
      title: 'محاكاة التحلل الإشعاعي وعمر النصف',
      pause: 'إيقاف', // غير موثّق بمصدر
      play: 'تشغيل', // غير موثّق بمصدر
      stepHalfLifeTooltip: 'تقديم نصف عمر كامل (+1 T½)', // غير موثّق بمصدر
      log: 'تسجيل القياس', // غير موثّق بمصدر
      activeParentNuclei: 'أنوية مشعة نشطة (N)',
      decayedDaughter: 'أنوية وليدة مستقرة', // غير موثّق بمصدر
      halfLivesCount: 'دورات عمر النصف:',
      elapsedTime: 'الزمن المنقضي (t)', // غير موثّق بمصدر
      activeNucleiCard: 'الأنوية المتبقية (N)',
      remainingPercent: 'النسبة المتبقية', // غير موثّق بمصدر
      activityRate: 'النشاط الإشعاعي (A)',
      isotopeControls: 'المتغيرات والنظائر', // غير موثّق بمصدر
      targetIsotopeLabel: 'النظير المشع المستهدف:', // غير موثّق بمصدر
      initialNucleiLabel: 'عدد الأنوية الابتدائية (N₀):',
      realHalfLife: 'عمر النصف الفعلي:',
      radiationType: 'نوع الإشعاع المنبعث:', // غير موثّق بمصدر
      decayConstant: 'ثابت التحلل (λ):',
      decayedNucleiCard: 'الأنوية المتفككة (N_decayed)',
      theoreticalN: 'القيمة النظرية للأنوية المتبقية',
      decayConstantCard: 'ثابت التحلل الإشعاعي (λ)',
      instantaneousActivity: 'النشاط الإشعاعي اللحظي (A)',
    },
    en: {
      title: 'Radioactive Decay & Half-life Simulation',
      pause: 'Pause', // غير موثّق بمصدر
      play: 'Play', // غير موثّق بمصدر
      stepHalfLifeTooltip: 'Step 1 Half-life (+1 T½)', // غير موثّق بمصدر
      log: 'Log', // غير موثّق بمصدر
      activeParentNuclei: 'Active Parent Nuclei',
      decayedDaughter: 'Decayed Daughter', // غير موثّق بمصدر
      halfLivesCount: 'Half-lives:',
      elapsedTime: 'Elapsed Time', // غير موثّق بمصدر
      activeNucleiCard: 'Active Nuclei',
      remainingPercent: 'Remaining %', // غير موثّق بمصدر
      activityRate: 'Activity (A)',
      isotopeControls: 'Isotope & Controls', // غير موثّق بمصدر
      targetIsotopeLabel: 'Radioactive Isotope:', // غير موثّق بمصدر
      initialNucleiLabel: 'Initial Nuclei (N₀):',
      realHalfLife: 'Real Half-life:',
      radiationType: 'Decay Mode:', // غير موثّق بمصدر
      decayConstant: 'Decay Constant λ:',
      decayedNucleiCard: 'Decayed Nuclei',
      theoreticalN: 'Theoretical N(t)',
      decayConstantCard: 'Decay Constant (λ)',
      instantaneousActivity: 'Instantaneous Activity (A)',
    },
    ku: {
      title: 'مۆدێلی تێکشکانی تیشکدەر و نیوەتەمەن',
      pause: 'ڕاگرتن', // غير موثّق بمصدر
      play: 'دەستپێکردن', // غير موثّق بمصدر
      stepHalfLifeTooltip: 'تێپەڕاندنی نیوەتەمەنێک (+1 T½)', // غير موثّق بمصدر
      log: 'تۆمارکردن', // غير موثّق بمصدر
      activeParentNuclei: 'ناوکە تیشکدەرە چالاکەکان (N)',
      decayedDaughter: 'ناوکە خێنەرەوە جێگیرەکان', // غير موثّق بمصدر
      halfLivesCount: 'خولەکانی نیوەتەمەن:',
      elapsedTime: 'کاتی تێپەڕبوو (t)', // غير موثّق بمصدر
      activeNucleiCard: 'ناوکە مابووەکان (N)',
      remainingPercent: 'ڕێژەی سەدیی مابووەکان', // غير موثّق بمصدر
      activityRate: 'چالاکیی تیشکدەری (A)',
      isotopeControls: 'گۆڕاوەکان و ئايزۆتۆپەکان', // غير موثّق بمصدر
      targetIsotopeLabel: 'ئايزۆتۆپی تیشکدەری ئامانج:', // غير موثّق بمصدر
      initialNucleiLabel: 'ژمارەی ناوکەکانی سەرەتا (N₀):',
      realHalfLife: 'نیوەتەمەنی ڕاستەقینە:',
      radiationType: 'جۆری تیشکی دەرچوو:', // غير موثّق بمصدر
      decayConstant: 'نەگۆڕی تێکشکاندن (λ):',
      decayedNucleiCard: 'ناوکە تێکشکاوەکان',
      theoreticalN: 'بایەخی تیۆریی ناوکە مابووەکان',
      decayConstantCard: 'نەگۆڕی تێکشکاندنی تیشکدەری (λ)',
      instantaneousActivity: 'چالاکیی تیشکدەریی ساتەکی (A)',
    },
    kmr: {
      title: 'Modelkirina Hilweşîna Radyoaktîf',
      pause: 'Sekrandin', // غير موثّق بمصدر
      play: 'Bide xebitandin', // غير موثّق بمصدر
      stepHalfLifeTooltip: 'Pêşveçûna 1 nîvelemrikî (+1 T½)', // غير موثّق بمصدر
      log: 'Toma kirin', // غير موثّق بمصدر
      activeParentNuclei: 'Nokteyên radyoaktîf yên çalak (N)',
      decayedDaughter: 'Nokteyên keçê yên cîgir', // غير موثّق بمصدر
      halfLivesCount: 'Xulên nîvelemran:',
      elapsedTime: 'Dema derbasbûyî (t)', // غير موثّق بمصدر
      activeNucleiCard: 'Nokteyên mayî (N)',
      remainingPercent: 'Rêjeya mayî %', // غير موثّق بمصدر
      activityRate: 'Çalakiya radyoaktîf (A)',
      isotopeControls: 'Guherbar û îzotop', // غير موثّق بمصدر
      targetIsotopeLabel: 'Îzotopa radyoaktîf:', // غير موثّق بمصدر
      initialNucleiLabel: 'Hejmara nokteyên destpêkê (N₀):',
      realHalfLife: 'Nîvelemrê rastî:',
      radiationType: 'Cûreyê tîşka derketî:', // غير موثّق بمصدر
      decayConstant: 'Neqora hilweşînê (λ):',
      decayedNucleiCard: 'Nokteyên hilweşiyayî',
      theoreticalN: 'Bihayê teorîk yê nokteyên mayî',
      decayConstantCard: 'Neqora hilweşîna radyoaktîf (λ):',
      instantaneousActivity: 'Çalakiya radyoaktîf ya lezîngî (A)',
    },
  };
  const t = translations[lang] || translations.ar;

  const getIsotopeName = (iso: IsotopePreset) => {
    const names: Record<string, string> = {
      ar: iso.nameAr,
      ku: iso.nameKu,
      kmr: iso.nameKmr || iso.nameEn,
      en: iso.nameEn,
    };
    return names[lang] || iso.nameAr;
  };
  const [initialCount, setInitialCount] = useState<number>(400); // N_0
  const [isotopeIndex, setIsotopeIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; decayed: boolean; decayTime?: number }[]>([]);
  const [history, setHistory] = useState<{ t: number; remaining: number }[]>([]);

  const isotope = ISOTOPES[isotopeIndex];
  const halfLife = isotope.halfLifeSec;
  const decayConstant = Math.LN2 / halfLife; // lambda = ln(2) / T_1/2

  // Initialize particles
  useEffect(() => {
    const newParticles = Array.from({ length: initialCount }).map((_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 90,
      decayed: false,
    }));
    setParticles(newParticles);
    setElapsedTime(0);
    setHistory([{ t: 0, remaining: initialCount }]);
  }, [initialCount, isotopeIndex]);

  // Main simulation timer loop
  useEffect(() => {
    let animationId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      if (isPlaying) {
        setElapsedTime((prevT) => {
          const nextT = prevT + dt;

          // Probability of decay in dt: P = 1 - exp(-lambda * dt) ≈ lambda * dt
          const decayProb = 1 - Math.exp(-decayConstant * dt);

          setParticles((prevParticles) => {
            let activeCount = 0;
            const updated = prevParticles.map((p) => {
              if (p.decayed) return p;
              if (Math.random() < decayProb) {
                return { ...p, decayed: true, decayTime: nextT };
              }
              activeCount++;
              return p;
            });

            // Update history chart periodically
            setHistory((prevH) => {
              if (prevH.length === 0 || nextT - prevH[prevH.length - 1].t >= 0.5) {
                return [...prevH.slice(-40), { t: parseFloat(nextT.toFixed(1)), remaining: activeCount }];
              }
              return prevH;
            });

            return updated;
          });

          return nextT;
        });
      }

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationId);
  }, [isPlaying, decayConstant]);

  const activeCount = particles.filter((p) => !p.decayed).length;
  const decayedCount = particles.length - activeCount;
  const theoreticalRemaining = initialCount * Math.pow(0.5, elapsedTime / halfLife);
  const elapsedHalfLives = elapsedTime / halfLife;
  const activityBq = decayConstant * activeCount; // Decays/sec

  const handleReset = () => {
    const newParticles = Array.from({ length: initialCount }).map((_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 90,
      decayed: false,
    }));
    setParticles(newParticles);
    setElapsedTime(0);
    setHistory([{ t: 0, remaining: initialCount }]);
  };

  const handleStepHalfLife = () => {
    const nextT = elapsedTime + halfLife;
    setElapsedTime(nextT);
    setParticles((prev) =>
      prev.map((p) => {
        if (p.decayed) return p;
        return Math.random() < 0.5 ? { ...p, decayed: true, decayTime: nextT } : p;
      })
    );
  };

  const handleLog = () => {
    if (onLogMeasurement) {
      onLogMeasurement({
        experiment: 'radioactive_decay',
        parameters: {
          Isotope: isotope.nameEn,
          Initial_Nuclei_N0: initialCount,
          Half_Life_Sec: halfLife,
          Elapsed_Time_Sec: parseFloat(elapsedTime.toFixed(2)),
          Elapsed_Half_Lives: parseFloat(elapsedHalfLives.toFixed(2)),
          Decay_Constant_lambda: parseFloat(decayConstant.toFixed(4)),
        },
        measuredValue: activeCount,
        theoreticalValue: parseFloat(theoreticalRemaining.toFixed(1)),
        unit: 'nuclei',
        variableName: 'Remaining_Active_Nuclei_N_t',
        equation: 'N(t) = N₀ · (1/2)^(t / T₁/₂)',
      });
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5 shadow-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Radiation className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              {t.title}
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              N(t) = N₀ · (1/2)^(t / T₁/₂) = N₀ · e^(-λ·t) &nbsp;|&nbsp; λ = ln(2) / T₁/₂
            </p>
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
            <span>{isPlaying ? t.pause : t.play}</span>
          </button>
          <button
            onClick={handleStepHalfLife}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all"
            title={t.stepHalfLifeTooltip}
          >
            <FastForward className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">+1 T½</span>
          </button>
          <button
            onClick={handleReset}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleLog}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow flex items-center gap-1.5 transition-all"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{t.log}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between min-h-[340px] relative overflow-hidden">
          {/* Top Status & Legend */}
          <div className="flex items-center justify-between z-10 text-xs flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                {t.activeParentNuclei}: {activeCount}
              </span>
              <span className="flex items-center gap-1.5 text-slate-500 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                {t.decayedDaughter}: {decayedCount}
              </span>
            </div>

            <span className="font-mono text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
              {t.halfLivesCount} <strong className="text-amber-400">{elapsedHalfLives.toFixed(2)} T₁/₂</strong>
            </span>
          </div>

          {/* Graphical Split: Left = Nuclei Cloud, Right = Exponential Curve */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-auto py-2">
            {/* Nuclei Chamber Box */}
            <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-2 h-52 relative overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {particles.map((p) => (
                  <circle
                    key={p.id}
                    cx={p.x}
                    cy={p.y}
                    r={p.decayed ? 1.4 : 2}
                    fill={p.decayed ? '#475569' : '#10b981'}
                    opacity={p.decayed ? 0.4 : 0.9}
                  />
                ))}
              </svg>
            </div>

            {/* Live Decay Curve Plot */}
            <div className="bg-slate-900/70 border border-slate-800/80 rounded-xl p-2.5 h-52 flex flex-col justify-between">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>N(t) Decay Curve</span>
                <span className="text-emerald-400">{((activeCount / initialCount) * 100).toFixed(1)}%</span>
              </div>

              <div className="relative w-full h-36">
                <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="w-full h-full">
                  {/* Axis lines */}
                  <line x1="10" y1="5" x2="10" y2="55" stroke="#475569" strokeWidth="0.6" />
                  <line x1="10" y1="55" x2="95" y2="55" stroke="#475569" strokeWidth="0.6" />

                  {/* Half-life vertical guide lines: T1/2, 2T1/2, 3T1/2 */}
                  <line x1="30" y1="5" x2="30" y2="55" stroke="#334155" strokeWidth="0.4" strokeDasharray="1,1" />
                  <line x1="50" y1="5" x2="50" y2="55" stroke="#334155" strokeWidth="0.4" strokeDasharray="1,1" />
                  <line x1="70" y1="5" x2="70" y2="55" stroke="#334155" strokeWidth="0.4" strokeDasharray="1,1" />

                  {/* Theoretical exponential curve */}
                  <path
                    d="M 10 10 Q 30 32 50 44 T 90 53"
                    fill="none"
                    stroke="#047857"
                    strokeWidth="0.8"
                    strokeDasharray="2,1"
                  />

                  {/* Experimental Live Points Path */}
                  {history.length > 1 && (
                    <polyline
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="1.5"
                      points={history
                        .map((pt) => {
                          const x = 10 + (pt.t / (halfLife * 4)) * 80;
                          const y = 55 - (pt.remaining / initialCount) * 45;
                          return `${Math.min(95, x)},${Math.max(5, y)}`;
                        })
                        .join(' ')}
                    />
                  )}
                </svg>
              </div>

              <div className="flex justify-between text-[9px] font-mono text-slate-500">
                <span>t=0</span>
                <span>1·T½</span>
                <span>2·T½</span>
                <span>3·T½</span>
                <span>4·T½</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-900/90 border border-slate-800 p-2.5 rounded-xl text-center text-xs font-mono">
            <div>
              <span className="text-slate-400 text-[10px] block">{t.elapsedTime}</span>
              <span className="text-slate-200 font-bold">{elapsedTime.toFixed(1)} s</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">{t.activeNucleiCard}</span>
              <span className="text-emerald-400 font-bold">{activeCount} / {initialCount}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">{t.remainingPercent}</span>
              <span className="text-amber-400 font-bold">{((activeCount / initialCount) * 100).toFixed(1)}%</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">{t.activityRate}</span>
              <span className="text-sky-400 font-bold">{activityBq.toFixed(1)} Bq</span>
            </div>
          </div>
        </div>

        {/* Input Parameters Controls */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-3">
            <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
              {t.isotopeControls}
            </h4>

            {/* Isotope Preset Selector */}
            <div className="space-y-1">
              <label className="text-xs text-slate-300">{t.targetIsotopeLabel}</label>
              <select
                value={isotopeIndex}
                onChange={(e) => setIsotopeIndex(parseInt(e.target.value))}
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-medium text-white focus:outline-none focus:border-emerald-500"
              >
                {ISOTOPES.map((iso, idx) => (
                  <option key={iso.id} value={idx}>
                    {getIsotopeName(iso)} (T½ = {iso.displayHalfLife})
                  </option>
                ))}
              </select>
            </div>

            {/* Initial Nuclei Count N0 */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">{t.initialNucleiLabel}</span>
                <span className="font-mono text-emerald-400 font-bold">{initialCount} atoms</span>
              </div>
              <input
                type="range"
                min="50"
                max="800"
                step="50"
                value={initialCount}
                onChange={(e) => setInitialCount(parseInt(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            {/* Isotope Info Card */}
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1 text-slate-300">
              <div className="flex justify-between font-mono">
                <span className="text-slate-400">{t.realHalfLife}</span>
                <span className="text-amber-300 font-bold">{isotope.displayHalfLife}</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-slate-400">{t.radiationType}</span>
                <span className="text-sky-300 font-bold">{isotope.radiationType}</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-slate-400">{t.decayConstant}</span>
                <span className="text-purple-300 font-bold">{decayConstant.toFixed(3)} s⁻¹</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* External HUD Cards Row (All calculated data placed strictly outside Canvas) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">
            {t.decayedNucleiCard}
          </div>
          <div className="text-lg font-mono font-bold text-rose-400">
            {decayedCount}
          </div>
          <div className="text-[10px] text-slate-500 font-mono">N_decayed = N₀ - N(t)</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">
            {t.theoreticalN}
          </div>
          <div className="text-lg font-mono font-bold text-emerald-400">
            {theoreticalRemaining.toFixed(1)}
          </div>
          <div className="text-[10px] text-slate-500 font-mono">N = N₀ · (1/2)^(t/T½)</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">
            {t.decayConstantCard}
          </div>
          <div className="text-lg font-mono font-bold text-sky-400">
            {decayConstant.toFixed(4)} s⁻¹
          </div>
          <div className="text-[10px] text-slate-500 font-mono">λ = ln(2) / T₁/₂ = 0.693 / T½</div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">
            {t.instantaneousActivity}
          </div>
          <div className="text-lg font-mono font-bold text-amber-400">
            {activityBq.toFixed(1)} Bq
          </div>
          <div className="text-[10px] text-slate-500 font-mono">A(t) = λ · N(t)</div>
        </div>
      </div>
    </div>
  );
}
