import React, { useState } from 'react';
import { BookmarkCheck, ArrowRightLeft, Scale, Sparkles, Hash, Layers } from 'lucide-react';
import { Language, MeasurementRecord } from '../types';

interface Props {
  lang: Language;
  onLogMeasurement: (data: Omit<MeasurementRecord, 'id' | 'timestamp' | 'percentError'>) => void;
}

interface PrefixDef {
  nameAr: string;
  nameEn: string;
  nameKu: string;
  symbol: string;
  factor: number; // exponent 10^factor
  exampleAr: string;
  exampleEn: string;
}

const PREFIXES: PrefixDef[] = [
  { nameAr: 'تيرا (Tera)', nameEn: 'Tera', nameKu: 'تێرا (Tera)', symbol: 'T', factor: 12, exampleAr: 'سعة القرص الصلب (1 TB)', exampleEn: 'Hard drive capacity (1 TB)' },
  { nameAr: 'جيجا (Giga)', nameEn: 'Giga', nameKu: 'گیگا (Giga)', symbol: 'G', factor: 9, exampleAr: 'تردد المعالجات (3 GHz)', exampleEn: 'CPU frequency (3 GHz)' },
  { nameAr: 'ميجا (Mega)', nameEn: 'Mega', nameKu: 'مێگا (Mega)', symbol: 'M', factor: 6, exampleAr: 'محطات توليد الطاقة (50 MW)', exampleEn: 'Power plant output (50 MW)' },
  { nameAr: 'كيلو (Kilo)', nameEn: 'Kilo', nameKu: 'کیلۆ (Kilo)', symbol: 'k', factor: 3, exampleAr: 'المسافة بين المدن (1 km = 1000 m)', exampleEn: 'Distance (1 km = 1000 m)' },
  { nameAr: 'هيكتو (Hecto)', nameEn: 'Hecto', nameKu: 'هێکتۆ (Hecto)', symbol: 'h', factor: 2, exampleAr: 'الضغط الجوي (1 hPa = 100 Pa)', exampleEn: 'Pressure (1 hPa = 100 Pa)' },
  { nameAr: 'ديكا (Deca)', nameEn: 'Deca', nameKu: 'دیکا (Deca)', symbol: 'da', factor: 1, exampleAr: '1 dam = 10 m', exampleEn: '1 dam = 10 m' },
  { nameAr: 'الوحدة الأساسية (Base)', nameEn: 'Base Unit', nameKu: 'یەکەی بنەڕەتی', symbol: '-', factor: 0, exampleAr: 'متر (m), جرام (g), ثانية (s), جول (J)', exampleEn: 'Meter (m), Gram (g), Second (s), Joule (J)' },
  { nameAr: 'ديسي (Deci)', nameEn: 'Deci', nameKu: 'دێسی (Deci)', symbol: 'd', factor: -1, exampleAr: '1 dm = 0.1 m', exampleEn: '1 dm = 0.1 m' },
  { nameAr: 'سنتي (Centi)', nameEn: 'Centi', nameKu: 'سەنتی (Centi)', symbol: 'c', factor: -2, exampleAr: 'مسطرة القياس (1 cm = 0.01 m)', exampleEn: 'Ruler scale (1 cm = 0.01 m)' },
  { nameAr: 'مللي (Milli)', nameEn: 'Milli', nameKu: 'میلی (Milli)', symbol: 'm', factor: -3, exampleAr: 'سُمك بطاقة (1 mm = 0.001 m)', exampleEn: 'Card thickness (1 mm = 0.001 m)' },
  { nameAr: 'ميكرو (Micro)', nameEn: 'Micro', nameKu: 'مایکرۆ (Micro)', symbol: 'μ', factor: -6, exampleAr: 'حجم خلية الدم (7 μm)', exampleEn: 'Red blood cell size (7 μm)' },
  { nameAr: 'نانو (Nano)', nameEn: 'Nano', nameKu: 'نانۆ (Nano)', symbol: 'n', factor: -9, exampleAr: 'الطول الموجي للضوء (500 nm)', exampleEn: 'Light wavelength (500 nm)' },
  { nameAr: 'بيكو (Pico)', nameEn: 'Pico', nameKu: 'پیکۆ (Pico)', symbol: 'p', factor: -12, exampleAr: 'نصف قطر الذرة (100 pm)', exampleEn: 'Atomic radius (100 pm)' },
  { nameAr: 'فيمتو (Femto)', nameEn: 'Femto', nameKu: 'فێمتۆ (Femto)', symbol: 'f', factor: -15, exampleAr: 'حجم النواة الذرية (1 fm)', exampleEn: 'Atomic nucleus size (1 fm)' },
];

