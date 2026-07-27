import type {
  CropId,
  CropProfile,
  NewCropProfile,
  SensorReading,
  WeatherForecast,
} from '../types';

const CUSTOM_CROPS_STORAGE_KEY = 'agrosensly.custom-crops.v1';

export const CROPS: CropProfile[] = [
  {
    id: 'tomate',
    name: 'Tomate',
    variety: 'Hortaliza de fruto',
    accent: '#f0795b',
    moistureMin: 45,
    moistureMax: 65,
    sunlight: '6–8 h de sol',
    soilPh: 'pH 6,0–6,8',
    temperature: '18–27 °C',
    cycle: '90–120 días',
    spacing: '40–60 cm',
    watering: 'Riego profundo, sin mojar hojas',
    tip: 'Mantén una humedad estable durante floración y fruto para evitar rajaduras.',
    risks: 'Vigila hojas enrolladas, manchas oscuras y frutos con grietas.',
    stages: ['Semillero', 'Trasplante', 'Floración', 'Cosecha'],
  },
  {
    id: 'lechuga',
    name: 'Lechuga',
    variety: 'Hortaliza de hoja',
    accent: '#b7e84b',
    moistureMin: 50,
    moistureMax: 70,
    sunlight: '4–6 h de sol',
    soilPh: 'pH 6,0–7,0',
    temperature: '12–22 °C',
    cycle: '45–70 días',
    spacing: '25–30 cm',
    watering: 'Riego ligero y frecuente',
    tip: 'Su raíz es superficial: evita que la capa superior del suelo se seque por completo.',
    risks: 'El calor excesivo puede espigarla; controla babosas y bordes quemados.',
    stages: ['Semillero', 'Aclareo', 'Formación', 'Cosecha'],
  },
  {
    id: 'albahaca',
    name: 'Albahaca',
    variety: 'Aromática',
    accent: '#54c995',
    moistureMin: 42,
    moistureMax: 62,
    sunlight: '5–7 h de sol',
    soilPh: 'pH 6,0–7,5',
    temperature: '20–30 °C',
    cycle: '60–90 días',
    spacing: '20–30 cm',
    watering: 'Riego regular al pie',
    tip: 'Corta las flores tempranas para mantener hojas tiernas y estimular nuevos brotes.',
    risks: 'Evita encharcamientos y revisa el envés por pulgones o manchas.',
    stages: ['Germinación', 'Crecimiento', 'Poda', 'Cosecha'],
  },
  {
    id: 'pepino',
    name: 'Pepino',
    variety: 'Hortaliza de fruto',
    accent: '#7dd3fc',
    moistureMin: 48,
    moistureMax: 68,
    sunlight: '6–8 h de sol',
    soilPh: 'pH 6,0–7,0',
    temperature: '20–28 °C',
    cycle: '55–75 días',
    spacing: '50–70 cm',
    watering: 'Humedad constante, sin saturar',
    tip: 'Usa tutorado para airear la planta y facilitar una cosecha más limpia.',
    risks: 'Hojas con polvo blanco pueden indicar oídio; evita mojar el follaje.',
    stages: ['Siembra', 'Tutorado', 'Floración', 'Cosecha'],
  },
  {
    id: 'pimiento',
    name: 'Pimiento',
    variety: 'Hortaliza de fruto',
    accent: '#e0a15a',
    moistureMin: 44,
    moistureMax: 64,
    sunlight: '6–8 h de sol',
    soilPh: 'pH 6,0–6,8',
    temperature: '20–29 °C',
    cycle: '100–140 días',
    spacing: '40–50 cm',
    watering: 'Riego moderado y uniforme',
    tip: 'Evita cambios bruscos de humedad para reducir la caída de flores.',
    risks: 'Vigila pulgones, trips y manchas hundidas en la base del fruto.',
    stages: ['Semillero', 'Trasplante', 'Cuajado', 'Cosecha'],
  },
];

export function getCropProfile(cropId: CropId, crops: CropProfile[] = CROPS): CropProfile {
  return crops.find((crop) => crop.id === cropId) ?? crops[0] ?? CROPS[0];
}

