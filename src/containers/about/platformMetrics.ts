import { CONSUMER_APIS_PATH, CONSUMER_PATH } from '../../types/constants/paths';
import { PlatformMetric } from './types/platform-metric';

export const platformMetrics: PlatformMetric[] = [
  {
    callToAction: 'Learn about our uptime',
    content: 'Our uptimes include scheduled downtime, so there are no surprises.',
    title: 'Over 99% Uptime',
    url: CONSUMER_APIS_PATH,
  },
  {
    callToAction: 'Learn about production access',
    content: 'We have over 90 consumers in production, with more on the way.',
    title: '90+ Consumers',
    url: CONSUMER_PATH,
  },
  {
    callToAction: 'See all the APIs we offer',
    content: 'Over 13 APIs added since we started, and we’re still growing. ',
    title: '13+ APIs',
    url: '/explore',
  },
];
