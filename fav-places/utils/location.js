const API_KEY = '69ca2d09d51f4f68b70bf45e91d9d0ca';

export function getMapPreview(lat, lng) {
  const center = `lonlat:${lng},${lat}`;

  return `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=${encodeURIComponent(center)}&zoom=15&marker=${encodeURIComponent(center)}&apiKey=${API_KEY}`;
}

export async function getAddress(lat, lng) {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${API_KEY}`
    );

    const data = await response.json();
    const address = data.features[0].properties.formatted;

    return address;
  } catch (error) {
    console.log(error)
  }
}