import en from "./locales/en";
import zh from "./locales/zh";
let locale = en;
try {
  // @ts-ignore
  locale = /^zh/.test(global?.i18next?.language || "") ? zh : en;
} catch (e) {}

function render(
  text: string,
  value: Record<string, string | number> | undefined
) {
  if (value) {
    return text.replace(/\{\{(.*?)\}\}/g, (_, match: string) => {
      const key = match.trim();
      return key in value ? value[key]?.toString() : match;
    });
  } else {
    return text;
  }
}

export default function i18n(
  key: keyof typeof locale,
  value?: Record<string, string | number>
) {
  const text = locale[key] || key;
  return render(text, value);
}
