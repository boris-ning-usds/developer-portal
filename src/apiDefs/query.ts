/**
 * This file contains the core functionality for interacting with our API definitions. We intend to
 * move our API definitions to a database in the future so we do not have to maintain them in
 * Typescript as the program scales (see schema.ts for more info). In preparation for this change,
 * developers should not write new code that relies directly on the Typescript objects exported from
 * other files in this directory. Instead, they should rely on the functions exported from this file
 * and the other modules listed below to abstract away the form of data storage.
 *
 * The following modules supplement the core data access functions defined here. They can be safely consumed
 * by React components, Redux lifecycle hooks, and other parts of the application outside src/apiDefs.
 * - deprecated.ts
 * - env.ts
 * - schema.ts
 */

import apiDefs, { apiCategoryOrder } from './data/categories';
import { isApiDeactivated } from './deprecated';
import { isHostedApiEnabled } from './env';
import { APICategories, APICategory, APIDescription } from './schema';

const getApiDefinitions = (): APICategories => apiDefs;
const getApiCategoryOrder = (): string[] => apiCategoryOrder;

const getActiveApiDefinitions = (): APICategories => {
  const output: APICategories = {};
  const definitions = getApiDefinitions();
  Object.keys(definitions).forEach((key: string) => {
    const apis: APIDescription[] = definitions[key].apis.filter(
      (api: APIDescription) =>
        isHostedApiEnabled(api.urlFragment, api.enabledByDefault) && !isApiDeactivated(api),
    );
    output[key] = {
      ...definitions[key],
      apis,
    };
  });

  return output;
};

const getAllApis = (): APIDescription[] =>
  Object.values(getApiDefinitions()).flatMap((category: APICategory) => category.apis)
    .sort((a, b) => (a.name > b.name ? 1 : -1));

const getAllOauthApis = (): APIDescription[] =>
  getAllApis()
    .filter((item: APIDescription) => !!item.oAuth);

const getActiveOauthApis = (): APIDescription[] =>
  getAllOauthApis().filter((api: APIDescription) =>
    isHostedApiEnabled(api.urlFragment, api.enabledByDefault),
  );

const getAllKeyAuthApis = (): APIDescription[] =>
  getAllApis()
    .filter((item: APIDescription) => !item.oAuth);

const getAllQuickstartCategorySlugs = (): string[] =>
  Object.entries(getApiDefinitions())
    .filter((item: [string, APICategory]) => !!item[1].content.quickstart)
    .map((item: [string, APICategory]) => item[0]);

const lookupApiByFragment = (apiKey: string): APIDescription | null => {
  const hasMatchingIdentifier = (apiDesc: APIDescription): boolean =>
    apiDesc.urlFragment === apiKey;
  const apiResult = getAllApis().find(hasMatchingIdentifier);
  return apiResult ?? null;
};

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- should check category existence
const lookupApiCategory = (categoryKey: string): APICategory | null => apiDefs[categoryKey] ?? null;

const apisFor = (apiList: string[]): APIDescription[] => {
  const allApis = getAllApis();
  const searchedApiSet = new Set<string>(apiList);
  return allApis.filter(
    (api: APIDescription) =>
      searchedApiSet.has(api.urlFragment) || searchedApiSet.has(api.altID ?? ''),
  );
};

const includesOAuthAPI = (apiList: string[]): boolean => apisFor(apiList).some(api => !!api.oAuth);
const includesInternalOnlyAPI = (apiList: string[]): boolean =>
  apisFor(apiList).some(api => api.vaInternalOnly);

const onlyOpenDataAPIs = (apiList: string[]): boolean =>
  apisFor(apiList).every(api => api.openData);

export {
  apisFor,
  getActiveOauthApis,
  getAllApis,
  getAllOauthApis,
  getAllQuickstartCategorySlugs,
  getApiCategoryOrder,
  getApiDefinitions,
  getActiveApiDefinitions,
  lookupApiByFragment,
  lookupApiCategory,
  includesOAuthAPI,
  getAllKeyAuthApis,
  includesInternalOnlyAPI,
  onlyOpenDataAPIs,
};
