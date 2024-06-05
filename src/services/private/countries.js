import { publicAPI } from 'services/public';

export const countryApi = publicAPI.injectEndpoints({
  endpoints: build => ({
    listCountries: build.query({
      query: () => '/asset/list/countries/',
    }),
    listTimeZones: build.query({
      query: id => `/asset/list/country/${id}/timezones/`,
    }),
  }),
});

export const { useListCountriesQuery, useLazyListTimeZonesQuery } = countryApi;
