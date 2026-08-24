import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, BookmarkCheck, Sliders, Droplets, Sparkles, Activity } from 'lucide-react';
import { Language, MeasurementRecord } from '../types';

interface Props {
  lang: Language;
  onLogMeasurement: (data: Omit<MeasurementRecord, 'id' | 'timestamp' | 'percentError'>) => void;
}

type LiquidType = 'water' | 'oil' | 'glycerin' | 'honey';
type SphereMaterialType = 'steel' | 'aluminum' | 'glass' | 'lead';

const LIQUIDS: Record<LiquidType, { nameAr: string; nameEn: string; eta: number; rho: number; color: string }> = {
  water: { nameAr: 'ماء نقي (Water)', nameEn: 'Pure Water', eta: 0.001, rho: 1000, color: 'rgba(56, 189, 248, 0.4)' },
  oil: { nameAr: 'زيت محركات (Engine Oil)', nameEn: 'Engine Oil', eta: 0.085, rho: 920, color: 'rgba(234, 179, 8, 0.55)' },
  glycerin: { nameAr: 'جلسرين نقي (Glycerin)', nameEn: 'Glycerin', eta: 0.95, rho: 1260, color: 'rgba(244, 114, 182, 0.45)' },
  honey: { nameAr: 'عسل طبيعي (Honey)', nameEn: 'Pure Honey', eta: 10.0, rho: 1420, color: 'rgba(245, 158, 11, 0.75)' },
};

const SPHERES: Record<SphereMaterialType, { nameAr: string; nameEn: string; rho: number; color: string }> = {
  steel: { nameAr: 'فولاذ (Steel)', nameEn: 'Steel Sphere', rho: 7850, color: '#94a3b8' },
  aluminum: { nameAr: 'ألمنيوم (Aluminum)', nameEn: 'Aluminum Sphere', rho: 2700, color: '#cbd5e1' },
  glass: { nameAr: 'زجاج (Glass)', nameEn: 'Glass Sphere', rho: 2500, color: '#38bdf8' },
  lead: { nameAr: 'رصاص (Lead)', nameEn: 'Lead Sphere', rho: 11340, color: '#64748b' },
};

