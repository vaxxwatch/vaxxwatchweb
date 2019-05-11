/* eslint import/prefer-default-export: 0 */

export const tryParseJson = (json) => {
  try {
    json = JSON.parse(json);
  } catch (error) {
    // ignore 
  }

  return json;
};