// ---- Reglas de "Ola dónde estás" ----
// Cada playa tiene: hacia dónde mira (facing) y cuánto le llega el mar según de dónde viene la ola (exposure).
// Todo esto se puede ajustar con lo que ustedes vean en el agua.

const BEACHES = [
  {
    id: 'mansa', lat: -34.8395, lon: -54.642, name: 'La Mansa', zona: 'José Ignacio', facing: 200, scale: 0.75,
    // mira al sur-suroeste (confirmado por Agus), medio escondida detrás de la punta: necesita ola del sur/suroeste
    exposure: [[0, 0.1], [90, 0.1], [120, 0.1], [150, 0.65], [180, 1], [210, 1], [240, 0.85], [270, 0.35], [300, 0.1], [360, 0.1]]
  },
  {
    id: 'faro', lat: -34.844, lon: -54.632, name: 'El Faro', zona: 'José Ignacio', facing: 180, scale: 0.9,
    // en la punta, mira al sur: recibe de sureste a suroeste
    exposure: [[0, 0.1], [90, 0.4], [130, 0.8], [160, 1], [200, 1], [240, 0.7], [280, 0.3], [360, 0.1]]
  },
  {
    id: 'brava', lat: -34.841, lon: -54.625, name: 'La Brava', zona: 'José Ignacio', facing: 110, scale: 1.0,
    // abierta al este/sureste: recibe casi todo lo que viene del este al sur
    exposure: [[0, 0.2], [60, 0.7], [90, 1], [130, 1], [170, 0.9], [210, 0.55], [250, 0.25], [300, 0.15], [360, 0.2]]
  },
  {
    id: 'aguada', lat: -34.656, lon: -54.159, name: 'La Aguada', zona: 'Rocha', facing: 90, scale: 0.87,
    // mira al este, la punta la tapa del sur: recibe ola del noreste al sureste (estimación de Claude, falta confirmar)
    exposure: [[0, 0.1], [30, 0.6], [60, 0.95], [90, 1.0], [120, 1.0], [150, 0.65], [180, 0.1], [210, 0.1], [240, 0.1], [270, 0.1], [300, 0.1], [330, 0.1], [360, 0.1]]
  },
  {
    id: 'botes', lat: -34.662, lon: -54.164, name: 'Los Botes', zona: 'Rocha', facing: 185, scale: 1.0,
    // mira al sur, bien abierta: recibe de sureste a suroeste (estimación de Claude, falta confirmar)
    exposure: [[0, 0.1], [30, 0.1], [60, 0.1], [90, 0.35], [120, 0.9], [150, 1.0], [180, 1.0], [210, 1.0], [240, 0.85], [270, 0.5], [300, 0.1], [330, 0.1], [360, 0.1]]
  },
  {
    id: 'bikini', lat: -34.906, lon: -54.829, name: 'Bikini', zona: 'Manantiales', facing: 175, scale: 0.97,
    // mira al sur, abierta: recibe de sureste a suroeste (estimación de Claude, falta confirmar)
    exposure: [[0, 0.1], [30, 0.1], [60, 0.1], [90, 0.1], [120, 0.65], [150, 1.0], [180, 1.0], [210, 0.95], [240, 0.55], [270, 0.1], [300, 0.1], [330, 0.1], [360, 0.1]]
  },
  {
    id: 'posta', lat: -34.914, lon: -54.86, name: 'La Posta', zona: 'La Barra', facing: 170, scale: 1.0,
    // mira al sur, abierta: recibe de sureste a suroeste (estimación de Claude, falta confirmar)
    exposure: [[0, 0.1], [30, 0.1], [60, 0.1], [90, 0.35], [120, 0.9], [150, 1.0], [180, 1.0], [210, 0.95], [240, 0.55], [270, 0.1], [300, 0.1], [330, 0.1], [360, 0.1]]
  },
  {
    id: 'la30', lat: -34.9254, lon: -54.8918, name: 'Parada 30', alias: 'La Brava', zona: 'Punta del Este', facing: 150, scale: 1.0,
    // mira al sureste, muy abierta: recibe de este a suroeste (estimación de Claude, falta confirmar)
    exposure: [[0, 0.1], [30, 0.1], [60, 0.35], [90, 0.9], [120, 1.0], [150, 1.0], [180, 1.0], [210, 0.9], [240, 0.4], [270, 0.1], [300, 0.1], [330, 0.1], [360, 0.1]]
  },
  {
    id: 'olla', lat: -34.9515, lon: -54.934, name: 'La Olla', zona: 'Punta del Este', facing: 135, scale: 1.0,
    // mira al sureste, abierta: recibe de este a sur (estimación de Claude, falta confirmar)
    exposure: [[0, 0.1], [30, 0.1], [60, 0.6], [90, 0.95], [120, 1.0], [150, 1.0], [180, 1.0], [210, 0.65], [240, 0.1], [270, 0.1], [300, 0.1], [330, 0.1], [360, 0.1]]
  },
  {
    id: 'dedos', lat: -34.9579, lon: -54.9372, name: 'Los Dedos', zona: 'Punta del Este', facing: 130, scale: 0.97,
    // mira al sureste: recibe de este a sur, el suroeste lo tapa la Punta (estimación de Claude, falta confirmar)
    exposure: [[0, 0.1], [30, 0.1], [60, 0.55], [90, 0.95], [120, 1.0], [150, 1.0], [180, 0.9], [210, 0.35], [240, 0.1], [270, 0.1], [300, 0.1], [330, 0.1], [360, 0.1]]
  },
  {
    id: 'emir', lat: -34.954, lon: -54.9365, name: 'El Emir', zona: 'Punta del Este', facing: 130, scale: 0.9,
    // mira al sureste, cerca de la Punta: mejor con ola del este, el sur lo tapa (contrastado con surf-forecast) (estimación de Claude, falta confirmar)
    exposure: [[0, 0.1], [30, 0.1], [60, 0.6], [90, 0.95], [120, 1.0], [150, 0.9], [180, 0.35], [210, 0.1], [240, 0.1], [270, 0.1], [300, 0.1], [330, 0.1], [360, 0.1]]
  }
];

