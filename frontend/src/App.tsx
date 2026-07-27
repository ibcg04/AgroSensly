import { useCallback, useEffect, useMemo, useState } from 'react';

import { AgroIcon } from './components/AgroIcon';
import { AppHeader } from './components/AppHeader';
import { BottomNavigation } from './components/BottomNavigation';
import { CropsView } from './components/CropsView';
import { HomeView } from './components/HomeView';
import { KintiAssistant } from './components/KintiAssistant';
import { MissionsView } from './components/MissionsView';
import {
  CROPS,
  createCustomCrop,
  getCropProfile,
  loadCustomCrops,
  saveCustomCrops,
} from './data/crops';
import { getAIRecommendation, getSensorReading, getWeatherForecast } from './lib/api';
import type {
  AIRecommendation,
  AppView,
  CropId,
  CropProfile,
  NewCropProfile,
  SensorReading,
  WeatherForecast,
} from './types';

const DEFAULT_CITY = 'Pereira';
const APP_VIEWS: AppView[] = ['home', 'crops', 'missions', 'assistant'];

function getInitialView(): AppView {
  const hashView = window.location.hash.replace('#', '') as AppView;
  return APP_VIEWS.includes(hashView) ? hashView : 'home';
}

export default function App() {
  const [activeView, setActiveView] = useState<AppView>(getInitialView);
  const [cropId, setCropId] = useState<CropId>('tomate');
  const [customCrops, setCustomCrops] = useState<CropProfile[]>(loadCustomCrops);
  const [sensor, setSensor] = useState<SensorReading | null>(null);
  const [weather, setWeather] = useState<WeatherForecast | null>(null);
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(620);
  const [missionProgress, setMissionProgress] = useState(3);
  const [toast, setToast] = useState<string | null>(null);
  const crops = useMemo(() => [...CROPS, ...customCrops], [customCrops]);
  const crop = getCropProfile(cropId, crops);

  const loadDashboard = useCallback(async () => {
    setLoading(true);

    const [sensorData, weatherData] = await Promise.all([
      getSensorReading(),
      getWeatherForecast(DEFAULT_CITY),
    ]);
    const aiData = await getAIRecommendation({
      crop,
      current_moisture: sensorData.soil_moisture,
      weather: weatherData,
    });

    setSensor(sensorData);
    setWeather(weatherData);
    setRecommendation(aiData);
    setLoading(false);
  }, [crop]);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.replaceState(null, '', `#${activeView}`);
  }, [activeView]);

  useEffect(() => {
    saveCustomCrops(customCrops);
  }, [customCrops]);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 2600);
  }

  async function registerCare() {
    if (!sensor || !weather) return;

    const isWatering = recommendation?.priority === 'alta';
    const nextSensor = {
      ...sensor,
      soil_moisture: isWatering ? Math.min(crop.moistureMax, sensor.soil_moisture + 9) : sensor.soil_moisture,
      timestamp: new Date().toISOString(),
    };

    setSensor(nextSensor);
    setMissionProgress((current) => Math.min(5, current + 1));
    setPoints((current) => current + (isWatering ? 20 : 10));
    setRecommendation(
      await getAIRecommendation({
        crop,
        current_moisture: nextSensor.soil_moisture,
        weather,
      }),
    );
    showToast(isWatering ? '+20 semillas · Riego registrado' : '+10 semillas · Revisión registrada');
  }

  function changeView(view: AppView) {
    setActiveView(view);
  }

  function addCrop(profile: NewCropProfile) {
    const newCrop = createCustomCrop(profile);
    setCustomCrops((current) => [...current, newCrop]);
    setCropId(newCrop.id);
    showToast(`${newCrop.name} ya está disponible en AgroSensly`);
  }

  return (
    <div className="app-shell">
      <AppHeader streak={6} activeView={activeView} onChange={changeView} />

      <main className="app-content">
        {activeView === 'home' ? (
          <HomeView
            crop={crop}
            sensor={sensor}
            weather={weather}
            recommendation={recommendation}
            loading={loading}
            missionProgress={missionProgress}
            onRegisterWatering={() => void registerCare()}
            onRefresh={() => void loadDashboard()}
            onOpenAssistant={() => changeView('assistant')}
            onOpenMissions={() => changeView('missions')}
          />
        ) : null}

        {activeView === 'crops' ? (
          <CropsView
            crops={crops}
            activeCrop={crop}
            onSelectCrop={setCropId}
            onAddCrop={addCrop}
            onOpenAssistant={() => changeView('assistant')}
          />
        ) : null}

        {activeView === 'missions' ? (
          <MissionsView points={points} missionProgress={missionProgress} streak={6} />
        ) : null}

        {activeView === 'assistant' ? (
          <KintiAssistant
            crops={crops}
            crop={crop}
            sensor={sensor}
            weather={weather}
            onSelectCrop={setCropId}
          />
        ) : null}
      </main>

      <BottomNavigation activeView={activeView} onChange={changeView} />

      {toast ? (
        <div className="toast" role="status">
          <AgroIcon name="check" size={18} />
          {toast}
        </div>
      ) : null}
    </div>
  );
}
