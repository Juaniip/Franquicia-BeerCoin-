/* ============================================================
   BEERCOIN — DATOS EDITABLES
   Todo lo que se cambia seguido (WhatsApp, modelos, extras,
   textos de beneficios) vive acá. El resto del JS no se toca.
   ============================================================ */
(function(BC){
  "use strict";

  BC.WHATSAPP_NUMBER = "5492216268689";

  var IMG = 'assets/img/';
  BC.IMAGES = {
    clasico:      IMG + 'clasico.webp',
    foodtruck:    IMG + 'foodtruck.webp',
    incrustado:   IMG + 'incrustado.webp',
    parador:      IMG + 'parador.webp',
    renderalpaso: IMG + 'renderalpaso.webp',
    party:        IMG + 'party.webp',
    logo:         IMG + 'logo.webp'
  };

  BC.MODELS = [
    { id:'foodtruck', name:'Food Truck',       icon:'truck',  desc:'Movilidad total para eventos.',        image: BC.IMAGES.foodtruck },
    { id:'empotrado', name:'Modelo Empotrado', icon:'layout', desc:'Integración en locales existentes.',   image: BC.IMAGES.incrustado },
    { id:'parador',   name:'Parador',          icon:'mappin', desc:'Punto compacto ideal para playa.',     image: BC.IMAGES.parador },
    { id:'bar',       name:'Bar Clásico',      icon:'coffee', desc:'La experiencia completa.',             image: BC.IMAGES.clasico },
    { id:'party',     name:'Modelo Party',     icon:'party',  desc:'Configuración para fiestas masivas.',  image: BC.IMAGES.party }
  ];

  BC.FEATURES = [
    'Barriles','Capacitación','Clausula de Reventa','Con Suministro (cerveza)','Descartables',
    'Equipo de Limpieza','Espacio Exterior y Cartelería','Habilitación','Live Room','Maquina BeerCoin',
    'Merchandising','Publicidad','Repuestos','Sistema CO2','Sistema de Frío','Vending Extra'
  ];

  // Vienen siempre incluidas: no se pueden destildar.
  BC.FIXED_FEATURES = ['Maquina BeerCoin','Publicidad','Capacitación'];

  BC.BENEFITS = [
    { title:"El Futuro del Autoservicio", desc:"Olvídate de esperar al barman. En Beercoin, tú tienes el control. Nuestro sistema de expendio automático garantiza el tiraje perfecto con la espuma justa. La revolución del take-away cervecero ya llegó.", image: BC.IMAGES.incrustado },
    { title:"Al Paso", desc:"Diseñamos Beercoin para el ritmo de la ciudad. Somos tu parada técnica de calidad. Sin filas y sin demoras. Fusionamos la mejor cerveza artesanal con un sistema de vending de última generación.", image: BC.IMAGES.renderalpaso },
    { title:"Recuperación Rápida", desc:"Con una inversión optimizada y un modelo de negocio de alta eficiencia, tu retorno de inversión (ROI) con Beercoin está diseñado para ser de los más rápidos del mercado.", image: BC.IMAGES.foodtruck },
    { title:"Staff Mínimo", desc:"La automatización es clave para la rentabilidad. Nuestro modelo operativo requiere una intervención humana mínima, reduciendo drásticamente los costos fijos y simplificando la gestión de recursos humanos.", image: BC.IMAGES.parador }
  ];

  // Cuánto dura cada "story" de beneficios antes de pasar sola (ms).
  BC.BENEFIT_DURATION = 8000;

})(window.BeerCoin = window.BeerCoin || {});
