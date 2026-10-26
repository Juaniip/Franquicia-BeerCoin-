# Franquicia BeerCoin

Sitio web de BeerCoin, la franquicia de bares que reemplaza al barman por un sistema de fichas/tokens: metés la moneda, apretás el botón y servís tu propia cerveza. Sin filas, sin esperas, con el foco puesto en la previa y no en hacer cola.

## Estructura

Sitio estático sin build: se abre `index.html` (o se sirve la carpeta) y funciona, también offline.

```
index.html            markup de la página
css/styles.css        estilos (mobile first, breakpoints 640 / 900 / 1024)
js/vendor/            anime.js v4 (copia local del bundle UMD, licencia MIT)
js/data.js            DATOS EDITABLES: WhatsApp, modelos, características, beneficios
js/icons.js           íconos SVG
js/motion.js          todas las animaciones (anime.js)
js/app.js             estado, render y eventos
assets/img/           renders y logo en WebP
wrangler.toml         deploy en Cloudflare (assets estáticos)
.assetsignore         archivos que no se publican
```

- **Cambiar número, modelos o extras:** solo `js/data.js` (`WHATSAPP_NUMBER`, `MODELS`, `FEATURES`, `FIXED_FEATURES`, `BENEFITS`).
- **Cambiar una animación:** solo `js/motion.js`. `app.js` llama a `BeerCoin.motion.*` y no sabe cómo se anima nada.
- **Agregar un render:** WebP de ~1100px de ancho en `assets/img/` y referenciarlo en `IMAGES` de `data.js`.

## Animaciones (anime.js)

- Hero: letras de "TU PROPIO" que suben, moneda que entra girando y después flota, gradiente del "BEERCOIN" en loop, halo que respira.
- Bloques de beneficios y configurador: se revelan al scrollear (`onScroll`) con clip-path, palabras del título y stagger de tarjetas.
- Configurador: pulso al elegir modelo, check con rebote, sacudida al tocar una característica incluida, flecha del botón GENERAR en loop.
- Secuencia de beneficios: barra de progreso animada que avanza sola cada 8 s; se puede saltear con la X o cerrar con Esc.
- Preview: entrada escalonada del render y la lista; el botón de WhatsApp late suave.

Si el sistema tiene activado "reducir movimiento", las animaciones van directo a su estado final y no hay loops. Si anime.js no carga, el sitio funciona igual sin animar.

## Estado

El configurador, el flujo de cotización por WhatsApp y los renders de los 5 modelos están completos.

## Licencia

Uso privado, marca BeerCoin. Todos los derechos reservados.
