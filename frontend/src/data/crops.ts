import type { CropId, CropProfile, SensorReading, WeatherForecast } from '../types';

export const CROPS: CropProfile[] = [
  {
    id: 'tomate',
    name: 'Tomate',
    variety: 'Hortaliza de fruto',
    accent: '#e95b3f',
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
    accent: '#70a83b',
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
    accent: '#23866b',
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
    accent: '#3c9950',
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
    accent: '#d9922d',
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

export function getCropProfile(cropId: CropId): CropProfile {
  return CROPS.find((crop) => crop.id === cropId) ?? CROPS[0];
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
