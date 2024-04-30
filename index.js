const axios = require('axios');
const uuid = require('uuid');
const moment = require('moment');
const _ = require('lodash');
const chalk = require('chalk');

let userList = []; //almacenará todos los usuarios registrados

async function crearUsuario() {
  try {
    //consultar la API random user para obtener datos de varios usuarios aleatorios
    const { data } = await axios.get('https://randomuser.me/api/?results=10');
    const randomUsers = data.results; //obtener el array de resultados

    randomUsers.forEach(randomUser => {
      //generar un ID único para el usuario
      const userId = uuid.v4();

      //obtener la fecha y hora actual formateada
      const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');

      //crear un objeto de usuario con los datos requeridos, incluyendo el sexo
      const newUser = {
        nombre: randomUser.name.first,
        apellido: randomUser.name.last,
        id: userId,
        timestamp: timestamp,
        sexo: randomUser.gender //asignar el sexo del usuario obtenido de la API
      };

      //agregar el nuevo usuario a la lista de usuarios
      userList.push(newUser);
    });

    console.log('Número total de usuarios registrados:', userList.length);

    //imprimir la lista de usuarios por sexo en la consola con formato usando Chalk
    console.log(chalk.bgWhite.blue('Usuarios Registrados Agrupados por Sexo:'));
    console.log('Mujeres:');
    const mujeres = userList.filter(user => user.sexo === 'female');
    mujeres.forEach(user => {
      console.log(`- Nombre: ${user.nombre} - Apellido: ${user.apellido} - ID: ${user.id} - Timestamp: ${user.timestamp}`);
    });

    console.log('Hombres:');
    const hombres = userList.filter(user => user.sexo === 'male');
    hombres.forEach(user => {
      console.log(`- Nombre: ${user.nombre} - Apellido: ${user.apellido} - ID: ${user.id} - Timestamp: ${user.timestamp}`);
    });

  } catch (error) {
    console.error('Error al registrar usuarios:', error);
  }
}

//llamar a la función para registrar usuarios al ejecutar el script
crearUsuario();







