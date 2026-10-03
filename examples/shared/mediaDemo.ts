import { viPalette } from "@loongark/tokens";
export const quickActions = [
  { value: "note", label: "New note", icon: "＋" },
  { value: "share", label: "Share workspace", icon: "↗" },
  { value: "archive", label: "Archive", icon: "−", disabled: true },
];
export const mediaDemoItems = [240, 360, 280, 420, 260, 320].map(
  (height, i) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="${height}" viewBox="0 0 400 ${height}"><rect width="400" height="${height}" fill="${viPalette.cloudWhite}"/><path d="M40 ${height - 30}V50H300V${height - 30}M100 ${height - 30}V90H340V${height - 30}M0 ${height - 70}H400" fill="none" stroke="${viPalette.leadGray}" stroke-width="2"/><circle cx="${70 + i * 35}" cy="${60 + i * 10}" r="28" fill="${viPalette.stoneGray}"/><text x="24" y="${height - 18}" fill="${viPalette.inkNight}" font-family="sans-serif" font-size="13">STRUCTURE 0${i + 1}</text></svg>`;
    return {
      src: "data:image/svg+xml," + encodeURIComponent(svg),
      width: 400,
      height,
      label: "Structure 0" + (i + 1),
      alt: "Neutral architectural composition " + (i + 1),
    };
  },
);
