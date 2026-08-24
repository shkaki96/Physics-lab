import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, BookmarkCheck, Gauge, Zap, Disc, ArrowRight, Layers } from 'lucide-react';
import { Language, MeasurementRecord } from '../types';
import { TRANSLATIONS } from '../translations';

interface Props {
  lang: Language;
  onLogMeasurement: (data: Omit<MeasurementRecord, 'id' | 'timestamp' | 'percentError'>) => void;
}

type GeometryType = 'cylinder' | 'ring' | 'sphere' | 'rod_center' | 'rod_end';

export default function RotationalDynamicsSim({ lang, onLogMeasurement }: Props) {
  const [geometry, setGeometry] = useState<GeometryType>('cylinder');
  const [mode, setMode] = useState<'pulley' | 'incline'>('pulley');

  // Object Parameters
  const [objectMass, setObjectMass] = useState<number>(2.0); // kg (M)
  const [objectRadius, setObjectRadius] = useState<number>(0.3); // m (R or L/2)
  const [hangingMass, setHangingMass] = useState<number>(0.5); // kg (m) for pulley mode
  const [inclineAngle, setInclineAngle] = useState<number>(25); // degrees for incline mode
  const [gravity, setGravity] = useState<number>(9.81); // m/s^2

  // Simulation State
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logged, setLogged] = useState<boolean>(false);

  // Dynamic simulation variables (refs for 60fps loop)
  const angleRef = useRef<number>(0); // radians
  const omegaRef = useRef<number>(0); // rad/s
  const posRef = useRef<number>(0); // distance along incline or hanging height (m)
  const animFrameRef = useRef<number | null>(null);

  // Moment of Inertia calculation (I)
  const calculateInertia = (geo: GeometryType, M: number, R: number): { I: number; formula: string; factor: number } => {
    switch (geo) {
      case 'cylinder':
        return { I: 0.5 * M * R * R, formula: '½ M R²', factor: 0.5 };
      case 'ring':
        return { I: 1.0 * M * R * R, formula: 'M R²', factor: 1.0 };
      case 'sphere':
        return { I: 0.4 * M * R * R, formula: '⅖ M R²', factor: 0.4 };
      case 'rod_center':
        // R is half-length => L = 2R => I = 1/12 M (2R)^2 = 1/3 M R^2
        return { I: (1 / 3) * M * R * R, formula: '¹/₁₂ M L²', factor: 1 / 3 };
      case 'rod_end':
        // R is full length L => I = 1/3 M L^2
        return { I: (1 / 3) * M * R * R, formula: '⅓ M L²', factor: 1 / 3 };
      default:
        return { I: 0.5 * M * R * R, formula: '½ M R²', factor: 0.5 };
    }
  };

  const { I: momentOfInertia, formula: inertiaFormula, factor: inertiaFactor } = calculateInertia(geometry, objectMass, objectRadius);

  // Physics dynamic equations:
  // For Pulley:
  // Tension T = (m * g) / (1 + (m * R^2) / I)
  // Torque tau = T * R
  // Angular acceleration alpha = tau / I
  // Linear acceleration a = alpha * R
  const tension = (hangingMass * gravity) / (1 + (hangingMass * objectRadius * objectRadius) / momentOfInertia);
  const torque = tension * objectRadius;
  const angularAccPulley = torque / momentOfInertia;
  const linearAccPulley = angularAccPulley * objectRadius;

  // For Incline (Rolling without slipping):
  // a = (g * sin(theta)) / (1 + I / (M * R^2))
  const sinTheta = Math.sin((inclineAngle * Math.PI) / 180);
  const linearAccIncline = (gravity * sinTheta) / (1 + inertiaFactor);
  const angularAccIncline = linearAccIncline / objectRadius;

  const currentAlpha = mode === 'pulley' ? angularAccPulley : angularAccIncline;
  const currentLinearAcc = mode === 'pulley' ? linearAccPulley : linearAccIncline;

  const [metrics, setMetrics] = useState({
    angle: 0,
    omega: 0,
    linearPos: 0,
    linearVel: 0,
    rotKE: 0,
    transKE: 0,
    totalEnergy: 0,
    time: 0,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const resetSim = () => {
    setIsRunning(false);
    angleRef.current = 0;
    omegaRef.current = 0;
    posRef.current = 0;
    setMetrics({
      angle: 0,
      omega: 0,
      linearPos: 0,
      linearVel: 0,
      rotKE: 0,
      transKE: 0,
      totalEnergy: 0,
      time: 0,
    });
  };

  useEffect(() => {
    resetSim();
  }, [geometry, mode, objectMass, objectRadius, hangingMass, inclineAngle]);

  // Main 60FPS Physics Simulation Loop
  useEffect(() => {
    let lastTime = performance.now();
    let simTime = 0;

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.033);
      lastTime = now;

      if (isRunning) {
        simTime += dt;
        // Euler-Cromer integration
        omegaRef.current += currentAlpha * dt;
        angleRef.current += omegaRef.current * dt;
        posRef.current += omegaRef.current * objectRadius * dt;

        // Stop if reached limits (e.g. hanging mass hit floor or incline end)
        if (mode === 'pulley' && posRef.current > 2.2) {
          setIsRunning(false);
        }
        if (mode === 'incline' && posRef.current > 3.2) {
          setIsRunning(false);
        }

        const currentOmega = omegaRef.current;
        const currentV = currentOmega * objectRadius;
        const currentRotKE = 0.5 * momentOfInertia * currentOmega * currentOmega;
        const currentTransKE = mode === 'pulley' ? 0.5 * hangingMass * currentV * currentV : 0.5 * objectMass * currentV * currentV;

        setMetrics({
          angle: angleRef.current,
          omega: currentOmega,
          linearPos: posRef.current,
          linearVel: currentV,
          rotKE: currentRotKE,
          transKE: currentTransKE,
          totalEnergy: currentRotKE + currentTransKE,
          time: simTime,
        });
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isRunning, currentAlpha, objectRadius, momentOfInertia, mode, hangingMass, objectMass]);

  // Render on Canvas
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

    if (mode === 'pulley') {
      // Pulley Setup
      const pivotX = width * 0.4;
      const pivotY = height * 0.38;
      const rPix = Math.max(35, objectRadius * 180);

      // Support Stand
      ctx.beginPath();
      ctx.moveTo(pivotX, pivotY);
      ctx.lineTo(pivotX - 120, pivotY + 120);
      ctx.moveTo(pivotX, pivotY);
      ctx.lineTo(pivotX, 20);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Rotating Body (Disk / Ring / Sphere / Rod)
      ctx.save();
      ctx.translate(pivotX, pivotY);
      ctx.rotate(metrics.angle);

      if (geometry === 'cylinder') {
        // Solid Cylinder (filled gradient disk)
        const grad = ctx.createRadialGradient(0, 0, 5, 0, 0, rPix);
        grad.addColorStop(0, '#38bdf8');
        grad.addColorStop(1, '#0284c7');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, rPix, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#bae6fd';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (geometry === 'ring') {
        // Thin Ring (hollow)
        ctx.beginPath();
        ctx.arc(0, 0, rPix, 0, Math.PI * 2);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 14;
        ctx.stroke();
        // Inner rim
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (geometry === 'sphere') {
        // Solid Sphere shading
        const grad = ctx.createRadialGradient(-rPix * 0.3, -rPix * 0.3, 5, 0, 0, rPix);
        grad.addColorStop(0, '#a855f7');
        grad.addColorStop(0.7, '#7e22ce');
        grad.addColorStop(1, '#3b0764');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, rPix, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Rod
        ctx.fillStyle = '#10b981';
        ctx.fillRect(-rPix, -8, rPix * 2, 16);
        ctx.strokeStyle = '#6ee7b7';
        ctx.lineWidth = 2;
        ctx.strokeRect(-rPix, -8, rPix * 2, 16);
      }

      // Spokes / Pattern to clearly show rotation
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 2;
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 3) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(rPix * Math.cos(a), rPix * Math.sin(a));
        ctx.stroke();
      }

      // Center axle
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#f8fafc';
      ctx.fill();
      ctx.restore();

      // String wrapped around rim dropping down on right
      const stringX = pivotX + rPix;
      const stringStartY = pivotY;
      const stringLengthPix = 70 + metrics.linearPos * 80;
      const massY = stringStartY + stringLengthPix;

      ctx.beginPath();
      ctx.moveTo(stringX, stringStartY);
      ctx.lineTo(stringX, massY);
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Hanging Mass Block
      ctx.fillStyle = '#ef4444';
      ctx.strokeStyle = '#f87171';
      ctx.lineWidth = 2;
      ctx.fillRect(stringX - 18, massY, 36, 32);
      ctx.strokeRect(stringX - 18, massY, 36, 32);

      // Mass label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`m=${hangingMass}kg`, stringX, massY + 20);

      // Torque arrow on wheel
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, rPix + 15, -0.5, 1.2);
      ctx.stroke();
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(`τ = ${torque.toFixed(2)} N·m`, pivotX + rPix + 35, pivotY - 10);
    } else {
      // Incline Plane Rolling Mode
      const startX = 60;
      const startY = 100;
      const rampLen = 500;
      const radAngle = (inclineAngle * Math.PI) / 180;
      const endX = startX + rampLen * Math.cos(radAngle);
      const endY = startY + rampLen * Math.sin(radAngle);

      // Draw Triangular Wedge (Incline)
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.lineTo(startX, endY);
      ctx.closePath();
      ctx.fillStyle = 'rgba(30, 41, 59, 0.7)';
      ctx.fill();
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Angle indicator
      ctx.beginPath();
      ctx.arc(startX, endY, 45, 0, -radAngle, true);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#38bdf8';
      ctx.font = '11px sans-serif';
      ctx.fillText(`${inclineAngle}°`, startX + 55, endY - 10);

      // Rolling Object position along incline
      const rPix = Math.max(22, objectRadius * 120);
      const distPix = 30 + metrics.linearPos * 120;
      const objCenterX = startX + distPix * Math.cos(radAngle) - rPix * Math.sin(radAngle);
      const objCenterY = startY + distPix * Math.sin(radAngle) - rPix * Math.cos(radAngle);

      ctx.save();
      ctx.translate(objCenterX, objCenterY);
      ctx.rotate(metrics.angle);

      // Draw rolling body
      if (geometry === 'cylinder') {
        ctx.beginPath();
        ctx.arc(0, 0, rPix, 0, Math.PI * 2);
        ctx.fillStyle = '#0284c7';
        ctx.fill();
        ctx.strokeStyle = '#bae6fd';
        ctx.lineWidth = 2;
        ctx.stroke();
      } else if (geometry === 'ring') {
        ctx.beginPath();
        ctx.arc(0, 0, rPix, 0, Math.PI * 2);
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 10;
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, rPix, 0, Math.PI * 2);
        ctx.fillStyle = '#7e22ce';
        ctx.fill();
      }

      // Cross marker to see rolling
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-rPix, 0);
      ctx.lineTo(rPix, 0);
      ctx.moveTo(0, -rPix);
      ctx.lineTo(0, rPix);
      ctx.stroke();

      ctx.restore();
    }
  }, [geometry, mode, objectRadius, hangingMass, inclineAngle, metrics, torque, momentOfInertia]);

  const handleLog = () => {
    onLogMeasurement({
      experiment: 'rotational_dynamics',
      parameters: {
        geometry: geometry,
        mass: `${objectMass.toFixed(2)} kg`,
        radius: `${objectRadius.toFixed(2)} m`,
        formula: inertiaFormula,
        inertia: `${momentOfInertia.toFixed(4)} kg·m²`,
        mode: mode,
      },
      variableName: 'Moment of Inertia & Angular Acc',
      measuredValue: Number(momentOfInertia.toFixed(4)),
      theoreticalValue: Number(momentOfInertia.toFixed(4)),
      unit: 'kg·m²',
      equation: 'τ = I · α',
      notes: `Geo: ${geometry} (I=${inertiaFormula}), I=${momentOfInertia.toFixed(4)} kg·m², α=${currentAlpha.toFixed(2)} rad/s², τ=${torque.toFixed(2)} N·m`,
    });
    setLogged(true);
    setTimeout(() => setLogged(false), 2000);
  };

  return (
    <div id="rotational-dynamics-simulation" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Visual Canvas Area */}
      <div className="lg:col-span-2 space-y-4">
        <div className="relative rounded-2xl bg-zinc-900 border border-zinc-800 p-4 shadow-xl overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Disc className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-100">
                  {lang === 'ar' ? 'عزم القصور الذاتي والحركة الدورانية (τ = I α)' : lang === 'ku' ? 'زەبری سستی و جووڵەی خولانەوەیی (τ = I α)' : 'Moment of Inertia & Rotational Dynamics'}
                </h3>
                <p className="text-xs text-zinc-400 font-mono">
                  {inertiaFormula} • I = {momentOfInertia.toFixed(4)} kg·m² • τ = I · α
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
                <span>{isRunning ? (lang === 'ar' ? 'إيقاف' : 'Pause') : (lang === 'ar' ? 'تشغيل' : 'Start')}</span>
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
            <canvas ref={canvasRef} width={700} height={380} className="max-w-full h-auto" />
          </div>

          {/* Real-time Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/60 text-center">
              <div className="text-[11px] text-zinc-400">{lang === 'ar' ? 'عزم القصور الذاتي (I)' : 'Inertia (I)'}</div>
              <div className="text-base font-bold font-mono text-purple-400">
                {momentOfInertia.toFixed(4)} <span className="text-[10px] text-zinc-400">kg·m²</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/60 text-center">
              <div className="text-[11px] text-zinc-400">{lang === 'ar' ? 'التسارع الزاوي (α)' : 'Angular Acc (α)'}</div>
              <div className="text-base font-bold font-mono text-amber-400">
                {currentAlpha.toFixed(2)} <span className="text-[10px] text-zinc-400">rad/s²</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/60 text-center">
              <div className="text-[11px] text-zinc-400">{lang === 'ar' ? 'السرعة الزاوية (ω)' : 'Angular Vel (ω)'}</div>
              <div className="text-base font-bold font-mono text-sky-400">
                {metrics.omega.toFixed(2)} <span className="text-[10px] text-zinc-400">rad/s</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/60 text-center">
              <div className="text-[11px] text-zinc-400">{lang === 'ar' ? 'طاقة الحركة الدورانية (K_rot)' : 'Rotational KE'}</div>
              <div className="text-base font-bold font-mono text-emerald-400">
                {metrics.rotKE.toFixed(2)} <span className="text-[10px] text-zinc-400">J</span>
              </div>
            </div>
          </div>
        </div>

        {/* Theory Card */}
        <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-800/30 text-xs text-zinc-300 space-y-2">
          <div className="font-semibold text-purple-300 flex items-center gap-1.5">
            <Layers className="w-4 h-4" />
            <span>{lang === 'ar' ? 'مقارنة عزم القصور الذاتي للأشكال الهندسية المختلفة:' : 'Comparison of Moments of Inertia:'}</span>
          </div>
          <p>
            {lang === 'ar'
              ? 'تعتمد مقاومة الجسم للدوران (عزم القصور الذاتي I) على كتلته وكيفية توزيعها حول محور الدوران: الحلقة (I = MR²) تمتلك أكبر عزم قصور لأن كل كتلتها عند أقصى بعد، بينما الأسطوانة المصمتة (I = ½MR²) والكرة المصمتة (I = ⅖MR²) تدور بتسارع أكبر لنفس عزم التدوير.'
              : 'Resistance to rotation (Moment of Inertia I) depends on mass distribution: Thin Ring (I = MR²) has maximum inertia, whereas Solid Cylinder (I = 0.5 MR²) and Solid Sphere (I = 0.4 MR²) rotate faster under the same torque.'}
          </p>
        </div>
      </div>

      {/* Control Panel */}
      <div className="space-y-4">
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 shadow-xl space-y-5">
          <h4 className="text-sm font-bold text-zinc-200 pb-2 border-b border-zinc-800">
            {lang === 'ar' ? 'الشكل الهندسي ونظام التجربة' : 'Geometry & Mode Selection'}
          </h4>

          {/* Mode Selector */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => setMode('pulley')}
              className={`p-2.5 rounded-xl font-semibold transition-all border ${
                mode === 'pulley'
                  ? 'bg-zinc-800 text-sky-400 border-sky-500/50 shadow-md'
                  : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:bg-zinc-800/50'
              }`}
            >
              {lang === 'ar' ? 'عزم بكتلة معلقة' : 'Pulley & Torque'}
            </button>
            <button
              onClick={() => setMode('incline')}
              className={`p-2.5 rounded-xl font-semibold transition-all border ${
                mode === 'incline'
                  ? 'bg-zinc-800 text-sky-400 border-sky-500/50 shadow-md'
                  : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:bg-zinc-800/50'
              }`}
            >
              {lang === 'ar' ? 'دحرجة على منحدر' : 'Incline Rolling'}
            </button>
          </div>

          {/* Geometry Selector */}
          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400">{lang === 'ar' ? 'الشكل الهندسي للجسم الدوار:' : 'Rotating Body Geometry:'}</label>
            <div className="grid grid-cols-1 gap-1.5 text-xs">
              <button
                onClick={() => setGeometry('cylinder')}
                className={`p-2 rounded-xl text-start font-mono flex items-center justify-between border ${
                  geometry === 'cylinder' ? 'bg-sky-950/40 text-sky-300 border-sky-500/50' : 'bg-zinc-950 text-zinc-400 border-zinc-850'
                }`}
              >
                <span>{lang === 'ar' ? 'أسطوانة مصمتة / قرص' : 'Solid Cylinder / Disk'}</span>
                <span className="font-bold text-sky-400">½ M R²</span>
              </button>

              <button
                onClick={() => setGeometry('ring')}
                className={`p-2 rounded-xl text-start font-mono flex items-center justify-between border ${
                  geometry === 'ring' ? 'bg-amber-950/40 text-amber-300 border-amber-500/50' : 'bg-zinc-950 text-zinc-400 border-zinc-850'
                }`}
              >
                <span>{lang === 'ar' ? 'حلقة دائرية رقيقة (Hoop)' : 'Thin Ring / Hoop'}</span>
                <span className="font-bold text-amber-400">M R²</span>
              </button>

              <button
                onClick={() => setGeometry('sphere')}
                className={`p-2 rounded-xl text-start font-mono flex items-center justify-between border ${
                  geometry === 'sphere' ? 'bg-purple-950/40 text-purple-300 border-purple-500/50' : 'bg-zinc-950 text-zinc-400 border-zinc-850'
                }`}
              >
                <span>{lang === 'ar' ? 'كرة مصمتة (Solid Sphere)' : 'Solid Sphere'}</span>
                <span className="font-bold text-purple-400">⅖ M R²</span>
              </button>

              <button
                onClick={() => setGeometry('rod_center')}
                className={`p-2 rounded-xl text-start font-mono flex items-center justify-between border ${
                  geometry === 'rod_center' ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/50' : 'bg-zinc-950 text-zinc-400 border-zinc-850'
                }`}
              >
                <span>{lang === 'ar' ? 'ساق رفيعة (محور المركز)' : 'Thin Rod (Center)'}</span>
                <span className="font-bold text-emerald-400">¹/₁₂ M L²</span>
              </button>
            </div>
          </div>

          {/* Mass and Radius Controls */}
          <div className="space-y-3 pt-2 border-t border-zinc-800">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-400">{lang === 'ar' ? 'كتلة الجسم الدوار (M)' : 'Object Mass (M)'}</span>
                <span className="font-mono text-zinc-200 font-bold">{objectMass.toFixed(1)} kg</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="10.0"
                step="0.5"
                value={objectMass}
                onChange={(e) => setObjectMass(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-400">{lang === 'ar' ? 'نصف قطر الجسم (R)' : 'Object Radius (R)'}</span>
                <span className="font-mono text-zinc-200 font-bold">{objectRadius.toFixed(2)} m</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.6"
                step="0.05"
                value={objectRadius}
                onChange={(e) => setObjectRadius(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            {mode === 'pulley' ? (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">{lang === 'ar' ? 'الكتلة المعلقة المولدة للعزم (m)' : 'Hanging Mass (m)'}</span>
                  <span className="font-mono text-red-400 font-bold">{hangingMass.toFixed(2)} kg</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="3.0"
                  step="0.1"
                  value={hangingMass}
                  onChange={(e) => setHangingMass(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-red-500"
                />
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">{lang === 'ar' ? 'زاوية المنحدر (θ)' : 'Incline Angle (θ)'}</span>
                  <span className="font-mono text-sky-400 font-bold">{inclineAngle}°</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="1"
                  value={inclineAngle}
                  onChange={(e) => setInclineAngle(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
              </div>
            )}
          </div>

          {/* Log Measurement Button */}
          <button
            onClick={handleLog}
            className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
              logged
                ? 'bg-emerald-600 text-white shadow-emerald-900/40'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-900/30'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>
              {logged
                ? (lang === 'ar' ? 'تم تسجيل القياس في دفتر المختبر!' : 'Logged to Lab Notebook!')
                : (lang === 'ar' ? 'تسجيل عزم القصور والتسارع' : 'Log Inertia & Acceleration')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
