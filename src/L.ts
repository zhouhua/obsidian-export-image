import {type Locales} from './i18n/i18n-types';
import {i18n} from './i18n/i18n-util';
import {loadAllLocales} from './i18n/i18n-util.sync';

loadAllLocales();

let locale: Locales = 'en';
try {
  // @ts-expect-error
  locale = (global?.i18next?.language as string || '').startsWith('zh') ? 'zh' : 'en';
} catch {
  /* empty */
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const L = i18n()[locale];

export default L;
