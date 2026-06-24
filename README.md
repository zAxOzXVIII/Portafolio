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
- **Proyectos** — Inventarios, gestión universitaria, comandas, licencias automotrices…
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
├── assets/
│   ├── images/
│   │   └── profile.png
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

## Desarrollo local

Abre `index.html` en el navegador o usa un servidor local:

```bash
# Con Python
python -m http.server 8080

# Con PHP
php -S localhost:8080
```

Visita: `http://localhost:8080`

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
