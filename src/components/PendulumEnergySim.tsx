import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, BookmarkCheck, Gauge, Activity, Zap, Compass } from 'lucide-react';
import { Language, MeasurementRecord } from '../types';
import { TRANSLATIONS } from '../translations';
import { PLANETS } from '../data/physicsData';

interface Props {
  lang: Language;
  onLogMeasurement: (data: Omit<MeasurementRecord, 'id' | 'timestamp' | 'percentError'>) => void;
}

export default function PendulumEnergySim({ lang, onLogMeasurement }: Props) {
  const translations = {
    ar: {
      title: 'التحقق من حفظ الطاقة باستخدام النواس البسيط (E = K + U)',
      subTitle: 'التحقق من حفظ الطاقة باستخدام النواس البسيط (E = K + U)',
      shortDesc: 'دراسة التحول بين طاقة الوضع الحركية والوضع في النواس البسيط',
      start: 'تشغيل', // غير موثّق بمصدر
      pause: 'إيقاف', // غير موثّق بمصدر
      photogateVelLabel: 'سرعة البوابة الضوئية (v_max)',
      bottomKELabel: 'طاقة الحركة عند القاع (K_max)',
      initialPELabel: 'طاقة الوضع الابتدائية (U_0)',
      periodLabel: 'الزمن الدوري (T)',
      proofTitle: 'البرهان الفيزيائي لقانون حفظ الطاقة الميكانيكية:',
      proofText: 'عند إفلات البندول من أقصى زاوية θ₀، تكون طاقة الحركة صفراً وتكون الطاقة كلها طاقة وضع: E = U_max = m·g·h_max = m·g·L(1 - cos θ₀). وعند مروره بأدنى نقطة (موضع الاتزان h=0)، تتحول طاقة الوضع بالكامل إلى طاقة حركة: K_max = ½ m v_max² = E. وبالتالي فإن السرعة عند القاع تساوي دائماً v = √(2 g h_max).',
      controlsTitle: 'عناصر التحكم بالبندول', // غير موثّق بمصدر
      lengthLabel: 'طول الخيط (L)',
      massLabel: 'كتلة الكرة (m)',
      angleLabel: 'زاوية الإفلات الابتدائية (θ₀)',
      dampingLabel: 'مقاومة الهواء (التخميد)',
      conservativeZero: '0 (نظام محافظ تام)', // غير موثّق بمصدر
      gravityLabel: 'تسارع الجاذبية الكوكبية (g):',
      loggedMsg: 'تم تسجيل القياس في دفتر المختبر!', // غير موثّق بمصدر
      logBtn: 'تسجيل حفظ الطاقة وسرعة القاع', // غير موثّق بمصدر
      photogateLabel: 'PHOTOGATE', // غير موثّق بمصدر
      varEnergyVel: 'حفظ الطاقة الميكانيكية وسرعة القاع', // غير موثّق بمصدر
    },
    en: {
      title: 'Conservation of Mechanical Energy in Simple Pendulum (E = K + U)',
      subTitle: 'Conservation of Mechanical Energy in Simple Pendulum',
      shortDesc: 'Study energy conversion between kinetic and potential energy in a simple pendulum.',
      start: 'Start', // غير موثّق بمصدر
      pause: 'Pause', // غير موثّق بمصدر
      photogateVelLabel: 'Photogate Velocity',
      bottomKELabel: 'Bottom Kinetic Energy',
      initialPELabel: 'Initial Potential Energy',
      periodLabel: 'Period (T)',
      proofTitle: 'Physical Proof of Energy Conservation:',
      proofText: 'At release angle θ₀, K=0 and all energy is potential: E = U = m·g·h = m·g·L(1 - cos θ₀). At the lowest point (h=0), potential energy converts completely into kinetic energy: K = ½ m v² = E. Hence, bottom velocity is v = √(2 g h).',
      controlsTitle: 'Pendulum Parameters', // غير موثّق بمصدر
      lengthLabel: 'String Length (L)',
      massLabel: 'Bob Mass (m)',
      angleLabel: 'Release Angle (θ₀)',
      dampingLabel: 'Air Resistance (Damping)',
      conservativeZero: '0 (Conservative)', // غير موثّق بمصدر
      gravityLabel: 'Planetary Gravity (g):',
      loggedMsg: 'Logged to Lab Notebook!', // غير موثّق بمصدر
      logBtn: 'Log Energy Conservation Data', // غير موثّق بمصدر
      photogateLabel: 'PHOTOGATE', // غير موثّق بمصدر
      varEnergyVel: 'Total Energy & Bottom Velocity', // غير موثّق بمصدر
    },
    ku: {
      title: 'سەلماندنی پاراستنی وزە بە بەکارهێنانی پاندۆڵی سادە (E = K + U)',
      subTitle: 'سەلماندنی پاراستنی وزە بە بەکارهێنانی پاندۆڵی سادە (E = K + U)',
      shortDesc: 'لێکۆڵینەوە لە گۆڕانکاری نێوان وزەی جووڵە و وزەی شاراوە لە پاندۆڵی سادەدا.',
      start: 'دەستپێکردن', // غير موثّق بمصدر
      pause: 'وەستاندن', // غير موثّق بمصدر
      photogateVelLabel: 'خێرایی دەروازەی ڕووناکی (v_max)',
      bottomKELabel: 'وزەی جووڵە لە نزمترین خاڵدا (K_max)',
      initialPELabel: 'وزەی شاراوەی سەرەتایی (U_0)',
      periodLabel: 'خولی ڕوودان (T)',
      proofTitle: 'سەلماندنی فیزیایی بۆ یاسای پاراستنی وزەی ميكانيكی:',
      proofText: 'لە گۆشەی بەردان θ₀ وزەی جووڵە سفرە؛ E = U_max = m·g·h_max. لە نزمترین خاڵدا وزەی شاراوە بەتەواوی دەبێتە وزەی جووڵە: K_max = ½ m v_max² = E.',
      controlsTitle: 'دەستکاریکردنی تایبەتمەندییەکانی پاندۆڵ', // غير موثّق بمصدر
      lengthLabel: 'درێژی پەتەکە (L)',
      massLabel: 'بارستەی تۆپەکە (m)',
      angleLabel: 'گۆشەی بەرپێدانی سەرەتایی (θ₀)',
      dampingLabel: 'بەرگری هەوا (کوژاندنەوە)',
      conservativeZero: '0 (سیستەمی پارێزراو)', // غير موثّق بمصدر
      gravityLabel: 'تاودانی کێشکردنی گەڕەستێرەیی (g):',
      loggedMsg: 'تۆمارکرا لە دەفتەری تاقیگە!', // غير موثّق بمصدر
      logBtn: 'تۆمارکردنی پاراستنی وزە و خێرایی نزمترین خاڵ', // غير موثّق بمصدر
      photogateLabel: 'PHOTOGATE', // غير موثّق بمصدر
      varEnergyVel: 'پاراستنی وزەی ميكانيكی و خێرایی نزمترین خاڵ', // غير موثّق بمصدر
    },
    kmr: {
      title: 'Ispatkirina parastina anarjiyê bi karanîna pandula sade (E = K + U)',
      subTitle: 'Ispatkirina parastina anarjiyê bi karanîna pandula sade (E = K + U)',
      shortDesc: 'Lêkolîna guherîna anarjiya tewereyî û anarjiya tevgerê di pandula sade de.',
      start: 'Destpêkirin', // غير موثّق بمصدر
      pause: 'Pewstandin', // غير موثّق بمصدر
      photogateVelLabel: 'Leza dergehê ronahiyê (v_max)',
      bottomKELabel: 'Anarjiya tevgerê li binî (K_max)',
      initialPELabel: 'Anarjiya tewereyî ya destpêkê (U_0)',
      periodLabel: 'Dema dewranê (T)',
      proofTitle: 'Ispata fîzîkî ya yasaya parastina anarjiya mekanîkî:',
      proofText: 'Di goşeya berdanê θ₀ de K=0 ye û hemi anarjî U_max = m·g·h_max e. Li xala herî jêr (h=0) anarjiya tewereyî dibe anarjiya tevgerê: K_max = ½ m v_max² = E.',
      controlsTitle: 'Parametreyên pandulê', // غير موثّق بمصدر
      lengthLabel: 'Dirêjiya benik (L)',
      massLabel: 'Massa gogê (m)',
      angleLabel: 'Goşeya berdanê ya destpêkê (θ₀)',
      dampingLabel: 'Berxwedana hewayê (Dempyasyon)',
      conservativeZero: '0 (Sîstema parastî)', // غير موثّق بمصدر
      gravityLabel: 'Cilveya kîşkirina gerstêrkan (g):',
      loggedMsg: 'Hat tomarkirin di defterê de!', // غير موثّق بمصدر
      logBtn: 'Tomarkirina parastina anarjiyê û leza binî', // غير موثّق بمصدر
      photogateLabel: 'PHOTOGATE', // غير موثّق بمصدر
      varEnergyVel: 'Parastina anarjiya mekanîkî û leza binî', // غير موثّق بمصدر
    },
  };
  const t = translations[lang] || translations['ar'];

  const getPlanetName = (p: typeof PLANETS[0]) => {
    const planetNames: Record<string, string> = {
      ar: p.nameAr,
      ku: p.nameKu,
      kmr: p.nameKmr || p.nameEn,
      en: p.nameEn,
    };
    return planetNames[lang] || p.nameAr;
  };

  // Parameters
  const [length, setLength] = useState<number>(1.5); // meters (L)
  const [mass, setMass] = useState<number>(1.0); // kg (m)
  const [initialAngleDeg, setInitialAngleDeg] = useState<number>(35); // degrees (theta_0)
  const [damping, setDamping] = useState<number>(0.0); // 0 = perfect conservation
  const [selectedPlanet, setSelectedPlanet] = useState<string>('earth');
  const [showPhotogate, setShowPhotogate] = useState<boolean>(true);

  // Simulation State
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logged, setLogged] = useState<boolean>(false);

  const currentG = PLANETS.find((p) => p.id === selectedPlanet)?.g ?? 9.81;

  // Theoretical Calculations
  const initialAngleRad = (initialAngleDeg * Math.PI) / 180;
  const theoreticalPeriod = 2 * Math.PI * Math.sqrt(length / currentG);
  const maxInitialHeight = length * (1 - Math.cos(initialAngleRad));
  const initialTotalEnergy = mass * currentG * maxInitialHeight;
  const theoreticalMaxVelocity = Math.sqrt(2 * currentG * maxInitialHeight);

  // Live dynamic state refs for 60fps loop
  const thetaRef = useRef<number>(initialAngleRad);
  const omegaRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);
  const isDraggingRef = useRef<boolean>(false);

  // Photogate measurements
  const [photogateSpeed, setPhotogateSpeed] = useState<number>(theoreticalMaxVelocity);
  const [photogateKE, setPhotogateKE] = useState<number>(initialTotalEnergy);

  // Live metrics for UI
  const [metrics, setMetrics] = useState({
    theta: initialAngleRad,
    thetaDeg: initialAngleDeg,
    omega: 0,
    linearVelocity: 0,
    height: maxInitialHeight,
    pe: initialTotalEnergy,
    ke: 0,
    totalEnergy: initialTotalEnergy,
    time: 0,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const resetSim = () => {
    setIsRunning(false);
    const rad = (initialAngleDeg * Math.PI) / 180;
    thetaRef.current = rad;
    omegaRef.current = 0;
    const h = length * (1 - Math.cos(rad));
    const pe = mass * currentG * h;
    setMetrics({
      theta: rad,
      thetaDeg: initialAngleDeg,
      omega: 0,
      linearVelocity: 0,
      height: h,
      pe: pe,
      ke: 0,
      totalEnergy: pe,
      time: 0,
    });
    setPhotogateSpeed(Math.sqrt(2 * currentG * h));
    setPhotogateKE(pe);
  };

  useEffect(() => {
    resetSim();
  }, [length, mass, initialAngleDeg, damping, selectedPlanet]);

  // 60FPS Physics Runge-Kutta 4 / Euler-Cromer Loop
  useEffect(() => {
    let lastTime = performance.now();
    let prevTheta = thetaRef.current;

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.033);
      lastTime = now;

      if (isRunning && !isDraggingRef.current) {
        // Differential equation: d2(theta)/dt2 = -(g/L)*sin(theta) - (damping/m)*omega
        const alpha = -(currentG / length) * Math.sin(thetaRef.current) - (damping / mass) * omegaRef.current;
        omegaRef.current += alpha * dt;
        thetaRef.current += omegaRef.current * dt;

        // Check photogate trigger (passing theta = 0)
        if ((prevTheta < 0 && thetaRef.current >= 0) || (prevTheta > 0 && thetaRef.current <= 0)) {
          const speedAtBottom = Math.abs(omegaRef.current * length);
          setPhotogateSpeed(speedAtBottom);
          setPhotogateKE(0.5 * mass * speedAtBottom * speedAtBottom);
        }
        prevTheta = thetaRef.current;

        const currentRad = thetaRef.current;
        const currentH = length * (1 - Math.cos(currentRad));
        const currentV = omegaRef.current * length;
        const currentPE = mass * currentG * currentH;
        const currentKE = 0.5 * mass * currentV * currentV;

        setMetrics({
          theta: currentRad,
          thetaDeg: (currentRad * 180) / Math.PI,
          omega: omegaRef.current,
          linearVelocity: currentV,
          height: currentH,
          pe: currentPE,
          ke: currentKE,
          totalEnergy: currentPE + currentKE,
          time: now / 1000,
        });
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isRunning, currentG, length, damping, mass]);

  // Canvas Drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Background Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 25) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    const pivotX = width * 0.42;
    const pivotY = 50;
    const scale = 140; // px per meter
    const lengthPix = length * scale;

    // Draw Support Bar
    ctx.fillStyle = '#475569';
    ctx.fillRect(pivotX - 80, pivotY - 14, 160, 14);

    // Reference Vertical Dotted Line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(pivotX, pivotY);
    ctx.lineTo(pivotX, pivotY + lengthPix + 40);
    ctx.stroke();
    ctx.setLineDash([]);

    // Pendulum Bob Position
    const bobX = pivotX + lengthPix * Math.sin(metrics.theta);
    const bobY = pivotY + lengthPix * Math.cos(metrics.theta);

    // Height Probe & Datum Baseline
    const lowestY = pivotY + lengthPix;
    ctx.strokeStyle = 'rgba(14, 165, 233, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(pivotX - 160, lowestY);
    ctx.lineTo(pivotX + 160, lowestY);
    ctx.stroke();

    // Height vertical bar indicator
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bobX, bobY);
    ctx.lineTo(bobX, lowestY);
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = '10px monospace';
    ctx.fillText(`h = ${metrics.height.toFixed(3)} m`, bobX + 8, (bobY + lowestY) / 2);

    // Photogate Sensor at lowest point
    if (showPhotogate) {
      ctx.fillStyle = '#334155';
      ctx.fillRect(pivotX - 18, lowestY - 18, 36, 36);
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;
      ctx.strokeRect(pivotX - 18, lowestY - 18, 36, 36);

      // Laser beam line
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.7)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pivotX - 25, lowestY);
      ctx.lineTo(pivotX + 25, lowestY);
      ctx.stroke();

      ctx.fillStyle = '#4ade80';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(t.photogateLabel, pivotX, lowestY + 30);
    }

    // Pendulum String
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(pivotX, pivotY);
    ctx.lineTo(bobX, bobY);
    ctx.stroke();

    // Pivot Pin
    ctx.beginPath();
    ctx.arc(pivotX, pivotY, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Pendulum Bob Sphere
    const bobRadius = Math.max(14, Math.min(26, Math.sqrt(mass) * 16));
    const grad = ctx.createRadialGradient(bobX - bobRadius * 0.3, bobY - bobRadius * 0.3, 3, bobX, bobY, bobRadius);
    grad.addColorStop(0, '#38bdf8');
    grad.addColorStop(0.8, '#0284c7');
    grad.addColorStop(1, '#0c4a6e');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(bobX, bobY, bobRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#bae6fd';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Real-time Energy Chart Overlay on Right Side
    const chartX = width * 0.76;
    const chartY = height * 0.25;
  }, [metrics, length, mass, showPhotogate, initialTotalEnergy]);

  // Dragging Bob to set angle
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const pivotX = canvas.width * 0.42;
    const pivotY = 50;
    const lengthPix = length * 140;
    const bobX = pivotX + lengthPix * Math.sin(thetaRef.current);
    const bobY = pivotY + lengthPix * Math.cos(thetaRef.current);

    if (Math.hypot(clickX - bobX, clickY - bobY) < 35) {
      isDraggingRef.current = true;
      setIsRunning(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const moveX = e.clientX - rect.left;
    const moveY = e.clientY - rect.top;

    const pivotX = canvas.width * 0.42;
    const pivotY = 50;
    const dx = moveX - pivotX;
    const dy = moveY - pivotY;

    let angle = Math.atan2(dx, dy);
    angle = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, angle));
    thetaRef.current = angle;
    omegaRef.current = 0;
    setInitialAngleDeg(Math.round((angle * 180) / Math.PI));

    const h = length * (1 - Math.cos(angle));
    const pe = mass * currentG * h;
    setMetrics({
      theta: angle,
      thetaDeg: (angle * 180) / Math.PI,
      omega: 0,
      linearVelocity: 0,
      height: h,
      pe: pe,
      ke: 0,
      totalEnergy: pe,
      time: 0,
    });
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleLog = () => {
    onLogMeasurement({
      experiment: 'pendulum_energy',
      parameters: {
        length: `${length.toFixed(2)} m`,
        mass: `${mass.toFixed(2)} kg`,
        gravity: `${currentG.toFixed(2)} m/s²`,
        initialAngle: `${initialAngleDeg}°`,
      },
      variableName: t.varEnergyVel,
      measuredValue: Number(photogateKE.toFixed(3)),
      theoreticalValue: Number(initialTotalEnergy.toFixed(3)),
      unit: 'J',
      equation: 'E = K + U = mgh_max = ½mv_max²',
      notes: `U_max=${initialTotalEnergy.toFixed(2)}J, Photogate K=${photogateKE.toFixed(2)}J, v_measured=${photogateSpeed.toFixed(2)}m/s, v_theo=${theoreticalMaxVelocity.toFixed(2)}m/s, Period T=${theoreticalPeriod.toFixed(2)}s`,
    });
    setLogged(true);
    setTimeout(() => setLogged(false), 2000);
  };

  return (
    <div id="pendulum-energy-simulation" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Visual Canvas Area */}
      <div className="lg:col-span-2 space-y-4">
        <div className="relative rounded-2xl bg-zinc-900 border border-zinc-800 p-4 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-100">
                  {t.subTitle}
                </h3>
                <p className="text-xs text-zinc-400 font-mono">
                  T = 2π√(L/g) = {theoreticalPeriod.toFixed(2)}s • E_total = {initialTotalEnergy.toFixed(2)} J
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isRunning
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-900/30'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                }`}
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isRunning ? t.pause : t.start}</span>
              </button>

              <button
                onClick={resetSim}
                className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 transition-colors"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative flex justify-center items-center bg-zinc-950/70 rounded-xl border border-zinc-800/60 overflow-hidden">
            <canvas
              ref={canvasRef}
              width={700}
              height={380}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              className="cursor-grab active:cursor-grabbing max-w-full h-auto"
            />
          </div>

          {/* Photogate & Real-time Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/60 text-center">
              <div className="text-[11px] text-zinc-400">{t.photogateVelLabel}</div>
              <div className="text-base font-bold font-mono text-emerald-400">
                {photogateSpeed.toFixed(3)} <span className="text-xs text-zinc-400">m/s</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/60 text-center">
              <div className="text-[11px] text-zinc-400">{t.bottomKELabel}</div>
              <div className="text-base font-bold font-mono text-emerald-400">
                {photogateKE.toFixed(3)} <span className="text-xs text-zinc-400">J</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/60 text-center">
              <div className="text-[11px] text-zinc-400">{t.initialPELabel}</div>
              <div className="text-base font-bold font-mono text-sky-400">
                {initialTotalEnergy.toFixed(3)} <span className="text-xs text-zinc-400">J</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/60 text-center">
              <div className="text-[11px] text-zinc-400">{t.periodLabel}</div>
              <div className="text-base font-bold font-mono text-amber-400">
                {theoreticalPeriod.toFixed(2)} <span className="text-xs text-zinc-400">s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Conservation Proof Card */}
        <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-800/30 text-xs text-zinc-300 space-y-2">
          <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
            <BookmarkCheck className="w-4 h-4" />
            <span>{t.proofTitle}</span>
          </div>
          <p>{t.proofText}</p>
        </div>
      </div>

      {/* Control Panel */}
      <div className="space-y-4">
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 shadow-xl space-y-5">
          <h4 className="text-sm font-bold text-zinc-200 pb-2 border-b border-zinc-800">
            {t.controlsTitle}
          </h4>

          {/* Length Control */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-400">{t.lengthLabel}</span>
              <span className="font-mono text-sky-400 font-bold">{length.toFixed(2)} m</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.2"
              step="0.05"
              value={length}
              onChange={(e) => setLength(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
          </div>

          {/* Mass Control */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-400">{t.massLabel}</span>
              <span className="font-mono text-zinc-200 font-bold">{mass.toFixed(1)} kg</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="3.0"
              step="0.1"
              value={mass}
              onChange={(e) => setMass(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
          </div>

          {/* Initial Release Angle */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-400">{t.angleLabel}</span>
              <span className="font-mono text-amber-400 font-bold">{initialAngleDeg}°</span>
            </div>
            <input
              type="range"
              min="5"
              max="65"
              step="1"
              value={initialAngleDeg}
              onChange={(e) => setInitialAngleDeg(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Damping toggle (conservative vs non-conservative) */}
          <div className="space-y-1 pt-2 border-t border-zinc-800">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-400">{t.dampingLabel}</span>
              <span className="font-mono text-rose-400 font-bold">{damping === 0 ? t.conservativeZero : damping.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.2"
              step="0.01"
              value={damping}
              onChange={(e) => setDamping(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>

          {/* Planet Gravity Selector */}
          <div className="space-y-1.5 pt-2 border-t border-zinc-800">
            <label className="text-xs text-zinc-400">{t.gravityLabel}</label>
            <select
              value={selectedPlanet}
              onChange={(e) => setSelectedPlanet(e.target.value)}
              className="w-full p-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 focus:outline-none"
            >
              {PLANETS.map((p) => (
                <option key={p.id} value={p.id}>
                  {getPlanetName(p)} ({p.g} m/s²)
                </option>
              ))}
            </select>
          </div>

          {/* Log Measurement Button */}
          <button
            onClick={handleLog}
            className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
              logged
                ? 'bg-emerald-600 text-white shadow-emerald-900/40'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-900/30'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>{logged ? t.loggedMsg : t.logBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
