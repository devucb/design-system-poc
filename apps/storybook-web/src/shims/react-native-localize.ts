export function getLocales() {
  const languageTag =
    typeof navigator === 'undefined' ? 'en-US' : navigator.language || 'en-US';
  const languageCode = languageTag.slice(0, 2).toLowerCase();
  return [{ languageCode, languageTag }];
}
