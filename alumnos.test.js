const request = require('supertest');
const axios = require('axios');
const api = axios.create({
  baseURL: 'http://objetivostech.herokuapp.com/api'
});
describe('Alumnos', () => {
  test('Debería obtener información de  los alumnos', async () => {
    const {status, statusText, data} = await api.get('/alumnos');
    expect(data).not.toBeNull()
    expect(status).toBe(200)
    expect(statusText).toBe('OK')
  })
})