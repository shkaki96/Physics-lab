/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  BookOpen,
  FileSpreadsheet,
  Award,
  Calculator,
  Activity,
  Layers,
  Compass,
  Zap,
  Eye,
  Waves,
  ArrowDownToDot,
  Binary,
  Flame,
  Scale,
  CircleDot,
  RotateCw,
  Target,
  Magnet,
  Volume2,
  Droplets,
  Search,
  Atom,
  Shield,
  Sun,
  Battery,
  Orbit,
  Glasses,
  Sliders,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Info,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Play,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Home,
  X,
  Filter,
  Radio,
  Radiation
} from 'lucide-react';
import { Language, ExperimentType, MeasurementRecord } from './types';
import { TRANSLATIONS } from './translations';

// 36 Classic Simulations
import PendulumSim from './components/PendulumSim';
import ProjectileSim from './components/ProjectileSim';
import CircuitSim from './components/CircuitSim';
import OpticsSim from './components/OpticsSim';
import FreeFallSim from './components/FreeFallSim';
import WavesSim from './components/WavesSim';
import SpringSim from './components/SpringSim';
import BuoyancySim from './components/BuoyancySim';
import CollisionSim from './components/CollisionSim';
import ThermodynamicsSim from './components/ThermodynamicsSim';
import ArcLengthSim from './components/ArcLengthSim';
import RotationalDynamicsSim from './components/RotationalDynamicsSim';
import CenterOfMassSim from './components/CenterOfMassSim';
import PendulumEnergySim from './components/PendulumEnergySim';
import AcousticResonanceSim from './components/AcousticResonanceSim';
import SoundSpeedSim from './components/SoundSpeedSim';
import MagneticFieldSim from './components/MagneticFieldSim';
import AtomicSpectraSim from './components/AtomicSpectraSim';
import MetricPrefixesSim from './components/MetricPrefixesSim';
import StressStrainSim from './components/StressStrainSim';
import BernoulliSim from './components/BernoulliSim';
import AngledMirrorsSim from './components/AngledMirrorsSim';
import CurvedMirrorsSim from './components/CurvedMirrorsSim';
import ThinLensesSim from './components/ThinLensesSim';
import PolarizationSim from './components/PolarizationSim';
import LightScatteringSim from './components/LightScatteringSim';
import WorkHeatSim from './components/WorkHeatSim';
import PrescriptionGlassesSim from './components/PrescriptionGlassesSim';
import PeriscopeSim from './components/PeriscopeSim';
import StaticBalloonsSim from './components/StaticBalloonsSim';
import SledFrictionSim from './components/SledFrictionSim';
import HeatConductionSim from './components/HeatConductionSim';
import SeesawTorqueSim from './components/SeesawTorqueSim';
import ElectromagneticInductionSim from './components/ElectromagneticInductionSim';
import ViscosityStokesSim from './components/ViscosityStokesSim';
import RampMachineSim from './components/RampMachineSim';

// Extended & Newly Added Specialized Simulations (53-65)
import { BuildAtomSim } from './components/BuildAtomSim';
import { BuildNucleusSim } from './components/BuildNucleusSim';
import { RutherfordScatteringSim } from './components/RutherfordScatteringSim';
import { BlackbodySim } from './components/BlackbodySim';
import { MoleculesLightSim } from './components/MoleculesLightSim';
import { ColorVisionSim } from './components/ColorVisionSim';
import { CapacitorSim } from './components/CapacitorSim';
import { ChargesFieldsSim } from './components/ChargesFieldsSim';
import { WireResistanceSim } from './components/WireResistanceSim';
import { GravityOrbitsSim } from './components/GravityOrbitsSim';
import { KeplerLawsSim } from './components/KeplerLawsSim';
import { EnergySkateParkSim } from './components/EnergySkateParkSim';
import { FourierWavesSim } from './components/FourierWavesSim';
import { WaveOnStringSim } from './components/WaveOnStringSim';
import { StatesOfMatterSim } from './components/StatesOfMatterSim';
import { DiffusionSim } from './components/DiffusionSim';
import ElectromagnetSim from './components/ElectromagnetSim';
import GravityForceSim from './components/GravityForceSim';
import ForcesMotionSim from './components/ForcesMotionSim';
import NormalModesSim from './components/NormalModesSim';

// 5 New Physics Experiments (IDs 66 to 70)
import DopplerEffectSim from './components/DopplerEffectSim';
import ElectricalTransformerSim from './components/ElectricalTransformerSim';
import PhotoelectricEffectSim from './components/PhotoelectricEffectSim';
import RadioactiveDecaySim from './components/RadioactiveDecaySim';
import CalorimetrySim from './components/CalorimetrySim';

// Additional UI Tabs & Tools
import LabNotebook from './components/LabNotebook';
import FormulaSheet from './components/FormulaSheet';
import { PhysicsEquationKeyboard } from './components/PhysicsEquationKeyboard';
import LabQuiz from './components/LabQuiz';
import LabToolsModal from './components/LabToolsModal';
import LanguageSelector from './components/LanguageSelector';
import KurdishSun21 from './components/KurdishSun21';

export type CategoryFilter = 
  | 'all'
  | 'mechanics'
  | 'waves_sound'
  | 'em_atomic'
  | 'fluids_thermo_optics'
  | 'gravity_astrophysics';

