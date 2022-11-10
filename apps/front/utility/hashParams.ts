export const hashParams = (...params: string[]) => {
  return params.join('**');
};

export const deHashParams = (params: string) => params.split('**');
