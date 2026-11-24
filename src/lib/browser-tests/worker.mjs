import {runSuite} from './suite.mjs';

self.onmessage = async ({data, ports: [report]}) => {
  try {
    report.postMessage({results: await runSuite(data)});
  } catch (error) {
    report.postMessage({error: String(error?.message ?? error)});
  }
};
