const axios = require('axios');
const api = axios.create({
  baseURL: 'http://objetivostech.herokuapp.com/api'
});

describe('Carreras Test', () => {

  test('Debe mostrar todas las carreras', async () => {
    const {status, statusText} = await api.get('/carreras');
    expect(status).toBe(200)
    expect(statusText).toBe('OK')
  })

  test('Debe mostrar una carrera', async () => {
    const carreraId = 3
    const response = await api.get(`/carreras/${carreraId}`);
    expect(response.status).toBe(404)
  })
})