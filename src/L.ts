import {type Locales} from './i18n/i18n-types';
import {baseLocale, i18n, locales} from './i18n/i18n-util';
import {loadAllLocales} from './i18n/i18n-util.sync';

loadAllLocales();

let locale: Locales = 'en';
try {
  // @ts-ignore
  locale = (global?.i18next?.language as string || '');
  if (locale.startsWith('zh')) {
    locale = 'zh';
  }

  if (!locales.includes(locale)) {
    locale = baseLocale;
  }
} catch {
  /* empty */
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const L = i18n()[locale];

export default L;
