const axios = require('axios');
const api = axios.create({
  baseURL: 'http://objetivostech.herokuapp.com/api'
});

describe('Carreras Test', () => {

  test('Debe mostrar todas las carreras', async () => {
    const {status, statusText, data} = await api
      .get('/carreras')
      .catch(err => {reject()});
    expect(status).toBe(200);
    expect(statusText).toBe('OK');
    expect(data).not.toBeNull();
  })

  test('Debe mostrar una carrera existente', async () => {
    const carreraId = 3;
    const {
      status, 
      data
    } = await api.get(`/carreras/${carreraId}`).catch(err => {reject()});
    expect(status).toBe(200);
    expect(data).not.toBeNull();
  })

  test('No debe mostrar una carrera no existente', async () => {
    const carreraId = 3;
    const {status, data} = await api
      .get(`/carreras/${carreraId}`)
      .catch(err => {reject()});
    
    expect(status).toBe(404);
    expect(data).toBeNull();
  })

  test('Debe guardar una carrera correctamente', async () => {
    const payload = {
      carrera: 'Ing. en Sistemas',
      planEstudios: 'ISIC-2019',
      creadopor: 12344,
    }
    const {status, data} = await api
      .post(`/carreras/`, payload)
      .catch(err => {reject()});
    expect(status).toBe(201)
    expect(data).toEqual(payload)
  })

  test('No debe guardar una carrera con datos erroneos', async () => { 
    const payload = {
      carrera: false,
      planEstudios: 2019,
      creadopor: 'Superamdin',
    }
    const {status, data} = await api
      .post(`/carreras/`, payload)
      .catch(err => {reject()});
    expect(status).toBe(201);
    expect(data).toBeNull();
  })

  test('Debe actualizar una carrera correctamente', async () => { 
    const carreraId = 1;
    const payload = {
      carrera: 'Carrera Edit',
      planEstudios: 'ISC-ED1T',
      creadopor: 1010,
    }
    const updatedObject = await api
      .put(`/carreras/${carreraId}`, payload)
      .catch(err => {});
    const checkObject = await api
      .get(`/carreras/${carreraId}`)
      .catch(err => {});

    expect(updatedObject.status).toBe(201);
    expect(updatedObject.data).toEqual(payload);
    expect(checkObject.status).toBe(200);
    expect(checkObject.data).toContain(checkObject.data);
  })

  test('No debe actualizar una carrera con datos erroneos', async () => { 
    const carreraId = 1;
    const payload = {
      carrera: 'Carrera Edit',
      planEstudios: 'ISC-ED1T',
      creadopor: 1010,
    };
    const {status} = await api
      .put(`/carreras/${carreraId}`, payload)
      .catch(err => {reject()});
    expect(status).toBe(404);
  })

  test('Debe eliminar una carrera correctamente', async () => {
    const carreraId = 1;
    const {status} = await api
      .delete(`${carreraId}`)
      .catch(err => {reject()})
    expect(status).toBe(202);
  })

  test('No debe eliminar una carrera que no existe', async () => {
    const carreraId = 10000;
    const {status} = await api
      .delete(`${carreraId}`)
      .catch(err => {reject()})
    expect(status).toBe(2);
  })

})