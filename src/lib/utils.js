export function toBn(num) {
  if (num === undefined || num === null) return "";
  const digits = { 0: "০", 1: "১", 2: "২", 3: "৩", 4: "৪", 5: "৫", 6: "৬", 7: "৭", 8: "৮", 9: "৯" };
  return num.toString().replace(/[0-9]/g, (d) => digits[d]);
}

export function toEn(str) {
  if (!str) return 0;
  const digits = { "০": "0", "১": "1", "২": "2", "৩": "3", "৪": "4", "৫": "5", "৬": "6", "৭": "7", "৮": "8", "৯": "9" };
  const clean = str.toString().replace(/[০-৯]/g, (d) => digits[d]);
  return parseFloat(clean.replace(/[^0-9.-]/g, "")) || 0;
}