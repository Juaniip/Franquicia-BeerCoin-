# Franquicia BeerCoin

Sitio web de BeerCoin, la franquicia de bares que reemplaza al barman por un sistema de fichas/tokens: metés la moneda, apretás el botón y servís tu propia cerveza. Sin filas, sin esperas, con el foco puesto en la previa y no en hacer cola.

## Qué hay en este repo

Hay dos versiones del sitio:

- **`index.html`** — la página lista para publicar. Es un solo archivo HTML, sin dependencias externas ni proceso de build. Se abre con doble click en cualquier navegador y funciona. Ideal para subirla a un hosting estático, mandarla por WhatsApp o dejarla en un pendrive.
- **`beercoin/`** — el proyecto original en React + Vite + Tailwind, por si en algún momento hay que seguir desarrollando el sitio con componentes, animaciones con Framer Motion, etc.

Si solo necesitás mostrar el sitio o subirlo a algún lado rápido, usá `index.html`. Si vas a seguir programando features nuevas, trabajá dentro de `beercoin/`.

## `index.html` — cómo está armado

Es una página estática de una sola sección scrolleable (landing + configurador), sin frameworks. Todo el JS es vanilla y todas las imágenes están embebidas en el propio archivo en formato WebP (convertidas y comprimidas para que el HTML no pese varios MB). No hace falta levantar un servidor ni instalar nada — se abre y ya.

Incluye:

- Hero con el logo y la marca.
- Bloques de texto explicando la propuesta (autoservicio, "al paso", recupero rápido de inversión, staff mínimo).
- Un configurador donde el usuario elige el modelo de franquicia (Food Truck, Empotrado, Parador, Bar Clásico, Party) y las características que quiere sumar.
- Una secuencia de beneficios tipo "story" que se muestra antes del resumen final.
- Un resumen final con botón que arma un mensaje de WhatsApp con la configuración elegida y lo manda directo al número de contacto.

Si hay que cambiar el número de WhatsApp, el texto del mensaje o agregar/sacar alguna característica del listado, todo eso está al principio del `<script>`, en las variables `WHATSAPP_NUMBER`, `MODELS` y `FEATURES`. No hace falta tocar nada más.

## `beercoin/` — el proyecto en React

```
cd beercoin
npm install
npm run dev
```

Con eso levanta en local con hot reload. `npm run build` genera la versión de producción en `dist/`.

## Estado

En desarrollo. El configurador y el flujo de cotización por WhatsApp ya andan; falta terminar de sumar renders para todos los modelos (por ahora "Modelo Party" no tiene imagen todavía).

## Licencia

Uso privado, marca BeerCoin. Todos los derechos reservados.