// Zonas de oeste a este
const ZONES = ['Punta del Este', 'La Barra', 'Manantiales', 'José Ignacio', 'Rocha'];

// Punto del mar y del viento que se consulta para cada zona (lat, lon)
const ZONE_POINTS = {
  'Punta del Este': { m: [-34.955, -54.930], w: [-34.955, -54.930] },
  'La Barra':       { m: [-34.917, -54.860], w: [-34.917, -54.860] },
  'Manantiales':    { m: [-34.908, -54.829], w: [-34.908, -54.829] },
  'José Ignacio':   { m: [-34.90, -54.63],   w: [-34.84, -54.63] },
  'Rocha':          { m: [-34.652, -54.164], w: [-34.652, -54.164] }
};

const SIZES = {
  plana:     { label: 'Plato',     text: 'Hoy no estoy. Me fui de vacaciones.' },
  tablonera: { label: 'Tablonera',  text: 'Ola chiquita que te lleva de paseo. Tablón y sonrisa.' },
  divertida: { label: 'Divertida', text: 'Ya se disfruta. Hoy el mar quiere jugar.' },
  intensa:   { label: 'Intensa',   text: 'Ola con ganas. Hoy hay fuerza en el mar.' },
  radical:   { label: 'Radical',   text: 'Hoy manda el mar. Solo con experiencia.' }
};

const QUALS = {
  glass:    { label: 'Glass',    text: 'Liso como vidrio. Ni una arruga en el mar.', score: 4 },
  prolijo:  { label: 'Prolijo',  text: 'Prolijo, con una brisita de nada.', score: 3 },
  movidito: { label: 'Movidito', text: 'Movidito, con algo de chop en el agua.', score: 2 },
  soplado:  { label: 'Soplado',  text: 'Soplado, el mar vino despeinado.', score: 1 }
};

function interp(table, deg) {
  const d = ((deg % 360) + 360) % 360;
  for (let i = 0; i < table.length - 1; i++) {
    const [a, fa] = table[i], [b, fb] = table[i + 1];
    if (d >= a && d <= b) return fa + (fb - fa) * ((d - a) / (b - a || 1));
  }
  return table[0][1];
}

function angDiff(a, b) {
  return Math.abs(((a - b + 540) % 360) - 180);
}

function sizeKeyFor(eff) {
  if (eff < 0.4) return 'plana';
  if (eff < 0.7) return 'tablonera';
  if (eff < 1.0) return 'divertida';
  if (eff < 1.8) return 'intensa';
  return 'radical';
}

/* Calidad del mar según el viento. Base: escala Beaufort (km/h).
   Glass: hasta 5. Prolijo: 6 a 11. Movidito: 12 a 19. Soplado: 20 o más.
   - Rachas: se cuenta el viento como mínimo el 65% de la racha más fuerte.
   - Viento de tierra peina la ola: sube un escalón, pero nunca llega a Glass
     (Glass es solo con viento casi nulo) y solo si el viento es de hasta 28 km/h.
   - Ola muy corta (menos de 6 seg) = mar picado: baja un escalón. */
const QORDER = ['glass', 'prolijo', 'movidito', 'soplado'];
function qualKeyFor(beach, windSpeed, windDir, period, gust) {
  const offshoreDir = (beach.facing + 180) % 360;
  const d = angDiff(windDir, offshoreDir); // 0 = viento de tierra perfecto, 180 = viento de mar
  const s = gust != null ? Math.max(windSpeed, gust * 0.65) : windSpeed;
  let lvl = s <= 5 ? 0 : s <= 11 ? 1 : s <= 19 ? 2 : 3;
  if (lvl >= 1 && d < 60 && s <= 28) lvl = Math.max(1, lvl - 1);
  if (period < 6) lvl = Math.min(3, lvl + 1);
  return QORDER[lvl];
}

