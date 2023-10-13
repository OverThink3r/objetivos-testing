const axios = require("axios");
const api = axios.create({
  baseURL: "http://objetivostech.herokuapp.com/api",
});

describe("Profesores test", () => {
  test("Debe de mostrar todos los profesores", async () => {
    const { status, statusText, data } = await api.get("/profesores");
    expect(status).toBe(200);
    expect(statusText).toBe("OK");
    expect(data).not.toBeNull();
  });

  test("Debe de guardar la informacion de un profesor", async () => {
    const nuevoProfesor = {
      nombre: "Juan",
      apellido: "Perez",
      contraseña: "123456",
      correo: "juan@gmail.com",
      telefono: "4431969696",
      oculto: false,
    };

    const { status, statusText, data } = await api.post(
      `profesores/`,
      nuevoProfesor
    );
    expect(status).toBe(200);
    expect(statusText).toBe("OK");
    expect(data).toEqual(data);
  });

  test("No debe de guardar la informacion de un profesor con datos erroneos", async () => {
    const nuevoProfesor = {
      nombre: "",
      apellido: "",
      contraseña: "",
      correo: "",
      telefono: "",
      oculto: false,
    };

    await expect(api.put(`profesores/`, nuevoProfesor)).rejects.toThrow(
      "Request failed with status code 405"
    );
  });

  test("Debe de mostrar solo un profesor", async () => {
    const profesorId = 1;
    const { status, statusText, data } = await api.get(
      `/profesores/${profesorId}`
    );
    expect(status).toBe(200);
    expect(statusText).toBe("OK");
    expect(data).not.toBeNull();
  });

  test("No debe mostrar informacion del profesor si no existe", async () => {
    const profesorId = 2;
    await expect(api.get(`profesores/${profesorId}`)).rejects.toThrow(
      "Request failed with status code 404"
    );
  });

  test("Debe de modificar la informacion de un profesor", async () => {
    const profesorId = 1;
    const profesor = {
      nombre: "Rocio",
      apellido: "Contreras",
      contraseña: "asdf",
      correo: "rocio@morelia.tecnm.mx",
      telefono: "4433221100",
      oculto: false,
    };

    const { status, statusText } = await api.put(
      `profesores/${profesorId}`,
      profesor
    );
    expect(status).toBe(200);
    expect(statusText).toBe("OK");
  });

  test("No debe de modificar la informacion de un profesor con datos erroneos", async () => {
    const profesorId = 1;
    const profesor = {
      nombre: "",
      apellido: "",
      contraseña: "",
      correo: "",
      telefono: "",
      oculto: false,
    };

    await expect(api.put(`profesores/${profesorId}`, profesor)).rejects.toThrow(
      "Request failed with status code 500"
    );
  });

  test("Debe de borrar la informacion de un profesor", async () => {
    const profesorId = 2;

    const { status, statusText } = await api.delete(`profesores/${profesorId}`);
    expect(status).toBe(200);
    expect(statusText).toBe("OK");
  });
});
