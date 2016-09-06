import { dep } from 'worona-deps';

export const selectors = {
  get getCss() { return dep('build', 'selectors', 'getCss'); },
  get getThemeName() { return dep('build', 'selectors', 'getThemeName'); },
};

export const actions = {
  get themeCssFileDownloaded() { return dep('build', 'actions', 'themeCssFileDownloaded'); },
};
