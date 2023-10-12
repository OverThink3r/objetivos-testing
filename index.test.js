const request = require('supertest');
const axios = require('axios');
const api = axios.create({
  baseURL: 'http://objetivostech.herokuapp.com/api'
});
describe('Prueba', () => {
  test('should first', async () => {
    const {status, statusText} = await api.get('/carreras');
    expect(status).toBe(201)
    expect(statusText).toBe('OK')
  })
})