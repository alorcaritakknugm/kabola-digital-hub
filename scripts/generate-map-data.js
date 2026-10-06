const fs = require('fs');
const path = require('path');

const geojsonPath = path.join(__dirname, '..', 'Alor Kecamatan.geojson');
const outputPath = path.join(__dirname, '..', 'data', 'alorMapPaths.ts');

const geojson = JSON.parse(fs.readFileSync(geojsonPath, 'utf8'));

let minLng = Infinity, maxLng = -Infinity, minLat = Infinity, maxLat = -Infinity;

function updateBounds(coords) {
  if (typeof coords[0] === 'number') {
    const [lng, lat] = coords;
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  } else {
    coords.forEach(updateBounds);
  }
}

geojson.features.forEach(f => updateBounds(f.geometry.coordinates));

const viewBoxWidth = 1000;
const padding = 20;
const lngSpan = maxLng - minLng;
const latSpan = maxLat - minLat;

const avgLat = (minLat + maxLat) / 2;
const latRad = (avgLat * Math.PI) / 180;
const aspect = Math.cos(latRad); // longitude compression factor

const geoWidth = lngSpan * aspect;
const geoHeight = latSpan;

const scale = (viewBoxWidth - padding * 2) / geoWidth;
const viewBoxHeight = Math.round(geoHeight * scale + padding * 2);

function project(lng, lat) {
  const x = padding + (lng - minLng) * aspect * scale;
  const y = viewBoxHeight - (padding + (lat - minLat) * scale);
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

function ringToSvgPath(ring) {
  return ring.map((pt, i) => {
    const [x, y] = project(pt[0], pt[1]);
    return i === 0 ? `M${x},${y}` : `L${x},${y}`;
  }).join(' ') + ' Z';
}

function geometryToPath(geom) {
  if (geom.type === 'Polygon') {
    return geom.coordinates.map(ringToSvgPath).join(' ');
  } else if (geom.type === 'MultiPolygon') {
    return geom.coordinates.flatMap(polygon => polygon.map(ringToSvgPath)).join(' ');
  }
  return '';
}

function calculateCentroid(geom) {
  let totalX = 0, totalY = 0, count = 0;
  function addCoords(coords) {
    if (typeof coords[0] === 'number') {
      const [x, y] = project(coords[0], coords[1]);
      totalX += x;
      totalY += y;
      count++;
    } else {
      coords.forEach(addCoords);
    }
  }
  addCoords(geom.coordinates);
  return [Math.round((totalX / count) * 10) / 10, Math.round((totalY / count) * 10) / 10];
}

// Kecamatan to exclude (not in livestock data or not relevant)
const EXCLUDED_KECAMATAN = ["Omesuri", "Buyasuri"];

const mapPaths = geojson.features
  .filter(f => {
    const name = f.properties.WADMKC || f.properties.NAMOBJ;
    return !EXCLUDED_KECAMATAN.includes(name);
  })
  .map(f => {
  const name = f.properties.WADMKC || f.properties.NAMOBJ;
  const path = geometryToPath(f.geometry);
  const centroid = calculateCentroid(f.geometry);
  return {
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name: name,
    path: path,
    centroid: centroid,
  };
});

const fileContent = `// Auto-generated SVG Map paths from Alor Kecamatan.geojson
export interface MapPathFeature {
  id: string;
  name: string;
  path: string;
  centroid: [number, number];
}

export const MAP_VIEWBOX = {
  width: ${viewBoxWidth},
  height: ${viewBoxHeight},
};

export const ALOR_MAP_PATHS: MapPathFeature[] = ${JSON.stringify(mapPaths, null, 2)};
`;

fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log(`Generated ${mapPaths.length} feature paths at ${outputPath}`);
console.log(`ViewBox: 0 0 ${viewBoxWidth} ${viewBoxHeight}`);
