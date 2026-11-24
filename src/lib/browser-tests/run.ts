export type CaseResult = {name: string; status: 'passed' | 'failed' | 'pending'; message?: string};
export type TestReport = {results: CaseResult[]} | {error: string};

export async function runBrowserTests(base: string, files: Record<string, string>, signal: AbortSignal): Promise<TestReport> {
  const response = await fetch(base + 'worker.js', {signal});
  if (!response.ok) throw Error('Could not load the lesson test runner.');
  const source = await response.text();
  signal.throwIfAborted();
  return new Promise((resolve, reject) => {
    const frame = document.createElement('iframe');
    const channel = new MessageChannel();
    function cleanup() {
      channel.port1.close();
      frame.remove();
      signal.removeEventListener('abort', abort);
    }
    function abort() {
      cleanup();
      reject(signal.reason);
    }
    signal.addEventListener('abort', abort, {once: true});
    channel.port1.onmessage = ({data}) => {
      cleanup();
      resolve(data);
    };
    frame.hidden = true;
    frame.title = 'Lesson test sandbox';
    frame.sandbox.add('allow-scripts');
    frame.onload = () => frame.contentWindow?.postMessage({source, files}, '*', [channel.port2]);
    frame.src = base + 'runner.html';
    document.body.append(frame);
  });
}
