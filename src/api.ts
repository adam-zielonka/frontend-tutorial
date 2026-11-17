export interface Ramp { id: string; name: string }

export async function loadRamps(url: string, signal?: AbortSignal): Promise<Ramp[]> {
  // TODO: fetch the URL with the optional signal and parse its JSON response.
  return [];
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
