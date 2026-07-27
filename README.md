# AgroSensly EC

AgroSensly es un prototipo móvil de alta fidelidad para productores hortícolas. Convierte lecturas de humedad del suelo y clima en decisiones de riego fáciles de entender, incorpora una guía contextual por cultivo y premia hábitos que ayudan a usar mejor el agua.

## Qué incluye

- Dashboard móvil con semáforo de humedad, temperatura del suelo, clima y recomendación inmediata.
- Modo demostración integrado: el frontend funciona aunque el backend no esté desplegado.
- Cinco fichas hortícolas: tomate, lechuga, albahaca, pepino y pimiento.
- Kinti, mascota y asistente contextual de AgroSensly.
- Preguntas guiadas sobre riego, pH, luz, temperatura, ciclo y señales de estrés.
- Gamificación útil con niveles, semillas, rachas, misiones e insignias.
- Backend FastAPI con endpoints de sensor, clima, recomendación de riego y conocimiento hortícola.

## Estructura

```text
AgroSensly/
├─ backend/
│  └─ app/
│     ├─ routers/
│     ├─ services/
│     ├─ main.py
│     └─ models.py
└─ frontend/
   ├─ public/assets/
   │  ├─ kinti.png
   │  └─ kinti.webp
   └─ src/
      ├─ components/
      ├─ data/crops.ts
      ├─ lib/api.ts
      ├─ App.tsx
      └─ index.css
```

## Ejecutar el frontend

```bash
cd frontend
npm install
npm run dev
```

La app se abre en `http://localhost:5173`. Las vistas también pueden abrirse directamente:

- `#home`
- `#crops`
- `#missions`
- `#assistant`

### Conectar el backend

Sin configuración, el frontend usa datos de demostración estables para evitar una pantalla bloqueada. Para utilizar el backend real:

```bash
VITE_API_URL=http://localhost:8000/api npm run dev
```

## Ejecutar el backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Endpoints principales

- `GET /api/sensor/readings`
- `GET /api/weather/forecast?city=Pereira`
- `POST /api/ai/recommendation`
- `GET /api/ai/crops`
- `GET /api/ai/crops/{crop_id}`
- `POST /api/ai/crop-advice`

La documentación interactiva queda disponible en `http://localhost:8000/docs`.
