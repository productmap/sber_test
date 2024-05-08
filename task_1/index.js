import { encoded, translations } from "./data.js";

console.log("Let's rock");
// console.log(encoded, translations);

function decoder(encoded, translations) {
  let decoded = [];

  encoded.forEach((item) => {
    let decodedItem = {};
    Object.keys(item).forEach((key) => {
      if (
        key.endsWith("Id") &&
        !["groupId", "service", "formatSize", "ca"].includes(key)
      ) {
        decodedItem[key] = translations[item[key]] || item[key];
      } else {
        decodedItem[key] = item[key];
      }
    });
    decoded.push(decodedItem);
  });

  let uniqueIds = [...new Set(encoded.flatMap((item) => Object.values(item)))];
  return { decoded, uniqueIds };
}

const { decoded, uniqueIds } = decoder(encoded, translations);

console.log(decoded);
console.log(uniqueIds.toSorted());
