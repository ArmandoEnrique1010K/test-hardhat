// Importar bibliotecas necesarias
const { expect } = require("chai");
const { ethers } = require("hardhat");

// Conjunto de pruebas
describe("Deploy and Mint", function () {
  let CopyrightMusic; // Variable para almacenar la fábrica del contrato CopyrightMusic
  let copyrightMusic; // Variable para interactuar con una instancia específica del contrato CopyrightMusic
  let owner; // Variable para representar la dirección del propietario durante las pruebas
  let DataManagement; // Variable para almacenar la fábrica del contrato DataManagement

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

  // Prueba específica
  it("Should deploy and mint initial supply", async function () {
    // Verificar la propiedad del contrato
    expect(await copyrightMusic.owner()).to.equal(owner.address);

    // Definir la cantidad inicial de tokens en unidades atómicas (wei)
    const initialSupply = ethers.parseUnits("1000000", 18);

    // Verificar el saldo inicial de tokens del propietario
    expect(await copyrightMusic.balanceOf(owner.address)).to.equal(
      initialSupply
    );

    // Obtener la cantidad total de tokens en circulación
    const totalSupply = await copyrightMusic.totalSupply();

    // Verificar que la cantidad total de tokens sea igual a la cantidad inicial
    expect(totalSupply).to.equal(initialSupply);
  });
});
