/**
 * BEERCOIN - Franquicia de Cerveza Inteligente
 * @author Juan Ignacio Wilt
 * @version 1.1.0
 * @year 2026
 * @description Frontend desarrollado en React + Tailwind + Framer Motion + Infraestructura.
 * @contact juaniwilt@gmail.com (o tu contacto profesional)
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Truck, Store, Coffee, CheckCircle, ArrowRight, 
  MessageCircle, X, Layout, PartyPopper, MapPin, Sparkles, ChevronRight, Lock
} from 'lucide-react';

// --- ASSETS GLOBALES ---
import logoImg from './assets/logo-neon.png';

// --- ASSETS MODELOS ---
import clasicoImg from './assets/clasico.png';
import foodtruckImg from './assets/foodtruck.png';
import paradorImg from './assets/parador.jpeg';
import incrustadoImg from './assets/incrustado.png';
import partyImg from './assets/party.png';

// --- RENDERS BENEFICIOS ---
import renderAlPaso from './assets/renderalpaso.png'; 
import renderfuturo from './assets/renderfuturo.png';
import renderrapido from './assets/renderRapido.png';
import renderstaff from './assets/renderstaff.png';

const MODELS = [
  { id: 'foodtruck', name: 'Food Truck', icon: <Truck className="w-8 h-8"/>, desc: 'Movilidad total para eventos.', image: foodtruckImg },
  { id: 'empotrado', name: 'Modelo Empotrado', icon: <Layout className="w-8 h-8"/>, desc: 'Integración en locales existentes.', image: incrustadoImg },
  { id: 'parador', name: 'Parador', icon: <MapPin className="w-8 h-8"/>, desc: 'Punto compacto ideal para playa.', image: paradorImg },
  { id: 'bar', name: 'Bar Clásico', icon: <Coffee className="w-8 h-8"/>, desc: 'La experiencia completa.', image: clasicoImg },
  { id: 'party', name: 'Modelo Party', icon: <PartyPopper className="w-8 h-8"/>, desc: 'Configuración para fiestas masivas.', image: partyImg },
];

const FEATURES = [
  'Barriles', 'Capacitación', 'Clausula de Reventa', 'Con Suministro (cerveza)',
  'Descartables', 'Equipo de Limpieza', 'Espacio Exterior y Cartelería',
  'Habilitación', 'Live Room', 'Maquina BeerCoin', 'Merchandising',
  'Publicidad', 'Repuestos', 'Sistema CO2', 'Sistema de Frío', 'Vending Extra',
];

const FIXED_FEATURES = ['Maquina BeerCoin', 'Publicidad', 'Capacitación'];

const BENEFIT_HEADINGS = [
  {
    title: "El Futuro del Autoservicio",
    description: "Olvídate de esperar al barman. En Beercoin, tú tienes el control. Nuestro sistema de expendio automático garantiza el tiraje perfecto con la espuma justa. La revolución del take-away cervecero ya llegó.",
    image: renderfuturo 
  },
  {
    title: "Al Paso",
    description: "Diseñamos Beercoin para el ritmo de la ciudad. Somos tu parada técnica de calidad. Sin filas y sin demoras. Fusionamos la mejor cerveza artesanal con un sistema de vending de última generación.",
    image: renderAlPaso 
  },
  {
    title: "Recuperación Rápida",
    description: "Con una inversión optimizada y un modelo de negocio de alta eficiencia, tu retorno de inversión (ROI) con Beercoin está diseñado para ser de los más rápidos del mercado.",
    image: renderrapido 
  },
  {
    title: "Staff Mínimo",
    description: "La automatización es clave para la rentabilidad. Nuestro modelo operativo requiere una intervención humana mínima, reduciendo drásticamente los costos fijos y simplificando la gestión de recursos humanos.",
    image: renderstaff 
  }
];

export default function App() {
  useEffect(() => {
    console.log(
      "%c BEERCOIN %c Developed by Juan Ignacio Wilt",
      "background: #FF007F; color: white; font-weight: bold; padding: 4px 10px; border-radius: 4px;",
      "color: #FF007F; font-weight: bold; text-decoration: underline;"
    );
  }, []);
  
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState([...FIXED_FEATURES]);
  const [showBenefitIntro, setShowBenefitIntro] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const toggleFeature = (feat) => {
    if (FIXED_FEATURES.includes(feat)) return;
    setSelectedFeatures(prev => prev.includes(feat) ? prev.filter(f => f !== feat) : [...prev, feat]);
  };

  const handleWhatsAppClick = () => {
    const text = `Hola Beercoin! Estoy interesado en adquirir la franquicia. He configurado mi modelo:%0A%0A*Modelo:* ${selectedModel.name}%0A*Adicionales:* ${selectedFeatures.join(', ') || 'Ninguno'}.%0A%0AQuiero avanzar con la cotización.`;
    window.open(`https://wa.me/5492216616060?text=${text}`, '_blank');
  };

  const handleGenerateModelClick = () => {
    if (selectedModel) setShowBenefitIntro(true);
  };

  const handleContinueFromBenefits = () => {
    setShowBenefitIntro(false);
    setShowPreview(true);
  };

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-[#FF007F] overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-8 py-4 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="Logo Oficial Beercoin" className="h-10 w-auto drop-shadow-[0_0_8px_#FF007F]" />
          <div className="text-2xl font-black tracking-tighter uppercase">BEERCOIN</div>
        </div>
        <button onClick={() => document.getElementById('builder-section').scrollIntoView({ behavior: 'smooth' })} className="bg-[#FF007F] text-white font-bold py-2 px-6 rounded-full transition-all hover:scale-105 active:scale-95">
          Invertir
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/60 bg-linear-to-t from-black via-black/40 to-black/60 z-0"></div>
        <div className="relative z-10 max-w-5xl w-full">
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-6xl md:text-9xl font-black mb-6 flex flex-col items-center gap-4">
            <span className="w-full text-center block leading-tight">TU PROPIO</span>
            <div className="flex items-center justify-center gap-4">
               <motion.img initial={{ scale: 0.8 }} animate={{ scale: 1 }} src={logoImg} alt="Icono Neón Beercoin" className="h-20 md:h-32 w-auto drop-shadow-[0_0_30px_#FF007F]" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF007F] via-[#ff5eb3] to-[#FF007F] bg-size-[200%_auto] animate-gradient font-black uppercase tracking-tighter text-glow-pink">BEERCOIN</span>
            </div>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-xl md:text-2xl text-gray-300 mb-8 font-light italic">
            La primera franquicia de cerveza inteligente.
          </motion.p>
        </div>
      </section>

      {/* INFO BLOCKS */}
      <section className="py-24 px-8 max-w-6xl mx-auto space-y-32">
        {BENEFIT_HEADINGS.map((benefit, i) => (
          <InfoBlock 
            key={i}
            title={benefit.title} 
            text={benefit.description} 
            image={benefit.image} 
            align={i % 2 === 0 ? "left" : "right"}
          />
        ))}
      </section>

      {/* BUILDER SECTION */}
      <section id="builder-section" className="py-24 bg-zinc-950 px-4 relative min-h-screen flex items-center">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#FF007F] to-transparent opacity-50"></div>
        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-4 uppercase text-white">Diseñá tu <span className="text-[#FF007F]">Modelo</span></h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-6 text-white uppercase tracking-widest"><span className="text-[#FF007F] mr-2">01.</span> Tipo de Modelo</h3>
              {MODELS.map((m) => (
                <button key={m.id} onClick={() => setSelectedModel(m)} className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center gap-6 ${selectedModel?.id === m.id ? 'border-[#FF007F] bg-[#FF007F]/10 shadow-[0_0_20px_rgba(255,0,127,0.1)]' : 'border-zinc-800 bg-zinc-900'}`}>
                  <div className={selectedModel?.id === m.id ? 'text-[#FF007F]' : 'text-zinc-500'}>{m.icon}</div>
                  <div className="flex-grow text-white uppercase font-bold text-lg">{m.name}</div>
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-6 text-white uppercase tracking-widest"><span className="text-[#FF007F] mr-2">02.</span> Características</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {FEATURES.map((f) => {
                  const isFixed = FIXED_FEATURES.includes(f);
                  const isSelected = selectedFeatures.includes(f);
                  return (
                    <div 
                      key={f} 
                      onClick={() => toggleFeature(f)} 
                      className={`px-5 py-4 rounded-xl border transition-all flex justify-between items-center ${isSelected ? 'border-[#FF007F] bg-zinc-900 text-white' : 'border-zinc-800 text-zinc-500'} ${isFixed ? 'opacity-90' : 'cursor-pointer hover:bg-zinc-800'}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase">{f}</span>
                        {isFixed && <span className="text-[9px] bg-[#FF007F] text-white px-1.5 py-0.5 rounded font-black tracking-tighter">INCLUIDO</span>}
                      </div>
                      <div className={`w-5 h-5 rounded border transition-colors flex items-center justify-center ${isSelected ? 'bg-[#FF007F] border-[#FF007F]' : 'border-zinc-700'}`}>
                        {isFixed ? <Lock className="w-3 h-3 text-white" /> : isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="text-center mt-20">
            <button 
              onClick={handleGenerateModelClick}
              disabled={!selectedModel}
              className={`group relative text-white text-xl font-black py-6 px-20 rounded-full transition-all flex items-center gap-4 mx-auto ${selectedModel ? 'bg-[#FF007F] hover:bg-[#d9006c] shadow-[0_0_40px_rgba(255,0,127,0.4)] cursor-pointer hover:scale-105' : 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50'}`}
            >
              GENERAR MODELO
              <ArrowRight className={`w-6 h-6 transition-transform ${selectedModel ? 'group-hover:translate-x-2' : ''}`} />
            </button>
          </div>
        </div>
      </section>

      {/* POPUP SECUENCIAL */}
      <AnimatePresence>
        {showBenefitIntro && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6 text-center">
            <BenefitSequence onComplete={handleContinueFromBenefits} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* PREVIEW FINAL */}
      <AnimatePresence>
        {showPreview && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl overflow-y-auto">
            <button onClick={() => setShowPreview(false)} className="fixed top-8 right-8 z-[110] text-zinc-500 hover:text-white transition-all hover:rotate-90">
              <X className="w-12 h-12" />
            </button>
            <div className="min-h-screen w-full max-w-7xl mx-auto px-6 py-12 flex flex-col justify-center">
              <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center text-5xl font-black mb-12 uppercase italic text-[#FF007F] drop-shadow-lg">
                Tu Beercoin <span className="text-white">Lista</span>
              </motion.h2>
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="relative group shadow-2xl">
                   <div className="absolute -inset-4 bg-[#FF007F]/10 blur-3xl rounded-full opacity-50" />
                   <div className="relative aspect-video rounded-[40px] overflow-hidden border border-white/10 bg-zinc-900 flex items-center justify-center">
                    {selectedModel?.image ? (
                      <img src={selectedModel.image} alt={`Render del modelo ${selectedModel.name} de Beercoin`} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-zinc-600 font-black">RENDER NO DISPONIBLE</div>
                    )}
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 text-center lg:text-left">
                  <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar font-bold">
                    {selectedFeatures.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 font-bold text-[10px] uppercase tracking-tighter">
                         {FIXED_FEATURES.includes(f) ? <Lock className="w-4 h-4 text-[#FF007F]" /> : <CheckCircle className="w-4 h-4 text-[#FF007F]" />}
                         {f}
                      </div>
                    ))}
                  </div>
                  <button onClick={handleWhatsAppClick} className="w-full bg-[#25D366] text-white font-black py-6 rounded-3xl flex items-center justify-center gap-4 shadow-xl hover:scale-105 transition-all text-xl">
                    <MessageCircle className="w-8 h-8" /> SOLICITAR COTIZACIÓN
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-20 text-center border-t border-zinc-900 bg-black">
        <p className="text-[#FF007F] font-black text-xl mb-2 italic tracking-widest uppercase">BEERCOIN GROUP</p>
        <p className="text-zinc-600 text-[10px] tracking-[0.5em] uppercase font-bold">© 2026 Todos los derechos reservados • Juan Ignacio Wilt</p>
      </footer>
    </div>
  );
}

function BenefitSequence({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextBenefit = useCallback(() => {
    // Evita que clics múltiples rompan el índice o la transición
    if (isTransitioning || isFinished) return;

    if (index < BENEFIT_HEADINGS.length - 1) {
      setIsTransitioning(true);
      setIndex(prev => prev + 1);
      // Pequeño delay para estabilizar el render antes de permitir otro clic
      setTimeout(() => setIsTransitioning(false), 400); 
    } else {
      setIsFinished(true);
    }
  }, [index, isFinished, isTransitioning]);

  useEffect(() => {
    if (!isFinished) {
      const timer = setTimeout(nextBenefit, 8000);
      return () => clearTimeout(timer);
    }
  }, [index, isFinished, nextBenefit]);

  // VALIDACIÓN DE SEGURIDAD: Si por alguna razón el índice falla, mostramos el final
  const currentBenefit = BENEFIT_HEADINGS[index];
  if (!currentBenefit && !isFinished) {
    setIsFinished(true);
    return null;
  }

  return (
    <div className="relative w-full max-w-4xl text-center">
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center relative"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#FFD1AB]/10 blur-[100px] rounded-full -z-10" />
            
            <Sparkles className="w-16 h-16 text-[#FFD1AB] mb-8" />
            
            {/* Usamos safe-access con ?. por las dudas */}
            <h2 className="text-5xl md:text-7xl font-black mb-8 text-[#FFD1AB] uppercase tracking-tighter drop-shadow-md">
              {currentBenefit?.title}
            </h2>
            <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-2xl leading-relaxed mb-12">
              {currentBenefit?.description}
            </p>

            <button 
              onClick={nextBenefit}
              disabled={isTransitioning}
              className={`flex items-center gap-2 text-zinc-500 hover:text-[#FFD1AB] transition-colors uppercase font-black tracking-widest text-sm group ${isTransitioning ? 'opacity-50 cursor-wait' : ''}`}
            >
              Siguiente <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center">
             <h2 className="text-6xl font-black mb-12 uppercase italic">¡LISTO PARA EL ÉXITO!</h2>
             <button 
                onClick={onComplete}
                className="bg-[#FF007F] text-white text-2xl font-black py-6 px-16 rounded-full shadow-[0_0_50px_rgba(255,0,127,0.4)] hover:scale-105 transition-all"
              >
                CONFIGURAR MI MODELO
              </button>
          </motion.div>
        )}
      </AnimatePresence>

      {!isFinished && (
        <div className="mt-16 w-48 h-1 bg-zinc-800 mx-auto rounded-full overflow-hidden">
          <motion.div 
            key={index}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 8, ease: "linear" }}
            className="h-full bg-[#FFD1AB]"
          />
        </div>
      )}
    </div>
  );
}

function InfoBlock({ title, text, align, image }) {
  return (
    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }} className={`flex flex-col ${align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16`}>
      <div className="w-full md:w-1/2 aspect-video bg-zinc-900 rounded-[40px] border border-white/5 flex items-center justify-center text-zinc-800 font-black text-6xl shadow-2xl relative overflow-hidden group">
        {image ? (
          <img src={image} alt={`Visualización de ${title} - Beercoin`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        ) : (
          <span className="opacity-20">RENDER</span>
        )}
        <div className="absolute inset-0 bg-[#FF007F]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className={`w-full md:w-1/2 ${align === 'right' ? 'md:text-right' : 'md:text-left'} text-center`}>
        <h2 className="text-5xl font-black mb-8 leading-tight uppercase tracking-tighter text-white">{title}</h2>
        <p className="text-xl text-zinc-400 font-light leading-relaxed">{text}</p>
      </div>
    </motion.div>
  );
}