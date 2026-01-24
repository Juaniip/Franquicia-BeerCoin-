import { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, Store, Coffee, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';

// --- IMPORTA TU LOGO AQUÍ ---
import logoImg from './assets/logo-neon.png'; 

// --- CÓDIGO DE COLOR EXACTO ---
// Usaremos el HEX #FF007F (Rosa Neón) para que coincida con tu logo.
// Si tu logo tiene otro código, solo presiona CTRL + H y reemplaza FF007F por tu código.

const MODELS = [
  { id: 'container', name: 'Modelo Container', icon: <Store className="w-8 h-8"/>, desc: 'Estructura modular, bajo costo y despliegue rápido.' },
  { id: 'foodtruck', name: 'Food Truck', icon: <Truck className="w-8 h-8"/>, desc: 'Movilidad total para eventos y puntos rotativos.' },
  { id: 'bar', name: 'Bar Clásico', icon: <Coffee className="w-8 h-8"/>, desc: 'La experiencia completa en local a la calle.' },
];

const FEATURES = [
  'Sistema de Gestión (POS)', 'Cartelería Neon LED', 'Cámaras de Seguridad', 
  'Entrenamiento de Personal', 'Marketing de Lanzamiento', 'Mobiliario Premium'
];

export default function App() {
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const toggleFeature = (feat) => {
    if (selectedFeatures.includes(feat)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== feat));
    } else {
      setSelectedFeatures([...selectedFeatures, feat]);
    }
  };

  const handleWhatsAppClick = () => {
    if (!selectedModel) return alert("Por favor selecciona un modelo primero.");
    const text = `Hola Beercoin! Estoy interesado en la franquicia.%0A%0A*Modelo:* ${selectedModel.name}%0A*Extras:* ${selectedFeatures.join(', ') || 'Ninguno'}.%0A%0AQuiero recibir el dossier.`;
    window.open(`https://wa.me/5492213096049?text=${text}`, '_blank');
  };

  const scrollToBuilder = () => {
    document.getElementById('builder-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // Color de selección de texto ajustado al rosa del logo
    <div className="bg-black text-white min-h-screen font-sans selection:bg-[#FF007F] selection:text-white">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-8 py-4 bg-black/60 backdrop-blur-xl border-b border-white/10">
        <a href="#" className="flex items-center gap-3 group">
          <img 
            src={logoImg} 
            alt="Logo Beercoin" 
            className="h-10 w-auto group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_#FF007F]" 
          />
          <div className="text-2xl font-black tracking-tighter text-white drop-shadow-[0_0_5px_rgba(255,0,127,0.8)]">
            BEERCOIN
          </div>
        </a>
        <button 
          onClick={scrollToBuilder}
          className="bg-[#FF007F] hover:bg-[#d9006c] text-white font-bold py-2 px-6 rounded-full transition-all hover:scale-105 hover:shadow-[0_0_20px_#FF007F]"
        >
          Invertir
        </button>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
        {/* Fondo con un toque sutil de rosa en la oscuridad */}
        <div className="absolute inset-0 bg-black/60 bg-linear-to-t from-black via-black/40 to-black/60 z-0"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF007F] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 max-w-5xl w-full">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            // Cambiamos a flex-col para apilar los elementos verticalmente y centramos todo
            className="text-6xl md:text-9xl font-black mb-6 text-white drop-shadow-[0_0_15px_rgba(255,0,127,0.3)] flex flex-col items-center justify-center gap-4"
          >
            {/* Texto "TU PROPIA" centrado y estirado */}
            <span className="w-full text-center block leading-tight">TU PROPIO</span>
            
            {/* Contenedor del Logo + Texto "BEERCOIN" debajo */}
            <div className="flex items-center justify-center gap-5 md:mt-2">
               <motion.img 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                src={logoImg} 
                alt="Logo Beercoin" 
                className="h-20 md:h-52 w-auto drop-shadow-[0_0_15px_#FF007F]" 
              />
              {/* Texto "BEERCOIN" con gradiente */}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF007F] via-[#ff5eb3] to-[#FF007F] bg-size-[200%_auto] animate-gradient font-black">
              BEERCOIN
              </span>
            </div>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 font-light"
          >
            La primera franquicia de cerveza inteligente. Diseño disruptivo, tecnología y alta rentabilidad.
          </motion.p>
        </div>
      </section>

      {/* --- INFO CARDS --- */}
      <section className="py-24 px-8 max-w-6xl mx-auto space-y-32">
        <InfoBlock 
          title="El Futuro del Autoservicio" 
          text="Olvídate de esperar al barman. En Beer Coin, tú tienes el control. Nuestro sistema de expendio automático te permite elegir, servir y disfrutar tu estilo favorito en segundos. Es simple: acercas tu vaso, seleccionas tu medida y nuestra tecnología garantiza el tiraje perfecto con la espuma justa. La revolución del take-away cervecero ya llegó"
          align="left"
        />
         <InfoBlock 
          title="Al Paso" 
          text="Diseñamos Beer Coin para el ritmo de la ciudad. Somos tu
parada técnica de calidad. Sin filas y sin demoras. Fusionamos
la mejor cerveza artesanal con un sistema de vending de última
generación. Porque sabemos que tu tiempo vale tanto como una
buena pinta fría."
          align="right"
        />
      </section>

      {/* --- BUILDER SECTION --- */}
      <section id="builder-section" className="py-24 bg-zinc-950 px-4 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#FF007F] to-transparent opacity-50"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4 text-white"><span className="text-[#FF007F] drop-shadow-[0_0_10px_rgba(255,0,127,0.5)]">Configura</span> tu Franquicia</h2>
          </div>

          {/* Modelos */}
          <div className="mb-16">
            <div className="grid md:grid-cols-3 gap-6">
              {MODELS.map((model) => (
                <div 
                  key={model.id}
                  onClick={() => setSelectedModel(model)}
                  className={`cursor-pointer p-8 rounded-2xl border-2 transition-all group ${
                    selectedModel?.id === model.id 
                      ? 'border-[#FF007F] bg-[#FF007F]/10 shadow-[0_0_30px_rgba(255,0,127,0.2)]' 
                      : 'border-zinc-800 hover:border-[#FF007F]/50 bg-zinc-900'
                  }`}
                >
                  <div className={`mb-6 ${selectedModel?.id === model.id ? 'text-[#FF007F]' : 'text-zinc-400 group-hover:text-[#FF007F]'} transition-colors`}>
                    {model.icon}
                  </div>
                  <h4 className="font-bold text-2xl mb-3 text-white">{model.name}</h4>
                  <p className="text-zinc-400 leading-relaxed">{model.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Adicionales */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center text-white">Adicionales Premium</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {FEATURES.map((feat) => (
                <div 
                  key={feat}
                  onClick={() => toggleFeature(feat)}
                  className={`cursor-pointer px-6 py-4 rounded-xl flex items-center justify-between transition-all border ${
                    selectedFeatures.includes(feat) 
                      ? 'bg-zinc-900 text-white border-[#FF007F] shadow-[inset_0_0_10px_rgba(255,0,127,0.2)]' 
                      : 'bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <span className="font-medium">{feat}</span>
                  {selectedFeatures.includes(feat) && <CheckCircle className="w-5 h-5 text-[#FF007F]"/>}
                </div>
              ))}
            </div>
          </div>

          {/* Botón Final */}
          <div className="text-center">
            <button 
              onClick={handleWhatsAppClick}
              disabled={!selectedModel}
              className="group relative overflow-hidden bg-[#FF007F] hover:bg-[#d9006c] disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white text-xl font-bold py-5 px-12 rounded-full transition-all flex items-center gap-3 mx-auto shadow-[0_0_30px_rgba(255,0,127,0.4)] hover:shadow-[0_0_50px_rgba(255,0,127,0.6)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <MessageCircle className="w-6 h-6" />
                Solicitar Cotización Vía WhatsApp
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
              </span>
            </button>
          </div>

        </div>
      </section>

      <footer className="py-12 text-center text-zinc-500 text-sm bg-black border-t border-zinc-900">
        <p className="mb-2 text-[#FF007F] font-bold">BEERCOIN GROUP</p>
        © 2026 Todos los derechos reservados.
      </footer>
    </div>
  );
}

// --- INFOBLOCK ---
function InfoBlock({ title, text, align, imageSrc }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`flex flex-col ${align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}
    >
      <div className="w-full md:w-1/2 aspect-4/3 bg-zinc-900 rounded-3xl border border-[#FF007F]/20 relative overflow-hidden group shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        {imageSrc ? (
          <img 
            src={imageSrc} 
            alt={title}
            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-950">
            <span className="text-zinc-700 font-bold">Render Placeholder</span>
          </div>
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-80"></div>
      </div>

      <div className={`w-full md:w-1/2 flex flex-col ${align === 'right' ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} text-center`}>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
          {title}
        </h2>
        <p className="text-xl text-zinc-300 leading-relaxed max-w-lg">{text}</p>
      </div>
    </motion.div>
  )
}