function windRelText(beach, windDir) {
  const d = angDiff(windDir, (beach.facing + 180) % 360);
  if (d <= 50) return 'de tierra';
  if (d >= 130) return 'de mar';
  return 'de costado';
}

const COMPASS = ['norte', 'noreste', 'este', 'sureste', 'sur', 'suroeste', 'oeste', 'noroeste'];
function compassWord(deg) {
  return COMPASS[Math.round((((deg % 360) + 360) % 360) / 45) % 8];
}

function median(arr) {
  const s = [...arr].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

// Datos de una hora para una playa
function hourFor(beach, data, i) {
  const mh = data.marine, wh = data.wind;
  const swellH = mh.swell_wave_height[i] ?? mh.wave_height[i] ?? 0;
  const period = mh.swell_wave_period[i] ?? mh.wave_period[i] ?? 8;
  const swellDir = mh.swell_wave_direction[i] ?? mh.wave_direction[i] ?? 180;
  const wSpeed = wh.wind_speed_10m[i] ?? 0;
  const wDir = wh.wind_direction_10m[i] ?? 0;
  const wGust = wh.wind_gusts_10m ? (wh.wind_gusts_10m[i] ?? null) : null;

  let eff = swellH * interp(beach.exposure, swellDir) * beach.scale;
  if (period < 6) eff *= 0.75;        // ola corta y picada, empuja poco
  else if (period >= 13) eff *= 1.25; // ola larga, mucha fuerza
  else if (period >= 11) eff *= 1.15;

  return {
    eff, period, swellDir, wSpeed, wDir, wGust,
    size: sizeKeyFor(eff),
    qual: qualKeyFor(beach, wSpeed, wDir, period, wGust)
  };
}

// Resumen de un día para una playa. Mira de 6 a 20 h.
function dayVerdict(beach, all, date, refHour) {
  // cada playa usa el mar de su zona; si no hay datos de la zona, no inventamos nada
  const data = all.zones ? all.zones[beach.zona] : all;
  if (!data || !data.marine || !data.marine.time) return null;
  const hours = [];
  data.marine.time.forEach((t, i) => {
    if (!t.startsWith(date)) return;
    const h = parseInt(t.slice(11, 13), 10);
    if (h < 6 || h > 20) return;
    hours.push({ h, i, ...hourFor(beach, data, i) });
  });
  if (!hours.length) return null;

  const medEff = median(hours.map(x => x.eff));

  // mejor ventana de 3 horas seguidas
  let best = null;
  for (let s = 0; s + 2 < hours.length; s++) {
    const w = hours.slice(s, s + 3);
    const score = w.reduce((a, x) => a + QUALS[x.qual].score, 0);
    const effSum = w.reduce((a, x) => a + x.eff, 0);
    if (!best || score > best.score || (score === best.score && effSum > best.effSum)) {
      best = { s, score, effSum, w };
    }
  }
  const avg = best.score / 3;
  const windowQual = avg >= 3.5 ? 'glass' : avg >= 2.5 ? 'prolijo' : avg >= 1.5 ? 'movidito' : 'soplado';

  // Hora que se muestra: hoy, la hora actual (refHour). Si no hay hora actual (mañana u otro día), la del medio de la mejor ventana.
  let ref = null, isNow = false;
  if (refHour != null) {
    ref = hours.reduce((a, x) => (a === null || Math.abs(x.h - refHour) < Math.abs(a.h - refHour)) ? x : a, null);
    isNow = true;
  } else {
    ref = best.w[1];
  }
  const sizeKey = sizeKeyFor(ref.eff);
  const qualKey = isNow ? ref.qual : windowQual;

  return {
    beach, date, hours,
    sizeKey, qualKey,
    eff: ref.eff,
    dayMedianEff: medEff,
    refHour: ref.h, isNow,
    window: [best.w[0].h, best.w[2].h + 1],
    period: ref.period, swellDir: ref.swellDir,
    wSpeed: ref.wSpeed, wDir: ref.wDir,
    windRel: windRelText(beach, ref.wDir),
    glassIdeal: qualKey === 'glass' && sizeKey !== 'plana'
  };
}

if (typeof module !== 'undefined') module.exports = { ZONES, ZONE_POINTS, BEACHES, SIZES, QUALS, dayVerdict, compassWord };

// distancia en línea recta entre dos puntos (km). Las coordenadas de las playas son aproximadas.
function kmBetween(a, b) {
  const R = 6371, rad = x => x * Math.PI / 180;
  const dLat = rad(b.lat - a.lat), dLon = rad(b.lon - a.lon);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
