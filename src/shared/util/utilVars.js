export const host =
  process.env.NODE_ENV === "development"
    ? 'http://localhost:5000/api'
    : 'http://miaschultink.com';
export const aspects = ["1X1", "16X9", "4X3", "2X1", "3X4"];
export const colors = [
  "green",
  "blue",
  "purple",
  "red",
  "orange",
  "pink",
  "yellow",
  "brown",
  "black",
  "white",
];
export const types = ["scenary", "animal", "character", "object"];
export const views = ["side", "front", "back"];
export const themes = [
  "realistic",
  "cartoon",
  "futuristic",
  "pencil-sketch",
  "acrylic-painting",
  "watercolor-painting",
  "portrait",
  "analytical-drawing",
  "info-graphic",
  "photography",
  "product",
  "natural",
];
export const styles = [
  "photographic",
  "3d-model",
  "analog-film",
  "anime",
  "cinematic",
  "comic-book",
  "digital-art",
  "isometric",
  "line-art",
  "enhance",
  "fantasy-art",
  "low-poly",
  "modeling-compound",
  "neon-punk",
  "origami",
  "pixel-art",
  "tile-texture",
];
