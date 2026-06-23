# AgroSensly

AgroSensly es un prototipo full-stack de agricultura de precisión. Incluye un backend en FastAPI que simula un sensor de humedad de suelo, un pronóstico climático y un agente de IA con respuestas hardcodeadas, más un frontend en React + Tailwind CSS con un dashboard visual pensado para agricultores.

## Estructura sugerida

```text
AgroSensly/
├─ backend/
│  ├─ app/
│  │  ├─ routers/
│  │  │  ├─ ai.py
│  │  │  ├─ sensor.py
│  │  │  └─ weather.py
│  │  ├─ services/
│  │  │  ├─ ai_agent_service.py
│  │  │  ├─ sensor_service.py
│  │  │  └─ weather_service.py
│  │  ├─ main.py
│  │  └─ models.py
│  └─ requirements.txt
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  │  ├─ AIAssistant.tsx
│  │  │  ├─ CropSelector.tsx
│  │  │  ├─ DashboardCard.tsx
│  │  │  ├─ SensorCard.tsx
│  │  │  └─ WeatherCard.tsx
│  │  ├─ lib/
│  │  │  └─ api.ts
│  │  ├─ App.tsx
│  │  ├─ index.css
│  │  ├─ main.tsx
│  │  └─ types.ts
│  ├─ index.html
│  ├─ package.json
│  ├─ postcss.config.js
│  ├─ tailwind.config.js
│  ├─ tsconfig.json
│  ├─ tsconfig.node.json
│  └─ vite.config.ts
└─ .gitignore
```

## Backend

### Instalación

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Endpoints

`GET /`
: Estado básico del servicio.

`GET /api/sensor/readings`
: Devuelve una lectura simulada del sensor con humedad y temperatura del suelo.

`GET /api/weather/forecast?city=Pereira`
: Devuelve datos mock o reales si se define `OPENWEATHER_API_KEY`.

`POST /api/ai/recommendation`
: Recibe cultivo, humedad actual y clima para devolver una recomendación estructurada de riego.

## Frontend

### Instalación

```bash
cd frontend
npm install
npm run dev
```

### Variables opcionales

`VITE_API_URL`
: URL base del backend. Por defecto usa `http://localhost:8000/api`.

`OPENWEATHER_API_KEY`
: Reservada para conectar una API real en una siguiente iteración.
# AgroSensly