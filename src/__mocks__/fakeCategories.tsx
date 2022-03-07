/* eslint-disable react/display-name */
import moment from 'moment';
import { APICategories, APIDeactivationInfo, APIDescription, ProdAccessFormSteps } from '../apiDefs/schema';

export const fakeCategoryOrder: string[] = ['lotr', 'sports'];
export const fakeCategories: APICategories = {
  lotr: {
    apis: [
      {
        description: 'One Ring to rule them all',
        docSources: [], // doesn't matter yet
        enabledByDefault: true,
        lastProdAccessStep: ProdAccessFormSteps.Four,
        name: 'Rings API',
        openData: false,
        releaseNotes: '### March 25, 2020\n\nOne Ring destroyed\n\n\n---\n\n### June 10, 2019\n\nOne Ring discovered by Bilbo in Misty Mountains\n',
        urlFragment: 'rings',
        vaInternalOnly: false,
      },
      {
        deactivationInfo: {
          deactivationContent: 'Silmarils lost forever',
          deactivationDate: moment().subtract(1, 'year').format('DD.MM.YYYY HH:mm:ss'),
          deprecationContent: 'Morgoth claims the jewels',
          deprecationDate: moment().subtract(15, 'months').format('DD.MM.YYYY HH:mm:ss'),
        },
        description: 'Three pretty gems',
        docSources: [],
        enabledByDefault: true,
        lastProdAccessStep: ProdAccessFormSteps.Three,
        name: 'Silmarils API',
        openData: false,
        releaseNotes: '### April 3, 1005\n\nStolen by Morgoth\n\n\n---\n\n### December 1, 0215\n\nFeanor created the jewels\n',
        urlFragment: 'silmarils',
        vaInternalOnly: false,
      },
      {
        description: 'Hobbits of the Shire',
        docSources: [], // doesn't matter here
        enabledByDefault: true,
        lastProdAccessStep: ProdAccessFormSteps.Two,
        name: 'Hobbits API',
        openData: false,
        releaseNotes: '### September 22, 2019\n\nPippin and Merry got taller\n\n\n---\n\n### June 11, 2019\n\nBilbo disappeared\n',
        urlFragment: 'hobbits',
        vaInternalOnly: false,
      },
    ],
    content: {
      consumerDocsLinkText: 'Take me to the consumer docs!',
      overview: '',
      shortDescription: 'Learn more about things in Middle-earth',
    },
    name: 'LOTR API',
    properName: 'Fancy LOTR API',
  },
  sports: {
    apis: [
      {
        description: 'stuff about hoops or whatever',
        docSources: [], // doesn't matter here
        enabledByDefault: true,
        lastProdAccessStep: ProdAccessFormSteps.Three,
        name: 'Basketball API',
        openData: false,
        releaseNotes: '### September 21, 2019\n\nMoved exiled Numenoreans to Middle-earth\n\n\n---\n\n### June 12, 2019\n\nReleased our API\n',
        urlFragment: 'basketball',
        vaInternalOnly: false,
      },
      {
        description: 'a slow summer game',
        docSources: [], // doesn't matter here
        enabledByDefault: false,
        lastProdAccessStep: ProdAccessFormSteps.Three,
        name: 'Baseball API',
        openData: false,
        releaseNotes: '### September 22, 2019\n\nMike Trout homers\n\n\n---\n\n### June 11, 2019\n\nGerrit Cole strikes out 80\n',
        urlFragment: 'baseball',
        vaInternalOnly: false,
      },
    ],
    content: {
      consumerDocsLinkText: 'Take me to the consumer docs!',
      overview: '',
      shortDescription: 'Learn more about throwing, running, and hitting',
    },
    name: 'Sports API',
    properName: 'Fancy Sports API',
  },
};

export const fakeAPIs: APIDescription[] = Object.values(fakeCategories).flatMap(
  category => category.apis,
);

export const extraAPI: APIDescription = {
  description: 'the beautiful game',
  docSources: [],
  enabledByDefault: true,
  lastProdAccessStep: ProdAccessFormSteps.Four,
  name: 'Soccer API',
  openData: false,
  releaseNotes: '### October 22, 2019\n\na lot of goals get scored\n\n\n---\n\n### August 11, 2019\n\nchampions league\n',
  urlFragment: 'soccer',
  vaInternalOnly: false,
};

export const extraDeactivationInfo: APIDeactivationInfo = {
  deactivationContent: 'deactivated this API',
  deactivationDate: moment().subtract(3, 'months').format('DD.MM.YYYY HH:mm:ss'),
  deprecationContent: 'deprecated this API',
  deprecationDate: moment().subtract(6, 'months').format('DD.MM.YYYY HH:mm:ss'),
};

export const unmetDeactivationInfo: APIDeactivationInfo = {
  deactivationContent: 'This API is deactivated',
  deactivationDate: moment().add(3, 'months').format('DD.MM.YYYY HH:mm:ss'),
  deprecationContent: 'This API is deprecated',
  deprecationDate: moment().add(1, 'year').format('DD.MM.YYYY HH:mm:ss'),
};
