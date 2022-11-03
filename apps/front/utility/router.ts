type Search = {
  [key: string]: string;
};

export interface Params {
  limit?: number;
  search?: Search;
  sort?: [string, 'DESC' | 'ASC'];
  fields?: string[];
}

export const pathToUrl = (path: string, params: Params = { limit: 100 }) => {
  const { limit, search, sort, fields } = params;

  const urlQueryParams = [];

  if (limit) {
    urlQueryParams.push(['limit', limit]);
  }

  if (search) {
    urlQueryParams.push(['search', JSON.stringify(search)]);
  }

  if (sort) {
    urlQueryParams.push(['sort[]', sort.join('|')]);
  }

  if (fields) {
    urlQueryParams.push(['fields', fields.join(',')]);
  }

  const url = `${path}?${urlQueryParams
    .map((keyVal) => keyVal.join('='))
    .join('&')}`;

  console.log(url);

  return url;
};