export interface ExperimentItem {
  id: number;
  expKey: ExperimentType;
  category: CategoryFilter;
  title_ar: string;
  title_en: string;
  title_ku: string;
  title_kmr: string;
  physical_law: string;
  simulation_inputs: string[];
  simulation_outputs: string[];
  simulation_inputs_en?: string[];
  simulation_inputs_ku?: string[];
  simulation_inputs_kmr?: string[];
  simulation_outputs_en?: string[];
  simulation_outputs_ku?: string[];
  simulation_outputs_kmr?: string[];
  icon: React.ReactNode;
}

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [activeMainTab, setActiveMainTab] = useState<'experiments' | 'notebook' | 'formulas' | 'challenges'>('experiments');
  const [activeExperimentKey, setActiveExperimentKey] = useState<ExperimentType>('models_h_atom');
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [experimentSearch, setExperimentSearch] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isEquationKeyboardOpen, setIsEquationKeyboardOpen] = useState(false);
  const [isBrowsingCatalog, setIsBrowsingCatalog] = useState(true);
  const [isTheoryExpanded, setIsTheoryExpanded] = useState(true);

  // Stored measurements
  const [records, setRecords] = useState<MeasurementRecord[]>(() => {
    const saved = localStorage.getItem('physics_lab_records');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('physics_lab_records', JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    document.documentElement.dir = lang === 'ku' || lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Add new measurement record
  const handleLogMeasurement = (data: Omit<MeasurementRecord, 'id' | 'timestamp' | 'percentError'>) => {
    const theoretical = data.theoreticalValue === 0 ? 0.0001 : data.theoreticalValue;
    const percentError = Math.abs((data.measuredValue - data.theoreticalValue) / theoretical) * 100;

    const newRecord: MeasurementRecord = {
      ...data,
      id: `meas_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      percentError,
    };

    setRecords((prev) => [newRecord, ...prev]);
  };

  const handleDeleteRecord = (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const handleClearAll = () => {
    setShowClearConfirm(true);
  };

  const confirmClearAllRecords = () => {
    setRecords([]);
    setShowClearConfirm(false);
  };

  const handleUpdateNote = (id: string, note: string) => {
    setRecords((prev) => prev.map((r) => (r.id === id ? { ...r, notes: note } : r)));
  };

  const handleSelectExperiment = (key: ExperimentType) => {
    setActiveExperimentKey(key);
    setActiveMainTab('experiments');
    setIsBrowsingCatalog(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const t = TRANSLATIONS[lang];

  // Complete List of All 65 Physics Experiments with mandatory fields:
  // id, title_ar, title_en, physical_law, simulation_inputs, simulation_outputs
  const experimentsList: ExperimentItem[] = [
    // ==========================================
    // --- 36 CLASSIC CORE EXPERIMENTS (1 - 36) ---
    // ==========================================
    {
      id: 1,
      expKey: 'work_heat',
      category: 'fluids_thermo_optics',
      title_ar: 'الشغل والحرارة والقانون الأول للديناميكا',
      title_en: 'Work, Heat and 1st Law of Thermodynamics',
      title_ku: 'ئیش، گەرمی و یاسای یەکەمی تێرمۆداینامیک',
      title_kmr: 'Kar, Germahî û Qanûna Yekem a Termodînamîkê',
      physical_law: 'ΔU = Q - W',
      simulation_inputs: ['كمية الحرارة المضافة Q', 'الشغل المبذول W', 'نوع الغاز'],
      simulation_outputs: ['التغير في الطاقة الداخلية ΔU', 'درجة الحرارة النهائية T', 'الحجم النهائي V'],
      simulation_inputs_en: ['Added Heat Quantity Q', 'Work Done W', 'Gas Type'],
      simulation_inputs_ku: ['بڕی گەرمی زیادکراو Q', 'ئیشی ئەنجامدراو W', 'جۆری گاز'],
      simulation_inputs_kmr: ['Qaseya germahiya zêdekirî Q', 'Karê encamdayî W', 'Cûreyê gazê'],
      simulation_outputs_en: ['Change in Internal Energy ΔU', 'Final Temperature T', 'Final Volume V'],
      simulation_outputs_ku: ['گۆڕانی وزەی ناوەکی ΔU', 'پلەی گەرمی کۆتایی T', 'قەبارەی کۆتایی V'],
      simulation_outputs_kmr: ['Guherîna enerjiya hundirîn ΔU', 'Pileya germahiyê ya dawî T', 'Qebareya dawî V'],
      icon: <Flame className="w-4 h-4 text-orange-400" />
    },
    {
      id: 2,
      expKey: 'prescription_glasses',
      category: 'fluids_thermo_optics',
      title_ar: 'النظارات الطبية وقوة العدسة',
      title_en: 'Prescription Glasses and Lens Power',
      title_ku: 'چاویلکەی پزیشکی و هێزی هاوێنە',
      title_kmr: 'Berçavkên Bijîşkî û Hêza Lênsê',
      physical_law: 'P = 1/f (Diopters)',
      simulation_inputs: ['نوع عيب الإبصار (قصر/طول نظر)', 'البعد البؤري للعين f_eye', 'بعد النقطة البعيدة/القريبة'],
      simulation_outputs: ['قوة العدسة التصحيحية P (ديوبتر)', 'موقع الصورة الشبكية', 'وضوح الرؤية'],
      simulation_inputs_en: ['Vision Defect Type (Myopia / Hyperopia)', 'Eye Focal Length f_eye', 'Far / Near Point Distance'],
      simulation_inputs_ku: ['جۆری کەمکووڕی بینین (کورتبینین/دووربینین)', 'دووری تیشکۆیی چاو f_eye', 'دووری خاڵی دوور/نزیك'],
      simulation_inputs_kmr: ['Cûreyê kêmtişiya dîtinê (kurtbînî/dûrbînî)', 'Dirêjahiya tîşkî ya çav f_eye', 'Dûrahiya xala dûr/nêzîk'],
      simulation_outputs_en: ['Corrective Lens Power P (Diopters)', 'Retinal Image Position', 'Visual Acuity'],
      simulation_outputs_ku: ['توانای هاوێنەی ڕاستکەرەوە P (دیۆپتەر)', 'شوێنی وێنەی تۆڕەی چاو', 'ڕوونی بینین'],
      simulation_outputs_kmr: ['Hêza lênsa راستکەرەوە P (diopter)', 'Cihê wêneyê di şebekeyê de', 'Zelaliya dîtinê'],
      icon: <Glasses className="w-4 h-4 text-sky-400" />
    },
    {
      id: 3,
      expKey: 'periscope',
      category: 'fluids_thermo_optics',
      title_ar: 'منظار الأفق وقانون الانعكاس',
      title_en: 'Periscope and Law of Reflection',
      title_ku: 'پێریسکۆپ و یاسای ڕەنگدانەوە',
      title_kmr: 'Perîskop û Qanûna Veqetînê',
      physical_law: 'θ_i = θ_r (45°)',
      simulation_inputs: ['زاوية ميلان المرآة الأولى θ1', 'زاوية ميلان المرآة الثانية θ2', 'ارتفاع المنظار h'],
      simulation_outputs: ['مسار الشعاع الضوئي', 'زاوية الخروج النهائية', 'تطابق زاوية الرؤية'],
      simulation_inputs_en: ['First Mirror Tilt Angle θ1', 'Second Mirror Tilt Angle θ2', 'Periscope Height h'],
      simulation_inputs_ku: ['گۆشەی لاری ئاوێنەی یەکەم θ1', 'گۆشەی لاری ئاوێنەی دووەم θ2', 'بەرزایی پێریسکۆپ h'],
      simulation_inputs_kmr: ['Goşeya xwehrbûna neynika yekem θ1', 'Goşeya xwehrbûna neynika duyem θ2', 'Bilindahiya perîskopê h'],
      simulation_outputs_en: ['Light Ray Path', 'Final Emergence Angle', 'Line-of-Sight Alignment'],
      simulation_outputs_ku: ['ڕێڕەوی تیپکی ڕووناکی', 'گۆشەی دەربوونی کۆتایی', 'یەکسانبوونی گۆشەی بینین'],
      simulation_outputs_kmr: ['Rêgeha tîrêja şewqê', 'Goşeya derketinê ya dawî', 'Guncana goşeya dîtinê'],
      icon: <Eye className="w-4 h-4 text-cyan-400" />
    },
    {
      id: 4,
      expKey: 'static_balloons',
      category: 'em_atomic',
      title_ar: 'الكهرباء الساكنة وقانون كولوم',
      title_en: 'Static Electricity and Coulomb Law',
      title_ku: 'کارەبای نەگۆڕ و یاسای کۆلۆم',
      title_kmr: 'Elektrîka Statîk û Qanûna Coulomb',
      physical_law: 'F = k_e · |q₁·q₂| / r²',
      simulation_inputs: ['مقدار الشحنة q1 (كولوم)', 'مقدار الشحنة q2 (كولوم)', 'المسافة الفاصلة r (متر)'],
      simulation_outputs: ['القوة الكهروستاتيكية F (نيوتن)', 'نوع القوة (تجاذب / تنافر)', 'تسارع البالونات'],
      simulation_inputs_en: ['Charge Magnitude q1 (C)', 'Charge Magnitude q2 (C)', 'Separation Distance r (m)'],
      simulation_inputs_ku: ['بڕی بارگەی q1 (کۆڵۆم)', 'بڕی بارگەی q2 (کۆڵۆم)', 'دووری نێوانیان r (مەتر)'],
      simulation_inputs_kmr: ['Nirxê barê elektrîkê q1 (C)', 'Nirxê barê elektrîkê q2 (C)', 'Dûrahiya navberê r (m)'],
      simulation_outputs_en: ['Electrostatic Force F (N)', 'Force Type (Attraction / Repulsion)', 'Balloons Acceleration'],
      simulation_outputs_ku: ['هێزی کارۆڕاکێشان F (نیوتن)', 'جۆری هێز (ڕاکێشان / پاڵنان)', 'تاودانی بالۆنەکان'],
      simulation_outputs_kmr: ['Hêza elektrîkî F (N)', 'Cûreyê hêzê (Rakişîn / Paldan)', 'Lezîna balonan'],
      icon: <Zap className="w-4 h-4 text-yellow-400" />
    },
    {
      id: 5,
      expKey: 'sled_friction',
      category: 'mechanics',
      title_ar: 'سباق التزلج وقوانين الاحتكاك',
      title_en: 'Sled Racing and Friction Laws',
      title_ku: 'خلیسکێنە و یاساکانی لێکخشاندن',
      title_kmr: 'Pêşbaziya Xweşiqandinê û Lێکخشاندن',
      physical_law: 'f_k = μ_k · N',
      simulation_inputs: ['معامل الاحتكاك الحركي μ_k', 'كتلة الزلاجة m', 'زاوية الانحدار θ'],
      simulation_outputs: ['قوة الاحتكاك f_k', 'التسارع الصافي a', 'زمن قطع المضمار t'],
      simulation_inputs_en: ['Kinetic Friction Coefficient μ_k', 'Sled Mass m', 'Incline Angle θ'],
      simulation_inputs_ku: ['هاوکۆلکەی لێکخشانی جوڵەیی μ_k', 'بارستەی پەپکە / سەھۆڵەکە m', 'گۆشەی لاربوونەوە θ'],
      simulation_inputs_kmr: ['Hevkêşeya xişandinê ya tevgerî μ_k', 'Baristeya xijokê m', 'Goşeya xwehrbûnê θ'],
      simulation_outputs_en: ['Frictional Force f_k', 'Net Acceleration a', 'Track Traversal Time t'],
      simulation_outputs_ku: ['هێزی لێکخشان f_k', 'خێرایی گۆڕینی تەواو a', 'کاتی بڕینی ڕێگا t'],
      simulation_outputs_kmr: ['Hêza xişandinê f_k', 'Lezkirina tevayî a', 'Dema çûna rê t'],
      icon: <Activity className="w-4 h-4 text-amber-400" />
    },
    {
      id: 6,
      expKey: 'heat_conduction',
      category: 'fluids_thermo_optics',
      title_ar: 'التوصيل الحراري وقانون فورييه',
      title_en: 'Heat Conduction and Fourier Law',
      title_ku: 'گەیاندنی گەرمی و یاسای فۆریە',
      title_kmr: 'Gihandina Germahiyê û Qanûna Fourier',
      physical_law: 'q = -k · A · (ΔT / L)',
      simulation_inputs: ['الموصلية الحرارية k للمادة', 'مساحة المقطع A', 'فرق درجات الحرارة ΔT', 'طول القضيب L'],
      simulation_outputs: ['معدل التدفق الحراري q (واط)', 'التدرج الحراري dT/dx', 'كمية الطاقة المنقولة'],
      simulation_inputs_en: ['Thermal Conductivity k of Material', 'Cross-Sectional Area A', 'Temperature Difference ΔT', 'Rod Length L'],
      simulation_inputs_ku: ['گەیەنەرایەتی گەرمی kی ماددە', 'ڕووبەری بڕین A', 'جیاوازی پلەکانی گەرمی ΔT', 'درێژی دارەکە L'],
      simulation_inputs_kmr: ['Gihandina germahiyê k ya madeyê', 'Rûbera kurtkirinê A', 'Cudahiya pileyên germahiyê ΔT', 'Dirêjahiya darik L'],
      simulation_outputs_en: ['Heat Transfer Rate q (W)', 'Thermal Gradient dT/dx', 'Transferred Energy Amount'],
      simulation_outputs_ku: ['تێکڕای لێقوڵپینی گەرمی q (واط)', 'پلەبەپلەی گەرمی dT/dx', 'بڕی وزەی گوێزراوە'],
      simulation_outputs_kmr: ['Rêjeya herikîna germahiyê q (Watt)', 'Pileyîbûna germahiyê dT/dx', 'Qaseya enerjiya veguhastî'],
      icon: <Flame className="w-4 h-4 text-rose-400" />
    },
    {
      id: 7,
      expKey: 'seesaw_torque',
      category: 'mechanics',
      title_ar: 'أرجوحة التوازن وعزم الدوران',
      title_en: 'Seesaw Balance and Torque Equilibrium',
      title_ku: 'تەرازووی هاوسەنگی و زەبری خولانەوە',
      title_kmr: 'Hevsengiya Seesaw û Zivirîn',
      physical_law: 'τ = r · F · sin(θ),  Στ = 0',
      simulation_inputs: ['موقع وكتلة الثقل الأيسر (m1, r1)', 'موقع وكتلة الثقل الأيمن (m2, r2)'],
      simulation_outputs: ['العزم الصافي Στ', 'حالة الاتزان الدوراني', 'زاوية ميلان الأرجوحة'],
      simulation_inputs_en: ['Left Weight Position & Mass (m1, r1)', 'Right Weight Position & Mass (m2, r2)'],
      simulation_inputs_ku: ['شوێن و بارستەی کێشی چەپ (m1, r1)', 'شوێن و بارستەی کێشی ڕاست (m2, r2)'],
      simulation_inputs_kmr: ['Cih û baristeya pêla çepê (m1, r1)', 'Cih û baristeya pêla rastê (m2, r2)'],
      simulation_outputs_en: ['Net Torque Στ', 'Rotational Equilibrium State', 'Seesaw Tilt Angle'],
      simulation_outputs_ku: ['زەبری تەواو Στ', 'دۆخی هاوسەنگی خولگەیی', 'گۆشەی لاری هەڵواسکە'],
      simulation_outputs_kmr: ['Torqeya tevayî Στ', 'Rewşa hevsengiya dorhêlî', 'Goşeya xwehrbûna hilawîstokê'],
      icon: <Scale className="w-4 h-4 text-emerald-400" />
    },
    {
      id: 8,
      expKey: 'electromagnetic_induction',
      category: 'em_atomic',
      title_ar: 'الحث الكهرومغناطيسي وقانون فاراداي',
      title_en: 'Electromagnetic Induction and Faraday Law',
      title_ku: 'هاندانی کارۆموگناتیسی و یاسای فارادای',
      title_kmr: 'Teşwîqa Elektromanyetîk û Qanûna Faraday',
      physical_law: 'ε = -N · (ΔΦ / Δt)',
      simulation_inputs: ['عدد لفات الملف N', 'سرعة حركة المغناطيس v', 'شدة المجال المغناطيسي B'],
      simulation_outputs: ['القوة الدافعة الكهربائية الحثية ε (فولت)', 'التيار الحثي I', 'إضاءة المصباح'],
      simulation_inputs_en: ['Number of Coil Turns N', 'Magnet Speed v', 'Magnetic Field Intensity B'],
      simulation_inputs_ku: ['ژمارەی پێچەکانی کۆیل N', 'خێرایی جووڵەی موگناتیس v', 'توندي بواری موگناتیسی B'],
      simulation_inputs_kmr: ['Hejmara pêçanên bobînê N', 'Leza tevgera magnetîsê v', 'Xurtiya zeviya magnetîkî B'],
      simulation_outputs_en: ['Induced Electromotive Force ε (V)', 'Induced Current I', 'Bulb Brightness'],
      simulation_outputs_ku: ['هێزی کارۆبزوێنەری هاندراو ε (ڤۆڵت)', 'تەزووی موگناتیسکار I', 'ڕۆشنایی گلۆپەکە'],
      simulation_outputs_kmr: ['Hêza livînera elektrîkî ya arîner ε (V)', 'Herikîna elektrîkî ya arîner I', 'Rûronahiya gulopê'],
      icon: <Magnet className="w-4 h-4 text-purple-400" />
    },
    {
      id: 9,
      expKey: 'viscosity_stokes',
      category: 'fluids_thermo_optics',
      title_ar: 'اللزوجة وقانون ستوكس والسرعة الحدية',
      title_en: 'Viscosity, Stokes Law & Terminal Velocity',
      title_ku: 'خەستی و یاسای ستۆکس و خێرایی سنووری',
      title_kmr: 'Zeliqîn, Qanûna Stokes û Leza Dawî',
      physical_law: 'F_d = 6π · η · r · v_t',
      simulation_inputs: ['معامل لزوجة السائل η', 'نصف قطر الكرة r', 'كثافة الكرة ρ_s', 'كثافة السائل ρ_f'],
      simulation_outputs: ['السرعة الحدية v_t (م/ث)', 'قوة الإعاقة F_d', 'منحنى السرعة مع الزمن'],
      simulation_inputs_en: ['Liquid Viscosity Coefficient η', 'Sphere Radius r', 'Sphere Density ρ_s', 'Liquid Density ρ_f'],
      simulation_inputs_ku: ['هاوکۆڵکەی خەستی شلە η', 'نیوەتیرەی گۆڕەکە r', 'چڕیی گۆڕەکە ρ_s', 'چڕیی شلەکە ρ_f'],
      simulation_inputs_kmr: ['Hevkêşeya lînciya rona η', 'Nîveşkêla gogê r', 'Tîriya gogê ρ_s', 'Tîriya rona ρ_f'],
      simulation_outputs_en: ['Terminal Velocity v_t (m/s)', 'Drag Force F_d', 'Velocity vs Time Curve'],
      simulation_outputs_ku: ['خێرایی سنووری v_t (م/چرکە)', 'هێزی ئاستەنگکردن F_d', 'هێڵکاری خێرایی لەگەڵ کاتدا'],
      simulation_outputs_kmr: ['Leza sînorî v_t (m/s)', 'Hêza xwegiriyê F_d', 'Grafîka lezê bi demê re'],
      icon: <Droplets className="w-4 h-4 text-teal-400" />
    },
    {
      id: 10,
      expKey: 'ramp_machine',
      category: 'mechanics',
      title_ar: 'المستوى المائل والآلات البسيطة',
      title_en: 'Inclined Plane & Simple Machines',
      title_ku: 'لێژی و ئامێرە سادەکان',
      title_kmr: 'Pilanê Meyildar û Makîneya Hêsan',
      physical_law: 'MA = 1 / sin(θ) = L / h',
      simulation_inputs: ['زاوية ميل المستوى θ', 'كتلة الجسم المراد رفعه m', 'معامل الاحتكاك μ'],
      simulation_outputs: ['الفائدة الميكانيكية MA', 'القوة اللازمة للسحب F_pull', 'الكفاءة الميكانيكية η'],
      simulation_inputs_en: ['Incline Plane Angle θ', 'Object Mass to Lift m', 'Friction Coefficient μ'],
      simulation_inputs_ku: ['گۆشەی لاری ڕووتەخت θ', 'بارستەی تەنی هەڵگیراو m', 'هاوکۆلکەی لێکخشان μ'],
      simulation_inputs_kmr: ['Goşeya xwehrbûna rûerdê θ', 'Baristeya ten ku tê hilgirtin m', 'Hevkêşeya xişandinê μ'],
      simulation_outputs_en: ['Mechanical Advantage MA', 'Required Pulling Force F_pull', 'Mechanical Efficiency η'],
      simulation_outputs_ku: ['سوودی میکانیکی MA', 'هێزی پێویست بۆ کێشان F_pull', 'کاریگەری میکانیکی η'],
      simulation_outputs_kmr: ['Sûda mekanîkî MA', 'Hêza پێwîst bo kişandinê F_pull', 'Karbidestiya mekanîkî η'],
      icon: <Activity className="w-4 h-4 text-indigo-400" />
    },
    {
      id: 11,
      expKey: 'metric_prefixes',
      category: 'mechanics',
      title_ar: 'البادئات المترية والتحويلات الفيزيائية',
      title_en: 'Metric Prefixes and Scientific Conversions',
      title_ku: 'پێشگرە مەترییەکان و گۆڕین',
      title_kmr: 'Pêşgirên Metrîk û Veguherîn',
      physical_law: 'Value × 10^{\\pm n}',
      simulation_inputs: ['القيمة العددية الأساسية', 'الوحدة المرجعية', 'البادئة المطلوبة (نانو/ميكرو/ميجا/جيجا)'],
      simulation_outputs: ['القيمة بالصيغة العلمية', 'القيمة بالبادئة الهدف', 'معامل التحويل الدقيق'],
      simulation_inputs_en: ['Base Numerical Value', 'Reference Base Unit', 'Target Prefix (nano / micro / mega / giga)'],
      simulation_inputs_ku: ['بەهای ژمارەیی بنەڕەتی', 'یەکەی پێوەری سەرەکی', 'پێشگرە پێویستەکان (نانۆ/میکرۆ/مێگا/جیگا)'],
      simulation_inputs_kmr: ['Nirxa hejmarî ya bingehîn', 'Yekîneya referansê', 'Pêşgirên پێwîst (nano/mîkro/mega/giga)'],
      simulation_outputs_en: ['Scientific Notation Value', 'Value in Target Prefix', 'Exact Conversion Factor'],
      simulation_outputs_ku: ['بەها بە شێوەی زانستی', 'بەها بە پێشگری ئامانجکراو', 'هاوکۆلکەی وردی گۆڕین'],
      simulation_outputs_kmr: ['Nirx bi şêweya zanistî', 'Nirx bi pêşgira armanc', 'Hevkêşeya veguhastinê ya rast'],
      icon: <Binary className="w-4 h-4 text-sky-400" />
    },
    {
      id: 12,
      expKey: 'stress_strain',
      category: 'mechanics',
      title_ar: 'الإجهاد والانفعال ومعامل يونج',
      title_en: 'Stress, Strain and Young Modulus',
      title_ku: 'پەستان، کشان و مۆدیۆلی یۆنگ',
      title_kmr: 'Stres, Deformasyon û Modula Young',
      physical_law: 'E = σ / ε = (F/A) / (ΔL/L₀)',
      simulation_inputs: ['القوة المؤثرة F', 'مساحة المقطع A', 'الطول الأصلي L0', 'نوع المادة (صلب/نحاس/ألمنيوم)'],
      simulation_outputs: ['الإجهاد σ (باسكال)', 'الانفعال النسبي ε', 'الاستطالة ΔL', 'حد المرونة'],
      simulation_inputs_en: ['Applied Force F', 'Cross-Sectional Area A', 'Original Length L0', 'Material Type (Steel / Copper / Aluminum)'],
      simulation_inputs_ku: ['هێزی کاریگەر F', 'ڕووبەری بڕینەوە A', 'درێژی سەرەتایی L0', 'جۆری ماددە (پۆڵا/مس/ئەلەمنیۆم)'],
      simulation_inputs_kmr: ['Hêza bandorker F', 'Rûbera kurtkirinê A', 'Dirêjahiya eslî L0', 'Cûreya madeyê (polad/sifir/aluminyûm)'],
      simulation_outputs_en: ['Stress σ (Pa)', 'Relative Strain ε', 'Elongation ΔL', 'Elastic Limit'],
      simulation_outputs_ku: ['فشار σ (بە پاسکال)', 'گۆڕانی درێژی ڕێژەیی ε', 'درێژبوونەوە ΔL', 'سنووری گەڕانەوە (سنووری کشانی)'],
      simulation_outputs_kmr: ['Fişar σ (bi Pascal)', 'Guherîna dirêjiya rêjeyî ε', 'Dirêjbûn ΔL', 'Sînorê vegerê (sînorê elastîk)'],
      icon: <Activity className="w-4 h-4 text-red-400" />
    },
    {
      id: 13,
      expKey: 'bernoulli',
      category: 'fluids_thermo_optics',
      title_ar: 'مبدأ برنولي وأنبوب فنتوري',
      title_en: 'Bernoulli Principle and Venturi Flow',
      title_ku: 'بنەمای بەرنۆلی و لولەی ڤێنتۆری',
      title_kmr: 'Prînsîba Bernoulli û Lûleya Venturi',
      physical_law: 'P + ½ρv² + ρgh = Const',
      simulation_inputs: ['معدل التدفق الحجمي Q', 'قطر المقطع العريض D1', 'قطر المقطع الضيق D2'],
      simulation_outputs: ['فرق الضغط ΔP', 'سرعة المائع في التضيق v2', 'ارتفاع عمود السائل في فنتوري'],
      simulation_inputs_en: ['Volumetric Flow Rate Q', 'Wide Section Diameter D1', 'Narrow Section Diameter D2'],
      simulation_inputs_ku: ['تێکڕای لێقوڵپینی قەبارەیی Q', 'تیرەی بڕە فراوانەکە D1', 'تیرەی بڕە تەسکەکە D2'],
      simulation_inputs_kmr: ['Rêjeya herikîna qebareyî Q', 'Tîrêja parçeyê fireh D1', 'Tîrêja parçeyê teng D2'],
      simulation_outputs_en: ['Pressure Difference ΔP', 'Fluid Velocity in Constriction v2', 'Liquid Column Height in Venturi'],
      simulation_outputs_ku: ['جیاوازی پەستان ΔP', 'خێرایی شلە لە تەسکبووەکەدا v2', 'بەرزایی ستوونی شلە لە فێنتۆری'],
      simulation_outputs_kmr: ['Cudahiya dewisînê ΔP', 'Leza rona di tengahiyê de v2', 'Bilindahiya stûna rona di Fîntorî de'],
      icon: <Droplets className="w-4 h-4 text-cyan-400" />
    },
    {
      id: 14,
      expKey: 'angled_mirrors',
      category: 'fluids_thermo_optics',
      title_ar: 'المرآتان المائلتان والانعكاسات المتعددة',
      title_en: 'Angled Mirrors and Multiple Reflection Images',
      title_ku: 'ئاوێنەی لێژ و وێنە لەیەکدراوەکان',
      title_kmr: 'Neynikên Meyildar û Wêneyên Zêde',
      physical_law: 'N = (360° / θ) - 1',
      simulation_inputs: ['الزاوية بين المرآتين θ (درجات)', 'موقع الجسم بالنسبة للمرآتين'],
      simulation_outputs: ['عدد الصور المتكونة N', 'مواقع وتماثل الصور المنعكسة'],
      simulation_inputs_en: ['Angle Between Mirrors θ (deg)', 'Object Position Relative to Mirrors'],
      simulation_inputs_ku: ['گۆشەی نێوان دوو ئاوێنەکە θ (پلە)', 'شوێنی تەنەکە بەبەراورد بە دوو ئاوێنەکە'],
      simulation_inputs_kmr: ['Goşeya navbera du neynikan θ (pile)', 'Cihê gewdeyî li gor du neynikan'],
      simulation_outputs_en: ['Number of Formed Images N', 'Positions and Symmetry of Reflected Images'],
      simulation_outputs_ku: ['ژمارەی وێنە دروستبووەکان N', 'شوێن و هاوشێوەیی وێنە ڕەنگداوەکان'],
      simulation_outputs_kmr: ['Hejmara wêneyên çêbûyî N', 'Cih û hevçeperiya wêneyên vajîbûyî'],
      icon: <Eye className="w-4 h-4 text-pink-400" />
    },
    {
      id: 15,
      expKey: 'curved_mirrors',
      category: 'fluids_thermo_optics',
      title_ar: 'المرايا الكروية (المقعرة والمحدبة)',
      title_en: 'Curved Spherical Mirrors (Concave & Convex)',
      title_ku: 'ئاوێنە گۆییەکان (قۆقز و قوپاو)',
      title_kmr: 'Neynikên Xilmaş (Kevrok û Çepel)',
      physical_law: '1/f = 1/d_o + 1/d_i',
      simulation_inputs: ['نوع المرآة (مقعرة/محدبة)', 'البعد البؤري f', 'بعد الجسم عن المرآة d_o', 'طول الجسم h_o'],
      simulation_outputs: ['بعد الصورة d_i', 'التكبير M', 'صفات الصورة (حقيقية/تقديرية/مقلوبة/معتدلة)'],
      simulation_inputs_en: ['Mirror Type (Concave / Convex)', 'Focal Length f', 'Object Distance from Mirror d_o', 'Object Height h_o'],
      simulation_inputs_ku: ['جۆری ئاوێنە (قوپاو/قۆقز)', 'دووری تیشکۆیی f', 'دووری تەن لە ئاوێنەکەوە d_o', 'بەرزایی تەنەکە h_o'],
      simulation_inputs_kmr: ['Cûreyê neynikê (çal/gir)', 'Dirêjahiya tîşkî f', 'Dûrahiya gewdeyî ji neynikê d_o', 'Dirêjahiya gewdeyî h_o'],
      simulation_outputs_en: ['Image Distance d_i', 'Magnification M', 'Image Characteristics (Real / Virtual / Inverted / Upright)'],
      simulation_outputs_ku: ['دووری وێنەکە d_i', 'گەورەکردن M', 'تایبەتمەندییەکانی وێنە (ڕاستەقینە/خەیاڵی/سەرەوژێر/ڕاست)'],
      simulation_outputs_kmr: ['Dûrahiya wêneyê d_i', 'Mezinbûn M', 'Taybetmendiyên wêneyê (rasteqîn/aşopî/serûbin/rast)'],
      icon: <Eye className="w-4 h-4 text-purple-400" />
    },
    {
      id: 16,
      expKey: 'thin_lenses',
      category: 'fluids_thermo_optics',
      title_ar: 'العدسات الرقيقة والبعد البؤري',
      title_en: 'Thin Lenses and Focal Length Equation',
      title_ku: 'هاوێنە تەنکەکان و دووری تیشکۆیی',
      title_kmr: 'Lênsên Tenik û Hevkêşeya Tîşkî',
      physical_law: '1/f = 1/d_o + 1/d_i,  M = -d_i/d_o',
      simulation_inputs: ['البعد البؤري f', 'موقع الجسم d_o', 'ارتفاع الجسم h_o'],
      simulation_outputs: ['موقع الصورة d_i', 'معامل التكبير M', 'مسار الأشعة وتكون الصورة'],
      simulation_inputs_en: ['Focal Length f', 'Object Position d_o', 'Object Height h_o'],
      simulation_inputs_ku: ['دووری تیشکۆیی f', 'شوێنی تەن d_o', 'بەرزایی تەن h_o'],
      simulation_inputs_kmr: ['Dirêjahiya tîşkî f', 'Cihê gewdeyî d_o', 'Bilindahiya gewdeyî h_o'],
      simulation_outputs_en: ['Image Position d_i', 'Magnification Factor M', 'Ray Trajectory & Image Formation'],
      simulation_outputs_ku: ['شوێنی وێنە d_i', 'هاوکۆڵکەی گەورەکردن M', 'ڕێڕەوی تیپکەکان و دروستبوونی وێنە'],
      simulation_outputs_kmr: ['Cihê wêneyê d_i', 'Hevkêşeya mezinbûnê M', 'Rêgeha tîrêjan û çêbûna wêneyê'],
      icon: <Eye className="w-4 h-4 text-emerald-400" />
    },
    {
      id: 17,
      expKey: 'polarization',
      category: 'fluids_thermo_optics',
      title_ar: 'استقطاب الضوء وقانون مالوس',
      title_en: 'Light Polarization and Malus Law',
      title_ku: 'جەمسەربەندی ڕووناکی و یاسای مالوس',
      title_kmr: 'Polarîzasyona Ronahiyê û Qanûna Malus',
      physical_law: 'I = I₀ · cos²(θ)',
      simulation_inputs: ['شدة الضوء الابتدائي I0', 'زاوية المستقطب الأول θ1', 'زاوية المحلل θ2'],
      simulation_outputs: ['شدة الضوء النافذ I (واط/م²)', 'نسبة النفاذية I/I0', 'محور الاستقطاب الناتج'],
      simulation_inputs_en: ['Initial Light Intensity I0', 'First Polarizer Angle θ1', 'Analyzer Angle θ2'],
      simulation_inputs_ku: ['توندی ڕووناکی سەرەتایی I0', 'گۆشەی جەمسەرگری یەکەم θ1', 'گۆشەی شيكارکەر θ2'],
      simulation_inputs_kmr: ['Tundiya şewqa destpêkî I0', 'Goşeya polarîzorê yekem θ1', 'Goşeya analîzorê θ2'],
      simulation_outputs_en: ['Transmitted Light Intensity I (W/m²)', 'Transmittance Ratio I/I0', 'Resultant Polarization Axis'],
      simulation_outputs_ku: ['توندی ڕووناکی تێپەڕبوو I (واط/م²)', 'ڕێژەی تێپەڕبوون I/I0', 'تەوەرەی جەمسەرگیریی بەدەستهاتوو'],
      simulation_outputs_kmr: ['Tundiya şewqa derbasbûyî I (W/m²)', 'Rêjeya derbasbûnê I/I0', 'Tewereya polarîzasyonê ya encamî'],
      icon: <Sun className="w-4 h-4 text-yellow-400" />
    },
    {
      id: 18,
      expKey: 'light_scattering',
      category: 'fluids_thermo_optics',
      title_ar: 'تشتت الضوء وتشتت رايلي',
      title_en: 'Light Scattering and Rayleigh Scattering Law',
      title_ku: 'پەرشبوونەوەی ڕووناکی و یاسای ڕایلی',
      title_kmr: 'Belavbûna Ronahiyê û Qanûna Rayleigh',
      physical_law: 'I ∝ 1 / λ⁴',
      simulation_inputs: ['الطول الموجي للضوء الساقط λ', 'حجم الجسيمات المشتتة d', 'كثافة الوسط'],
      simulation_outputs: ['شدة الضوء المشتت I', 'اللون الملاحظ للغلاف الجوي', 'تفسير زرقة السماء وحمرة الشفق'],
      simulation_inputs_en: ['Incident Light Wavelength λ', 'Scattering Particle Size d', 'Medium Density'],
      simulation_inputs_ku: ['درێژی شەپۆلی ڕووناکی کەوتوو λ', 'قەبارەی تەنوڵکە پەرشبووەکان d', 'چڕیی ناوەند'],
      simulation_inputs_kmr: ['Dirêjahiya pêla şewqa ketiye λ', 'Qebareya parçekokên belavbûyî d', 'Tîriya holê'],
      simulation_outputs_en: ['Scattered Light Intensity I', 'Observed Atmospheric Color', 'Explanation of Sky Blue & Sunset Redness'],
      simulation_outputs_ku: ['توندی ڕووناکی پەرشبوو I', 'ڕەنگی بینراوی بەرگەهەوا', 'ڕوونکردنەوەی شینی ئاسمان و سووريی شەفەق'],
      simulation_outputs_kmr: ['Tundiya şewqa belavbûyî I', 'Rengê dîtbar ê atmosfera erdê', 'Şîrovekirina şîniya ezmên û soraiya meyxurê'],
      icon: <Sun className="w-4 h-4 text-amber-400" />
    },
    {
      id: 19,
      expKey: 'arc_length',
      category: 'mechanics',
      title_ar: 'طول القوس والراديان والسرعة الزاوية',
      title_en: 'Arc Length, Radians & Angular Motion',
      title_ku: 'درێژی کەوانە و ڕادیان و جووڵەی گۆشەیی',
      title_kmr: 'Dirêjiya Kevanê û Radîyan',
      physical_law: 's = r · θ,  v = r · ω',
      simulation_inputs: ['نصف قطر المسار r (متر)', 'زاوية الدوران θ (درجات/راديان)', 'السرعة الزاوية ω'],
      simulation_outputs: ['طول القوس المقطوع s (متر)', 'السرعة الخطية v (م/ث)', 'الموقع الزاوي'],
      simulation_inputs_en: ['Path Radius r (m)', 'Rotation Angle θ (deg/rad)', 'Angular Velocity ω'],
      simulation_inputs_ku: ['نیوەتیرەی ڕێڕەو r (بە مەتر)', 'گۆشەی سوڕان θ (پلە/ڕادیان)', 'خێراییی گۆشەیی ω'],
      simulation_inputs_kmr: ['Nîv-tîrêja rê r (bi metre)', 'Goşeya zivirînê θ (pile/radyen)', 'Leza goşeyî ω'],
      simulation_outputs_en: ['Arc Length Traveled s (m)', 'Linear Velocity v (m/s)', 'Angular Position'],
      simulation_outputs_ku: ['درێژی کەوانەی بڕاو s (بە مەتر)', 'خێرایی هێڵی v (بە مەتر/چرکە)', 'شوێنی گۆشەیی'],
      simulation_outputs_kmr: ['Dirêjahiya kevanê burandi s (bi metre)', 'Leza hêlî v (bi m/s)', 'Cihê goşeyî'],
      icon: <CircleDot className="w-4 h-4 text-teal-400" />
    },
    {
      id: 20,
      expKey: 'rotational_dynamics',
      category: 'mechanics',
      title_ar: 'عزم القصور والحركة الدورانية',
      title_en: 'Moment of Inertia & Rotational Dynamics',
      title_ku: 'زەبری سستی و دینامیکی خولانەوە',
      title_kmr: 'Momanê Bêçalaktiyê û Zivirîn',
      physical_law: 'τ = I · α',
      simulation_inputs: ['عزم القوة المؤثرة τ', 'هندسة وكتلة الجسم الدوار (قرص/أسطوانة/حلقة)', 'نصف القطر r'],
      simulation_outputs: ['عزم القصور الذاتي I', 'التسارع الزاوي α (راد/ث²)', 'السرعة الزاوية ω(t)'],
      simulation_inputs_en: ['Applied Torque τ', 'Rotating Body Mass & Geometry (Disk / Cylinder / Ring)', 'Radius r'],
      simulation_inputs_ku: ['زەبری هێزی کاریگەر τ', 'جیۆمەتری و بارستەی تەنی سوڕاوە (لوخ/ئەستوونە/بازنە)', 'نیوەتیرە r'],
      simulation_inputs_kmr: ['Torqeya hêza bandorker τ', 'Geometrî û baristeya laşê zivir (dîsk/stûn/xelek)', 'Nîv-tîrêj r'],
      simulation_outputs_en: ['Moment of Inertia I', 'Angular Acceleration α (rad/s²)', 'Angular Velocity ω(t)'],
      simulation_outputs_ku: ['زەبری سستیی نەگۆڕ I', 'تاودانی گۆشەیی α (ڕادیان/چرکە²)', 'خێراییی گۆشەیی ω(t)'],
      simulation_outputs_kmr: ['Zevira sistiyê I', 'Lezgîniya goşeyî α (radyen/s²)', 'Leza goşeyî ω(t)'],
      icon: <RotateCw className="w-4 h-4 text-indigo-400" />
    },
    {
      id: 21,
      expKey: 'center_of_mass',
      category: 'mechanics',
      title_ar: 'مركز الكتلة للأجسام والأنظمة المركبة',
      title_en: 'Center of Mass of Systems and Objects',
      title_ku: 'چەقی بارستایی تەنەکان',
      title_kmr: 'Navenda Komê ya Pergalan',
      physical_law: 'X_cm = Σ(m_i · x_i) / Σm_i',
      simulation_inputs: ['كتل الأجسام النقطية (m1, m2, m3)', 'إحداثيات مواقع الأجسام (x_i, y_i)'],
      simulation_outputs: ['إحداثيات مركز الكتلة (X_cm, Y_cm)', 'نقطة الاتزان الميكانيكي المستقر'],
      simulation_inputs_en: ['Point Masses (m1, m2, m3)', 'Positions Coordinates (x_i, y_i)'],
      simulation_inputs_ku: ['بارستەی تەنە خاڵییەکان (m1, m2, m3)', 'پوختە شوێنی تەنەکان (x_i, y_i)'],
      simulation_inputs_kmr: ['Baristeyên laşên nuqteyî (m1, m2, m3)', 'Koordînatên cihên laşan (x_i, y_i)'],
      simulation_outputs_en: ['Center of Mass Coordinates (X_cm, Y_cm)', 'Stable Mechanical Equilibrium Point'],
      simulation_outputs_ku: ['پوختەی ناوەندی بارستە (X_cm, Y_cm)', 'خاڵی هاوتەنگەری میکانیکی جێگیر'],
      simulation_outputs_kmr: ['Koordînatên navenda baristeyê (X_cm, Y_cm)', 'Xala hevsengiya mekanîkî ya sekinî'],
      icon: <Target className="w-4 h-4 text-rose-400" />
    },
    {
      id: 22,
      expKey: 'pendulum_energy',
      category: 'mechanics',
      title_ar: 'حفظ الطاقة الميكانيكية للنواس',
      title_en: 'Conservation of Energy in a Pendulum',
      title_ku: 'پاراستنی وزەی میکانیکی لە پاندۆڵدا',
      title_kmr: 'Parastina Enerjiya Pandûlê',
      physical_law: 'E_tot = K + U = ½mv² + mgh = Const',
      simulation_inputs: ['زاوية الإطلاق الابتدائية θ0', 'طول الخيط L', 'كتلة الثقل m'],
      simulation_outputs: ['طاقة الحركة K (جول)', 'طاقة الوضع الثقالية U (جول)', 'مخطط تحولات الطاقة الحية'],
      simulation_inputs_en: ['Initial Release Angle θ0', 'String Length L', 'Bob Mass m'],
      simulation_inputs_ku: ['گۆشەی دەستپێکی هاوێشتن θ0', 'درێژی دەزوو L', 'بارستەی کێش m'],
      simulation_inputs_kmr: ['Goşeya destpêkê ya avêtinê θ0', 'Dirêjahiya têlê L', 'Baristeya pêlê m'],
      simulation_outputs_en: ['Kinetic Energy K (J)', 'Gravitational Potential Energy U (J)', 'Live Energy Transformation Diagram'],
      simulation_outputs_ku: ['وزەی جوڵە K (بە جول)', 'وزەی پۆتێنشیاڵی کێش U (بە جول)', 'نەخشەی گۆڕانکاری وزە'],
      simulation_outputs_kmr: ['Enerjiya tevgerê K (bi Joule)', 'Enerjiya potansiyel a kişandinê U (bi Joule)', 'Nexşeya veguherîna enerjiyê'],
      icon: <Activity className="w-4 h-4 text-sky-400" />
    },
    {
      id: 23,
      expKey: 'pendulum',
      category: 'mechanics',
      title_ar: 'البندول البسيط والزمن الدوري',
      title_en: 'Simple Pendulum Period and Gravity',
      title_ku: 'پاندۆڵی سادە و کاتی خول',
      title_kmr: 'Pandûla Hêsan û Dema Periyodê',
      physical_law: 'T = 2π · √(L / g)',
      simulation_inputs: ['طول البندول L (متر)', 'تسارع الجاذبية g (م/ث²)', 'كتلة الكرة m'],
      simulation_outputs: ['الزمن الدوري T (ثانية)', 'تردد الاهتزاز f (هرتز)', 'تسارع الجاذبية المحسوب'],
      simulation_inputs_en: ['Pendulum Length L (m)', 'Gravitational Acceleration g (m/s²)', 'Sphere Mass m'],
      simulation_inputs_ku: ['درێژی پەندۆڵ L (بە مەتر)', 'خێرایی گۆڕینی کێش g (بە مەتر/چرکە²)', 'بارستەی تۆپەکە m'],
      simulation_inputs_kmr: ['Dirêjahiya pendulê L (bi metre)', 'Lezkirina kişandinê g (bi m/s²)', 'Baristeya gogê m'],
      simulation_outputs_en: ['Period T (s)', 'Oscillation Frequency f (Hz)', 'Calculated Gravitational Acceleration'],
      simulation_outputs_ku: ['خول T (بە چرکە)', 'ڕەنگەی لەرزین f (بە هێرتز)', 'خێرایی گۆڕینی کێشی هەژمارکراو'],
      simulation_outputs_kmr: ['Dema gerê (Period) T (bi saniye)', 'Pirhêziya lerizînê f (bi Hz)', 'Lezkirina kişandinê ya hesabkirî'],
      icon: <Activity className="w-4 h-4 text-emerald-400" />
    },
    {
      id: 24,
      expKey: 'projectile',
      category: 'mechanics',
      title_ar: 'حركة المقذوفات والمدى الأقصى',
      title_en: 'Projectile Motion and Range Trajectory',
      title_ku: 'جووڵەی هاوێژراوەکان و مەودای ئەوپەڕی',
      title_kmr: 'Tevgera Avêtinê û Rêgeha Zêde',
      physical_law: 'R = (v₀² · sin(2θ)) / g,  H = (v₀² sin²θ) / 2g',
      simulation_inputs: ['السرعة الابتدائية v0 (م/ث)', 'زاوية الإطلاق θ (درجات)', 'الارتفاع الابتدائي h0'],
      simulation_outputs: ['المدى الأفقي الأقصى R', 'أقصى ارتفاع H', 'زمن التحليق الكلي t_flight', 'المسار المنحني'],
      simulation_inputs_en: ['Initial Launch Velocity v0 (m/s)', 'Launch Angle θ (deg)', 'Initial Height h0'],
      simulation_inputs_ku: ['خێرایی دەستپێک v0 (بە مەتر/چرکە)', 'گۆشەی هاوێشتن θ (بە پلە)', 'بەرزی دەستپێک h0'],
      simulation_inputs_kmr: ['Leza destpêkê v0 (bi m/s)', 'Goşeya avêtinê θ (bi pile)', 'Bilindahiya destpêkê h0'],
      simulation_outputs_en: ['Maximum Horizontal Range R', 'Maximum Height H', 'Total Flight Time t_flight', 'Curved Trajectory Profile'],
      simulation_outputs_ku: ['دووری ئاسۆیی زۆرترین R', 'بەرزترین بەرزایی H', 'کۆی کاتی جوڵەی هەوا t_flight', 'ڕێڕەوی کەوانەیی'],
      simulation_outputs_kmr: ['Dûrahiya asoyî ya herî zêde R', 'Bilindahiya herî zêde H', 'Tevaya dema firînê t_flight', 'Rêya xwehr (kevanî)'],
      icon: <Compass className="w-4 h-4 text-amber-400" />
    },
    {
      id: 25,
      expKey: 'spring',
      category: 'mechanics',
      title_ar: 'قانون هوك والاهتزاز التوافقي للنابض',
      title_en: 'Hooke Law and Spring Harmonic Oscillation',
      title_ku: 'یاسای هووک و لەرینەوەی سپرینگ',
      title_kmr: 'Qanûna Hooke û Lersîna Spîrîngê',
      physical_law: 'F = -k · x,  T = 2π · √(m / k)',
      simulation_inputs: ['ثابت صلابة النابض k (نيوتن/م)', 'كتلة الثقل المعلق m (كجم)', 'الإزاحة الابتدائية x0'],
      simulation_outputs: ['قوة الإرجاع F_spring', 'طاقة الوضع المرنة U_s', 'الزمن الدوري للاهتزاز T'],
      simulation_inputs_en: ['Spring Stiffness Constant k (N/m)', 'Suspended Mass m (kg)', 'Initial Displacement x0'],
      simulation_inputs_ku: ['هاوکۆلکەی ڕەقی سپرینگ k (بە نیوتن/مەتر)', 'بارستەی کێشی هەڵواسراو m (بە کیلۆگرام)', 'لابردنی سەرەتایی x0'],
      simulation_inputs_kmr: ['Hevkêşeya hişkiya kanî k (bi Newton/metre)', 'Baristeya pêla hilawîstî m (bi kîlogram)', 'Veguhastina destpêkê x0'],
      simulation_outputs_en: ['Spring Restoring Force F_spring', 'Elastic Potential Energy U_s', 'Oscillation Period T'],
      simulation_outputs_ku: ['هێزی گەڕانەوەی سپرینگ F_spring', 'وزەی پۆتێنشیاڵی کانی U_s', 'خولی لەرزین T'],
      simulation_outputs_kmr: ['Hêza vegerê ya kanî F_spring', 'Enerjiya potansiyel a kanî U_s', 'Dema gerê ya lerizînê T'],
      icon: <Activity className="w-4 h-4 text-violet-400" />
    },
    {
      id: 26,
      expKey: 'collision',
      category: 'mechanics',
      title_ar: 'حفظ الزخم الخطي والتصادمات',
      title_en: 'Linear Momentum Conservation and Collisions',
      title_ku: 'پاراستنی زەخم و پێکدادانەکان',
      title_kmr: 'Parastina Momanê û Pevçûn',
      physical_law: 'm₁·v₁ᵢ + m₂·v₂ᵢ = m₁·v₁_f + m₂·v₂_f',
      simulation_inputs: ['كتل الجسمين (m1, m2)', 'السرعات الابتدائية (v1i, v2i)', 'معامل المرونة e (مرن/غير مرن)'],
      simulation_outputs: ['السرعات النهائية (v1f, v2f)', 'الزخم الكلي المحفوظ P_tot', 'الطاقة الحركية المفقودة ΔK'],
      simulation_inputs_en: ['Bodies Masses (m1, m2)', 'Initial Velocities (v1i, v2i)', 'Restitution Coefficient e (Elastic / Inelastic)'],
      simulation_inputs_ku: ['بارستەی هەردوو تەن (m1, m2)', 'خێراییە سەرەتاییەکان (v1i, v2i)', 'هاوکۆلکەی  e (کشانەوە/ناکشانەوە)'],
      simulation_inputs_kmr: ['Baristeyên her du tenan (m1, m2)', 'Lezên destpêkê (v1i, v2i)', 'Hevkêşeya elastîkî e (elastîk/ne-elastîk)'],
      simulation_outputs_en: ['Final Velocities (v1f, v2f)', 'Total Conserved Momentum P_tot', 'Lost Kinetic Energy ΔK'],
      simulation_outputs_ku: ['خێراییە کۆتاییەکان (v1f, v2f)', 'بڕی تەوژمی گشتی پارێزراو P_tot', 'وزەی جوڵەی ونبوو ΔK'],
      simulation_outputs_kmr: ['Lezên dawî (v1f, v2f)', 'Momentuma tevayî ya parastî P_tot', 'Enerjiya tevgerê ya windabûyî ΔK'],
      icon: <Scale className="w-4 h-4 text-orange-400" />
    },
    {
      id: 27,
      expKey: 'freefall',
      category: 'mechanics',
      title_ar: 'السقوط الحر وتسارع الجاذبية',
      title_en: 'Free Fall Kinematics and Gravitational Acceleration',
      title_ku: 'کەوتنی ئازاد و تاودانی کێشکردن',
      title_kmr: 'Ketina Azad û Lezkirina Kêşweriyê',
      physical_law: 'v = g · t,  y = ½ · g · t²',
      simulation_inputs: ['ارتفاع الإسقاط h (متر)', 'تسارع كوكب الجاذبية g (أرض/قمر/مريخ)', 'مقاومة الهواء'],
      simulation_outputs: ['زمن السقوط الحر t (ثانية)', 'سرعة الاصطدام بالأرض v_impact', 'منحنى المسافة والسرعة'],
      simulation_inputs_en: ['Drop Height h (m)', 'Planetary Gravitational Acceleration g (Earth / Moon / Mars)', 'Air Resistance'],
      simulation_inputs_ku: ['بەرزی هەڵدانی تەن h (بە مەتر)', 'خێرایی گۆڕینی کێشی هەسارە g (زەوی/مانگ/مەریخ)', 'بەرگری هەوا'],
      simulation_inputs_kmr: ['Bilindahiya avêtinê h (bi metre)', 'Lezkirina kişandinê ya gerstêrkê g (Erd/Heyv/Merîx)', 'Berxwedana hewayê'],
      simulation_outputs_en: ['Free Fall Time t (s)', 'Ground Impact Velocity v_impact', 'Distance & Velocity Graphs'],
      simulation_outputs_ku: ['کاتی کەوتنی ئازاد t (بە چرکە)', 'خێرایی لێدان بە زەویدا v_impact', 'گرافی دووری و خێرایی'],
      simulation_outputs_kmr: ['Dema ketina azad t (bi saniye)', 'Leza lihevketinê bi erdê re v_impact', 'Grafîka rê û lezê'],
      icon: <ArrowDownToDot className="w-4 h-4 text-rose-400" />
    },
    {
      id: 28,
      expKey: 'acoustic_resonance',
      category: 'waves_sound',
      title_ar: 'الرنين الصوتي في الأعمدة الهوائية والأنابيب',
      title_en: 'Acoustic Resonance in Open and Closed Pipes',
      title_ku: 'دەنگدانەوە لە بۆرییە هەواییەکاندا',
      title_kmr: 'Rezonansa Dengê li Lûleyên Hewayê',
      physical_law: 'f_n = (n · v) / (4L)  (Closed)  |  (n · v) / (2L)  (Open)',
      simulation_inputs: ['طول العمود الهوائي L', 'نوع الأنبوب (مغلق/مفتوح الطرفين)', 'درجة حرارة الهواء T'],
      simulation_outputs: ['ترددات النغمات التوافقية fn', 'مواقع العقد والبطون لموجة الضغط', 'حالة الرنين'],
      simulation_inputs_en: ['Air Column Length L', 'Pipe Type (Closed / Open Tube)', 'Air Temperature T'],
      simulation_inputs_ku: ['درێژی ستوونی هەوا L (یان بەرزی کۆلۆنی هەوا)', 'جۆری بۆری (داخراو / کراوەی هەردوو لای)', 'پلەی گەرمی هەوا T'],
      simulation_inputs_kmr: ['Dirêjahiya stûna hewayê L', 'Cûreya borîyê (girtî / her du alî vekirî)', 'Germahiya hewayê T'],
      simulation_outputs_en: ['Harmonic Frequencies fn', 'Pressure Wave Nodes and Antinodes Locations', 'Resonance State'],
      simulation_outputs_ku: ['لەڕەلەرە هاوکێشەکان)', 'شوێنی گرێکان و قۆلفەکان شەپۆلی پەستان (گرێ = شوێنی بێلەرزین، قۆلف = شوێنی زۆرترین لەرزین)', 'دۆخی لەرزینی هاوبەش)'],
      simulation_outputs_kmr: ['Frekansên harmonîk fn (یان Pirhêziyên dengên hevaheng)', 'Cihên girêk û zikên pêla pestanê (girêk = cihê bêlerizîn, zik = cihê herî zêde lerizîn)', 'Rewşa rezonansê  )'],
      icon: <Volume2 className="w-4 h-4 text-cyan-400" />
    },
    {
      id: 29,
      expKey: 'sound_speed',
      category: 'waves_sound',
      title_ar: 'سرعة الصوت في عمود الرنين المائي',
      title_en: 'Speed of Sound with Water Column Resonance',
      title_ku: 'خێرایی دەنگ بە ستوونی ئاو',
      title_kmr: 'Leza Dengê bi Stûna Avê ya Rezonansê',
      physical_law: 'v = f · λ = 2f · (L₂ - L₁)',
      simulation_inputs: ['تردد الشوكة الرنانة f (هرتز)', 'مستوى ارتفاع الماء L1 و L2', 'درجة حرارة الوسط T'],
      simulation_outputs: ['الطول الموجي للصوت λ', 'سرعة الصوت المحسوبة v (م/ث)', 'نسبة الخطأ القياسي'],
      simulation_inputs_en: ['Tuning Fork Frequency f (Hz)', 'Water Column Resonance Levels L1 & L2', 'Medium Temperature T'],
      simulation_inputs_ku: ['لەرزەی پێچەپەنی دەنگدان f (بە هێرتز) (یان ڕەنگی شوکەی دەنگدەر)', 'ئاستی بەرزی ئاو L1 و L2 (بەرزی ئاو لە بۆرییەکەدا)', 'پلەی گەرمی ناوەند T (پلەی گەرمی هەوای ناو بۆری)'],
      simulation_inputs_kmr: ['Frekansa (pirhêziya) çetala dengveder f (bi Hz) (یان çetala rezonansê)', 'Asta bilindahiya avê L1 û L2 (bilindahiya avê di boriyê de)', 'Germahiya navgînê T (germahiya hewayê di nav boriyê de)'],
      simulation_outputs_en: ['Sound Wavelength λ', 'Calculated Speed of Sound v (m/s)', 'Standard Percentage Error'],
      simulation_outputs_ku: ['درێژی شەپۆلی دەنگ λ', 'خێرایی دەنگی حیسابکراو v (بە مەتر لە چرکەدا)', 'ڕێژەی هەڵەی ستاندارد (یان ڕێژەی هەڵەی پێوەری بەراورد بە بەهای ڕاستەقینە)'],
      simulation_outputs_kmr: ['Dirêjahiya pêla deng λ', 'Leza denge ya hesabkirî v (bi m/s)', 'Rêjeya çewtiya standard (yan Rêjeya xeta pîvanê li hember nirxa \nrastîn)'],
      icon: <Volume2 className="w-4 h-4 text-sky-400" />
    },
    {
      id: 30,
      expKey: 'waves',
      category: 'waves_sound',
      title_ar: 'الموجات وتداخل شقي يونغ والحيود',
      title_en: 'Wave Optics & Young Double Slit Interference',
      title_ku: 'شەپۆلەکان و دوانە قڵیشی یۆنگ',
      title_kmr: 'Pêlên Optîk û Çirûskên Young',
      physical_law: 'd · sin(θ) = m · λ,  y_m = (m · λ · L) / d',
      simulation_inputs: ['المسافة بين الشقين d', 'الطول الموجي للضوء λ (نانومتر)', 'بعد الشاشة L'],
      simulation_outputs: ['المسافة بين الأهداب المضيئة Δy', 'نمط التداخل والشدة الضوئية على الشاشة'],
      simulation_inputs_en: ['Slit Separation Distance d', 'Light Wavelength λ (nm)', 'Screen Distance L'],
      simulation_inputs_ku: ['d  دووری نێوان هەردوو دەرزەکە)', 'درێژی شەپۆلی ڕووناکی λ (بە نانۆمەتر)', 'L (دووری نێوان درز و شاشەکە)'],
      simulation_inputs_kmr: ['Dûrahiya navbera her du qelşan) d', 'Dirêjahiya pêla ronahiyê λ (bi nanometre)', 'Dûrahiya ekranê'],
      simulation_outputs_en: ['Fringe Spacing Between Bright Fringes Δy', 'Interference Pattern & Intensity Profile on Screen'],
      simulation_outputs_ku: ['Δy  دووری نێوان هێڵە تەنگە ڕووناکەکانی دەستێوەردان)', 'شێوازی دەستێوەردان و توندی ڕووناکی لەسەر شاشە (چۆنیەتی بڵاوبوونەوەی پەیکەری دەستێوەردان و ڕەوشتی ڕووناکی)'],
      simulation_outputs_kmr: ['Dûrahiya navbera xêzên (rîsên) ronahîdar Δy (navbera keriyên ronahî yên di şêwaza destwerdanê de)', 'Şêwaza destwerdanê û tundiya ronahiyê li ser ekranê (awayê belavbûna şêwaza destwerdanê û hêza ronahiyê)'],
      icon: <Waves className="w-4 h-4 text-blue-400" />
    },
    {
      id: 31,
      expKey: 'magnetic_field',
      category: 'em_atomic',
      title_ar: 'المجال المغناطيسي وقوة لورنتز',
      title_en: 'Magnetic Field and Lorentz Force on Charges',
      title_ku: 'بواری موگناتیسی و هێزی لۆرێنتز',
      title_kmr: 'Qada Manyetîk û Hêza Lorentz',
      physical_law: 'F = q · v · B · sin(θ),  r = (m·v) / (q·B)',
      simulation_inputs: ['شحنة الجسيم q', 'كتلة الجسيم m', 'السرعة المتجهة v', 'شدة المجال المغناطيسي B'],
      simulation_outputs: ['قوة لورنتز F (نيوتن)', 'نصف قطر المدار الدائري r', 'تردد السيكلوترون'],
      simulation_inputs_en: ['Particle Charge q', 'Particle Mass m', 'Velocity Vector v', 'Magnetic Field Intensity B'],
      simulation_inputs_ku: ['بارگەی تەنوولکە q', 'بارستەی تەنوولکە m', 'خێرایی ئاراستەیی v', 'توندي بواری موگناتیسی B'],
      simulation_inputs_kmr: ['Barê parçekokê q', 'Senga parçekokê m', 'Leza xêzî v', 'Xurtiya zeviya magnetîkî B'],
      simulation_outputs_en: ['Lorentz Force F (N)', 'Circular Orbit Radius r', 'Cyclotron Frequency'],
      simulation_outputs_ku: ['هێزی لۆرێنتز F (نیوتن)', 'نیوەتیرەی ڕێڕەوی بازنەیی r', 'لەرەلەری سيكلوترۆن'],
      simulation_outputs_kmr: ['Hêza Lorenzê F (N)', 'Nîveşkêla rêgeha dorhêlî r', 'Frekansa sîklotronê'],
      icon: <Magnet className="w-4 h-4 text-purple-400" />
    },
    {
      id: 32,
      expKey: 'atomic_spectra',
      category: 'em_atomic',
      title_ar: 'التحليل الطيفي والكمي',
      title_en: 'Atomic Emission Spectra and Quantum Transitions',
      title_ku: 'شیکاری سپێکتڕۆمی و گواستنەوەی کوانتەم',
      title_kmr: 'Spektroskopî û Veguhastina Kwantûm',
      physical_law: 'ΔE = E_final - E_initial = (h · c) / λ',
      simulation_inputs: ['نوع العنصر (هيدروجين/هيليوم/زئبق/نيون)', 'مستويات الانتقال الإلكتروني n1 و n2'],
      simulation_outputs: ['خطوط الطيف الانبعاثي المرئية', 'طاقة الفوتون المنبعث ΔE (إلكترون فولت)', 'الطول الموجي λ'],
      simulation_inputs_en: ['Element Type (Hydrogen / Helium / Mercury / Neon)', 'Electron Transition Levels n1 & n2'],
      simulation_inputs_ku: ['جۆری توخم (هایدرۆجین / هیلیۆم / مێرکوری / نێۆن)', 'ئاستەکانی گواستنەوەی ئەلیکترۆنی n1 و n2'],
      simulation_inputs_kmr: ['Cûreyê elementê (Hîdrojen / Helyûm / Zîbeq / Nezon)', 'Astên veguhastina elektronan n1 û n2'],
      simulation_outputs_en: ['Visible Emission Spectral Lines', 'Emitted Photon Energy ΔE (eV)', 'Wavelength λ'],
      simulation_outputs_ku: ['هێڵەکانی سپێکتڕۆمی دەرچووی دیار', 'وزەی فۆتۆنی دەرچوو ΔE (ئەلیکترۆن فولت)', 'درێژی شەپۆل λ'],
      simulation_outputs_kmr: ['Xêzên şebenga derketî yên xuyayî', 'Enerjiya fotona derketî ΔE (eV)', 'Dirêjahiya pêlê λ'],
      icon: <Atom className="w-4 h-4 text-indigo-400" />
    },
    {
      id: 33,
      expKey: 'circuits',
      category: 'em_atomic',
      title_ar: 'الدوائر الكهربائية وقانون أوم والقدرة',
      title_en: 'Electric Circuits, Ohm Law and Power Dissipation',
      title_ku: 'خولگە کارەباییەکان و یاسای ئۆم',
      title_kmr: 'Çerxeyên Elektrîkê û Qanûna Ohm',
      physical_law: 'V = I · R,  P = V · I = I² · R',
      simulation_inputs: ['جهد البطارية V (فولت)', 'قيمة المقاومة R (أوم)', 'نوع التوصيل (توالي/توازي)'],
      simulation_outputs: ['شدة التيار المار I (أمبير)', 'القدرة الكهربائية المستهلكة P (واط)', 'هبوط الجهد'],
      simulation_inputs_en: ['Battery Voltage V (Volts)', 'Resistance Value R (Ohms)', 'Connection Type (Series / Parallel)'],
      simulation_inputs_ku: ['پۆتەنسیالی بەتاری V (ڤۆڵت)', 'بڕی بەرگری R (ئۆم)', 'جۆری بەستن (بەدوایەکدا / هاوتەريب)'],
      simulation_inputs_kmr: ['Potansiyela betariyê V (Volt)', 'Nirxê xwegiriyê R (Ohm)', 'Cûreyê girêdanê (Serhev / Beramber)'],
      simulation_outputs_en: ['Current Intensity I (Amperes)', 'Consumed Electrical Power P (Watts)', 'Voltage Drop'],
      simulation_outputs_ku: ['توندی تەزووی ڕەتبوو I (ئەمپێر)', 'توانای کارەبایی بەکارهاتوو P (واط)', 'دابەزینی پۆتەنسیال'],
      simulation_outputs_kmr: ['Xurtiya herikîna elektrîkî I (A)', 'Karîna elektrîkî ya xerckirî P (Watt)', 'Daxistina potansiyelê'],
      icon: <Zap className="w-4 h-4 text-yellow-400" />
    },
    {
      id: 34,
      expKey: 'buoyancy',
      category: 'fluids_thermo_optics',
      title_ar: 'قاعدة أرخميدس وقوة الطفو في السوائل',
      title_en: 'Archimedes Principle and Buoyant Force',
      title_ku: 'بنەمای ئەرخەمیدس و هێزی سەرئاوکەوتن',
      title_kmr: 'Prînsîba Arşîmedes û Hêza Hilkişînê',
      physical_law: 'F_B = ρ_fluid · V_disp · g',
      simulation_inputs: ['حجم الجسم المغمور V_obj', 'كثافة مادة الجسم ρ_obj', 'كثافة السائل ρ_fluid'],
      simulation_outputs: ['قوة الطفو F_B (نيوتن)', 'الوزن الظاهري للجسم W_apparent', 'حالة الجسم (يطفو / يعلق / يغوص)'],
      simulation_inputs_en: ['Submerged Body Volume V_obj', 'Body Material Density ρ_obj', 'Liquid Density ρ_fluid'],
      simulation_inputs_ku: ['قەبارەی تەنی نقومبوو V_obj', 'چڕیی ماددەی تەنەکە ρ_obj', 'چڕیی شلەکە ρ_fluid'],
      simulation_inputs_kmr: ['Qebareya gewdeyê nuxumandî V_obj', 'Tîriya madeya gewdeyî ρ_obj', 'Tîriya rona ρ_fluid'],
      simulation_outputs_en: ['Buoyant Force F_B (N)', 'Apparent Weight of Body W_apparent', 'Body State (Floats / Suspended / Sinks)'],
      simulation_outputs_ku: ['هێزی سەرئاوکەوتن F_B (نیوتن)', 'کێشی دیاری تەنەکە W_apparent', 'دۆخی تەنەکە (سەرئاو دەکەوێت / هەڵدەواسرێت / نوقم دەبێت)'],
      simulation_outputs_kmr: ['Hêza hilkişînê F_B (N)', 'Giranîya diyarker a gewdeyî W_apparent', 'Rewşa gewdeyî (dikeve ser avê / hildewaşê / diqulipe)'],
      icon: <Droplets className="w-4 h-4 text-teal-400" />
    },
    {
      id: 35,
      expKey: 'thermodynamics',
      category: 'fluids_thermo_optics',
      title_ar: 'الغاز المثالي والديناميكا الحرارية',
      title_en: 'Ideal Gas Law and Thermodynamics State',
      title_ku: 'گازی نموونەیی و تێرمۆداینامیک',
      title_kmr: 'Gaza Îdeal û Rewşa Termodînamîkê',
      physical_law: 'P · V = n · R · T',
      simulation_inputs: ['عدد مولات الغاز n', 'حجم الوعاء V', 'درجة الحرارة المطلقة T (كلفن)'],
      simulation_outputs: ['ضغط الغاز P (باسكال)', 'متوسط الطاقة الحركية للجزيئات <E_k>', 'مخطط P-V'],
      simulation_inputs_en: ['Gas Moles Count n', 'Container Volume V', 'Absolute Temperature T (K)'],
      simulation_inputs_ku: ['ژمارەی مولەکانی گاز n', 'قەبارەی دەفرەکە V', 'پلەی گەرمی ڕەها T (کلفن)'],
      simulation_inputs_kmr: ['Hejmara molên gazê n', 'Qebareya firaqê V', 'Pileya germahiyê ya reha T (K)'],
      simulation_outputs_en: ['Gas Pressure P (Pa)', 'Average Kinetic Energy of Molecules <E_k>', 'P-V Diagram'],
      simulation_outputs_ku: ['پەستانی گاز P (باسکال)', 'ناوەندی وزەی جووڵەییی تەنوڵکەکان <E_k>', 'هێڵکاری P-V'],
      simulation_outputs_kmr: ['Dewsîna gazê P (Pa)', 'Navîniya enerjiya tevgerê ya parçekokan <E_k>', 'Grafîka P-V'],
      icon: <Flame className="w-4 h-4 text-orange-400" />
    },
    {
      id: 36,
      expKey: 'optics',
      category: 'fluids_thermo_optics',
      title_ar: 'البصريات وقانون سنيل في الانكسار',
      title_en: 'Optics and Snell Law of Refraction',
      title_ku: 'بینایی و یاسای سنێڵ لە شکانەوەدا',
      title_kmr: 'Optîk û Qanûna Snell ya Şikandinê',
      physical_law: 'n₁ · sin(θ₁) = n₂ · sin(θ₂)',
      simulation_inputs: ['معامل انكسار الوسط الأول n1', 'معامل انكسار الوسط الثاني n2', 'زاوية السقوط θ1'],
      simulation_outputs: ['زاوية الانكسار θ2', 'الزاوية الحرجة للانعكاس الكلي الداخلي θ_c', 'سرعة الضوء بالوسط'],
      simulation_inputs_en: ['Refractive Index of First Medium n1', 'Refractive Index of Second Medium n2', 'Incident Angle θ1'],
      simulation_inputs_ku: ['هاوکۆڵکەی شکانەوەی ناوەندی یەکەم n1', 'هاوکۆڵکەی شکانەوەی ناوەندی دووەم n2', 'گۆشەی کەوتن θ1'],
      simulation_inputs_kmr: ['Hevkêşeya şikandina hola yekem n1', 'Hevkêşeya şikandina hola duyem n2', 'Goşeya ketinê θ1'],
      simulation_outputs_en: ['Refracted Angle θ2', 'Critical Angle for Total Internal Reflection θ_c', 'Speed of Light in Medium'],
      simulation_outputs_ku: ['گۆشەی شکانەوە θ2', 'گۆشەی شلۆق بۆ ڕەنگدانەوەی تەواوی ناوەکی θ_c', 'خێرایی ڕووناکی لە ناوەنددا'],
      simulation_outputs_kmr: ['Goşeya şikandinê θ2', 'Goşeya krîtîk a vajîbûna tevahî ya hundirîn θ_c', 'Leza şewqê di holê de'],
      icon: <Eye className="w-4 h-4 text-emerald-400" />
    },

    // ==============================================================
    // --- EXTENDED & INTERMEDIATE LABS (37 - 52) ---
    // ==============================================================
    {
      id: 37,
      expKey: 'build_atom',
      category: 'em_atomic',
      title_ar: 'بناء الذرة والجدول الدوري',
      title_en: 'Build an Atom & Periodic Table',
      title_ku: 'دروستکردنی گەردیلە و خشتەی خولی',
      title_kmr: 'Avakirina Atomê û Tabloya Periyodîk',
      physical_law: 'Z = p,  A = p + n,  Net Charge = p - e',
      simulation_inputs: ['عدد البروتونات p', 'عدد النيوترونات n', 'عدد الإلكترونات e'],
      simulation_outputs: ['اسم ورمز العنصر', 'العدد الكتلي A', 'الشحنة الصافية والاتزان الذري'],
      simulation_inputs_en: ['Number of Protons p', 'Number of Neutrons n', 'Number of Electrons e'],
      simulation_inputs_ku: ['ژمارەی پروتۆنەکان p', 'ژمارەی نيوترۆنەکان n', 'ژمارەی ئەلیکترۆنەکان e'],
      simulation_inputs_kmr: ['Hejmara protonan p', 'Hejmara neutronan n', 'Hejmara elektronan e'],
      simulation_outputs_en: ['Element Name & Symbol', 'Mass Number A', 'Net Charge & Atomic Equilibrium'],
      simulation_outputs_ku: ['ناو و هێمای توخمەکە', 'ژمارەی بارستەیی A', 'بارگەی پوخت و هاوسەنگی گەردیلەیی'],
      simulation_outputs_kmr: ['Nav û sembola elementê', 'Hejmara sengî A', 'Bara netîce û hevsengiya atomî'],
      icon: <Atom className="w-4 h-4 text-red-400" />
    },
    {
      id: 38,
      expKey: 'build_nucleus',
      category: 'em_atomic',
      title_ar: 'بناء النواة وطاقة الربط النووي',
      title_en: 'Build a Nucleus & Binding Energy',
      title_ku: 'دروستکردنی ناوک و وزەی بەستنەوە',
      title_kmr: 'Avakirina Dendikê û Enerjiya Girêdanê',
      physical_law: 'E_b = Δm · c²',
      simulation_inputs: ['العدد الذري Z', 'العدد الكتلي A', 'طاقة الربط لكل نيوكليون'],
      simulation_outputs: ['طاقة الربط النووي الكلية E_b', 'نقص الكتلة Δm', 'استقرار النواة ونوع الانحلال'],
      simulation_inputs_en: ['Atomic Number Z', 'Mass Number A', 'Binding Energy per Nucleon'],
      simulation_inputs_ku: ['ژمارەی گەردیلەیی Z', 'ژمارەی بارستەیی A', 'وزەی بەستنەوە بۆ هر نیوکلۆنێک'],
      simulation_inputs_kmr: ['Hejmara atomî Z', 'Hejmara sengî A', 'Enerjiya girêdanê ji bo her nukleonekî'],
      simulation_outputs_en: ['Total Nuclear Binding Energy E_b', 'Mass Defect Δm', 'Nuclear Stability & Decay Type'],
      simulation_outputs_ku: ['کۆی وزەی بەستنەوەی ناوکی E_b', 'کەمبوونی بارستایی Δm', 'سەقامگیری ناوک و جۆری تێکچوون'],
      simulation_outputs_kmr: ['Enerjiya girêdana dendikî ya giştî E_b', 'Kêmtiya sengê Δm', 'Cihêbûna dendikê û cûreyê hilweşînê'],
      icon: <Shield className="w-4 h-4 text-purple-400" />
    },
    {
      id: 39,
      expKey: 'rutherford_scattering',
      category: 'em_atomic',
      title_ar: 'تشتت رذرفورد واكتشاف النواة الذرية',
      title_en: 'Rutherford Alpha Scattering Experiment',
      title_ku: 'پەرشبوونەوەی ئەلفای ڕەزەرفۆرد',
      title_kmr: 'Belavbûna Alpha ya Rutherford',
      physical_law: 'F = (k · q_α · q_nucleus) / r²',
      simulation_inputs: ['طاقة جسيمات ألفا الساقطة E_α', 'العدد الذري لصفيحة الهدف Z', 'معامل التصادم b'],
      simulation_outputs: ['زاوية التشتت θ', 'مسار جسيمات ألفا', 'المسافة الأقرب للنواة d_min'],
      simulation_inputs_en: ['Incident Alpha Particle Energy E_α', 'Target Foil Atomic Number Z', 'Impact Parameter b'],
      simulation_inputs_ku: ['وزەی گەردیلەکانی ئەلفای کەوتوو E_α', 'ژمارەی گەردیلەیی پەڕەی ئامانج Z', 'هاوکۆڵکەی پێکدادان b'],
      simulation_inputs_kmr: ['Enerjiya parçekokên alpha yên hatî E_α', 'Hejmara atomî ya pelika armanc Z', 'Hevkêşeya lihevxistinê b'],
      simulation_outputs_en: ['Scattering Angle θ', 'Alpha Particles Trajectory', 'Distance of Closest Approach d_min'],
      simulation_outputs_ku: ['گۆشەی پەرشبوونەوە θ', 'ڕێڕەوی تەنوڵکەکانی ئەلفا', 'نزیکترین دووری لە ناوک d_min'],
      simulation_outputs_kmr: ['Goşeya belavbûnê θ', 'Rêgeha parçekokên alpha', 'Dûrahiya herî nêzîk ji dendikê re d_min'],
      icon: <Target className="w-4 h-4 text-amber-400" />
    },
    {
      id: 40,
      expKey: 'molecules_and_light',
      category: 'em_atomic',
      title_ar: 'الجزيئات والضوء وتفاعل الفوتونات',
      title_en: 'Molecules and Light Photon Interaction',
      title_ku: 'گەردەکان و کارلێکی فۆتۆن لەگەڵ ڕووناکی',
      title_kmr: 'Molekul û Ronahî',
      physical_law: 'E = h · f,  E_rot < E_vib < E_elec',
      simulation_inputs: ['نوع الجزيء (CO2, H2O, CH4, O2, N2)', 'طول موجة الفوتون (ميكروويف/تحت حمراء/مرئي/فوق بنفسجي)'],
      simulation_outputs: ['استجابة الجزيء (دوران/اهتزاز/تأين/نفاذ)', 'تفسير ظاهرة الاحتباس الحراري'],
      simulation_inputs_en: ['Molecule Type (CO2, H2O, CH4, O2, N2)', 'Photon Wavelength (Microwave / Infrared / Visible / Ultraviolet)'],
      simulation_inputs_ku: ['جۆری گەرد (CO2, H2O, CH4, O2, N2)', 'درێژی شەپۆلی فۆتۆن (مایکرۆوەیف / ژێر سوور / دیار / سەر و وەنەوشەیی)'],
      simulation_inputs_kmr: ['Cûreyê molekûlê (CO2, H2O, CH4, O2, N2)', 'Dirêjahiya pêla fotonê (Mîkrowave / Bin-sor / Xuyayî / Ser-binefşî)'],
      simulation_outputs_en: ['Molecule Response (Rotation / Vibration / Ionization / Transmission)', 'Greenhouse Effect Explanation'],
      simulation_outputs_ku: ['وەڵامدانەوەی گەرد (خولانەوە / لەرینەوە / ئایۆنبوون / تێپەڕبوون)', 'ڕوونکردنەوەی دیاردەی قەتیسبوونی گەرمی'],
      simulation_outputs_kmr: ['Bersiva molekûlê (Zivirîn / Lerizîn / Îyonbûn / Derbasbûn)', 'Şîrovekirina diyardeya germbûna gerdûnî'],
      icon: <Waves className="w-4 h-4 text-sky-400" />
    },
    {
      id: 41,
      expKey: 'color_vision',
      category: 'fluids_thermo_optics',
      title_ar: 'رؤية الألوان والخلط الإضافي للضوء',
      title_en: 'Color Vision and RGB Additive Mixing',
      title_ku: 'بینینی ڕەنگەکان و تێکەڵکردنی ڕووناکی',
      title_kmr: 'Dîtina Rengan û Tevlihevkirina RGB',
      physical_law: 'Color = R(λ) + G(λ) + B(λ)',
      simulation_inputs: ['شدة اللون الأحمر R (0-255)', 'شدة اللون الأخضر G (0-255)', 'شدة اللون الأزرق B (0-255)'],
      simulation_outputs: ['اللون النهائي المدرك في العين', 'استجابة مستقبلات المخاريط البصرية'],
      simulation_inputs_en: ['Red Intensity R (0-255)', 'Green Intensity G (0-255)', 'Blue Intensity B (0-255)'],
      simulation_inputs_ku: ['توندی ڕەنگی سور R (0-255)', 'توندی ڕەنگی سەوز G (0-255)', 'توندی ڕەنگی شین B (0-255)'],
      simulation_inputs_kmr: ['Tundiya rengê sor R (0-255)', 'Tundiya rengê kesk G (0-255)', 'Tundiya rengê şîn B (0-255)'],
      simulation_outputs_en: ['Final Perceived Color in Eye', 'Retinal Cone Photoreceptors Response'],
      simulation_outputs_ku: ['ڕەنگی کۆتایی وەرگیراو لە چاودا', 'وەڵامدانەوەی وەرگرە مخرووتییەکانی بینین'],
      simulation_outputs_kmr: ['Rengê dawî yê têگەیشtî di çav de', 'Bersiva wergirên qutikî (kewnikî) ên dîtinê'],
      icon: <Eye className="w-4 h-4 text-pink-400" />
    },
    {
      id: 42,
      expKey: 'capacitor_lab',
      category: 'em_atomic',
      title_ar: 'مختبر المكثف الكهربائي والطاقة المخزونة',
      title_en: 'Capacitor Lab & Stored Electric Energy',
      title_ku: 'تاقیگەی بارگەکەر و وزەی کارەبایی',
      title_kmr: 'Kondansator û Enerjiya Tomarkirî',
      physical_law: 'C = (ε · A) / d,  Q = C · V,  U = ½ · C · V²',
      simulation_inputs: ['مساحة اللوحين A', 'المسافة الفاصلة d', 'جهد البطارية V', 'ثابت العازلية κ'],
      simulation_outputs: ['السعة الكهربائية C (فاراد)', 'الشحنة المتراكمة Q', 'الطاقة المخزونة U (جول)'],
      icon: <Battery className="w-4 h-4 text-blue-400" />
    },
    {
      id: 43,
      expKey: 'charges_and_fields',
      category: 'em_atomic',
      title_ar: 'الشحنات الكهربائية وخطوط المجال والجهد',
      title_en: 'Electric Charges, Field Lines & Equipotentials',
      title_ku: 'بارگە کارەباییەکان و هێڵەکانی بوار',
      title_kmr: 'Barg û Xetên Qada Elektrîkê',
      physical_law: 'E = (k · Q) / r²,  V = (k · Q) / r',
      simulation_inputs: ['مواقع الشحنات الموجبة والسالبة (x, y)', 'مقدار الشحنة Q'],
      simulation_outputs: ['شبكة متجهات شدة المجال E', 'خطوط تساوي الجهد V', 'حركة الشحنة الاختبارية'],
      icon: <Zap className="w-4 h-4 text-yellow-400" />
    },
    {
      id: 44,
      expKey: 'resistance_in_wire',
      category: 'em_atomic',
      title_ar: 'مقاومة السلك والمقاومية النوعية',
      title_en: 'Resistance in a Wire & Resistivity Law',
      title_ku: 'بەرگری لە وایەردا و خۆڕاگریی تایبەت',
      title_kmr: 'Berxwedana Têlê û Berxwedêriya Taybet',
      physical_law: 'R = (ρ · L) / A',
      simulation_inputs: ['المقاومية النوعية للمادة ρ', 'طول السلك L', 'مساحة المقطع العرضي A'],
      simulation_outputs: ['المقاومة الإجمالية R (أوم)', 'كثافة الشوائب الذرية المعيقة للتيار'],
      icon: <Zap className="w-4 h-4 text-amber-400" />
    },
    {
      id: 45,
      expKey: 'gravity_and_orbits',
      category: 'gravity_astrophysics',
      title_ar: 'الجاذبية والمدارات الفضائية والسرعة المدارية',
      title_en: 'Gravity and Orbital Mechanics',
      title_ku: 'کێشکردن و خولگە ئاسمانییەکان',
      title_kmr: 'Kêşwerî û Xelekên Gerdûnî',
      physical_law: 'F = (G · M · m) / r²,  v_orb = √(G·M / r)',
      simulation_inputs: ['كتلة النجم المركزي M', 'كتلة الكوكب/القمر m', 'نصف القطر المداري r'],
      simulation_outputs: ['السرعة المدارية v', 'الزمن الدوري للدورة T', 'مسار الاستقرار المداري'],
      simulation_inputs_en: ['Central Star Mass (M)', 'Planet/Moon Mass (m)', 'Orbital Radius (r)'],
      simulation_inputs_ku: ['بارستەی ئەستێرەی ناوەندی', 'بارستەی هەسارە/مانگ )', 'نیوەتیرەی خولگەیی)'],
      simulation_inputs_kmr: ['Baristeya stêra navendî', 'Baristeya gerstêrk/ heyvê  )', 'Nîv-tîrêja dorhêlê (yan'],
      simulation_outputs_en: ['Orbital Velocity (v)', 'Orbital Period (T)', 'Orbital Stability Trajectory'],
      simulation_outputs_ku: ['خێرایی خولگەیی', 'ماوەی خولگە', 'ڕێچکەی سەقامگیری خولگە)'],
      simulation_outputs_kmr: ['Leza dorhêlê )', 'Dema dorhêlê (yan Serdema gerê)', 'Rêya îstîqrarê ya dorhêlê )'],
      icon: <Orbit className="w-4 h-4 text-emerald-400" />
    },
    {
      id: 46,
      expKey: 'keplers_laws',
      category: 'gravity_astrophysics',
      title_ar: 'قوانين كبلر لحركة الكواكب المدارية',
      title_en: 'Kepler Laws of Planetary Motion',
      title_ku: 'یاساکانی کێپلەر بۆ جووڵەی هەسارەکان',
      title_kmr: 'Qanûnên Kepler ên Tevgera Gerstêrkan',
      physical_law: 'T² / a³ = (4π²) / (G · M)',
      simulation_inputs: ['نصف المحور الأكبر a', 'الانحراف المداري e', 'كتلة النجم المركزي M'],
      simulation_outputs: ['الزمن الدوري للمدار T', 'مساحات القطاعات المتساوية في أزمنة متساوية', 'موقع الحضيض والأوج'],
      simulation_inputs_en: ['Semi-Major Axis (a)', 'Orbital Eccentricity (e)', 'Central Star Mass (M)'],
      simulation_inputs_ku: ['نیوەتەوەری گەورەی خولگە (a) (یان نیوەتیرەی درێژی خولگە)', '(یان ناڕێکی خولگە e)', 'بارستەی ئەستێرەی ناوەندی (M)'],
      simulation_inputs_kmr: ['a) ( Nîv-tîrêja mezin))', 'Eksantrîkiya gerê (e) )', 'Baristeya stêra navendî (M)'],
      simulation_outputs_en: ['Orbital Period (T)', 'Equal Areas in Equal Times (Kepler’s Second Law)', 'Perihelion & Aphelion Positions'],
      simulation_outputs_ku: ['ماوەی خولگەیی (T) )', 'ڕووبەری یەکسان لە کاتی یەکساندا (یاسای دووەمی کێپلەر)', 'شوێنی حەضیض (نزیکترین خاڵ) و ئەوج (دوورترین خاڵ) لە ئەستێرە'],
      simulation_outputs_kmr: ['Dema gerê (T) )', 'Rûberên sektoran ên wekhev di demên wekhev de (Qanûna duyem a Kepler)', 'Cihê perlîyon   /) û \naplayonê  ji stêrê'],
      icon: <Compass className="w-4 h-4 text-sky-400" />
    },
    {
      id: 47,
      expKey: 'energy_skate_park',
      category: 'mechanics',
      title_ar: 'حديقة التزلج وتحولات الطاقة وحفظها',
      title_en: 'Energy Skate Park and Energy Transformations',
      title_ku: 'پارکی خلیسکێنە و گۆڕانکارییەکانی وزە',
      title_kmr: 'Baxçeyê Xweşiqandinê û Guhertina Enerjiyê',
      physical_law: 'E_mech = K + U_g + E_thermal',
      simulation_inputs: ['شكل المسار (منحنى/حلقة دائرية/منحدر)', 'كتلة المتزلج m', 'معامل الاحتكاك'],
      simulation_outputs: ['طاقة الحركة K', 'طاقة الوضع U_g', 'الطاقة الحرارية المتولدة', 'سرعة المتزلج في كل نقطة'],
      simulation_inputs_en: ['Track Shape (Curved / Loop / Incline)', 'Skater Mass m', 'Friction Coefficient'],
      simulation_inputs_ku: ['شێوەی ڕێڕەو (کەوانە/بازنەی داخراو/لاربوونەوە)', 'بارستەی خلیسکەر m', 'هاوکۆلکەی لێکخشان'],
      simulation_inputs_kmr: ['Şêweya rê (kevan/xeleka dorhêlî/xwehrbûn)', 'Baristeya xijokê m', 'Hevkêşeya xişandinê'],
      simulation_outputs_en: ['Kinetic Energy K', 'Gravitational Potential Energy U_g', 'Generated Thermal Energy', 'Skater Speed at Each Point'],
      simulation_outputs_ku: ['وزەی جوڵە K', 'وزەی پۆتێنشیاڵی کێش U_g', 'وزەی گەرمیی پەیدابوو', 'خێرایی خلیسکەر لە هەر خاڵێکدا'],
      simulation_outputs_kmr: ['Enerjiya tevgerê K', 'Enerjiya potansiyel a kişandinê U_g', 'Enerjiya germî ya çêbûyî', 'Leza xijokê li her xalekê'],
      icon: <Activity className="w-4 h-4 text-amber-400" />
    },
    {
      id: 48,
      expKey: 'fourier_making_waves',
      category: 'waves_sound',
      title_ar: 'متسلسلة فورييه وتركيب الموجات التوافقية',
      title_en: 'Fourier Series and Harmonic Wave Synthesis',
      title_ku: 'زنجیرەی فۆریە و دروستکردنی شەپۆلی هاوئاهەنگ',
      title_kmr: 'Rêzeya Fourier û Çêkirina Pêlan',
      physical_law: 'f(x) = Σ [A_n · sin(n·ω·t)]',
      simulation_inputs: ['سعات التوافقيات A1, A2, A3, A4...', 'التردد الأساسي f0', 'شكل الموجة المستهدفة (مربعة/مثلثة/سن منشار)'],
      simulation_outputs: ['شكل الموجة المركبة الناتجة', 'طيف الترددات الطيفية (Spectrum Analyzer)'],
      simulation_inputs_en: ['Harmonic Amplitudes A1, A2, A3, A4...', 'Fundamental Frequency f0', 'Target Waveform (Square / Triangle / Sawtooth)'],
      simulation_inputs_ku: ['فراوانی هارمۆنیکەکان A1, A2, A3, A4... )', 'لەڕەلەری بنەڕەتی f0', 'شێوەی شەپۆلی ئامانجکراو (چوارگۆشەیی / سێگۆشەیی / ددانە-مەنشاری)'],
      simulation_inputs_kmr: ['Amplîtûdên harmonîkan A1, A2, A3, A4... (an jî Pîvanên hevahengan)', 'Frekansa bingehîn f0 (an jî Pirhêziya sereke)', 'Şêwaza pêla armanc (çargoşe / sêgoşe / diranê mişarê) (an jî Şêweya diyarkirî ya pêlê)'],
      simulation_outputs_en: ['Resultant Composite Waveform', 'Frequency Spectrum (Spectrum Analyzer)'],
      simulation_outputs_ku: ['شێوەی شەپۆلی پێکهاتووی دەرئەنجام (یان شێوەی شەپۆلی تێکەڵکراوی پەیدابوو)', 'پاشماوەی (سپێکتری) ڕەنگەکان (شیکەرەوەی سپێکتر) (یان پێوەری پاشماوەی لەرزەکان)'],
      simulation_outputs_kmr: ['(an jî Şêweya pêla tevlihev a ku hatiye bidestxistin)', '(Şîkerê  Pîvana spektruma pirhêziyan)'],
      icon: <Waves className="w-4 h-4 text-indigo-400" />
    },
    {
      id: 49,
      expKey: 'wave_on_a_string',
      category: 'waves_sound',
      title_ar: 'الأمواج في وتر مشدود وسرعة الطور',
      title_en: 'Wave on a String & Phase Speed',
      title_ku: 'شەپۆل لەسەر وەتەر و خێرایی قۆناغ',
      title_kmr: 'Pêl li ser Werîsekî û Leza Qonaxê',
      physical_law: 'v = √(T / μ),  y(x,t) = A · sin(kx - ωt)',
      simulation_inputs: ['قوة الشد T', 'الكثافة الطولية للوتر μ', 'سعة الاهتزاز A', 'تردد المهتز f'],
      simulation_outputs: ['سرعة انتشار الموجة v', 'الطول الموجي λ', 'انعكاس الموجة عند النهاية الثابتة/الحرة'],
      simulation_inputs_en: ['Tension Force T', 'Linear Mass Density μ', 'Oscillation Amplitude A', 'Oscillator Frequency f'],
      simulation_inputs_ku: ['هێزی کشانی پەت T (یان قوەی تەسکی پەت)', 'چڕی درێژایی پەت μ (بارستە بۆ هەر یەکەی درێژی پەت)', 'ئامپلیتودی لەرزین A (گەورەیی لەرزینەکە)', 'لەڕەلەری لەرزێنەر f (لەرزەی سەرچاوەی جوڵە)'],
      simulation_inputs_kmr: ['Hêza kişandina têlê T', 'Tîrêjiya dirêjahî ya têlê', 'Amplîtûda lerizînê A', 'Pirhêziya lerizîner   )'],
      simulation_outputs_en: ['Wave Propagation Speed v', 'Wavelength λ', 'Wave Reflection at Fixed/Free End'],
      simulation_outputs_ku: ['خێرایی بڵاوبوونەوەی شەپۆل v', 'درێژی شەپۆل λ', 'ڕەنگدانەوەی شەپۆل لە کۆتایی جێگیر / سەربەستدا (کۆتایی جێگیر = بەستراوی ڕەق، کۆتایی سەربەست = ئازاد و نەبەستراو)'],
      simulation_outputs_kmr: ['Leza belavbûna pêlê v', 'Dirêjahiya pêlê λ', 'Vegerandina pêlê li dawiya rawestî/azad (dawiya rawestî = pevgirêdayî û hişk, dawiya azad = serbest û negirêdayî)'],
      icon: <Waves className="w-4 h-4 text-sky-400" />
    },
    {
      id: 50,
      expKey: 'states_of_matter',
      category: 'fluids_thermo_optics',
      title_ar: 'حالات المادة والتحول الطوري والحرارة الكامنة',
      title_en: 'States of Matter and Phase Transitions',
      title_ku: 'دۆخەکانی ماددە و گۆڕانی دۆخ',
      title_kmr: 'Rewşên Madeyê û Guherîna Qonaxê',
      physical_law: 'Q = m · c · ΔT,  Q = m · L',
      simulation_inputs: ['نوع المادة (ماء/نيون/أرجون/أكسجين)', 'درجة الحرارة المضافة أو المسحوبة', 'الضغط الخارجي P'],
      simulation_outputs: ['الحالة الفيزيائية (صلب/سائل/غاز)', 'مخطط الطور Phase Diagram', 'طاقة الحركة الجزيئية'],
      simulation_inputs_en: ['Substance Type (Water / Neon / Argon / Oxygen)', 'Added or Extracted Temperature', 'External Pressure P'],
      simulation_inputs_ku: ['جۆری ماددە (ئاو/نیۆن/ئارگۆن/ئۆکسجین)', 'پلەی گەرمی زیادکراو یاخود کەمکراوە', 'پەستانی دەرەکی P'],
      simulation_inputs_kmr: ['Cûreyê madeyê (Av/Nêon/Argon/Oksîjen)', 'Pileya germahiyê ya zêdekirî an kêmkirî', 'Dewsîna derveyî P'],
      simulation_outputs_en: ['Physical State (Solid / Liquid / Gas)', 'Phase Diagram', 'Molecular Kinetic Energy'],
      simulation_outputs_ku: ['دۆخی فیزیکی (ڕەق/شلی/گاز)', 'هێڵکاری دۆخ Phase Diagram', 'وزەی جووڵەی گەردیی'],
      simulation_outputs_kmr: ['Rewşa fîzîkî (hişk/ron/gaz)', 'Grafîka qonaxê (Phase Diagram)', 'Enerjiya tevgera molekulî'],
      icon: <Flame className="w-4 h-4 text-rose-400" />
    },
    {
      id: 51,
      expKey: 'gas_diffusion',
      category: 'fluids_thermo_optics',
      title_ar: 'انتشار الغازات وقانون غراهام',
      title_en: 'Gas Diffusion and Graham Law of Effusion',
      title_ku: 'بڵاوبوونەوەی گازەکان و یاسای گراهام',
      title_kmr: 'Belavbûna Gazan û Qanûna Graham',
      physical_law: 'r₁ / r₂ = √(M₂ / M₁)',
      simulation_inputs: ['الكتلة المولية للغاز الأول M1', 'الكتلة المولية للغاز الثاني M2', 'درجة الحرارة T'],
      simulation_outputs: ['نسبة سرعة الانتشار r1/r2', 'التوزيع المكاني للجزيئات عبر الزمن'],
      simulation_inputs_en: ['Molar Mass of First Gas M1', 'Molar Mass of Second Gas M2', 'Temperature T'],
      simulation_inputs_ku: ['بارستەی مۆڵاری گازی یەکەم M1', 'بارستەی مۆڵاری گازی دووەم M2', 'پلەی گەرمی T'],
      simulation_inputs_kmr: ['Baristeya molî ya gazê yekem M1', 'Baristeya molî ya gazê duyem M2', 'Pileya germahiyê T'],
      simulation_outputs_en: ['Diffusion Rate Ratio r1/r2', 'Spatial Molecular Distribution over Time'],
      simulation_outputs_ku: ['ڕێژەی خێرایی بڵاوبوونەوە r1/r2', 'دابەشبوونی شوێنی گەردەکان لەگەڵ کاتدا'],
      simulation_outputs_kmr: ['Rêjeya leza belavbûnê r1/r2', 'Belavbûna cihî ya molekûlan bi demê re'],
      icon: <Sparkles className="w-4 h-4 text-purple-400" />
    },
    {
      id: 52,
      expKey: 'rotational_dynamics',
      category: 'mechanics',
      title_ar: 'الحركة الدورانية والعزم المحصل',
      title_en: 'Rotational Motion & Net Torque',
      title_ku: 'جووڵەی خولانەوە و زەبری دەستکەوتوو',
      title_kmr: 'Tevgera Zivirînê û Momanê Net',
      physical_law: 'Στ = I · α,  L = I · ω',
      simulation_inputs: ['القوة المماسية F', 'نصف القطر r', 'عزم القصور الذاتي I'],
      simulation_outputs: ['الزخم الزاوي L', 'التسارع الزاوي α', 'الطاقة الحركية الدورانية K_rot'],
      icon: <RotateCw className="w-4 h-4 text-emerald-400" />
    },

    // =========================================================================
    // --- THE 13 NEW REQUESTED EXPERIMENTS (ID: 53 to 65) ---
    // Categorized into their proper scientific physical domains
    // =========================================================================
    {
      id: 53,
      expKey: 'models_h_atom',
      category: 'em_atomic',
      title_ar: 'نماذج ذرة الهيدروجين',
      title_en: 'Models of the Hydrogen Atom',
      title_ku: 'مۆدێلەکانی گەردیلەی هایدرۆجین',
      title_kmr: 'Modelên Atoma Hîdrojenê',
      physical_law: 'E_n = -13.6 / n² eV,  ΔE = 13.6 · (1/n₁² - 1/n₂²)',
      simulation_inputs: ['المستوى الكمي الأساسي n1', 'المستوى الكمي المثار n2', 'طاقة الفوتون الساقط'],
      simulation_outputs: ['طاقة المدار En (إلكترون فولت)', 'الطول الموجي للفوتون المنبعث λ (نانومتر)', 'سلسلة الطيف (لايمان/بالمر/باشن)'],
      simulation_inputs_en: ['Ground Quantum Level n1', 'Excited Quantum Level n2', 'Incident Photon Energy'],
      simulation_inputs_ku: ['ئاستی کوانتۆمی بنەڕەتی n1', 'ئاستی کوانتۆمی ورووژاو n2', 'وزەی فۆتۆنی کەوتوو'],
      simulation_inputs_kmr: ['Asta kwantûmî ya bingehîn n1', 'Asta kwantûmî ya arandî n2', 'Enerjiya fotona hatî'],
      simulation_outputs_en: ['Orbital Energy En (eV)', 'Emitted Photon Wavelength λ (nm)', 'Spectral Series (Lyman / Balmer / Paschen)'],
      simulation_outputs_ku: ['وزەی خولگە En (ئەلیکترۆن فولت)', 'درێژی شەپۆلی فۆتۆنی دەرچوو λ (نانۆمەتر)', 'زنجیرەی سپێکتڕۆم (لايمان / بالمر / باشن)'],
      simulation_outputs_kmr: ['Enerjiya rêgehê En (eV)', 'Dirêjahiya pêla fotona derketî λ (nm)', 'Rêzeya şebengê (Lyman / Balmer / Paschen)'],
      icon: <Atom className="w-4 h-4 text-indigo-400" />
    },
    {
      id: 54,
      expKey: 'circuit_construction_kit',
      category: 'em_atomic',
      title_ar: 'بناء الدوائر الكهربائية (المتقدمة)',
      title_en: 'Circuit Construction Kit (Advanced)',
      title_ku: 'دروستکردنی خولگەی کارەبایی پێشکەوتوو',
      title_kmr: 'Avakirina Çerxeyên Elektrîkê yên Pêşketî',
      physical_law: 'قوانين كيرشوف: Σ I_in = Σ I_out (KCL),  Σ V_loop = 0 (KVL)',
      simulation_inputs: ['جهد المصادر V_sources', 'قيم المقاومات R1, R2, R3', 'طوبولوجيا التوصيل الشبكي'],
      simulation_outputs: ['التيارات في كل فرع I_branches', 'فروق الجهد عبر كل عنصر', 'القدرة الكلية المبددة'],
      simulation_inputs_en: ['Source Voltage V_sources', 'Resistor Values R1, R2, R3', 'Grid Network Topology'],
      simulation_inputs_ku: ['پۆتەنسیالی سەرچاوەکان V_sources', 'بڕەکانی بەرگری R1, R2, R3', 'شێوازی بەستنی تۆڕیی (تۆپۆلۆجی)'],
      simulation_inputs_kmr: ['Potansiyela jêderan V_sources', 'Nirxên xwegiriyan R1, R2, R3', 'Şêwazê girêdana torê (Topolojî)'],
      simulation_outputs_en: ['Branch Currents I_branches', 'Voltage Drops Across Elements', 'Total Dissipated Power'],
      simulation_outputs_ku: ['تەزووەکان لە هر لَقێکدا I_branches', 'جیاوازی پۆتەنسیال لەسەر هر توخمێک', 'کۆی توانای بەفيڕۆچوو'],
      simulation_outputs_kmr: ['Herikînên di her şaxekî de I_branches', 'Cudahiyên potansiyelê di ser her endamekî re', 'Tevaya karîna windabûyî'],
      icon: <Cpu className="w-4 h-4 text-yellow-400" />
    },
    {
      id: 55,
      expKey: 'generator',
      category: 'em_atomic',
      title_ar: 'المولد الكهربائي',
      title_en: 'Electric Generator',
      title_ku: 'مۆلیدەی کارەبایی',
      title_kmr: 'Jeneratora Elektrîkê',
      physical_law: 'ε = -N · (ΔΦ / Δt) = N · B · A · ω · sin(ωt)',
      simulation_inputs: ['سرعة الدوران الزاوية ω (دورة/دقيقة)', 'عدد لفات الملف N', 'شدة المجال المغناطيسي B'],
      simulation_outputs: ['القوة الدافعة الكهربائية العظمى ε_max (فولت)', 'تردد التيار المتردد المتولد f (هرتز)', 'شكل الموجة الجيبية للجهد'],
      simulation_inputs_en: ['Angular Rotation Speed ω (rpm)', 'Number of Coil Turns N', 'Magnetic Field Intensity B'],
      simulation_inputs_ku: ['گۆشە خێرایی خولانەوە ω (خول/خولەک)', 'ژمارەی پێچەکانی کۆیل N', 'توندي بواری موگناتیسی B'],
      simulation_inputs_kmr: ['Leza goşeyî ya zivirînê ω (xul/xulek)', 'Hejmara pêçanên bobînê N', 'Xurtiya zeviya magnetîkî B'],
      simulation_outputs_en: ['Maximum EMF ε_max (Volts)', 'Generated AC Frequency f (Hz)', 'Sinusoidal Voltage Waveform'],
      simulation_outputs_ku: ['ئەوپەڕی هێزی کارۆبزوێنەری ε_max (ڤۆڵت)', 'لەرەلەری تەزووی گۆڕاوی پەیدابوو f (هێرتز)', 'شێوەی شەپۆلی ساین بۆ پۆتەنسیال'],
      simulation_outputs_kmr: ['Hêza livînera elektrîkî ya maksîmom ε_max (Volt)', 'Frekansa herikîna guhêrbar f (Hz)', 'Şêweyê pêla sayinî ya potansiyelê'],
      icon: <Zap className="w-4 h-4 text-amber-400" />
    },
    {
      id: 56,
      expKey: 'magnet_compass',
      category: 'em_atomic',
      title_ar: 'البوصلة والمغناطيس',
      title_en: 'Magnet and Compass',
      title_ku: 'قیبلەنما و موگناتیس',
      title_kmr: 'Pûsûle û Manyet',
      physical_law: 'محاذاة ثنائي القطب المغناطيسي مع المجال الأرضي المحصل: tan(θ) = B_ext / B_earth',
      simulation_inputs: ['موقع المغناطيس بالنسبة للبوصلة (x, y)', 'شدة عزم ثنائي القطب المغناطيسي m', 'زاوية انحراف القطبين'],
      simulation_outputs: ['زاوية انحراف إبرة البوصلة θ', 'خريطة متجهات المجال الكلي', 'خطوط القوى المغناطيسية'],
      simulation_inputs_en: ['Magnet Position Relative to Compass (x, y)', 'Magnetic Dipole Moment Strength m', 'Poles Deflection Angle'],
      simulation_inputs_ku: ['شوێنی موگناتیس بەپێی قیبلەنما (x, y)', 'توندی زەبری دووجەمسەری موگناتیسی m', 'گۆشەی لادانی دوو جەمسەرەکە'],
      simulation_inputs_kmr: ['Cihê magnetîsê li gor pûsûleyê (x, y)', 'Xurtiya torka cota magnetîkî m', 'Goşeya xwehrbûna her du qutban'],
      simulation_outputs_en: ['Compass Needle Deflection Angle θ', 'Total Field Vector Map', 'Magnetic Lines of Force'],
      simulation_outputs_ku: ['گۆشەی لادانی دەرزی قیبلەنما θ', 'نەخشەی ڤێکتەرەکانی بواری گشتی', 'هێڵەکانی هێزی موگناتیسی'],
      simulation_outputs_kmr: ['Goşeya xwehrbûna derziya pûsûleyê θ', 'Neqşeya vektorên zeviya giştî', 'Xetên hêzên magnetîkî'],
      icon: <Compass className="w-4 h-4 text-cyan-400" />
    },
    {
      id: 57,
      expKey: 'magnets_electromagnets',
      category: 'em_atomic',
      title_ar: 'المغناطيسات والكهرومغناطيسات',
      title_en: 'Magnets and Electromagnets',
      title_ku: 'موگناتیس و کارۆموگناتیسەکان',
      title_kmr: 'Manyet û Elektromanyet',
      physical_law: 'B = μ₀ · μ_r · n · I  (المجال المغناطيسي للملف اللولبي)',
      simulation_inputs: ['شدة التيار المار I (أمبير)', 'كثافة اللفات n = N/L', 'إدخال قلب حديدي فائق النفاذية'],
      simulation_outputs: ['شدة المجال المغناطيسي في المركز B (تسلا / ملي تسلا)', 'عدد الدبابيس المنجذبة', 'قطبية المغناطيس N/S'],
      simulation_inputs_en: ['Passing Current Intensity I (Amperes)', 'Turns Density n = N/L', 'Inserting Super-Permeable Iron Core'],
      simulation_inputs_ku: ['توندی تەزووی ڕەتبوو I (ئەمپێر)', 'چڕی پێچەکان n = N/L', 'تێخستنی ناوۆکی ئاسنينی زۆر تێپەڕێنەر'],
      simulation_inputs_kmr: ['Xurtiya herikîna derbasbûyî I (A)', 'Tîrêjiya pêçanan n = N/L', 'Têxistina dilê hesinî yê derbasbûna bilind'],
      simulation_outputs_en: ['Center Magnetic Field Intensity B (Tesla / mT)', 'Number of Attracted Pins', 'Magnet Polarity N/S'],
      simulation_outputs_ku: ['توندي بواری موگناتیسی لە چەقدا B (تێسلا / میلی تێسلا)', 'ژمارەی دەرزييە ڕاكێشراوەکان', 'جەمسەربەندی موگناتیس N/S'],
      simulation_outputs_kmr: ['Xurtiya zeviya magnetîkî di navendê de B (Tesla / mT)', 'Hejmara derziyên kişandî', 'Qutbiya magnetîsê N/S'],
      icon: <Magnet className="w-4 h-4 text-purple-400" />
    },
    {
      id: 58,
      expKey: 'gravity_force_lab',
      category: 'gravity_astrophysics',
      title_ar: 'معمل قوة الجاذبية',
      title_en: 'Gravity Force Lab',
      title_ku: 'تاقیگەی هێزی کێشکردن',
      title_kmr: 'Laboratûwara Hêza Kêşweriyê',
      physical_law: 'F = G · (m₁ · m₂) / r²  (قانون الجذب العام لنيوتن)',
      simulation_inputs: ['كتلة الجسم الأول m1 (كجم)', 'كتلة الجسم الثاني m2 (كجم)', 'المسافة بين مركزي الكتلتين r (متر)'],
      simulation_outputs: ['قوة التجاذب المتبادلة F (نانو نيوتن)', 'متجهات القوة المتساوية والمتعاكسة F12 و F21'],
      simulation_inputs_en: ['First Body Mass m1 (kg)', 'Second Body Mass m2 (kg)', 'Distance Between Centers of Masses r (m)'],
      simulation_inputs_ku: ['بارستەی تەنی یەکەم m1 (بە کیلۆگرام)', 'بارستەی تەنی دووەم m2 (بە کیلۆگرام)', 'مەودای نێوان ناوەندی بارستەکانی هەردوو تەن r (بە مەتر)'],
      simulation_inputs_kmr: ['Baristeya laşê yekem m1 (bi kîlogram)', 'Baristeya laşê duyem m2 (bi kîlogram)', 'Dûrahiya navbera navendên baristeyên her du laşan r (bi metre)'],
      simulation_outputs_en: ['Mutual Gravitational Attraction Force F (nN)', 'Equal & Opposite Force Vectors F12 & F21 (Action-Reaction Forces)'],
      simulation_outputs_ku: ['هێزی ڕاکێشانی هاوبەش F (بە نانۆ نیوتن)', 'ڤێکتەرەکانی هێزی یەکسان و پێچەوانە F12 و F21 (واتا هێزی تەنی یەکەم لەسەر دووەم و هێزی تەنی دووەم لەسەر یەکەم)'],
      simulation_outputs_kmr: ['Hêza rakêşanê ya hevbeş F (bi nano Newton)', 'Vektorên hêzê yên wekhev û dijber F12 û F21 (ango hêza laşê yekem li ser duyem û hêza laşê duyem li ser yekem)'],
      icon: <Orbit className="w-4 h-4 text-emerald-400" />
    },
    {
      id: 59,
      expKey: 'solar_system',
      category: 'gravity_astrophysics',
      title_ar: 'النظام الشمسي والمدارات الكوكبية',
      title_en: 'My Solar System & Multi-Body Mechanics',
      title_ku: 'کۆمەڵەی خۆر و خولگەی هەسارەکان',
      title_kmr: 'Pergala Rojê û Xelekên Gerstêrkan',
      physical_law: 'ميكانيكا الأجسام المتعددة: d²r_i/dt² = Σ G · m_j · (r_j - r_i) / |r_j - r_i|³',
      simulation_inputs: ['كتل النجوم والكواكب (M_sun, m_planet)', 'السرعة الابتدائية المماسية v0', 'المسافة المدارية الابتدائية r0'],
      simulation_outputs: ['مسارات الحركة الحقيقية (مدار دائري/إهليلجي/قطع مكافئ)', 'حفظ الزخم الزاوي والطاقة الكلية'],
      simulation_inputs_en: ['Star & Planet Masses (M_sun = Sun Mass, m_planet = Planet Mass)', 'Initial Tangential Velocity v0 (Initial Velocity along Tangent)', 'Initial Orbital Distance r0'],
      simulation_inputs_ku: ['بارستەی ئەستێرەکان و هەسارەکان (M_sun = بارستەی خۆر، m_planet = بارستەی هەسارە)', 'خێرایی سەرەتایی لارەکی v0 (خێرایی سەرەتایی ئاراستەی تەنگێنتی)', 'دووری خولگەیی سەرەتایی r0'],
      simulation_inputs_kmr: ['Baristeyên stêran û gerstêrkan (M_sun = Baristeya Rojê, m_planet = Baristeya gerstêrkê)', 'Leza destpêkê ya tangensîal v0 (leza destpêkê ya li ser rêya dorê)', 'Dûrahiya destpêkê ya gerê r0'],
      simulation_outputs_en: ['Real Motion Trajectories (Circular / Elliptical / Parabolic Orbit)', 'Conservation of Angular Momentum & Total Energy (Constant Angular Momentum & Total Energy)'],
      simulation_outputs_ku: ['ڕێچکەکانی جوڵەی ڕاستەقینە (خولگەی بازنەیی / هێلکەیی / بڕگەی پەرابۆلا)', 'پاراستنی بڕی جوڵەی خولگەیی و وزەی گشتی (واتا بڕەجوڵەی سووڕانەوە و کۆی وزە نەگۆڕن)'],
      simulation_outputs_kmr: ['Rêyên tevgera rastîn (gera dorhêlî / hêlkeyî / parabolîk)', 'Parastina qoçika lezê (momentuma angular) û enerjiya tevayî (ango tîrêja leza zivirînê û hemî enerjî neguherbar dimînin)'],
      icon: <Sun className="w-4 h-4 text-amber-400" />
    },
    {
      id: 60,
      expKey: 'energy_forms',
      category: 'fluids_thermo_optics',
      title_ar: 'أشكال الطاقة وتحولاتها',
      title_en: 'Energy Forms and Changes',
      title_ku: 'شێوازەکانی وزە و گۆڕانکارییەکانیان',
      title_kmr: 'Formên Enerjiyê û Guherînên Wan',
      physical_law: 'القانون الأول للديناميكا الحرارية وحفظ الطاقة الكلية: E_in = E_stored + E_out',
      simulation_inputs: ['نوع المادة (ماء/حديد/طوب/زيت)', 'مصدر الطاقة (شعلة حرارية/جليد مبرد/طاقة كهربائية)'],
      simulation_outputs: ['درجة الحرارة T مع الزمن', 'توزيع وحدات الطاقة (حركية، حرارية، إشعاعية، كيميائية)', 'الاتزان الحراري النهائي'],
      simulation_inputs_en: ['Substance Material (Water / Iron / Brick / Oil)', 'Energy Source (Thermal Flame / Cooling Ice / Electric Energy)'],
      simulation_inputs_ku: ['جۆری ماددە (ئاو/ئاسن/خشت/زەیت)', 'سەرچاوەی وزە (پێخوست/سەهۆڵی ساردکەرەوە/وزەی کارەبایی)'],
      simulation_inputs_kmr: ['Cûreyê madeyê (Av/Hesin/Kerpîç/Zeyt)', 'Çavkaniya enerjiya (Agirê germî/Kevirê cemidî/Enerjiya elektrîkî)'],
      simulation_outputs_en: ['Temperature T over Time', 'Energy Unit Distribution (Kinetic, Thermal, Radiant, Chemical)', 'Final Thermal Equilibrium'],
      simulation_outputs_ku: ['پلەی گەرمی T لەگەڵ کاتدا', 'دابەشبوونی یەکەکانی وزە (جووڵەیی، گەرمی، تیشکدەر، کیمیایی)', 'هاوسەنگی گەرمی کۆتایی'],
      simulation_outputs_kmr: ['Pileya germahiyê T bi demê re', 'Belavbûna yekeyên enerjiya (Tevgerî, Germî, Tîrêjî, Kîmyayî)', 'Hevsengiya germahiyê ya dawî'],
      icon: <Flame className="w-4 h-4 text-orange-400" />
    },
    {
      id: 61,
      expKey: 'normal_modes',
      category: 'waves_sound',
      title_ar: 'الأنماط الطبيعية للاهتزاز والموجات الموقوفة',
      title_en: 'Normal Modes & Resonant Frequencies',
      title_ku: 'شێوازە سروشتییەکانی لەرینەوە',
      title_kmr: 'Modên Xwezayî û Lersîn',
      physical_law: 'f_n = (n · v) / (2L) = (n / 2L) · √(T / μ)',
      simulation_inputs: ['رتبة النغمة التوافقية n (1, 2, 3...)', 'قوة الشد في الوتر T (نيوتن)', 'طول الوتر L', 'الكثافة الخطية للكتلة μ'],
      simulation_outputs: ['التردد الرنان fn (هرتز)', 'الطول الموجي λn', 'مواقع العقد (Nodes) والبطون (Antinodes)'],
      simulation_inputs_en: ['Harmonic Mode Number n (1, 2, 3...)', 'Tension Force in String T (N)', 'String Length L', 'Linear Mass Density μ (Mass per Unit Length)'],
      simulation_inputs_ku: ['پلەی دەنگی هارمۆنیکی n (1, 2, 3...)', 'هێزی کشانی پەت T (بە نیوتن)', 'درێژی پەت L', 'چڕی هێلێی بارستە μ (بارستە بۆ هەر یەکەی درێژی)'],
      simulation_inputs_kmr: ['rêzbenda lerizîna hevaheng n (1, 2, 3...)', 'Hêza kişandina têlê T (bi Newton)', 'Dirêjahiya têlê L', 'Tîrêjiya dirêjahî ya baristeyê μ (bariste li هر yekîneya dirêjiyê)'],
      simulation_outputs_en: ['Resonant Frequency fn (Hz)', 'Wavelength λn', 'Nodes and Antinodes Positions'],
      simulation_outputs_ku: ['لەڕەلەری دەنگدەر fn (بە هێرتز)', 'درێژی شەپۆل λn', 'شوێنی گرێکان (Nodes) و شکمەکان (Antinodes) (گرێ = شوێنی بێلەرزین، شکم = شوێنی زۆرترین لەرزین)'],
      simulation_outputs_kmr: ['Pirhêziya dengveder (rezonansê) fn (bi Hz)', 'Dirêjahiya pêlê λn', 'Cihên girêkan (Nodes) û zikan (Antinodes) (girêk = cihê bêlerizîn, zik = cihê herî zêde lerizîn)'],
      icon: <Waves className="w-4 h-4 text-indigo-400" />
    },
    {
      id: 62,
      expKey: 'forces_motion',
      category: 'mechanics',
      title_ar: 'القوى والحركة: الأساسيات',
      title_en: 'Forces and Motion: Basics',
      title_ku: 'هێزەکان و جووڵە: بنەماکان',
      title_kmr: 'Hêz û Tevger: Bingeh',
      physical_law: 'قانون نيوتن الثاني: F_net = Σ F = m · a',
      simulation_inputs: ['القوة الخارجية المطبقة F_applied (نيوتن)', 'كتلة الصندوق m (كجم)', 'معامل الاحتكاك السطحي μ'],
      simulation_outputs: ['القوة المحصلة الصافية F_net', 'التسارع الناتج a (م/ث²)', 'مخطط الجسم الحر للقوى (FBD)', 'السرعة المتجهة v'],
      simulation_inputs_en: ['Applied External Force F_applied (N)', 'Crate Mass m (kg)', 'Surface Friction Coefficient μ'],
      simulation_inputs_ku: ['هێزی دەرەکی بەکارهاتوو F_applied (بە نیوتن)', 'بارستەی سندووقەکە m (بە کیلۆگرام)', 'هاوکۆلکەی لێکشانی ڕووەکە μ'],
      simulation_inputs_kmr: ['Hêza derveyî ya sepandî F_applied (bi Newton)', 'Baristeya qutiyê m (bi kîlogram)', 'Hevkêşeya xişandina rûyê μ'],
      simulation_outputs_en: ['Net Resultant Force F_net', 'Resulting Acceleration a (m/s²)', 'Free Body Diagram (FBD)', 'Velocity Vector v'],
      simulation_outputs_ku: ['هێزی تەواوی دەرئەنجام F_net', 'تاودان دەرئەنجام a (بە مەتر/چرکە²)', 'دیاگرامی تەنی ئازاد بۆ هێزەکان (FBD)', 'خێرایی ئاراستەیی v'],
      simulation_outputs_kmr: ['Hêza netîce ya tevayî F_net', 'Lezgîniya encamî a (bi m/s²)', 'Diagrama ten azad ji bo hêzan (FBD)', 'Leza vektorî v'],
      icon: <Activity className="w-4 h-4 text-rose-400" />
    },
    {
      id: 63,
      expKey: 'gas_properties',
      category: 'fluids_thermo_optics',
      title_ar: 'خصائص الغازات والضغط الحركي',
      title_en: 'Gas Properties & Kinetic Pressure',
      title_ku: 'تایبەتمەندییەکانی گاز و پەستان',
      title_kmr: 'Taybetmendiyên Gazê û Zext',
      physical_law: 'P · V = N · k_B · T = n · R · T,  <E_k> = (3/2) · k_B · T',
      simulation_inputs: ['عدد الجزيئات المحقونة N', 'حجم الأسطوانة V', 'التسخين أو التبريد الحراري'],
      simulation_outputs: ['الضغط الداخلي P (باسكال)', 'متوسط السرعة الجزيئية v_rms', 'معدل تصادم الجزيئات بجدران الوعاء'],
      simulation_inputs_en: ['Number of Injected Molecules N', 'Cylinder Volume V', 'Thermal Heating or Cooling'],
      simulation_inputs_ku: ['ژمارەی گەردە دراوەکان N', 'قەبارەی لوولەک V', 'گەرمکردن یاخود ساردکردنەوەی گەرمی'],
      simulation_inputs_kmr: ['Hejmara molekûlên lêxistî N', 'Qebareya sîlîndirê V', 'Germkirin an cemidandina germî'],
      simulation_outputs_en: ['Internal Pressure P (Pa)', 'RMS Molecular Speed v_rms', 'Molecule Collision Rate with Container Walls'],
      simulation_outputs_ku: ['پەستانی ناوەکی P (باسکال)', 'ناوەندی خێرایی گەردیی v_rms', 'تێکڕای بەیەکدادانی گەردەکان بە دیواری دەفرەکەوە'],
      simulation_outputs_kmr: ['Dewsîna hundirîn P (Pa)', 'Navîniya leza molekulî v_rms', 'Rêjeya pevçûna molekûlan li dîwarên firaqê'],
      icon: <Droplets className="w-4 h-4 text-cyan-400" />
    },
    {
      id: 64,
      expKey: 'diffusion',
      category: 'fluids_thermo_optics',
      title_ar: 'الانتشار الجزيئي وقانون فيك',
      title_en: 'Molecular Diffusion & Fick First Law',
      title_ku: 'بڵاوبوونەوەی گەردیلەیی و فیک',
      title_kmr: 'Belavbûna Molekulî û Qanûna Fick',
      physical_law: 'J = -D · (dC / dx)  (قانون فيك الأول للانتشار)',
      simulation_inputs: ['كتلة ونوع الجزيئات (خفيفة/ثقيلة)', 'درجة حرارة الوسط T', 'فتح/إغلاق الحاجز الفاصل'],
      simulation_outputs: ['معدل تدفق الانتشار J', 'تدرج التركيز dC/dx', 'زمن الوصول إلى الاتزان المتجانس'],
      simulation_inputs_en: ['Molecule Mass & Type (Light / Heavy)', 'Medium Temperature T', 'Opening / Closing Separation Barrier'],
      simulation_inputs_ku: ['بارستە و جۆری گەردەکان (سووک/قورس)', 'پلەی گەرمی ناوەند T', 'کردنەوە/داخستنی بەربەستی جیاکەرەوە'],
      simulation_inputs_kmr: ['Bariste û cûreyê molekûlan (Sivik/Giran)', 'Pileya germahiya holê T', 'Vekirin/Girtina astengiya veqetîner'],
      simulation_outputs_en: ['Diffusion Flux Rate J', 'Concentration Gradient dC/dx', 'Time to Homogeneous Equilibrium'],
      simulation_outputs_ku: ['تێکڕای لێقوڵپینی بڵاوبوونەوە J', 'پلەبەپلەی خەستی dC/dx', 'کاتی گەیشتن بە هاوسەنگیی هاوجنس'],
      simulation_outputs_kmr: ['Rêjeya herikîna belavbûnê J', 'Pileyîbûna xestiyê dC/dx', 'Dema gihîştina hevsengiya yekdest'],
      icon: <Sparkles className="w-4 h-4 text-purple-400" />
    },
    {
      id: 65,
      expKey: 'blackbody_spectrum',
      category: 'fluids_thermo_optics',
      title_ar: 'إشعاع الجسم الأسود وقانونا بلانك وفين',
      title_en: 'Blackbody Spectrum, Planck & Wien Laws',
      title_ku: 'سپێکتڕۆمی تەنە ڕەشەکان و پلانک و ڤین',
      title_kmr: 'Tîrêjên Laşê Reş, Planck û Wien',
      physical_law: 'λ_max · T = b = 2.898 × 10⁻³ m·K,  E = h · f,  I = σ · T⁴',
      simulation_inputs: ['درجة حرارة الجسم الأسود T (كلفن) من 300K إلى 10000K (مثل الأرض، المصباح، الشمس، النجوم الزرقاء)'],
      simulation_outputs: ['طول موجة الذروة الإشعاعية λ_max (ميكرومتر)', 'الشدة الإشعاعية الكلية I (واط/م²)', 'منحنى التوزيع الطيفي واللون المرئي'],
      simulation_inputs_en: ['Blackbody Temperature T (Kelvin) from 300K to 10000K (Earth, Bulb, Sun, Blue Stars)'],
      simulation_inputs_ku: ['پلەی گەرمی تەنی ڕەش T (کلفن) لە 300K تا 10000K (وەک زەوی، گلۆپ، خۆر، ئەستێرە شینەکان)'],
      simulation_inputs_kmr: ['Pileya germahiya laşê reş T (K) ji 300K heta 10000K (mîna Erd, Gulp, Roj, Stêrên şîn)'],
      simulation_outputs_en: ['Peak Wavelength λ_max (μm)', 'Total Radiant Intensity I (W/m²)', 'Spectral Distribution Curve & Visible Color'],
      simulation_outputs_ku: ['درێژی شەپۆلی لووتکەی تیشکدان λ_max (میکرۆمەتر)', 'توندی تیشکدانی گشتی I (واط/م²)', 'هێڵکاری دابەشبوونی سپێکتڕۆمی و ڕەنگی بینراو'],
      simulation_outputs_kmr: ['Dirêjahiya pêlê ya lûtkeya tîrêjdanê λ_max (μm)', 'Tundiya tîrêjdanê ya tevahî I (W/m²)', 'Grafîka belavbûna şebengî û rengê dîtbar'],
      icon: <Sun className="w-4 h-4 text-amber-400" />
    },
    {
      id: 66,
      expKey: 'doppler_effect',
      category: 'waves_sound',
      title_ar: 'تأثير دوبلر وإزاحة التردد الصوتي',
      title_en: 'Doppler Effect & Sound Shift',
      title_ku: 'کاریگەری دۆپلەر و گۆڕانی فرێکوێنسی',
      title_kmr: 'Bandora Dopplerê û Veguhestina Dengê',
      physical_law: "f' = f · (v ± vₒ) / (v ∓ vₛ),  λ' = (v ∓ vₛ) / f,  M = vₛ / v",
      simulation_inputs: ['سرعة المصدر المتحرك vₛ (م/ث)', 'سرعة الراصد vₒ (م/ث)', 'التردد المنبعث من المصدر f (هرتز)', 'سرعة الصوت في الوسط v (م/ث)'],
      simulation_outputs: ["التردد المرصود الظاهري f' (هرتز)", 'إزاحة دوبلر الترددية Δf', 'الطول الموجي الأمامي والخلفي λ', 'معامل ماخ (Mach Number)'],
      simulation_inputs_en: ['Moving Source Velocity vₛ (m/s)', 'Observer Velocity vₒ (m/s)', 'Source Emitted Frequency f (Hz)', 'Speed of Sound in Medium v (m/s)'],
      simulation_inputs_ku: ['خێرایی سەرچاوەی جوڵاو vₛ (بە مەتر لە چرکەدا)', 'خێرایی چاودێر vₒ (بە مەتر لە چرکەدا)', 'لەڕەلەر دەردراوی سەرچاوە f (بە هێرتز)', 'خێرایی دەنگ لە ناوەنددا v (بە مەتر لە چرکەدا)'],
      simulation_inputs_kmr: ['Leza çavkaniya tevger vₛ (bi m/s)', 'Leza çavdêr vₒ (bi m/s)', 'Pirhêziya (frekansa) derketî ya çavkaniyê f (bi Hz)', 'Leza deng di navgînê de v (bi m/s)'],
      simulation_outputs_en: ["Observed Apparent Frequency f' (Hz)", 'Doppler Frequency Shift Δf', 'Front & Rear Wavelength λ', 'Mach Number (Source Speed to Sound Speed Ratio)'],
      simulation_outputs_ku: ["لەڕەلەر دەرکەوتووی چاودێرکراو f' (بە هێرتز) (ڕەنگەی وا دەردەکەوێت بۆ چاودێر)", 'گۆڕانی لەڕەلەری دۆپلەر Δf (جیاوازی نێوان ڕەنگەی سەرچاوە و ڕەنگەی چاودێرکراو)', 'درێژی شەپۆلی پێشەوە و دواوە λ (درێژی شەپۆل لە ئاڕاستەی جوڵەدا و پێچەوانەی جوڵە)', 'ژمارەی ماخ (ڕێژەی خێرایی سەرچاوە بە خێرایی دەنگ)'],
      simulation_outputs_kmr: ["Pirhêziya xuyayî ya çavdêrkirî f' (bi Hz) (pirhêziya ku ji çavdêr re tê xuyang kirin)", 'Guherîna pirhêziya Doppler Δf (cudahiya navbera frekansa çavkaniyê û frekansa çavdêrkirî)', 'Dirêjahiya pêlê ya pêş û paş λ (dirêjahiya pêlê li aliyê tevgerê û li aliyê dijber)', 'Hejmara Mach (rêjeya leza çavkaniyê bi leza deng re)'],
      icon: <Radio className="w-4 h-4 text-sky-400" />
    },
    {
      id: 67,
      expKey: 'electrical_transformer',
      category: 'em_atomic',
      title_ar: 'المحول الكهربائي وقانون الحث المتبادل',
      title_en: 'Electrical Transformer & Mutual Induction',
      title_ku: 'گۆڕەری کارەبایی و یاسای هاندانی موگناتیسی',
      title_kmr: 'Transformatorek Elektrîkî û Qanûna Hestewariyê',
      physical_law: 'Vₛ / Vₚ = Nₛ / Nₚ,  Vₚ · Iₚ · η = Vₛ · Iₛ,  Φ_max = Vₚ / (4.44 · f · Nₚ)',
      simulation_inputs: ['جهد المصدر الابتدائي Vₚ (فولت)', 'عدد لفات الملف الابتدائي Nₚ', 'عدد لفات الملف الثانوي Nₛ', 'مقاومة الحمل R_L (أوم)', 'كفاءة المحول η%'],
      simulation_outputs: ['الجهد الثانوي المستحث Vₛ (فولت)', 'تيار الملفين الابتدائي Iₚ والثانوي Iₛ (أمبير)', 'نسبة التحويل a ونوع المحول', 'القدرة الكهربائية المنقولة Pₛ (واط)'],
      simulation_inputs_en: ['Primary Source Voltage Vₚ (Volts)', 'Primary Coil Turns Nₚ', 'Secondary Coil Turns Nₛ', 'Load Resistance R_L (Ohms)', 'Transformer Efficiency η%'],
      simulation_inputs_ku: ['پۆتەنسیالی سەرچاوەی سەرەتایی Vₚ (ڤۆڵت)', 'ژمارەی پێچەکانی کۆیلی سەرەتایی Nₚ', 'ژمارەی پێچەکانی کۆیلی دووەم Nₛ', 'بەرگری بار R_L (ئۆم)', 'توانستی ترانسفۆرمەر η%'],
      simulation_inputs_kmr: ['Potansiyela jêderê yekemîn Vₚ (Volt)', 'Hejmara pêçanên bobîna yekemîn Nₚ', 'Hejmara pêçanên bobîna duyemîn Nₛ', 'Xwegiriya bar R_L (Ohm)', 'Karîgerîtiya guhêrkê η%'],
      simulation_outputs_en: ['Induced Secondary Voltage Vₛ (Volts)', 'Primary Iₚ & Secondary Iₛ Currents (Amperes)', 'Transformation Ratio a & Transformer Type', 'Transferred Electric Power Pₛ (Watts)'],
      simulation_outputs_ku: ['پۆتەنسیالی دووەمی هاندراو Vₛ (ڤۆڵت)', 'تەزووی هەردوو کۆیلی سەرەتایی Iₚ و دووەم Iₛ (ئەمپێر)', 'ڕێژەی گۆڕین a و جۆری ترانسفۆرمەر', 'توانای کارەبایی گوازراوە Pₛ (واط)'],
      simulation_outputs_kmr: ['Potansiyela duyemîn a arîner Vₛ (Volt)', 'Herikîna bobîna yekemîn Iₚ û duyemîn Iₛ (A)', 'Rêjeya veguhartinê a û cûreyê guhêrkê', 'Karîna elektrîkî ya veguhastî Pₛ (Watt)'],
      icon: <Zap className="w-4 h-4 text-amber-400" />
    },
    {
      id: 68,
      expKey: 'photoelectric_effect',
      category: 'em_atomic',
      title_ar: 'الظاهرة الكهروضوئية ومعادلة أينشتاين للكم',
      title_en: 'Photoelectric Effect & Einstein Quantum Law',
      title_ku: 'دیاردەی کارۆڕووناکی و یاسای کوانتۆمی ئەنیشتاین',
      title_kmr: 'Diyardeya Fotoelektrîkê û Qanûna Einstein',
      physical_law: 'E_k = h · f - Φ = (h · c / λ) - Φ,  e · V_stop = K_max,  λ₀ = h · c / Φ',
      simulation_inputs: ['طول موجة الضوء الساقط λ (نانومتر)', 'شدة الإضاءة (%)', 'نوع معدن المهبط (دالة الشغل Φ)', 'جهد الانحياز الخارجي V (فولت)'],
      simulation_outputs: ['طاقة الفوتون الساقط E (إلكترون فولت)', 'أقصى طاقة حركية للإلكترونات K_max', 'جهد الإيقاف V_stop (فولت)', 'تردد وطول موجة العتبة f₀ و λ₀', 'سرعة انطلاق الإلكترونات v_max'],
      simulation_inputs_en: ['Incident Light Wavelength λ (nm)', 'Light Intensity (%)', 'Cathode Metal Type (Work Function Φ)', 'External Bias Voltage V (Volts)'],
      simulation_inputs_ku: ['درێژی شەپۆلی ڕووناکی کەوتوو λ (نانۆمەتر)', 'توندی ڕووناکی (%)', 'جۆری کانزای کاتۆد (پابەندە ئیش Φ)', 'پۆتەنسیالی لادانی دەرەکی V (ڤۆڵت)'],
      simulation_inputs_kmr: ['Dirêjahiya pêla ronahiya hatî λ (nm)', 'Xurtiya ronahiyê (%)', "Cûreyê me'denê katodê (Enerjiya derkirinê Φ)", 'Potansiyela derveyî V (Volt)'],
      simulation_outputs_en: ['Incident Photon Energy E (eV)', 'Max Electron Kinetic Energy K_max', 'Stopping Potential V_stop (Volts)', 'Threshold Frequency & Wavelength f₀ & λ₀', 'Emitted Electron Speed v_max'],
      simulation_outputs_ku: ['وزەی فۆتۆنی کەوتوو E (ئەلیکترۆن فولت)', 'ئەوپەڕی وزەی جووڵەی ئەلیکترۆنەکان K_max', 'پۆتەنسیالی ڕاوەستان V_stop (ڤۆڵت)', 'لەرەلەر و درێژی شەپۆلی سنور f₀ و λ₀', 'خێرایی دەرچوونی ئەلیکترۆنەکان v_max'],
      simulation_outputs_kmr: ['Enerjiya fotona hatî E (eV)', 'Enerjiya tevgerî ya maksîmom a elektronan K_max', 'Potansiyela rawestandinê V_stop (Volt)', 'Frekans û dirêjahiya pêla sînorî f₀ û λ₀', 'Leza derketina elektronan v_max'],
      icon: <Sparkles className="w-4 h-4 text-purple-400" />
    },
    {
      id: 69,
      expKey: 'radioactive_decay',
      category: 'em_atomic',
      title_ar: 'التحلل الإشعاعي وقانون عمر النصف للنواة',
      title_en: 'Radioactive Decay & Nuclear Half-life',
      title_ku: 'تێکشکانی تیشکدەر و یاسای نیوەتەمەنی ناوک',
      title_kmr: 'Hilweşîna Radyoaktîf û Nîv-jiyana Dendikê',
      physical_law: 'N(t) = N₀ · (1/2)^(t / T₁/₂) = N₀ · e^(-λ · t),  λ = ln(2) / T₁/₂,  A(t) = λ · N(t)',
      simulation_inputs: ['عدد الأنوية المشعة الابتدائية N₀', 'نوع النظير المشع وعمر النصف T₁/₂', 'الزمن المنقضي t (ثانية)', 'القفز بنصف عمر كامل (+1 T½)'],
      simulation_outputs: ['عدد الأنوية المشعة المتبقية N(t)', 'عدد الأنوية المستقرة المتكونة N_decayed', 'النسبة المئوية المتبقية %', 'النشاط الإشعاعي اللحظي A(t) (بيكربل)', 'ثابت التحلل λ'],
      simulation_inputs_en: ['Initial Radioactive Nuclei Count N₀', 'Isotope Type & Half-Life T₁/₂', 'Elapsed Time t (seconds)', 'Jump Full Half-Life (+1 T½)'],
      simulation_inputs_ku: ['ژمارەی ناوکە تیشکدەرە سەرەتاییەکان N₀', 'جۆری هاوشێوەی تیشکدەر و نیوەتەمەن T₁/₂', 'کاتی بەسەرچوو t (چرکە)', 'بڕینی نیوەتەمەنێکی تەواو (+1 T½)'],
      simulation_inputs_kmr: ['Hejmara dendikên radyoaktîf ên destpêkê N₀', 'Cûreyê îzotopa radyoaktîf û nîv-temen T₁/₂', 'Dema derbasbûyî t (saniye)', 'Baskirina nîv-temenekî temam (+1 T½)'],
      simulation_outputs_en: ['Remaining Radioactive Nuclei N(t)', 'Formed Stable Nuclei N_decayed', 'Remaining Percentage %', 'Instantaneous Activity A(t) (Bq)', 'Decay Constant λ'],
      simulation_outputs_ku: ['ژمارەی ناوکە تیشکدەرە ماوەکان N(t)', 'ژمارەی ناوکە جێگیرە دروستبووەکان N_decayed', 'ڕێژەی سەدیی ماوە %', 'چالاکی تیشکدەری کاتیی A(t) (بێکربل)', 'نەگۆڕی تێکچوون λ'],
      simulation_outputs_kmr: ['Hejmara dendikên radyoaktîf ên mawe N(t)', 'Hejmara dendikên cihê (stebîl) ên çêbûyî N_decayed', 'Rêjeya ji sedî ya mawe %', 'Çalakîtiya radyoaktîf a kêliyî A(t) (Bq)', 'Xweciha hilweşînê λ'],
      icon: <Radiation className="w-4 h-4 text-emerald-400" />
    },
    {
      id: 70,
      expKey: 'calorimetry_equilibrium',
      category: 'fluids_thermo_optics',
      title_ar: 'المسعر الحراري وقانون الاتزان وتبادل الحرارة',
      title_en: 'Calorimetry & Thermal Equilibrium Law',
      title_ku: 'کالۆریمیتەر و یاسای هاوسەنگی گەرمی',
      title_kmr: 'Kalorîmetrî û Qanûna Hevsengiya Germiyê',
      physical_law: 'Q_lost = Q_gained => m₁ · c₁ · (T₁ - T_f) = m₂ · c₂ · (T_f - T₂)',
      simulation_inputs: ['كتلة ونوع الجسم الصلب الساخن m₁ و c₁', 'درجة حرارة الجسم الابتدائية T₁ (°C)', 'كتلة ونوع سائل المسعر m₂ و c₂', 'درجة حرارة السائل الابتدائية T₂ (°C)'],
      simulation_outputs: ['درجة حرارة الاتزان الحراري النهائية T_f (°C و K)', 'كمية الطاقة الحرارية المتبادلة Q (جول وسعر حراري)', 'السعات الحرارية C₁ و C₂', 'تغير درجات الحرارة ΔT₁ و ΔT₂'],
      simulation_inputs_en: ['Mass & Material of Hot Solid Body m₁ & c₁', 'Initial Body Temperature T₁ (°C)', 'Mass & Type of Calorimeter Liquid m₂ & c₂', 'Initial Liquid Temperature T₂ (°C)'],
      simulation_inputs_ku: ['بارستە و جۆری تەنی ڕەقی گەرم m₁ و c₁', 'پلەی گەرمی سەرەتایی تەنەکە T₁ (°C)', 'بارستە و جۆری شلەی کالۆریمیتەر m₂ و c₂', 'پلەی گەرمی سەرەتایی شلەکە T₂ (°C)'],
      simulation_inputs_kmr: ['Bariste û cûreyê gewdeyê hişk ê germ m₁ û c₁', 'Pileya germahiyê ya destpêkî ya gewdeyî T₁ (°C)', 'Bariste û cûreyê rona kalorîmetrê m₂ û c₂', 'Pileya germahiyê ya destpêkî ya ronê T₂ (°C)'],
      simulation_outputs_en: ['Final Thermal Equilibrium Temperature T_f (°C & K)', 'Exchanged Thermal Energy Quantity Q (J & cal)', 'Heat Capacities C₁ & C₂', 'Temperature Changes ΔT₁ & ΔT₂'],
      simulation_outputs_ku: ['پلەی گەرمی هاوسەنگی گەرمی کۆتایی T_f (°C و K)', 'بڕی وزەی گەرمی ئاڵوگۆڕکراو Q (جول و کالۆری)', 'فراوانییەکانی گەرمی C₁ و C₂', 'گۆڕانی پلەکانی گەرمی ΔT₁ و ΔT₂'],
      simulation_outputs_kmr: ['Pileya germahiyê ya hevsengiya germî ya dawî T_f (°C û K)', 'Qaseya enerjiya germî ya veguhastî Q (Jûl û Kalorî)', 'Kapasîteyên germî C₁ û C₂', 'Guherîna pileyên germahiyê ΔT₁ û ΔT₂'],
      icon: <Flame className="w-4 h-4 text-amber-400" />
    }
  ];

  const currentExpIndex = experimentsList.findIndex((e) => e.expKey === activeExperimentKey);
  const currentExp = (currentExpIndex !== -1 ? experimentsList[currentExpIndex] : experimentsList[0]) || experimentsList[0];
  const prevExp = currentExpIndex > 0 ? experimentsList[currentExpIndex - 1] : null;
  const nextExp = currentExpIndex < experimentsList.length - 1 ? experimentsList[currentExpIndex + 1] : null;

  const getExpTitle = (exp: ExperimentItem, language: Language) => {
    switch (language) {
      case 'ku':
        return exp.title_ku || exp.title_ar;
      case 'kmr':
        return exp.title_kmr || exp.title_en;
      case 'en':
        return exp.title_en;
      case 'ar':
      default:
        return exp.title_ar;
    }
  };

  const getSubTitle = (exp: ExperimentItem, language: Language) => {
    if (language === 'ku' || language === 'ar') {
      return exp.title_en;
    }
    return exp.title_ku || exp.title_ar;
  };

  const filteredExperiments = experimentsList.filter((exp) => {
    const matchesCategory =
      categoryFilter === 'all' || exp.category === categoryFilter;

    const query = experimentSearch.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch =
      exp.title_ar.toLowerCase().includes(query) ||
      exp.title_en.toLowerCase().includes(query) ||
      exp.title_ku.toLowerCase().includes(query) ||
      exp.title_kmr.toLowerCase().includes(query) ||
      exp.physical_law.toLowerCase().includes(query) ||
      exp.expKey.toLowerCase().includes(query) ||
      exp.id.toString().includes(query) ||
      exp.simulation_inputs.some((inp) => inp.toLowerCase().includes(query)) ||
      exp.simulation_outputs.some((out) => out.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  // Category labels across all 4 supported languages
  const categoryOptions = [
    {
      id: 'all',
      labelAr: `جميع التجارب (${experimentsList.length})`,
      labelKu: `هەموو تاقیکردنەوەکان (${experimentsList.length})`,
      labelKmr: `Hemû Ezmûn (${experimentsList.length})`,
      labelEn: `All Labs (${experimentsList.length})`
    },
    {
      id: 'mechanics',
      labelAr: 'الميكانيكا والحركة والقوى',
      labelKu: 'میکانیک، جووڵە و هێزەکان',
      labelKmr: 'Mekanîk, Tevger û Hêz',
      labelEn: 'Mechanics & Motion'
    },
    {
      id: 'waves_sound',
      labelAr: 'الموجات والصوت والاهتزاز',
      labelKu: 'شەپۆلەکان، دەنگ و لەرینەوە',
      labelKmr: 'Pêl, Deng û Hejîn',
      labelEn: 'Waves & Sound'
    },
    {
      id: 'em_atomic',
      labelAr: 'الكهرومغناطيسية والذرية والكم',
      labelKu: 'کارۆموگناتیسی، گەردیلە و کوانتەم',
      labelKmr: 'Elektromanyetîk, Atom û Kwantûm',
      labelEn: 'E&M & Quantum'
    },
    {
      id: 'fluids_thermo_optics',
      labelAr: 'الموائع والحرارة والبصريات',
      labelKu: 'شلەمەنی، گەرمی و بینایی',
      labelKmr: 'Şilek, Termodînamîk û Optîk',
      labelEn: 'Fluids, Thermo & Optics'
    },
    {
      id: 'gravity_astrophysics',
      labelAr: 'الجاذبية والفلك والمدارات',
      labelKu: 'کێشکردن، گەردوونناسی و خولگەکان',
      labelKmr: 'Gravîte, Gerdûnnasî û Xelek',
      labelEn: 'Gravity & Space'
    },
  ];

  const getCategoryLabel = (cat: typeof categoryOptions[0]) => {
    switch (lang) {
      case 'ku': return cat.labelKu;
      case 'kmr': return cat.labelKmr;
      case 'en': return cat.labelEn;
      case 'ar':
      default: return cat.labelAr;
    }
  };

  return (
    <div
      id="app-container"
      dir={lang === 'ar' || lang === 'ku' ? 'rtl' : 'ltr'}
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/20 selection:text-indigo-200"
    >
      {/* Top Main Navigation Header */}
      <header id="main-header" className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 min-h-16 py-2.5 flex items-center justify-between gap-3">
          {/* Logo & Title with 21-ray Kurdish Sun */}
          <div
            onClick={() => {
              setActiveMainTab('experiments');
              setIsBrowsingCatalog(true);
            }}
            className="flex items-center gap-3 shrink-0 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-white p-1 border border-slate-200 shadow-md shadow-amber-500/10 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
              <KurdishSun21 className="w-full h-full" withBg={false} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-sm sm:text-base tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                  taq lab
                </h1>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                {lang === 'ar'
                  ? 'المختبر الفيزيائي التفاعلي المتكامل'
                  : lang === 'ku'
                  ? 'تاقیگەی فیزیای کارلێکەر'
                  : lang === 'kmr'
                  ? 'Laboratûwara Fîzîkê ya Înteraktîf'
                  : 'Comprehensive Virtual Physics Laboratory'}
              </p>
            </div>
          </div>

          {/* Quick Actions & Language Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <LanguageSelector currentLang={lang} onSelectLang={setLang} />
          </div>
        </div>
      </header>

      {/* Main Workspace Body with safe bottom padding for fixed bottom bar */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 pb-28 sm:pb-32 space-y-6">
        {activeMainTab === 'experiments' && (
          <div className="space-y-6">
            {/* VIEW A: CATALOG VIEW (Search, Dropdown Category Filter & Responsive Cards Grid) */}
            {isBrowsingCatalog ? (
              <div className="space-y-6 animate-fade-in">
                {/* Modern Dropdown Filter & Search Bar */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-3.5 shadow-xl">
                  <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                    {/* Dropdown Filter Toggle Button & Count Badge */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        id="category-dropdown-toggle-btn"
                        type="button"
                        onClick={() => setIsCategoryDropdownOpen((prev) => !prev)}
                        className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-indigo-500/50 text-slate-100 text-xs font-semibold flex items-center gap-2 shadow-md transition-all group"
                      >
                        <Filter className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform shrink-0" />
                        <span className="text-slate-400">
                          {lang === 'ar'
                            ? 'القسم:'
                            : lang === 'ku'
                            ? 'بەش:'
                            : lang === 'kmr'
                            ? 'Beş:'
                            : 'Category:'}
                        </span>
                        <span className="text-white font-bold max-w-[180px] sm:max-w-[240px] truncate">
                          {getCategoryLabel(
                            categoryOptions.find((c) => c.id === categoryFilter) || categoryOptions[0]
                          )}
                        </span>
                        {isCategoryDropdownOpen ? (
                          <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 transition-transform" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 transition-transform" />
                        )}
                      </button>

                      <span className="px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-indigo-300 font-semibold shrink-0">
                        {filteredExperiments.length} / {experimentsList.length} Labs
                      </span>
                    </div>

                    {/* Quick Search */}
                    <div className="relative min-w-[240px] flex-1 md:max-w-xs">
                      <Search className="w-4 h-4 text-slate-400 absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={experimentSearch}
                        onChange={(e) => setExperimentSearch(e.target.value)}
                        placeholder={
                          lang === 'ar'
                            ? 'بحث عن تجربة، رقم أو قانون أو متغير...'
                            : lang === 'ku'
                            ? 'گەڕان بەدوای تاقیکردنەوە، ژمارە، یاسا یان گۆڕەک...'
                            : lang === 'kmr'
                            ? 'Li ezmûn, hejmar, qanûn an guherbarê bigere...'
                            : 'Search experiments by name, id, law...'
                        }
                        className="w-full ltr:pl-9 ltr:pr-3 rtl:pr-9 rtl:pl-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 shadow-inner"
                      />
                      {experimentSearch && (
                        <button
                          onClick={() => setExperimentSearch('')}
                          className="absolute ltr:right-2.5 rtl:left-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </div>

                  {/* In-flow Dropdown Options Grid (naturally pushes cards below without any clipping or overlap) */}
                  {isCategoryDropdownOpen && (
                    <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 animate-fade-in">
                      {categoryOptions.map((cat) => {
                        const isSelected = categoryFilter === cat.id;
                        const countForCat =
                          cat.id === 'all'
                            ? experimentsList.length
                            : experimentsList.filter((e) => e.category === cat.id).length;

                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                              setCategoryFilter(cat.id as any);
                              setIsCategoryDropdownOpen(false);
                            }}
                            className={`p-2.5 rounded-xl text-xs text-start flex items-center justify-between gap-2 border transition-all ${
                              isSelected
                                ? 'bg-gradient-to-r from-indigo-600/30 to-teal-600/30 border-indigo-500 text-white font-bold shadow-md shadow-indigo-950/50'
                                : 'bg-slate-950/70 hover:bg-slate-800/90 border-slate-800 text-slate-300 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span
                                className={`w-2 h-2 rounded-full shrink-0 ${
                                  isSelected ? 'bg-indigo-400 shadow-sm shadow-indigo-400' : 'bg-slate-600'
                                }`}
                              />
                              <span className="truncate">{getCategoryLabel(cat)}</span>
                            </div>
                            <span
                              className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono shrink-0 ${
                                isSelected
                                  ? 'bg-indigo-500/30 text-indigo-200 border border-indigo-400/40'
                                  : 'bg-slate-900 text-slate-400 border border-slate-800'
                              }`}
                            >
                              {countForCat}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Experiment Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredExperiments.map((exp) => {
                    const isNew13 = exp.id >= 53 && exp.id <= 65;
                    return (
                      <div
                        key={exp.id}
                        id={`catalog-card-${exp.id}`}
                        onClick={() => handleSelectExperiment(exp.expKey)}
                        className={`group bg-slate-900/90 hover:bg-slate-850 border rounded-2xl p-4 flex flex-col justify-between gap-3 cursor-pointer transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-0.5 ${
                          isNew13
                            ? 'border-amber-500/30 hover:border-amber-500/60'
                            : 'border-slate-800/80 hover:border-indigo-500/50'
                        }`}
                      >
                        {/* Top ID & Badge */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 text-indigo-300 flex items-center justify-center font-mono font-bold text-xs">
                              #{exp.id}
                            </span>
                            <div className="p-1 rounded-md bg-slate-800/60">
                              {exp.icon}
                            </div>
                          </div>
                          {isNew13 ? (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                              {lang === 'ar' ? '★ تجربة جديدة' : lang === 'ku' ? '★ نوێ' : '★ NEW'}
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-500 font-mono">
                              Lab #{exp.id}
                            </span>
                          )}
                        </div>

                        {/* Title & Subtitle */}
                        <div className="space-y-1">
                          <h3 className="font-bold text-sm text-slate-100 group-hover:text-indigo-300 transition-colors line-clamp-2">
                            {getExpTitle(exp, lang)}
                          </h3>
                          <p className="text-[11px] text-slate-400 line-clamp-1">
                            {getSubTitle(exp, lang)}
                          </p>
                        </div>

                        {/* Physical Law */}
                        <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800/80 font-mono text-[11px] text-amber-300 font-medium truncate">
                          {exp.physical_law}
                        </div>

                        {/* Action Launch Button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectExperiment(exp.expKey);
                          }}
                          className="w-full py-2 px-3 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/40 text-xs font-semibold flex items-center justify-center gap-2 transition-all group-hover:bg-indigo-600 group-hover:text-white shadow-sm"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>
                            {lang === 'ar'
                              ? 'بدء التجربة'
                              : lang === 'ku'
                              ? 'دەستپێکردنی تاقیکردنەوە'
                              : lang === 'kmr'
                              ? 'Ezmûnê Destpê Bike'
                              : 'Launch Lab'}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>

                {filteredExperiments.length === 0 && (
                  <div className="p-12 text-center rounded-2xl bg-slate-900/50 border border-slate-800 space-y-2">
                    <p className="text-slate-400 text-sm">
                      {lang === 'ar' ? 'لم يتم العثور على تجارب تطابق البحث' : 'No experiments matched your search'}
                    </p>
                    <button
                      onClick={() => {
                        setCategoryFilter('all');
                        setExperimentSearch('');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-medium"
                    >
                      {lang === 'ar' ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* VIEW B: SINGLE SIMULATION VIEW (Navigation Bar, Canvas, Collapsible Theory Accordion) */
              <div className="space-y-6 animate-fade-in">
                {/* Simulation Top Bar & Quick Switcher */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-md">
                  {/* Back to Catalog Button */}
                  <button
                    id="back-to-catalog-btn"
                    onClick={() => setIsBrowsingCatalog(true)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180 text-indigo-400" />
                    <span>
                      {lang === 'ar'
                        ? 'العودة لقائمة التجارب'
                        : lang === 'ku'
                        ? 'گەڕانەوە بۆ پێڕستی تاقیکردنەوەکان'
                        : lang === 'kmr'
                        ? 'Vegere bo Lîsteya Ezmûnan'
                        : 'Back to Labs Catalog'}
                    </span>
                  </button>

                  {/* Active Experiment Title */}
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-mono font-bold text-xs border border-indigo-500/40">
                      #{currentExp.id}
                    </span>
                    <h2 className="font-bold text-sm sm:text-base text-white">
                      {getExpTitle(currentExp, lang)}
                    </h2>
                  </div>

                  {/* Next / Previous Navigator */}
                  <div className="flex items-center gap-1">
                    {prevExp && (
                      <button
                        onClick={() => handleSelectExperiment(prevExp.expKey)}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1"
                        title={getExpTitle(prevExp, lang)}
                      >
                        <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                        <span className="hidden sm:inline">#{prevExp.id}</span>
                      </button>
                    )}
                    {nextExp && (
                      <button
                        onClick={() => handleSelectExperiment(nextExp.expKey)}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1"
                        title={getExpTitle(nextExp, lang)}
                      >
                        <span className="hidden sm:inline">#{nextExp.id}</span>
                        <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                      </button>
                    )}
                  </div>
                </div>

                {/* 1. Active Experiment Render - Simulation Canvas Area */}
                <div className="transition-all duration-200">
                  {/* 36 Classic Experiments */}
                  {activeExperimentKey === 'work_heat' && <WorkHeatSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'prescription_glasses' && <PrescriptionGlassesSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'periscope' && <PeriscopeSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'static_balloons' && <StaticBalloonsSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'sled_friction' && <SledFrictionSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'heat_conduction' && <HeatConductionSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'seesaw_torque' && <SeesawTorqueSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'electromagnetic_induction' && <ElectromagneticInductionSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'viscosity_stokes' && <ViscosityStokesSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'ramp_machine' && <RampMachineSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'metric_prefixes' && <MetricPrefixesSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'stress_strain' && <StressStrainSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'bernoulli' && <BernoulliSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'angled_mirrors' && <AngledMirrorsSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'curved_mirrors' && <CurvedMirrorsSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'thin_lenses' && <ThinLensesSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'polarization' && <PolarizationSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'light_scattering' && <LightScatteringSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'arc_length' && <ArcLengthSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'rotational_dynamics' && <RotationalDynamicsSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'center_of_mass' && <CenterOfMassSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'pendulum_energy' && <PendulumEnergySim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'pendulum' && <PendulumSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'projectile' && <ProjectileSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'spring' && <SpringSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'collision' && <CollisionSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'freefall' && <FreeFallSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'acoustic_resonance' && <AcousticResonanceSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'sound_speed' && <SoundSpeedSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'waves' && <WavesSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'magnetic_field' && <MagneticFieldSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'atomic_spectra' && <AtomicSpectraSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'circuits' && <CircuitSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'buoyancy' && <BuoyancySim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'thermodynamics' && <ThermodynamicsSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {activeExperimentKey === 'optics' && <OpticsSim lang={lang} onLogMeasurement={handleLogMeasurement} />}

                  {/* Extended & The 13 New Simulation Labs (53-65) */}
                  {activeExperimentKey === 'build_atom' && <BuildAtomSim lang={lang} />}
                  {activeExperimentKey === 'build_nucleus' && <BuildNucleusSim lang={lang} />}
                  {activeExperimentKey === 'rutherford_scattering' && <RutherfordScatteringSim lang={lang} />}
                  {activeExperimentKey === 'molecules_and_light' && <MoleculesLightSim lang={lang} />}
                  {activeExperimentKey === 'color_vision' && <ColorVisionSim lang={lang} />}
                  {activeExperimentKey === 'capacitor_lab' && <CapacitorSim lang={lang} />}
                  {activeExperimentKey === 'charges_and_fields' && <ChargesFieldsSim lang={lang} />}
                  {activeExperimentKey === 'resistance_in_wire' && <WireResistanceSim lang={lang} />}
                  {activeExperimentKey === 'gravity_and_orbits' && <GravityOrbitsSim lang={lang} />}
                  {activeExperimentKey === 'keplers_laws' && <KeplerLawsSim lang={lang} />}
                  {activeExperimentKey === 'energy_skate_park' && <EnergySkateParkSim lang={lang} />}
                  {activeExperimentKey === 'fourier_making_waves' && <FourierWavesSim lang={lang} />}
                  {activeExperimentKey === 'wave_on_a_string' && <WaveOnStringSim lang={lang} />}
                  {activeExperimentKey === 'states_of_matter' && <StatesOfMatterSim lang={lang} />}
                  {activeExperimentKey === 'gas_diffusion' && <DiffusionSim lang={lang} />}

                  {/* ID 53: Models of Hydrogen Atom */}
                  {activeExperimentKey === 'models_h_atom' && <AtomicSpectraSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {/* ID 54: Circuit Construction Kit (Advanced Kirchhoff) */}
                  {activeExperimentKey === 'circuit_construction_kit' && <CircuitSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {/* ID 55: Generator */}
                  {activeExperimentKey === 'generator' && <ElectromagneticInductionSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {/* ID 56: Magnet and Compass */}
                  {activeExperimentKey === 'magnet_compass' && <MagneticFieldSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {/* ID 57: Magnets and Electromagnets (Solenoid) */}
                  {activeExperimentKey === 'magnets_electromagnets' && <ElectromagnetSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {/* ID 58: Gravity Force Lab */}
                  {activeExperimentKey === 'gravity_force_lab' && <GravityForceSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {/* ID 59: Solar System */}
                  {activeExperimentKey === 'solar_system' && <GravityOrbitsSim lang={lang} />}
                  {/* ID 60: Energy Forms and Changes */}
                  {activeExperimentKey === 'energy_forms' && <WorkHeatSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {/* ID 61: Normal Modes */}
                  {activeExperimentKey === 'normal_modes' && <NormalModesSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {/* ID 62: Forces and Motion: Basics */}
                  {activeExperimentKey === 'forces_motion' && <ForcesMotionSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {/* ID 63: Gas Properties */}
                  {activeExperimentKey === 'gas_properties' && <ThermodynamicsSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {/* ID 64: Diffusion */}
                  {activeExperimentKey === 'diffusion' && <DiffusionSim lang={lang} />}
                  {/* ID 65: Blackbody Spectrum */}
                  {activeExperimentKey === 'blackbody_spectrum' && <BlackbodySim lang={lang} />}

                  {/* ID 66: Doppler Effect */}
                  {activeExperimentKey === 'doppler_effect' && <DopplerEffectSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {/* ID 67: Electrical Transformer */}
                  {activeExperimentKey === 'electrical_transformer' && <ElectricalTransformerSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {/* ID 68: Photoelectric Effect */}
                  {activeExperimentKey === 'photoelectric_effect' && <PhotoelectricEffectSim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {/* ID 69: Radioactive Decay */}
                  {activeExperimentKey === 'radioactive_decay' && <RadioactiveDecaySim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                  {/* ID 70: Calorimetry & Thermal Equilibrium */}
                  {activeExperimentKey === 'calorimetry_equilibrium' && <CalorimetrySim lang={lang} onLogMeasurement={handleLogMeasurement} />}
                </div>

                {/* 2. Collapsible Theory & Explanation Section (Accordion) */}
                {currentExp && (
                  <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                    <button
                      id="toggle-theory-accordion-btn"
                      onClick={() => setIsTheoryExpanded((prev) => !prev)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-start bg-slate-900 hover:bg-slate-850 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-sm border border-indigo-500/40">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                            <span>
                              {lang === 'ar'
                                ? 'الشرح العلمي والقوانين الفيزيائية'
                                : lang === 'ku'
                                ? 'ڕوونکردنەوەی زانستی و یاسا فیزیاییەکان'
                                : lang === 'kmr'
                                ? 'Ravekirina Zanistî û Qanûnên Fîzîkê'
                                : 'Scientific Theory & Physical Laws'}
                            </span>
                          </h3>
                          <p className="text-[11px] text-slate-400">
                            {currentExp.physical_law}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 hidden sm:inline">
                          {isTheoryExpanded
                            ? lang === 'ar' ? 'إخفاء' : lang === 'ku' ? 'شاردنەوە' : 'Hide'
                            : lang === 'ar' ? 'عرض التفاصيل' : lang === 'ku' ? 'پیشاندان' : 'Show Details'}
                        </span>
                        <div className="p-1 rounded-lg bg-slate-800 text-slate-300">
                          {isTheoryExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </button>

                    {isTheoryExpanded && (
                      <div className="p-4 sm:p-5 pt-0 border-t border-slate-800/80 space-y-3 animate-fade-in">
                        {/* Law Equation Row */}
                        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-2 mt-3">
                          <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>
                              {lang === 'ar'
                                ? 'القانون الفيزيائي:'
                                : lang === 'ku'
                                ? 'یاسای فیزیا:'
                                : lang === 'kmr'
                                ? 'Qanûna Fîzîkê:'
                                : 'Physical Law:'}
                            </span>
                          </span>
                          <span className="text-xs sm:text-sm font-mono text-amber-300 font-bold tracking-wide">
                            {currentExp.physical_law}
                          </span>
                        </div>

                        {/* Inputs & Outputs Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                          {/* Simulation Inputs */}
                          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 space-y-2">
                            <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5 uppercase">
                              <Sliders className="w-3.5 h-3.5" />
                              <span>
                                {lang === 'ar'
                                  ? 'متغيرات الدخل (Inputs):'
                                  : lang === 'ku'
                                  ? 'گۆڕەکەکانی تێکردن (Inputs):'
                                  : lang === 'kmr'
                                  ? 'Guherbarên Têketinê (Inputs):'
                                  : 'Simulation Inputs:'}
                              </span>
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {(lang === 'ku' && currentExp.simulation_inputs_ku
                                ? currentExp.simulation_inputs_ku
                                : lang === 'kmr' && currentExp.simulation_inputs_kmr
                                ? currentExp.simulation_inputs_kmr
                                : lang === 'en' && currentExp.simulation_inputs_en
                                ? currentExp.simulation_inputs_en
                                : currentExp.simulation_inputs
                              ).map((inp, idx) => (
                                <span
                                  key={idx}
                                  className="px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-200 text-xs flex items-center gap-1"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                                  {inp}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Simulation Outputs */}
                          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 space-y-2">
                            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase">
                              <TrendingUp className="w-3.5 h-3.5" />
                              <span>
                                {lang === 'ar'
                                  ? 'مخرجات المحاكاة (Outputs):'
                                  : lang === 'ku'
                                  ? 'دەرئەنجامەکانی پێوانە (Outputs):'
                                  : lang === 'kmr'
                                  ? 'Encamên Simûlasyonê (Outputs):'
                                  : 'Simulation Outputs:'}
                              </span>
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {(lang === 'ku' && currentExp.simulation_outputs_ku
                                ? currentExp.simulation_outputs_ku
                                : lang === 'kmr' && currentExp.simulation_outputs_kmr
                                ? currentExp.simulation_outputs_kmr
                                : lang === 'en' && currentExp.simulation_outputs_en
                                ? currentExp.simulation_outputs_en
                                : currentExp.simulation_outputs
                              ).map((out, idx) => (
                                <span
                                  key={idx}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-xs flex items-center gap-1"
                                >
                                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                  {out}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* SMART RETURN NAVIGATION BAR (Shown when viewing any bottom tab: Notebook, Formulas, or Quiz) */}
        {activeMainTab !== 'experiments' && (
          <div
            id="smart-return-navigation-bar"
            className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-xl mb-6 animate-fade-in"
          >
            <div className="flex flex-wrap items-center gap-2.5">
              {/* 1. Return to Active Simulation */}
              <button
                id="btn-return-to-active-sim"
                onClick={() => {
                  setActiveMainTab('experiments');
                  setIsBrowsingCatalog(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-100"
              >
                <ArrowLeft className="w-4 h-4 rtl:rotate-180 text-indigo-200" />
                <span>
                  {lang === 'ar'
                    ? `العودة للتجربة: ${getExpTitle(currentExp, lang)} (#${currentExp.id})`
                    : lang === 'ku'
                    ? `گەڕانەوە بۆ تاقیکردنەوە: ${getExpTitle(currentExp, lang)} (#${currentExp.id})`
                    : lang === 'kmr'
                    ? `Vegere bo Simûlasyonê: ${getExpTitle(currentExp, lang)} (#${currentExp.id})`
                    : `Return to Sim: ${getExpTitle(currentExp, lang)} (#${currentExp.id})`}
                </span>
              </button>

              {/* 2. Return to Main Experiments Catalog */}
              <button
                id="btn-return-to-home-catalog"
                onClick={() => {
                  setActiveMainTab('experiments');
                  setIsBrowsingCatalog(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-3.5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-750 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-100"
              >
                <Home className="w-4 h-4 text-teal-400" />
                <span>
                  {lang === 'ar'
                    ? 'الصفحة الرئيسية (قائمة التجارب)'
                    : lang === 'ku'
                    ? 'سەرەکی (پێڕستی تاقیکردنەوەکان)'
                    : lang === 'kmr'
                    ? 'Serekî (Lîsteya Ezmûnan)'
                    : 'Home (Labs Catalog)'}
                </span>
              </button>
            </div>

            {/* Current Tab Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300">
                {activeMainTab === 'notebook'
                  ? (lang === 'ar' ? 'دفتر المختبر والقياسات' : lang === 'ku' ? 'دەفتەری تاقیگە' : 'Lab Notebook & Data')
                  : activeMainTab === 'formulas'
                  ? (lang === 'ar' ? 'دليل القوانين الفيزيائية' : lang === 'ku' ? 'ڕێبەری یاساکان' : 'Formula Sheet')
                  : (lang === 'ar' ? 'الاختبارات والتحديات' : lang === 'ku' ? 'تاقیکردنەوە و پرسیارەکان' : 'Lab Quiz & Challenges')}
              </span>
            </div>
          </div>
        )}

        {activeMainTab === 'notebook' && (
          <LabNotebook
            lang={lang}
            records={records}
            onDeleteRecord={handleDeleteRecord}
            onClearAll={handleClearAll}
            onUpdateNote={handleUpdateNote}
          />
        )}

        {activeMainTab === 'formulas' && <FormulaSheet lang={lang} />}

        {activeMainTab === 'challenges' && <LabQuiz lang={lang} />}
      </main>

      {/* Lab Tools Modal */}
      <LabToolsModal lang={lang} isOpen={isToolsOpen} onClose={() => setIsToolsOpen(false)} />

      {/* Custom Non-blocking Clear All Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-100">
              {lang === 'ar' ? 'تأكيد مسح جميع السجلات' : 'Confirm Clear All Records'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {lang === 'ar'
                ? 'هل أنت متأكد من رغبتك في حذف كافة السجلات والقياسات من دفتر المختبر؟ لن تتمكن من استعادتها.'
                : 'Are you sure you want to delete all measurement records from the lab notebook? This cannot be undone.'}
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
              >
                {lang === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={confirmClearAllRecords}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium shadow-md shadow-rose-600/30 transition-colors"
              >
                {lang === 'ar' ? 'نعم، امسح الكل' : 'Yes, Clear All'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer id="main-footer" className="border-t border-slate-900 py-4 mb-20 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            {lang === 'ar'
              ? `مختبر الفيزياء الافتراضي التفاعلي • ${experimentsList.length} تجربة محاكاة علمية تفاعلية مجانية بالكامل (من 1 إلى 65)`
              : `Interactive Virtual Physics Lab • ${experimentsList.length} Free & Open Scientific Simulators (1 to 65)`}
          </span>
          <span className="font-mono text-slate-500">
            Mechanics • Waves & Acoustics • E&M • Optics • Thermodynamics • Quantum & Astrophysics
          </span>
        </div>
      </footer>

      {/* Physics Equation Keyboard Modal/Drawer */}
      {isEquationKeyboardOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-zinc-950 border border-zinc-800 rounded-t-2xl sm:rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100">
                    {lang === 'ar'
                      ? 'لوحة مفاتيح الرموز والمعادلات الرياضية'
                      : lang === 'ku'
                      ? 'تەختەکلیلی هێما و هاوکێشە بیرکارییەکان'
                      : lang === 'kmr'
                      ? 'Klavyeya Sembol û Hevkêşeyên Bîrkarî'
                      : 'Physics & Math Symbols Keyboard'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {lang === 'ar'
                      ? 'إدراج الرموز اليونانية، المتغيرات، الثوابت وحساب الصيغ الرياضية فورياً'
                      : lang === 'ku'
                      ? 'تێکردنی پیتە یۆنانییەکان، گۆڕەک و هەژمارکردنی ڕاستەوخۆ'
                      : lang === 'kmr'
                      ? 'Têketina tîpên yewnanî, guherbar û hesabkirina rasterast'
                      : 'Insert Greek letters, physics variables & evaluate expressions'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEquationKeyboardOpen(false)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700 shadow-sm"
                title={lang === 'ar' ? 'رجوع / إغلاق' : 'Close / Return'}
              >
                <X className="w-4 h-4 text-rose-400" />
                <span>{lang === 'ar' ? 'رجوع للتجربة' : lang === 'ku' ? 'گەڕانەوە' : 'Return'}</span>
              </button>
            </div>
            
            <PhysicsEquationKeyboard
              lang={lang}
              isOpen={true}
              onClose={() => setIsEquationKeyboardOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation Bar (4 Prominent & High-Accessibility Buttons) */}
      <div
        id="persistent-bottom-bar"
        className="fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 border-t border-slate-800/90 backdrop-blur-lg shadow-2xl shadow-black/80 px-2 sm:px-6 py-2"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-around gap-1.5 sm:gap-4">
          {/* 1. Lab Notebook Button */}
          <button
            id="bottom-nav-notebook"
            onClick={() => {
              if (activeMainTab === 'notebook') {
                setActiveMainTab('experiments');
              } else {
                setActiveMainTab('notebook');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex-1 min-h-[52px] py-1 px-1.5 sm:px-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
              activeMainTab === 'notebook'
                ? 'bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-900/30 ring-1 ring-emerald-400/30'
                : 'bg-slate-900/80 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <FileSpreadsheet className={`w-5 h-5 ${activeMainTab === 'notebook' ? 'text-emerald-400' : 'text-emerald-500'}`} />
              {records.length > 0 && (
                <span className="absolute -top-1.5 -right-3.5 px-1.5 py-0.2 rounded-full bg-emerald-500 text-slate-950 font-bold text-[9px] font-mono leading-tight">
                  {records.length}
                </span>
              )}
            </div>
            <span className="text-[11px] sm:text-xs font-semibold whitespace-nowrap">
              {activeMainTab === 'notebook'
                ? (lang === 'ar' ? '↩ رجوع' : lang === 'ku' ? '↩ گەڕانەوە' : '↩ Return')
                : (lang === 'ar'
                  ? 'دفتر المختبر'
                  : lang === 'ku'
                  ? 'دەفتەری تاقیگە'
                  : lang === 'kmr'
                  ? 'Deftera Laboratûwarê'
                  : 'Lab Notebook')}
            </span>
          </button>

          {/* 2. Formula Sheet Button */}
          <button
            id="bottom-nav-formulas"
            onClick={() => {
              if (activeMainTab === 'formulas') {
                setActiveMainTab('experiments');
              } else {
                setActiveMainTab('formulas');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex-1 min-h-[52px] py-1 px-1 sm:px-2.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
              activeMainTab === 'formulas'
                ? 'bg-purple-950/70 border border-purple-500/50 text-purple-300 shadow-md shadow-purple-900/30 ring-1 ring-purple-400/30'
                : 'bg-slate-900/80 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <BookOpen className={`w-5 h-5 ${activeMainTab === 'formulas' ? 'text-purple-400' : 'text-purple-400'}`} />
            <span className="text-[10px] sm:text-xs font-semibold whitespace-nowrap">
              {activeMainTab === 'formulas'
                ? (lang === 'ar' ? '↩ رجوع' : lang === 'ku' ? '↩ گەڕانەوە' : '↩ Return')
                : (lang === 'ar'
                  ? 'دليل القوانين'
                  : lang === 'ku'
                  ? 'ڕێبەری یاساکان'
                  : lang === 'kmr'
                  ? 'Rêberê Qanûnan'
                  : 'Formula Sheet')}
            </span>
          </button>

          {/* 3. Laboratory Physics Tools Button */}
          <button
            id="bottom-nav-tools"
            onClick={() => setIsToolsOpen(true)}
            className="flex-1 min-h-[52px] py-1 px-1 sm:px-2.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 bg-slate-900/80 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white group hover:border-sky-500/40"
            title={
              lang === 'ar'
                ? 'أدوات وساعة إيقاف وحاسبة علمية'
                : lang === 'ku'
                ? 'ئامرازەکان، کاتژمێری پێوانە و ژمێرەری زانستی'
                : lang === 'kmr'
                ? 'Amûrên Laboratûwarê, Saeta Rawestê û Hesabker'
                : 'Laboratory Physics Tools'
            }
          >
            <Compass className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] sm:text-xs font-semibold whitespace-nowrap">
              {lang === 'ar'
                ? 'أدوات المختبر'
                : lang === 'ku'
                ? 'ئامرازەکانی تاقیگە'
                : lang === 'kmr'
                ? 'Amûrên Lab'
                : 'Physics Tools'}
            </span>
          </button>

          {/* 4. Physics Equation Keyboard Button */}
          <button
            id="bottom-nav-keyboard"
            onClick={() => setIsEquationKeyboardOpen(true)}
            className="flex-1 min-h-[52px] py-1 px-1 sm:px-2.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 bg-slate-900/80 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white group hover:border-indigo-500/40"
          >
            <Calculator className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] sm:text-xs font-semibold whitespace-nowrap">
              {lang === 'ar'
                ? 'لوحة الرموز'
                : lang === 'ku'
                ? 'تەختەکلیلی هێماکان'
                : lang === 'kmr'
                ? 'Klavyeya Sembolan'
                : 'Equation Keys'}
            </span>
          </button>

          {/* 5. Lab Quiz / Challenges Button */}
          <button
            id="bottom-nav-challenges"
            onClick={() => {
              if (activeMainTab === 'challenges') {
                setActiveMainTab('experiments');
              } else {
                setActiveMainTab('challenges');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex-1 min-h-[52px] py-1 px-1 sm:px-2.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
              activeMainTab === 'challenges'
                ? 'bg-amber-950/70 border border-amber-500/50 text-amber-300 shadow-md shadow-amber-900/30 ring-1 ring-amber-400/30'
                : 'bg-slate-900/80 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Award className={`w-5 h-5 ${activeMainTab === 'challenges' ? 'text-amber-400' : 'text-amber-400'}`} />
            <span className="text-[10px] sm:text-xs font-semibold whitespace-nowrap">
              {activeMainTab === 'challenges'
                ? (lang === 'ar' ? '↩ رجوع' : lang === 'ku' ? '↩ گەڕانەوە' : '↩ Return')
                : (lang === 'ar'
                  ? 'الاختبارات'
                  : lang === 'ku'
                  ? 'تاقیکردنەوەکان'
                  : lang === 'kmr'
                  ? 'Test û Ezmûn'
                  : 'Lab Quiz')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
