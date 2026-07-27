import { FormEvent, useEffect, useRef, useState } from 'react';

import { AgroIcon } from './AgroIcon';
import { CropGlyph } from './CropGlyph';
import { CROPS } from '../data/crops';
import { getCropAdvice } from '../lib/api';
import type { CropId, CropProfile, SensorReading, WeatherForecast } from '../types';

type KintiAssistantProps = {
  crop: CropProfile;
  sensor: SensorReading | null;
  weather: WeatherForecast | null;
  onSelectCrop: (cropId: CropId) => void;
};

type ChatMessage = {
  id: number;
  role: 'assistant' | 'user';
  text: string;
};

const QUICK_QUESTIONS = [
  '¿Cuánta agua necesita?',
  '¿Cuál es el pH ideal?',
  '¿Qué señales de estrés debo mirar?',
  '¿Cuánto tarda la cosecha?',
];

function welcomeMessage(crop: CropProfile, sensor: SensorReading | null) {
  const sensorCopy = sensor ? ` El sensor registra ${sensor.soil_moisture.toFixed(0)}% de humedad.` : '';
  return `Analicemos tu ${crop.name.toLowerCase()}.${sensorCopy} Pregúntame por riego, suelo, luz, ciclo o señales de estrés.`;
}

export function KintiAssistant({ crop, sensor, weather, onSelectCrop }: KintiAssistantProps) {
  const [question, setQuestion] = useState('');
  const [thinking, setThinking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, role: 'assistant', text: welcomeMessage(crop, sensor) },
  ]);
  const responseTimer = useRef<number | null>(null);

  useEffect(() => {
    setMessages([{ id: Date.now(), role: 'assistant', text: welcomeMessage(crop, sensor) }]);
    setThinking(false);
    if (responseTimer.current) window.clearTimeout(responseTimer.current);
  }, [crop.id]);

  useEffect(
    () => () => {
      if (responseTimer.current) window.clearTimeout(responseTimer.current);
    },
    [],
  );

  function askKinti(nextQuestion: string) {
    const cleanQuestion = nextQuestion.trim();
    if (!cleanQuestion || thinking) return;

    setMessages((current) => [...current, { id: Date.now(), role: 'user', text: cleanQuestion }]);
    setQuestion('');
    setThinking(true);

    responseTimer.current = window.setTimeout(() => {
      void getCropAdvice({
        crop_id: crop.id,
        question: cleanQuestion,
        sensor,
        weather,
      }).then((answer) => {
        setMessages((current) => [
          ...current,
          { id: Date.now() + 1, role: 'assistant', text: answer },
        ]);
        setThinking(false);
      });
    }, 420);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    askKinti(question);
  }

  return (
    <section className="view assistant-view" aria-labelledby="assistant-title">
      <header className="view-heading">
        <div>
          <p>Asistencia agronómica</p>
          <h1 id="assistant-title">Kinti IA</h1>
        </div>
        <div className="sync-meta">
          <span>Contexto conectado</span>
          <strong>Sensor + clima + cultivo</strong>
        </div>
      </header>

      <div className="assistant-workspace">
        <aside className="assistant-identity">
          <div className="assistant-identity__status">
            <i />
            Disponible
          </div>
          <h2>Datos de campo,<br />explicados sin vueltas.</h2>
          <p>Kinti combina la ficha del cultivo con la lectura actual para darte una respuesta contextual.</p>
          <img src="/assets/kinti-editorial.webp" alt="Kinti, asistente de AgroSensly" />
          <div className="assistant-identity__footer">
            <span>Motor</span>
            <strong>AgroSensly Context v1</strong>
          </div>
        </aside>

        <section className="conversation-panel">
          <header className="conversation-header">
            <div>
              <span>Conversación sobre</span>
              <label>
                <CropGlyph cropId={crop.id} size={22} />
                <select value={crop.id} onChange={(event) => onSelectCrop(event.target.value as CropId)}>
                  {CROPS.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="conversation-context">
              <span>
                <i />
                Sensor incluido
              </span>
              <span>
                <i />
                Clima incluido
              </span>
            </div>
          </header>

          <div className="chat-log" aria-live="polite" aria-label="Conversación con Kinti">
            {messages.map((message) => (
              <div key={message.id} className={`chat-message is-${message.role}`}>
                {message.role === 'assistant' ? <span className="chat-author">K</span> : null}
                <p>{message.text}</p>
              </div>
            ))}

            {thinking ? (
              <div className="chat-message is-assistant">
                <span className="chat-author">K</span>
                <span className="typing-indicator" aria-label="Kinti está preparando una respuesta">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            ) : null}
          </div>

          <div className="prompt-suggestions" aria-label="Preguntas sugeridas">
            {QUICK_QUESTIONS.map((quickQuestion, index) => (
              <button type="button" key={quickQuestion} onClick={() => askKinti(quickQuestion)} disabled={thinking}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {quickQuestion}
              </button>
            ))}
          </div>

          <form className="assistant-form" onSubmit={handleSubmit}>
            <label htmlFor="kinti-question" className="sr-only">
              Escribe una pregunta para Kinti
            </label>
            <input
              id="kinti-question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder={`Pregunta sobre ${crop.name.toLowerCase()}…`}
              autoComplete="off"
            />
            <button type="submit" disabled={!question.trim() || thinking}>
              Enviar
              <AgroIcon name="send" size={18} />
            </button>
          </form>
        </section>
      </div>
    </section>
  );
}