function isCropProfile(value: unknown): value is CropProfile {
  if (!value || typeof value !== 'object') return false;

  const crop = value as Record<string, unknown>;
  const textFields = [
    'id',
    'name',
    'variety',
    'accent',
    'sunlight',
    'soilPh',
    'temperature',
    'cycle',
    'spacing',
    'watering',
    'tip',
    'risks',
  ];

  return (
    crop.isCustom === true &&
    textFields.every((field) => typeof crop[field] === 'string' && crop[field].length > 0) &&
    typeof crop.moistureMin === 'number' &&
    typeof crop.moistureMax === 'number' &&
    Array.isArray(crop.stages) &&
    crop.stages.length > 0 &&
    crop.stages.every((stage) => typeof stage === 'string' && stage.length > 0)
  );
}

export function loadCustomCrops(): CropProfile[] {
  try {
    const storedCrops = window.localStorage.getItem(CUSTOM_CROPS_STORAGE_KEY);
    if (!storedCrops) return [];

    const parsedCrops: unknown = JSON.parse(storedCrops);
    return Array.isArray(parsedCrops) ? parsedCrops.filter(isCropProfile) : [];
  } catch {
    return [];
  }
}

export function saveCustomCrops(crops: CropProfile[]) {
  try {
    window.localStorage.setItem(
      CUSTOM_CROPS_STORAGE_KEY,
      JSON.stringify(crops.filter((crop) => crop.isCustom)),
    );
  } catch {
    // The app stays usable when storage is unavailable or full.
  }
}

export function createCustomCrop(profile: NewCropProfile): CropProfile {
  const slug =
    profile.name
      .toLocaleLowerCase('es')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') || 'hortaliza';

  return {
    ...profile,
    id: `custom-${slug}-${Date.now().toString(36)}`,
    isCustom: true,
  };
}

function normalizedQuestion(question: string) {
  return question
    .toLocaleLowerCase('es')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function buildCropAnswer(
  crop: CropProfile,
  question: string,
  sensor: SensorReading | null,
  weather: WeatherForecast | null,
) {
  const normalized = normalizedQuestion(question);
  const currentMoisture = sensor?.soil_moisture;

  if (normalized.includes('agua') || normalized.includes('riego') || normalized.includes('humedad')) {
    const sensorContext =
      currentMoisture === undefined
        ? ''
        : currentMoisture < crop.moistureMin
          ? ` Tu sensor marca ${currentMoisture.toFixed(0)}%, así que está por debajo del rango recomendado.`
          : currentMoisture > crop.moistureMax
            ? ` Tu sensor marca ${currentMoisture.toFixed(0)}%, por encima del rango recomendado; espera antes de regar.`
            : ` Tu sensor marca ${currentMoisture.toFixed(0)}%, dentro del rango adecuado.`;

    return `Para ${crop.name.toLowerCase()}, busca entre ${crop.moistureMin}% y ${crop.moistureMax}% de humedad. ${crop.watering}.${sensorContext}`;
  }

  if (normalized.includes('ph') || normalized.includes('suelo') || normalized.includes('tierra')) {
    return `${crop.name} se desarrolla mejor con ${crop.soilPh}. Usa suelo suelto, con buen drenaje y materia orgánica; evita compactarlo alrededor de la raíz.`;
  }

  if (
    normalized.includes('sol') ||
    normalized.includes('luz') ||
    normalized.includes('calor') ||
    normalized.includes('temperatura')
  ) {
    const weatherContext = weather
      ? ` Hoy en ${weather.city} hay ${weather.ambient_temperature.toFixed(0)} °C y ${weather.rainfall_probability}% de probabilidad de lluvia.`
      : '';
    return `${crop.name} necesita ${crop.sunlight} y trabaja mejor entre ${crop.temperature}.${weatherContext}`;
  }

  if (
    normalized.includes('plaga') ||
    normalized.includes('enfermedad') ||
    normalized.includes('estres') ||
    normalized.includes('hoja')
  ) {
    return `${crop.risks} Revisa dos veces por semana el envés de las hojas y registra cualquier cambio de color o textura.`;
  }

  if (
    normalized.includes('siembr') ||
    normalized.includes('cosech') ||
    normalized.includes('ciclo') ||
    normalized.includes('cuanto tarda')
  ) {
    return `El ciclo estimado de ${crop.name.toLowerCase()} es de ${crop.cycle}. Sus etapas clave son: ${crop.stages.join(' → ')}. Mantén una separación de ${crop.spacing}.`;
  }

  return `${crop.name} prefiere ${crop.sunlight}, ${crop.soilPh} y humedad entre ${crop.moistureMin}% y ${crop.moistureMax}%. ${crop.tip}`;
}
