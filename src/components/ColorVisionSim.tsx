import React, { useState } from 'react';
import { Eye, Sparkles, RotateCcw } from 'lucide-react';
import { Language } from '../types';

interface ColorVisionSimProps {
  lang: Language;
}

export const ColorVisionSim: React.FC<ColorVisionSimProps> = ({ lang }) => {
  const [red, setRed] = useState<number>(255);
  const [green, setGreen] = useState<number>(180);
  const [blue, setBlue] = useState<number>(0);

  // RGB to perceived color hex
  const rgbString = `rgb(${red}, ${green}, ${blue})`;

  // Color name identification
  let colorName = 'مزيج مخصص (Custom RGB)';
  if (red > 200 && green > 200 && blue > 200) colorName = 'أبيض (White Light)';
  else if (red < 30 && green < 30 && blue < 30) colorName = 'أسود (عدم وجود ضوء)';
  else if (red > 200 && green > 200 && blue < 50) colorName = 'أصفر (Yellow = R + G)';
  else if (red < 50 && green > 200 && blue > 200) colorName = 'سماوي (Cyan = G + B)';
  else if (red > 200 && green < 50 && blue > 200) colorName = 'أرجواني (Magenta = R + B)';
  else if (red > 200 && green < 50 && blue < 50) colorName = 'أحمر نقي (Pure Red)';
  else if (red < 50 && green > 200 && blue < 50) colorName = 'أخضر نقي (Pure Green)';
  else if (red < 50 && green < 50 && blue > 200) colorName = 'أزرق نقي (Pure Blue)';

  const t = {
    ar: {
      title: 'رؤية الألوان والخلط الجمعي للضوء (RGB Additive Mixing)',
      redBeam: 'الكشاف الأحمر (R - 700 nm)',
      greenBeam: 'الكشاف الأخضر (G - 546 nm)',
      blueBeam: 'الكشاف الأزرق (B - 435 nm)',
      perceivedBrain: 'اللون المدرك في الدماغ البشري',
      cones: 'استجابة المخاريط البصرية في شبكية العين (L, M, S Cones)',
      reset: 'إعادة ضبط (أصفر)',
    },
    en: {
      title: 'Color Vision & Additive RGB Mixing',
      redBeam: 'Red Flashlight (R - 700 nm)',
      greenBeam: 'Green Flashlight (G - 546 nm)',
      blueBeam: 'Blue Flashlight (B - 435 nm)',
      perceivedBrain: 'Brain Perceived Color',
      cones: 'Retinal Cone Photoreceptors (L, M, S Cones)',
      reset: 'Reset to Yellow',
    },
    ku: {
      title: 'بینینی ڕەنگەکان و تێکەڵکردنی ڕووناکی RGB',
      redBeam: 'ڕووناکی سوور',
      greenBeam: 'ڕووناکی سەوز',
      blueBeam: 'ڕووناکی شین',
      perceivedBrain: 'ڕەنگی دەرکپێکراو لە مێشکدا',
      cones: 'وەڵامدانەوەی خانەکانی چاو',
      reset: 'ڕێکخستنەوە بۆ زەرد',
    },
    kmr: {
      title: 'Dîtina Rengan û Tevlihevkirina RGB',
      redBeam: 'Ronahiya Sor',
      greenBeam: 'Ronahiya Kesk',
      blueBeam: 'Ronahiya Şîn',
      perceivedBrain: 'Rengê di Mejî de Têgihiştî',
      cones: 'Hestiyarên Çavê Mirovan',
      reset: 'Nûkirin bo Zer',
    },
  }[lang];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-6 text-slate-100 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400">
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">{t.title}</h2>
            <p className="text-xs text-slate-400 font-mono">CLUSTER A • SIMULATION 7</p>
          </div>
        </div>

        <button
          onClick={() => {
            setRed(255);
            setGreen(180);
            setBlue(0);
          }}
          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg border border-slate-700 text-slate-300 transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {t.reset}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Mixing Stage */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center relative min-h-[320px] overflow-hidden">
          {/* Flashlight Beams Meeting in Center */}
          <div className="relative w-56 h-56 flex items-center justify-center">
            {/* Red spot */}
            <div
              style={{ opacity: red / 255 }}
              className="absolute -top-4 w-36 h-36 rounded-full bg-red-600 blur-xl mix-blend-screen"
            />
            {/* Green spot */}
            <div
              style={{ opacity: green / 255 }}
              className="absolute -bottom-4 -left-4 w-36 h-36 rounded-full bg-green-600 blur-xl mix-blend-screen"
            />
            {/* Blue spot */}
            <div
              style={{ opacity: blue / 255 }}
              className="absolute -bottom-4 -right-4 w-36 h-36 rounded-full bg-blue-600 blur-xl mix-blend-screen"
            />

            {/* Central Perception Display Disc */}
            <div
              style={{ backgroundColor: rgbString }}
              className="relative z-10 w-28 h-28 rounded-full border-4 border-slate-800 shadow-2xl transition-colors duration-150 flex items-center justify-center"
            />
          </div>

          <div className="mt-4 text-center">
            <span className="text-sm font-bold text-white block">{colorName}</span>
            <span className="text-xs font-mono text-slate-400">RGB({red}, {green}, {blue})</span>
          </div>
        </div>

        {/* Sliders & Retinal Cones */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-4">
            {/* Red */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-red-400">{t.redBeam}</span>
                <span className="font-mono text-white text-sm">{red}</span>
              </div>
              <input
                type="range"
                min="0"
                max="255"
                value={red}
                onChange={(e) => setRed(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
            </div>

            {/* Green */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-emerald-400">{t.greenBeam}</span>
                <span className="font-mono text-white text-sm">{green}</span>
              </div>
              <input
                type="range"
                min="0"
                max="255"
                value={green}
                onChange={(e) => setGreen(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Blue */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-sky-400">{t.blueBeam}</span>
                <span className="font-mono text-white text-sm">{blue}</span>
              </div>
              <input
                type="range"
                min="0"
                max="255"
                value={blue}
                onChange={(e) => setBlue(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>
          </div>

          <div className="p-3.5 bg-indigo-950/30 border border-indigo-500/30 rounded-xl text-xs text-indigo-200/90 space-y-1.5">
            <span className="font-bold text-indigo-300 block">{t.cones}:</span>
            <div className="space-y-1 text-[11px] font-mono">
              <div className="flex justify-between">
                <span>L-Cones (Red 560nm):</span>
                <span>{((red / 255) * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span>M-Cones (Green 530nm):</span>
                <span>{((green / 255) * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span>S-Cones (Blue 420nm):</span>
                <span>{((blue / 255) * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