const BASE_UNITS = [
  { id: 'm', nameAr: 'متر (m) - الطول', nameEn: 'Meter (m) - Length', nameKu: 'مەتر (m) - درێژی', symbol: 'm' },
  { id: 'g', nameAr: 'جرام (g) - الكتلة', nameEn: 'Gram (g) - Mass', nameKu: 'گرام (g) - بارستە', symbol: 'g' },
  { id: 's', nameAr: 'ثانية (s) - الزمن', nameEn: 'Second (s) - Time', nameKu: 'چرکە (s) - کات', symbol: 's' },
  { id: 'Hz', nameAr: 'هيرتز (Hz) - التردد', nameEn: 'Hertz (Hz) - Frequency', nameKu: 'هێرتز (Hz) - فریکوێنسی', symbol: 'Hz' },
  { id: 'J', nameAr: 'جول (J) - الطاقة', nameEn: 'Joule (J) - Energy', nameKu: 'جوول (J) - وزە', symbol: 'J' },
  { id: 'W', nameAr: 'واط (W) - القدرة', nameEn: 'Watt (W) - Power', nameKu: 'وات (W) - توان', symbol: 'W' },
  { id: 'V', nameAr: 'فولت (V) - الجهد', nameEn: 'Volt (V) - Voltage', nameKu: 'ڤۆڵت (V) - ڤۆڵتیە', symbol: 'V' },
  { id: 'A', nameAr: 'أمبير (A) - التيار', nameEn: 'Ampere (A) - Current', nameKu: 'ئەمپێر (A) - تەزوو', symbol: 'A' },
  { id: 'F', nameAr: 'فاراد (F) - السعة', nameEn: 'Farad (F) - Capacitance', nameKu: 'فاراد (F) - بارگەگری', symbol: 'F' },
  { id: 'Pa', nameAr: 'باسكال (Pa) - الضغط', nameEn: 'Pascal (Pa) - Pressure', nameKu: 'پاسکال (Pa) - پەستان', symbol: 'Pa' },
];

