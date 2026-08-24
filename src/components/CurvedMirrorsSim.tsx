import React, { useState, useEffect, useRef } from 'react';
import { BookmarkCheck, Eye, Sparkles, Sliders, ArrowUpRight } from 'lucide-react';
import { Language, MeasurementRecord } from '../types';

interface Props {
  lang: Language;
  onLogMeasurement: (data: Omit<MeasurementRecord, 'id' | 'timestamp' | 'percentError'>) => void;
}

export default function CurvedMirrorsSim({ lang, onLogMeasurement }: Props) {
  // Parameters
  const [mirrorType, setMirrorType] = useState<'concave' | 'convex'>('concave');
  const [radiusCm, setRadiusCm] = useState<number>(40); // cm (Radius of curvature R)
  const [objectDistanceCm, setObjectDistanceCm] = useState<number>(50); // cm (do)
  const [objectHeightCm, setObjectHeightCm] = useState<number>(15); // cm (ho)
  const [showPrincipalRays, setShowPrincipalRays] = useState<boolean>(true);
  const [logged, setLogged] = useState<boolean>(false);

  // Geometric Optics Calculations
  // For Concave: f > 0, R > 0. For Convex: f < 0, R < 0
  const isConcave = mirrorType === 'concave';
  const focalLengthCm = isConcave ? radiusCm / 2 : -radiusCm / 2;

  // Mirror Equation: 1/f = 1/do + 1/di => di = (f * do) / (do - f)
  const denom = objectDistanceCm - focalLengthCm;
  const isAtFocus = Math.abs(denom) < 0.1;
  const imageDistanceCm = isAtFocus ? (denom >= 0 ? 9999 : -9999) : (focalLengthCm * objectDistanceCm) / denom;

  // Magnification m = - di / do
  const magnification = isAtFocus ? 999 : -imageDistanceCm / objectDistanceCm;
  const imageHeightCm = isAtFocus ? 999 : objectHeightCm * magnification;

  // Image Characteristics
  const isReal = imageDistanceCm > 0 && !isAtFocus;
  const isInverted = magnification < 0 && !isAtFocus;
  const isEnlarged = Math.abs(magnification) > 1.05 && !isAtFocus;
  const isReduced = Math.abs(magnification) < 0.95 && !isAtFocus;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Dark Background Grid
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

    // Optical Bench Coordinate System
    // Vertex V is at (vertexX, centerY)
    const vertexX = width * 0.58;
    const centerY = height * 0.52;
    const scale = 3.8; // pixels per cm

    // Draw Principal Axis
    ctx.strokeStyle = '#71717a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(20, centerY);
    ctx.lineTo(width - 20, centerY);
    ctx.stroke();

    // Key Optical Points:
    // Focus F
    const fPixelX = vertexX - focalLengthCm * scale;
    // Center of Curvature C
    const cPixelX = vertexX - (isConcave ? radiusCm : -radiusCm) * scale;

    // Draw Curved Mirror Surface (Arc)
    const mirrorH = 240;
    const mirrorRPx = radiusCm * scale;
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;
    ctx.beginPath();

    if (isConcave) {
      // Arc curves to the left from C
      ctx.arc(vertexX - mirrorRPx, centerY, mirrorRPx, -Math.asin(mirrorH / (2 * mirrorRPx)), Math.asin(mirrorH / (2 * mirrorRPx)));
    } else {
      // Arc curves to the right
      ctx.arc(vertexX + mirrorRPx, centerY, mirrorRPx, Math.PI - Math.asin(mirrorH / (2 * mirrorRPx)), Math.PI + Math.asin(mirrorH / (2 * mirrorRPx)));
    }
    ctx.stroke();

    // Mirror Backside Hatching
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1;
    for (let y = -mirrorH / 2; y <= mirrorH / 2; y += 16) {
      const my = centerY + y;
      const mx = vertexX + (isConcave ? 2 : -2);
      ctx.beginPath();
      ctx.moveTo(mx, my);
      ctx.lineTo(mx + (isConcave ? 8 : -8), my - 6);
      ctx.stroke();
    }

    // Draw Optical Points markers (V, F, C)
    // Vertex V
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(vertexX, centerY, 3.5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.font = 'bold 11px monospace';
    ctx.fillText('V', vertexX - 4, centerY + 18);

    // Focus F
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(fPixelX, centerY, 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillText(`F (${Math.abs(focalLengthCm).toFixed(0)}cm)`, fPixelX - 18, centerY + 18);

    // Center C
    ctx.fillStyle = '#a855f7';
    ctx.beginPath();
    ctx.arc(cPixelX, centerY, 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillText(`C (${radiusCm}cm)`, cPixelX - 15, centerY + 18);

    // Draw Object Arrow (Candle)
    const objPixelX = vertexX - objectDistanceCm * scale;
    const objPixelY = centerY - objectHeightCm * scale;

    ctx.strokeStyle = '#10b981';
    ctx.fillStyle = '#10b981';
    ctx.lineWidth = 3;
    // Arrow stem
    ctx.beginPath();
    ctx.moveTo(objPixelX, centerY);
    ctx.lineTo(objPixelX, objPixelY);
    ctx.stroke();
    // Arrow head
    ctx.beginPath();
    ctx.moveTo(objPixelX - 6, objPixelY + 10);
    ctx.lineTo(objPixelX, objPixelY);
    ctx.lineTo(objPixelX + 6, objPixelY + 10);
    ctx.fill();

    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(`Object (do=${objectDistanceCm}cm)`, objPixelX - 35, objPixelY - 10);

    // Draw Image Arrow
    if (!isAtFocus && Math.abs(imageDistanceCm) < 300) {
      const imgPixelX = vertexX - imageDistanceCm * scale;
      const imgPixelY = centerY - imageHeightCm * scale;

      ctx.strokeStyle = isReal ? '#ef4444' : '#c084fc';
      ctx.fillStyle = isReal ? '#ef4444' : '#c084fc';
      ctx.lineWidth = 2.5;

      if (!isReal) ctx.setLineDash([3, 3]);
      // Stem
      ctx.beginPath();
      ctx.moveTo(imgPixelX, centerY);
      ctx.lineTo(imgPixelX, imgPixelY);
      ctx.stroke();
      // Head
      const headDir = isInverted ? -1 : 1;
      ctx.beginPath();
      ctx.moveTo(imgPixelX - 5, imgPixelY + 8 * headDir);
      ctx.lineTo(imgPixelX, imgPixelY);
      ctx.lineTo(imgPixelX + 5, imgPixelY + 8 * headDir);
      ctx.fill();
      ctx.setLineDash([]);

      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(
        `Image (${isReal ? 'Real' : 'Virtual'}, di=${imageDistanceCm.toFixed(1)}cm)`,
        imgPixelX - 45,
        imgPixelY + (isInverted ? 20 : -10)
      );

      // --- PRINCIPAL RAY TRACING ---
      if (showPrincipalRays) {
        // Ray 1 (Red): Parallel to axis -> reflects through Focus F
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.2;
        // Incident parallel ray
        ctx.beginPath();
        ctx.moveTo(objPixelX, objPixelY);
        ctx.lineTo(vertexX, objPixelY);
        ctx.stroke();

        // Reflected Ray
        if (isConcave) {
          // Passes through F
          const slope = (centerY - objPixelY) / (fPixelX - vertexX);
          ctx.beginPath();
          ctx.moveTo(vertexX, objPixelY);
          ctx.lineTo(vertexX - 350, objPixelY - 350 * slope);
          ctx.stroke();

          // Virtual trace behind mirror if virtual
          if (!isReal) {
            ctx.setLineDash([3, 3]);
            ctx.beginPath();
            ctx.moveTo(vertexX, objPixelY);
            ctx.lineTo(imgPixelX, imgPixelY);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        } else {
          // Convex reflects diverging away from virtual Focus F
          const slope = (centerY - objPixelY) / (fPixelX - vertexX);
          ctx.beginPath();
          ctx.moveTo(vertexX, objPixelY);
          ctx.lineTo(vertexX - 250, objPixelY - 250 * slope);
          ctx.stroke();

          // Virtual dashed line to F
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(vertexX, objPixelY);
          ctx.lineTo(fPixelX, centerY);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Ray 2 (Yellow): Toward/Through Vertex V -> reflects symmetrically (θ_i = θ_r)
        ctx.strokeStyle = '#eab308';
        // Incident to V
        ctx.beginPath();
        ctx.moveTo(objPixelX, objPixelY);
        ctx.lineTo(vertexX, centerY);
        ctx.stroke();
        // Reflected symmetrically
        const vSlope = (centerY - objPixelY) / (vertexX - objPixelX);
        ctx.beginPath();
        ctx.moveTo(vertexX, centerY);
        ctx.lineTo(vertexX - 250, centerY + 250 * vSlope);
        ctx.stroke();

        // Virtual trace behind mirror
        if (!isReal) {
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(vertexX, centerY);
          ctx.lineTo(imgPixelX, imgPixelY);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }
    }

  }, [mirrorType, radiusCm, objectDistanceCm, objectHeightCm, showPrincipalRays, focalLengthCm, imageDistanceCm, imageHeightCm, isAtFocus, isReal, isInverted]);

  const handleLog = () => {
    onLogMeasurement({
      experiment: 'curved_mirrors',
      variableName: `Image Distance di (${mirrorType === 'concave' ? 'Concave' : 'Convex'})`,
      measuredValue: Number(imageDistanceCm.toFixed(2)),
      theoreticalValue: Number(imageDistanceCm.toFixed(2)),
      unit: 'cm',
      parameters: {
        'Mirror Type': mirrorType === 'concave' ? 'Concave (مقعرة)' : 'Convex (محدبة)',
        'Curvature Radius R': `${radiusCm} cm`,
        'Focal Length f': `${focalLengthCm.toFixed(1)} cm`,
        'Object Distance do': `${objectDistanceCm} cm`,
        'Object Height ho': `${objectHeightCm} cm`,
        'Magnification m': `${magnification.toFixed(3)}`,
        'Image Nature': isReal ? 'Real & Inverted (حقيقية ومقلوبة)' : 'Virtual & Upright (خيالية ومعتدلة)',
      },
      equation: `1/f = 1/do + 1/di => di = (f · do) / (do - f) = (${focalLengthCm} · ${objectDistanceCm}) / (${objectDistanceCm} - ${focalLengthCm}) = ${imageDistanceCm.toFixed(2)} cm, m = -di/do = ${magnification.toFixed(2)}`,
      notes: `Spherical curved mirror optics simulation with 3 principal reflection rays.`,
    });
    setLogged(true);
    setTimeout(() => setLogged(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-950/40 via-zinc-900 to-indigo-950/40 border border-sky-800/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
            <Eye className="w-5 h-5 text-sky-400" />
            <span>
              {lang === 'ar' ? 'المرايا الكروية المقعرة والمحدبة (Curved Spherical Mirrors)' : lang === 'ku' ? 'ئاوێنە گۆییە قۆقز و چاڵەکان و دروستبوونی وێنە' : 'Curved Spherical Mirrors (Ray Tracing)'}
            </span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
            {lang === 'ar'
              ? 'دراسة تكون الصور في المرايا الكروية بقانون 1/f = 1/do + 1/di، التكبير m = -di/do، ومسارات الأشعة النموذجية الثلاثة.'
              : lang === 'ku'
              ? 'لێکۆڵینەوە لە دروستبوونی وێنە لە ئاوێنە چاڵ و قۆقزەکان بە یاسای ١/f = ١/do + ١/di و گەورەکردن m = -di/do.'
              : 'Spherical mirror optics, mirror equation 1/f = 1/do + 1/di, magnification m = -di/do, and 3 principal ray diagrams.'}
          </p>
        </div>

        <button
          onClick={handleLog}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-md ${
            logged
              ? 'bg-emerald-600 text-white'
              : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/30'
          }`}
        >
          <BookmarkCheck className="w-4 h-4" />
          <span>{logged ? (lang === 'ar' ? 'تم التسجيل في الدفتر ✓' : 'Logged ✓') : (lang === 'ar' ? 'تسجيل في دفتر المختبر' : 'Log Measurement')}</span>
        </button>
      </div>

      {/* Main Grid: Controls + Interactive Optical Bench */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Panel */}
        <div className="lg:col-span-4 space-y-4 p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-sky-400" />
              {lang === 'ar' ? 'معايير المرآة والجسم' : 'Mirror & Object Controls'}
            </span>
          </div>

          {/* Mirror Type Radio Tabs */}
          <div>
            <label className="text-xs text-zinc-400 block mb-1.5 font-medium">
              {lang === 'ar' ? 'نوع المرآة الكروية:' : 'Mirror Type:'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMirrorType('concave')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                  mirrorType === 'concave'
                    ? 'bg-sky-600 text-white border-sky-500 shadow-md shadow-sky-600/30'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:bg-zinc-800'
                }`}
              >
                {lang === 'ar' ? 'مقعرة (Concave +f)' : 'Concave (+f)'}
              </button>
              <button
                onClick={() => setMirrorType('convex')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border ${
                  mirrorType === 'convex'
                    ? 'bg-sky-600 text-white border-sky-500 shadow-md shadow-sky-600/30'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:bg-zinc-800'
                }`}
              >
                {lang === 'ar' ? 'محدبة (Convex -f)' : 'Convex (-f)'}
              </button>
            </div>
          </div>

          {/* Radius of Curvature Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-400">{lang === 'ar' ? 'نصف قطر التكور (R):' : 'Radius of Curvature (R):'}</span>
              <span className="font-mono text-purple-400 font-semibold">{radiusCm} cm (f = {(focalLengthCm).toFixed(1)} cm)</span>
            </div>
            <input
              type="range"
              min="20"
              max="80"
              step="2"
              value={radiusCm}
              onChange={(e) => setRadiusCm(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          {/* Object Distance (do) Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-400">{lang === 'ar' ? 'بعد الجسم عن المرآة (do):' : 'Object Distance (do):'}</span>
              <span className="font-mono text-emerald-400 font-semibold">{objectDistanceCm} cm</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="1"
              value={objectDistanceCm}
              onChange={(e) => setObjectDistanceCm(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Object Height (ho) Slider */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-zinc-400">{lang === 'ar' ? 'طول الجسم (ho):' : 'Object Height (ho):'}</span>
              <span className="font-mono text-amber-400 font-semibold">{objectHeightCm} cm</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={objectHeightCm}
              onChange={(e) => setObjectHeightCm(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Principal Rays Toggle */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs">
            <span className="text-zinc-300">{lang === 'ar' ? 'إظهار الأشعة البصرية الثلاثة:' : 'Show 3 Principal Rays:'}</span>
            <input
              type="checkbox"
              checked={showPrincipalRays}
              onChange={(e) => setShowPrincipalRays(e.target.checked)}
              className="accent-sky-500 cursor-pointer w-4 h-4"
            />
          </div>

          {/* Image Nature State Card */}
          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
            <span className="text-[10px] text-zinc-400 uppercase font-semibold block">
              {lang === 'ar' ? 'طبيعة ومواصفات الصورة الناتجة:' : 'Image Characteristics:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              <span
                className={`px-2 py-0.5 rounded text-xs font-semibold ${
                  isReal ? 'bg-rose-500/20 text-rose-300' : 'bg-purple-500/20 text-purple-300'
                }`}
              >
                {isReal ? (lang === 'ar' ? 'حقيقية (Real)' : 'Real') : (lang === 'ar' ? 'خيالية (Virtual)' : 'Virtual')}
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-zinc-800 text-zinc-300">
                {isInverted ? (lang === 'ar' ? 'مقلوبة (Inverted)' : 'Inverted') : (lang === 'ar' ? 'معتدلة (Upright)' : 'Upright')}
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-zinc-800 text-zinc-300">
                {isEnlarged
                  ? (lang === 'ar' ? 'مكبرة (Enlarged)' : 'Enlarged')
                  : isReduced
                  ? (lang === 'ar' ? 'مصغرة (Reduced)' : 'Reduced')
                  : (lang === 'ar' ? 'مساوية للأصل' : 'Same Size')}
              </span>
            </div>
          </div>
        </div>

        {/* Canvas & Live Computed Metrics */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800">
            <canvas
              ref={canvasRef}
              width={680}
              height={380}
              className="w-full h-[380px] rounded-xl bg-zinc-950 block"
            />
          </div>

          {/* Computed Bento Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Focal Length */}
            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-400 uppercase font-semibold">
                {lang === 'ar' ? 'البعد البؤري (f)' : 'Focal Length (f = R/2)'}
              </span>
              <div className="text-xl font-bold font-mono text-purple-400">
                {focalLengthCm.toFixed(1)} <span className="text-xs text-zinc-400">cm</span>
              </div>
              <span className="text-[9px] text-zinc-500 font-mono">f = R / 2</span>
            </div>

            {/* Image Distance di */}
            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-400 uppercase font-semibold">
                {lang === 'ar' ? 'بعد الصورة (di)' : 'Image Distance (di)'}
              </span>
              <div className="text-xl font-bold font-mono text-sky-400">
                {isAtFocus ? '∞' : imageDistanceCm.toFixed(2)} <span className="text-xs text-zinc-400">cm</span>
              </div>
              <span className="text-[9px] text-zinc-500 font-mono">1/f = 1/do + 1/di</span>
            </div>

            {/* Magnification m */}
            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-400 uppercase font-semibold">
                {lang === 'ar' ? 'معامل التكبير (m)' : 'Magnification (m)'}
              </span>
              <div className="text-xl font-bold font-mono text-emerald-400">
                {isAtFocus ? '∞' : magnification.toFixed(3)}x
              </div>
              <span className="text-[9px] text-zinc-500 font-mono">m = -di / do</span>
            </div>

            {/* Image Height hi */}
            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1">
              <span className="text-[10px] text-zinc-400 uppercase font-semibold">
                {lang === 'ar' ? 'طول الصورة (hi)' : 'Image Height (hi)'}
              </span>
              <div className="text-xl font-bold font-mono text-amber-400">
                {isAtFocus ? '∞' : Math.abs(imageHeightCm).toFixed(2)} <span className="text-xs text-zinc-400">cm</span>
              </div>
              <span className="text-[9px] text-zinc-500 font-mono">hi = m · ho</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
