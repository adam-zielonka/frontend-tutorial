import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import lessons from './course/lessons.json';

const overviews = [
  'ch-01-00-explain-the-tool-set', 'ch-02-00-tools-around-development',
  'ch-03-00-create-base-for-your-app', 'ch-04-00-mobx-and-react',
  'ch-05-00-shippingboard-lite', 'ch-06-00-tests',
  'ch-07-00-fetch', 'ch-08-00-ui5-web-components',
];
const sidebars: SidebarsConfig = {
  tutorial: ['README', ...overviews.map((overview, i) => {
    const chapter = String(i + 1).padStart(2, '0');
    const steps = lessons.filter(lesson => lesson.chapter === chapter);
    return {
      type: 'category' as const,
      label: `${i + 1}. ${steps[0]?.chapterTitle ?? chapter}`,
      link: {type: 'doc' as const, id: overview},
      items: steps.map(lesson => lesson.doc),
    };
  })],
};
export default sidebars;