export default function MetricPrefixesSim({ lang, onLogMeasurement }: Props) {
  const [inputValue, setInputValue] = useState<number>(1000);
  const [fromPrefixIdx, setFromPrefixIdx] = useState<number>(6); // Base unit default
  const [toPrefixIdx, setToPrefixIdx] = useState<number>(3); // Kilo default
  const [selectedUnitIdx, setSelectedUnitIdx] = useState<number>(0); // Meter default
  const [logged, setLogged] = useState<boolean>(false);

  const fromPrefix = PREFIXES[fromPrefixIdx];
  const toPrefix = PREFIXES[toPrefixIdx];
  const baseUnit = BASE_UNITS[selectedUnitIdx];

  // Calculation: Value_in_base = inputValue * 10^(fromFactor)
  // Result_value = Value_in_base / 10^(toFactor) = inputValue * 10^(fromFactor - toFactor)
  const powerDiff = fromPrefix.factor - toPrefix.factor;
  const multiplier = Math.pow(10, powerDiff);
  const convertedValue = inputValue * multiplier;

  const handleSwap = () => {
    const temp = fromPrefixIdx;
    setFromPrefixIdx(toPrefixIdx);
    setToPrefixIdx(temp);
  };

  const handleLog = () => {
    const fromSymbol = fromPrefix.factor === 0 ? baseUnit.symbol : `${fromPrefix.symbol}${baseUnit.symbol}`;
    const toSymbol = toPrefix.factor === 0 ? baseUnit.symbol : `${toPrefix.symbol}${baseUnit.symbol}`;

    onLogMeasurement({
      experiment: 'metric_prefixes',
      variableName: `Prefix Conversion (${fromSymbol} → ${toSymbol})`,
      measuredValue: convertedValue,
      theoreticalValue: convertedValue,
      unit: toSymbol,
      parameters: {
        'Input Value': inputValue,
        'From Unit': fromSymbol,
        'To Unit': toSymbol,
        'Base Unit': baseUnit.symbol,
        'Power Factor Difference': `10^(${powerDiff})`,
      },
      equation: `V_target = V_source × 10^(${fromPrefix.factor} - ${toPrefix.factor}) = ${inputValue} × 10^(${powerDiff}) = ${convertedValue.toExponential(4)}`,
      notes: `Conversion between metric prefixes in physics. Factor: 10^(${powerDiff})`,
    });
    setLogged(true);
    setTimeout(() => setLogged(false), 2000);
  };

  const formatScientific = (num: number) => {
    if (num === 0) return '0';
    if (Math.abs(num) >= 1e6 || (Math.abs(num) < 0.001 && Math.abs(num) > 0)) {
      return num.toExponential(4);
    }
    return num.toLocaleString(undefined, { maximumFractionDigits: 6 });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-950/40 via-zinc-900 to-indigo-950/40 border border-sky-800/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-zinc-100 flex items-center gap-2">
            <Scale className="w-5 h-5 text-sky-400" />
            <span>
              {lang === 'ar' ? 'البادئات المترية وتحويل الوحدات الفيزيائية' : lang === 'ku' ? 'پێشگرە مەترییەکان و گۆڕینی یەکە فیزیاییەکان' : 'Metric Prefixes & Physical Unit Conversion'}
            </span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
            {lang === 'ar'
              ? 'التحويل المنهجي بين مضاعفات وأجزاء الوحدات القياسية (SI) باستخدام قوى العدد 10 والقانون العام V_new = V_old × 10^(n1 - n2).'
              : lang === 'ku'
              ? 'گۆڕینی ڕێکوپێکی نێوان کەرتبووەکان و دوانەبووەکانی یەکەکانی سیستەمی نێودەوڵەتی SI بە بەکارهێنانی هێزەکانی ١٠.'
              : 'Systematic conversion across SI decimal prefixes using power of ten formulation V_new = V_old × 10^(n1 - n2).'}
          </p>
        </div>

        <button
          onClick={handleLog}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-md ${
            logged
              ? 'bg-emerald-600 text-white'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
          }`}
        >
          <BookmarkCheck className="w-4 h-4" />
          <span>{logged ? (lang === 'ar' ? 'تم التسجيل في الدفتر ✓' : 'Logged ✓') : (lang === 'ar' ? 'تسجيل في دفتر المختبر' : 'Log Measurement')}</span>
        </button>
      </div>

      {/* Main Grid: Interactive Converter + Visual Scale */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Converter Panel */}
        <div className="lg:col-span-6 space-y-4 p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
              <ArrowRightLeft className="w-4 h-4 text-sky-400" />
              {lang === 'ar' ? 'لوحة تحويل الوحدات والبادئات' : lang === 'ku' ? 'تەختەی گۆڕینی پێشگرەکان' : 'Unit & Prefix Conversion Panel'}
            </span>
            {/* Base Unit Selector */}
            <select
              value={selectedUnitIdx}
              onChange={(e) => setSelectedUnitIdx(Number(e.target.value))}
              className="bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-sky-500"
            >
              {BASE_UNITS.map((u, i) => (
                <option key={u.id} value={i}>
                  {lang === 'ar' ? u.nameAr : lang === 'ku' ? u.nameKu : u.nameEn}
                </option>
              ))}
            </select>
          </div>

          {/* Input Value */}
          <div>
            <label className="text-xs text-zinc-400 block mb-1.5 font-medium">
              {lang === 'ar' ? 'القيمة العددية المراد تحويلها:' : lang === 'ku' ? 'بەهای ژمارەیی بۆ گۆڕین:' : 'Input Numerical Value:'}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(Number(e.target.value))}
                className="flex-1 px-3 py-2 text-sm rounded-xl bg-zinc-950 border border-zinc-700 text-zinc-100 focus:outline-none focus:border-indigo-500 font-mono"
              />
              <span className="text-xs font-mono text-zinc-400 px-2 py-2 bg-zinc-800/80 rounded-lg">
                {fromPrefix.factor === 0 ? baseUnit.symbol : `${fromPrefix.symbol}${baseUnit.symbol}`}
              </span>
            </div>
          </div>

          {/* From and To Selector Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
            {/* From Prefix */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-zinc-400 font-medium">
                {lang === 'ar' ? 'من البادئة المصدر (From):' : 'From Prefix:'}
              </span>
              <select
                value={fromPrefixIdx}
                onChange={(e) => setFromPrefixIdx(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-700 text-xs text-zinc-200 rounded-xl p-2.5 focus:outline-none focus:border-indigo-500 font-mono"
              >
                {PREFIXES.map((p, idx) => (
                  <option key={`from-${p.nameEn}`} value={idx}>
                    {p.symbol !== '-' ? `${p.symbol} - ` : ''}
                    {lang === 'ar' ? p.nameAr : lang === 'ku' ? p.nameKu : p.nameEn} (10^{p.factor})
                  </option>
                ))}
              </select>
            </div>

            {/* To Prefix */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-zinc-400 font-medium">
                  {lang === 'ar' ? 'إلى البادئة الهدف (To):' : 'To Target Prefix:'}
                </span>
                <button
                  onClick={handleSwap}
                  className="text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 underline"
                >
                  <ArrowRightLeft className="w-3 h-3" />
                  {lang === 'ar' ? 'تبديل' : 'Swap'}
                </button>
              </div>
              <select
                value={toPrefixIdx}
                onChange={(e) => setToPrefixIdx(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-700 text-xs text-zinc-200 rounded-xl p-2.5 focus:outline-none focus:border-indigo-500 font-mono"
              >
                {PREFIXES.map((p, idx) => (
                  <option key={`to-${p.nameEn}`} value={idx}>
                    {p.symbol !== '-' ? `${p.symbol} - ` : ''}
                    {lang === 'ar' ? p.nameAr : lang === 'ku' ? p.nameKu : p.nameEn} (10^{p.factor})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div>
            <span className="text-[10px] text-zinc-400 block mb-1.5">
              {lang === 'ar' ? 'أمثلة فيزيائية شائعة وسريعة:' : 'Quick Physics Presets:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: '1 km → m', val: 1, from: 3, to: 6, unit: 0 },
                { label: '500 nm → m', val: 500, from: 11, to: 6, unit: 0 },
                { label: '2.5 GHz → Hz', val: 2.5, from: 1, to: 6, unit: 3 },
                { label: '4500 J → kJ', val: 4500, from: 6, to: 3, unit: 4 },
                { label: '100 μF → F', val: 100, from: 10, to: 6, unit: 8 },
                { label: '1.2 MW → W', val: 1.2, from: 2, to: 6, unit: 5 },
              ].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputValue(preset.val);
                    setFromPrefixIdx(preset.from);
                    setToPrefixIdx(preset.to);
                    setSelectedUnitIdx(preset.unit);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] font-mono border border-zinc-700/60"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Conversion Result Display Card */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/40 via-zinc-900 to-sky-950/40 border border-indigo-700/50 space-y-2">
            <span className="text-[11px] font-semibold text-indigo-300 uppercase tracking-wider block">
              {lang === 'ar' ? 'النتيجة المحسوبة الدقيقة:' : 'Calculated Conversion Result:'}
            </span>
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                {formatScientific(convertedValue)}
              </span>
              <span className="text-sm sm:text-base font-semibold text-zinc-200">
                {toPrefix.factor === 0 ? baseUnit.symbol : `${toPrefix.symbol}${baseUnit.symbol}`}
              </span>
            </div>

            {/* Step-by-step formula breakdown */}
            <div className="pt-2 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-300 space-y-1">
              <div>
                <span className="text-zinc-400">{lang === 'ar' ? 'معادلة التحويل:' : 'Equation:'} </span>
                <span>
                  {inputValue} × 10<sup>{fromPrefix.factor}</sup> ÷ 10<sup>{toPrefix.factor}</sup> = {inputValue} × 10<sup>{powerDiff}</sup>
                </span>
              </div>
              <div>
                <span className="text-zinc-400">{lang === 'ar' ? 'بالصيغة العلمية:' : 'Scientific Form:'} </span>
                <span className="text-sky-300">{convertedValue.toExponential(6)} {toPrefix.factor === 0 ? baseUnit.symbol : `${toPrefix.symbol}${baseUnit.symbol}`}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SI Metric Hierarchy Scale Visualizer */}
        <div className="lg:col-span-6 space-y-4 p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <span className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-400" />
              {lang === 'ar' ? 'سلم المراتب والبادئات المترية (10^n)' : lang === 'ku' ? 'پەیژەی پێشگرە مەترییەکان (10^n)' : 'SI Prefix Magnitude Scale (10^n)'}
            </span>
            <span className="text-[10px] text-zinc-400 font-mono">10^12 → 10^-15</span>
          </div>

          <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
            {PREFIXES.map((p, idx) => {
              const isFrom = idx === fromPrefixIdx;
              const isTo = idx === toPrefixIdx;
              const isBase = p.factor === 0;

              return (
                <div
                  key={p.nameEn}
                  onClick={() => setToPrefixIdx(idx)}
                  className={`p-2.5 rounded-xl text-xs flex items-center justify-between cursor-pointer transition-all border ${
                    isFrom && isTo
                      ? 'bg-purple-950/60 border-purple-500 ring-1 ring-purple-400'
                      : isFrom
                      ? 'bg-sky-950/60 border-sky-500 ring-1 ring-sky-400'
                      : isTo
                      ? 'bg-emerald-950/60 border-emerald-500 ring-1 ring-emerald-400'
                      : isBase
                      ? 'bg-zinc-800/90 border-zinc-600 font-semibold'
                      : 'bg-zinc-950/60 border-zinc-800/80 hover:bg-zinc-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                        isBase ? 'bg-amber-500/20 text-amber-300' : 'bg-zinc-800 text-zinc-200'
                      }`}
                    >
                      {p.symbol}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-zinc-200">
                          {lang === 'ar' ? p.nameAr : lang === 'ku' ? p.nameKu : p.nameEn}
                        </span>
                        {isFrom && (
                          <span className="px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 text-[9px] font-mono">
                            {lang === 'ar' ? 'المصدر' : 'FROM'}
                          </span>
                        )}
                        {isTo && (
                          <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-mono">
                            {lang === 'ar' ? 'الهدف' : 'TO'}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-zinc-400 block">
                        {lang === 'ar' ? p.exampleAr : p.exampleEn}
                      </span>
                    </div>
                  </div>

                  <span className="font-mono text-zinc-400 font-bold">
                    10<sup>{p.factor}</sup>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