export default function ViscosityStokesSim({ lang, onLogMeasurement }: Props) {
  const [liquid, setLiquid] = useState<LiquidType>('glycerin');
  const [sphereMaterial, setSphereMaterial] = useState<SphereMaterialType>('steel');
  const [radiusMm, setRadiusMm] = useState<number>(3.0); // mm
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [logged, setLogged] = useState<boolean>(false);

  // Dynamic falling ball state
  const ballYRef = useRef<number>(60); // px from top of cylinder
  const ballVelRef = useRef<number>(0); // m/s

  const g = 9.80665;
  const radiusM = radiusMm * 1e-3;
  const { eta, rho: rhoFluid } = LIQUIDS[liquid];
  const { rho: rhoSphere } = SPHERES[sphereMaterial];

  // Sphere volume & masses
  const volumeM3 = (4 / 3) * Math.PI * Math.pow(radiusM, 3);
  const sphereMassKg = volumeM3 * rhoSphere;
  const gravityForceN = sphereMassKg * g;
  const buoyancyForceN = volumeM3 * rhoFluid * g;

  // Terminal Velocity: vt = 2 * r² * g * (rho_s - rho_f) / (9 * eta)
  const deltaRho = Math.max(rhoSphere - rhoFluid, 0);
  const terminalVelocityMps = (2 * Math.pow(radiusM, 2) * g * deltaRho) / (9 * eta);
  const stokesDragForceN = 6 * Math.PI * eta * radiusM * terminalVelocityMps;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.033);
      lastTime = now;

      if (isRunning) {
        // Approach terminal velocity with exponential drag decay
        const approachRate = Math.max(6 * Math.PI * eta * radiusM / sphereMassKg, 10);
        ballVelRef.current += (terminalVelocityMps - ballVelRef.current) * approachRate * dt;

        // Convert velocity to pixel motion
        ballYRef.current += ballVelRef.current * dt * 280;

        // Loop ball back to top of cylinder
        if (ballYRef.current > 310) {
          ballYRef.current = 60;
          ballVelRef.current = 0;
        }
      }

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          drawViscosityColumn(ctx, canvas.width, canvas.height);
        }
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [liquid, sphereMaterial, radiusMm, terminalVelocityMps, isRunning, eta, radiusM, sphereMassKg]);

  const drawViscosityColumn = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);

    // Dark Background & Grid
    ctx.fillStyle = '#09090b';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 0.8;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Graduated Liquid Column Cylinder
    const cylX = width * 0.46;
    const cylY = 40;
    const cylW = 120;
    const cylH = 290;

    // Liquid Fluid inside cylinder
    ctx.fillStyle = LIQUIDS[liquid].color;
    ctx.fillRect(cylX - cylW / 2, cylY + 15, cylW, cylH - 15);

    // Glass Tube Border
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(cylX - cylW / 2, cylY, cylW, cylH);

    // Graduated Ticks on Cylinder
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1;
    for (let ty = cylY + 30; ty < cylY + cylH - 10; ty += 25) {
      ctx.beginPath();
      ctx.moveTo(cylX - cylW / 2, ty);
      ctx.lineTo(cylX - cylW / 2 + 14, ty);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cylX + cylW / 2, ty);
      ctx.lineTo(cylX + cylW / 2 - 14, ty);
      ctx.stroke();
    }

    // Falling Sphere Ball
    const ballX = cylX;
    const ballY = cylY + ballYRef.current;
    const ballR = Math.max(Math.min(radiusMm * 2.5, 18), 6);

    ctx.fillStyle = SPHERES[sphereMaterial].color;
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballR, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Free Body Vectors on the Sphere
    // 1. Gravity (Down)
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ballX, ballY);
    ctx.lineTo(ballX, ballY + 35);
    ctx.stroke();

    ctx.fillStyle = '#ef4444';
    ctx.font = '9px monospace';
    ctx.fillText('W = mg', ballX + 6, ballY + 38);

    // 2. Stokes Drag Force F_d (Up)
    ctx.strokeStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(ballX - 4, ballY);
    ctx.lineTo(ballX - 4, ballY - 30);
    ctx.stroke();

    ctx.fillStyle = '#f59e0b';
    ctx.fillText('Fd (Drag)', ballX - 58, ballY - 26);

    // 3. Buoyancy Force F_b (Up)
    ctx.strokeStyle = '#38bdf8';
    ctx.beginPath();
    ctx.moveTo(ballX + 4, ballY);
    ctx.lineTo(ballX + 4, ballY - 18);
    ctx.stroke();

    // Fluid cylinder boundary drawn cleanly
  };

  const handleReset = () => {
    ballYRef.current = 60;
    ballVelRef.current = 0;
  };

  const handleLog = () => {
    onLogMeasurement({
      experiment: 'viscosity_stokes',
      variableName: 'Terminal Velocity vt (Stokes’ Law of Viscosity)',
      measuredValue: Number((terminalVelocityMps * 100).toFixed(2)),
      theoreticalValue: Number((((2 * Math.pow(radiusM, 2) * g * deltaRho) / (9 * eta)) * 100).toFixed(2)),
      unit: 'cm/s',
      parameters: {
        'Liquid Fluid': LIQUIDS[liquid].nameEn,
        'Liquid Viscosity η': `${eta} Pa·s`,
        'Fluid Density ρ_f': `${rhoFluid} kg/m³`,
        'Sphere Material': SPHERES[sphereMaterial].nameEn,
        'Sphere Density ρ_s': `${rhoSphere} kg/m³`,
        'Sphere Radius r': `${radiusMm} mm`,
        'Stokes Drag Force Fd': `${stokesDragForceN.toExponential(3)} N`,
        'Buoyancy Force Fb': `${buoyancyForceN.toExponential(3)} N`,
        'Terminal Velocity vt': `${(terminalVelocityMps * 100).toFixed(2)} cm/s`,
      },
      equation: `vt = [2 · r² · g · (ρ_s - ρ_f)] / (9 · η) = ${(terminalVelocityMps * 100).toFixed(2)} cm/s, Fd = 6π·η·r·vt`,
      notes: `Stokes' Law fluid mechanics experiment determining fluid viscosity through terminal falling speed of micro spheres in viscous columns.`,
    });
    setLogged(true);
    setTimeout(() => setLogged(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-zinc-900 to-sky-950/40 border border-amber-800/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
            <Droplets className="w-5 h-5 text-amber-400" />
            <span>
              {lang === 'ar' ? 'اللزوجة وقانون ستوكس والسرعة الحدية (Viscosity & Stokes)' : lang === 'ku' ? 'خەستی و یاسای ستۆکس و خێرایی کۆتایی' : 'Viscosity & Stokes’ Law (Terminal Velocity)'}
            </span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
            {lang === 'ar'
              ? 'سقوط الكرات المعدنية في الموائع اللزجة (ماء، زيت، جلسرين، عسل) وحساب قوة مقاومة المائع Fd = 6πηrv والسرعة الحدية vt = 2r²g(ρs - ρf)/(9η).'
              : lang === 'ku'
              ? 'کەوتنی تۆپە کانزاییەکان لەناو شلە جیاوازەکاندا و دیاریکردنی خێرایی کۆتایی بەپێی یاسای ستۆکس.'
              : 'Falling sphere viscometer calculating terminal velocity vt = 2r²g(Δρ)/(9η) and Stokes drag resistance Fd = 6πηrv.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-400" />}
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700"
            title="Reset Position"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handleLog}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-md ${
              logged
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>{logged ? (lang === 'ar' ? 'تم التسجيل في الدفتر ✓' : 'Logged ✓') : (lang === 'ar' ? 'تسجيل في دفتر المختبر' : 'Log Measurement')}</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls */}
        <div className="lg:col-span-4 space-y-4 p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-amber-400" />
              {lang === 'ar' ? 'معايير السائل والكرة الساقطة' : 'Liquid & Sphere Controls'}
            </span>
          </div>

          {/* Liquid Selector */}
          <div>
            <label className="text-xs text-zinc-400 block mb-1.5">
              {lang === 'ar' ? 'نوع السائل واللزوجة (η):' : 'Liquid & Viscosity (η):'}
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {(Object.keys(LIQUIDS) as LiquidType[]).map((liq) => (
                <button
                  key={liq}
                  onClick={() => setLiquid(liq)}
                  className={`px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all text-start ${
                    liquid === liq
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                      : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  <div>{lang === 'ar' ? LIQUIDS[liq].nameAr : LIQUIDS[liq].nameEn}</div>
                  <div className="text-[10px] text-zinc-500 font-mono">η = {LIQUIDS[liq].eta} Pa·s</div>
                </button>
              ))}
            </div>
          </div>

          {/* Sphere Material Selector */}
          <div>
            <label className="text-xs text-zinc-400 block mb-1.5">
              {lang === 'ar' ? 'مادة الكرة الساقطة:' : 'Sphere Material:'}
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {(Object.keys(SPHERES) as SphereMaterialType[]).map((mat) => (
                <button
                  key={mat}
                  onClick={() => setSphereMaterial(mat)}
                  className={`px-2.5 py-2 rounded-xl text-xs font-semibold border transition-all text-start ${
                    sphereMaterial === mat
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 shadow-sm'
                      : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-zinc-200'
                  }`}
                >
                  <div>{lang === 'ar' ? SPHERES[mat].nameAr : SPHERES[mat].nameEn}</div>
                  <div className="text-[10px] text-zinc-500 font-mono">ρ = {SPHERES[mat].rho} kg/m³</div>
                </button>
              ))}
            </div>
          </div>

          {/* Sphere Radius Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-400">{lang === 'ar' ? 'نصف قطر الكرة (r):' : 'Sphere Radius (r):'}</span>
              <span className="font-mono text-amber-400 font-semibold">{radiusMm.toFixed(1)} mm</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="8.0"
              step="0.5"
              value={radiusMm}
              onChange={(e) => setRadiusMm(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>
        </div>

        {/* Canvas & Computed Bento Grid */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800">
            <canvas
              ref={canvasRef}
              width={680}
              height={360}
              className="w-full h-[360px] rounded-xl bg-zinc-950 block shadow-inner"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Terminal Velocity */}
            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-400 uppercase font-semibold">
                {lang === 'ar' ? 'السرعة الحدية (vt)' : 'Terminal Speed (vt)'}
              </span>
              <div className="text-xl font-bold font-mono text-amber-400">
                {(terminalVelocityMps * 100).toFixed(2)} <span className="text-xs text-zinc-400">cm/s</span>
              </div>
              <span className="text-[9px] text-zinc-500 font-mono">2r²gΔρ / 9η</span>
            </div>

            {/* Stokes Drag Force */}
            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-400 uppercase font-semibold">
                {lang === 'ar' ? 'قوة مقاومة المائع (Fd)' : 'Stokes Drag (Fd)'}
              </span>
              <div className="text-xl font-bold font-mono text-rose-400">
                {(stokesDragForceN * 1000).toFixed(3)} <span className="text-xs text-zinc-400">mN</span>
              </div>
              <span className="text-[9px] text-zinc-500 font-mono">Fd = 6πηrv</span>
            </div>

            {/* Viscosity η */}
            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-400 uppercase font-semibold">
                {lang === 'ar' ? 'معامل اللزوجة (η)' : 'Viscosity (η)'}
              </span>
              <div className="text-xl font-bold font-mono text-sky-400">
                {eta} <span className="text-xs text-zinc-400">Pa·s</span>
              </div>
              <span className="text-[9px] text-zinc-500 font-mono">{LIQUIDS[liquid].nameEn}</span>
            </div>

            {/* Net Gravity - Buoyancy */}
            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-400 uppercase font-semibold">
                {lang === 'ar' ? 'الوزن الظاهري (W - Fb)' : 'Apparent Weight'}
              </span>
              <div className="text-xl font-bold font-mono text-emerald-400">
                {((gravityForceN - buoyancyForceN) * 1000).toFixed(3)} <span className="text-xs text-zinc-400">mN</span>
              </div>
              <span className="text-[9px] text-zinc-500 font-mono">W - Fb = Fd</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
