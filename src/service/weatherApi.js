const axios = require('axios');

async function obterClima(lat, lon) {
    const apiKey = 'ac1e3fa87f04420ba99183712222906';
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no&lang=pt`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        return {
            temperaturaGrausCelsius: data.current.temp_c,
            condicao: data.current.condition.text,
            vento_kmhr: data.current.wind_kph,
            vento_direcao: data.current.wind_dir,
            humidade: data.current.humidity,
            nuvens: data.current.cloud,
            local: data.location.name,
            indice_UV: data.current.uv
        };
    } catch (error) {
        console.error('Erro ao buscar dados do tempo:', error.message);
        throw new Error('Não foi possível buscar os dados do tempo');
    }
}

module.exports = { obterClima };
