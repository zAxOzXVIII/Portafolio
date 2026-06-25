# Portafolio — Marden Adrian Barrera Rosales

Landing page profesional bilingüe (ES/EN) para mostrar habilidades, experiencia y proyectos como **Ingeniero en Informática** con enfoque en desarrollo backend y conocimientos en frontend.

**Sitio en vivo:** [zAxOzXVIII.github.io/Portafolio](https://zAxOzXVIII.github.io/Portafolio) *(pendiente de despliegue)*

---

## Sobre el proyecto

Sitio estático ligero pensado para GitHub Pages: una sola página con secciones claras, enlaces de contacto y descarga de CV. Sin frameworks — solo HTML, CSS y JavaScript.

| Característica | Detalle |
|----------------|---------|
| **Stack** | HTML5, CSS3, JavaScript (vanilla) |
| **Idiomas** | Español / Inglés |
| **Tema** | Oscuro, moderno, minimalista |
| **Hosting** | GitHub Pages |
| **Datos** | `data/portfolio.json` |

---

## Secciones

- **Hero** — Presentación con foto y frase profesional
- **Habilidades** — PHP/Laravel, JS/React, Python/Django, bases de datos, Docker, etc.
- **Experiencia** — internet4E, freelance
- **Proyectos** — Bingo (inventarios), App Harinas (universitario), licencias automotrices, comandas…
- **Educación** — Ingeniería en Informática, ciberseguridad (en progreso)
- **Contacto** — GitHub, LinkedIn, WhatsApp
- **CV** — Descarga en PDF

---

## Estructura del repositorio

```
Portafolio/
├── index.html          # Landing page
├── css/                # Estilos
├── js/                 # Lógica e i18n
│   ├── main.js
│   └── tech-icons.js   # Iconos flotantes del Hero
├── assets/
│   ├── icons/          # Logos de tecnologías (SVG)
│   ├── images/
│   └── cv/
│       └── Marden_Barrera_CV.pdf   # Pendiente
├── data/
│   └── portfolio.json  # Contenido bilingüe
├── docs/
│   └── PROFILE.md      # Referencia del perfil
├── PROMPT.md           # Prompts para IA
└── README.md
```

---

## Arrancar el proyecto en local

### Requisitos

- Navegador moderno (Chrome, Firefox, Edge)
- **Python 3**, **PHP** o **Node.js** (cualquiera sirve para levantar un servidor local)
- Git (opcional, solo para clonar el repo)

### 1. Obtener el código

Si aún no lo tienes en tu PC:

```bash
git clone git@github.com:zAxOzXVIII/Portafolio.git
cd Portafolio
```

Si ya lo tienes, entra a la carpeta del proyecto:

```powershell
cd C:\Users\Yenifer\Documents\cursor\Portafolio
```

### 2. Levantar un servidor local

> **Importante:** no abras `index.html` directamente con doble clic (`file://`).  
> El sitio carga `data/portfolio.json` con `fetch`, y eso **solo funciona con un servidor HTTP**.

Elige **una** de estas opciones en la terminal, dentro de la carpeta `Portafolio`:

**Python (recomendado en Windows):**

```bash
python -m http.server 8080
```

**PHP:**

```bash
php -S localhost:8080
```

**Node.js (si tienes `npx`):**

```bash
npx serve -l 8080
```

Verás un mensaje indicando que el servidor está escuchando. **Deja esa terminal abierta** mientras trabajas.

### 3. Abrir en el navegador

Visita:

```
http://localhost:8080
```

Para ver cambios después de editar archivos, recarga la página (`F5` o `Ctrl+F5` para forzar recarga).

### 4. Detener el servidor

En la terminal donde corre el servidor, presiona:

```
Ctrl + C
```

### Solución de problemas

| Problema | Qué hacer |
|----------|-----------|
| Página en blanco o sin datos | Usa `http://localhost:8080`, no `file://` |
| Puerto 8080 ocupado | Prueba otro puerto: `python -m http.server 3000` y abre `http://localhost:3000` |
| Cambios no se ven | Recarga con `Ctrl+F5` |
| Error al cargar JSON | Verifica que exista `data/portfolio.json` y que el servidor esté en la raíz del proyecto |

### Dónde editar contenido

| Qué cambiar | Archivo |
|-------------|---------|
| Nombre, bio, experiencia, proyectos, contacto | `data/portfolio.json` |
| Textos del menú, botones y secciones | `js/main.js` → `UI_STRINGS` |
| Estilos y colores | `css/style.css` |
| SEO (título, meta tags) | `index.html` |
| Referencia interna del perfil | `docs/PROFILE.md` |

---

## Despliegue en GitHub Pages

1. Sube el código a `main` en [zAxOzXVIII/Portafolio](https://github.com/zAxOzXVIII/Portafolio)
2. En el repo: **Settings → Pages**
3. **Source:** Deploy from branch
4. **Branch:** `main` → `/ (root)`
5. Guarda y espera unos minutos

La URL será: `https://zAxOzXVIII.github.io/Portafolio/`

---

## Git con SSH

```bash
git remote set-url origin git@github.com:zAxOzXVIII/Portafolio.git
```

---

## Autor

**Marden Adrian BARRERA ROSALES**  
San Cristóbal, Venezuela

- GitHub: [@zAxOzXVIII](https://github.com/zAxOzXVIII)
- LinkedIn: [zaxoz-m-barrera](https://linkedin.com/in/zaxoz-m-barrera-ba5886257)
- WhatsApp: [+58 412-5802217](https://wa.me/584125802217)

---

## Licencia

Proyecto personal. El contenido y la imagen de perfil son propiedad del autor.
