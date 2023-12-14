// Importar bibliotecas necesarias
const { expect } = require("chai");
const { ethers } = require("hardhat");

// Conjunto de pruebas para el despliegue de contratos
describe("Despliegue correcto del contrato", function () {
  // Variable para almacenar la fábrica del contrato CopyrightMusic
  let CopyrightMusic;
  // Variable para interactuar con una instancia específica del contrato CopyrightMusic
  let copyrightMusic;
  // Variable para representar la dirección del propietario durante las pruebas
  let owner;
  // Variable para almacenar la fábrica del contrato DataManagement
  let DataManagement;

  // Configuración inicial antes de cada prueba
  beforeEach(async function () {
    // Obtener la dirección del propietario
    [owner] = await ethers.getSigners();

    // Desplegar una instancia del contrato DataManagement
    DataManagement = await ethers.getContractFactory("DataManagement");
    const dataManagement = await DataManagement.deploy();

    // Desplegar una instancia del contrato CopyrightMusic
    CopyrightMusic = await ethers.getContractFactory("CopyrightMusic");
    copyrightMusic = await CopyrightMusic.deploy();
  });

  // Prueba específica para verificar el despliegue correcto de los contratos
  it("Should deploy contracts", async function () {
    // Verificar que la dirección del propietario del contrato CopyrightMusic sea la esperada
    expect(await copyrightMusic.owner()).to.equal(owner.address);
  });
});
