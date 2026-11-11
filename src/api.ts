export interface Ramp { id: string; name: string }

export async function loadRamps(url: string, signal?: AbortSignal): Promise<Ramp[]> {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`HTTP ${response.status}: could not load ramps`);
  const data: unknown = await response.json();
  if (!Array.isArray(data) || !data.every(item =>
    typeof item === 'object' && item !== null &&
    typeof item.id === 'string' && typeof item.name === 'string'
  )) throw new Error('Invalid ramp data');
  return data as Ramp[];
}

// Vite serves public files at /; Sandpack's static-file service worker uses /public/.
// Both requests stay on the preview origin. Do not retry intentional aborts.
export async function loadLocalRamps(url: string, signal?: AbortSignal): Promise<Ramp[]> {
  try {
    return await loadRamps(url, signal);
  } catch (error) {
    if (url !== '/ramps.json' || signal?.aborted) throw error;
    return loadRamps('/public/ramps.json', signal);
  }
}
