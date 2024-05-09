async function gerarLinkGoogleMaps(lat, lon) {
    const baseUrl = 'https://www.google.com/maps/search/?api=1&query=';
    const coordenadas = `${lat},${lon}`;
    const link = baseUrl + coordenadas;
    return link;
}

module.exports = { gerarLinkGoogleMaps };
