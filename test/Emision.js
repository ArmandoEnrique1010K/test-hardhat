// Importar bibliotecas necesarias
const { expect } = require("chai");
const { ethers } = require("hardhat");

// Conjunto de pruebas para la emisión inicial de tokens (Mint)
describe("Emisión inicial de Tokens", function () {
  // Variable para almacenar la fábrica del contrato CopyrightMusic
  let CopyrightMusic;
  // Variable para interactuar con una instancia específica del contrato CopyrightMusic
  let copyrightMusic;
  // Variable para representar la dirección del propietario durante las pruebas
  let owner;

  // Configuración inicial antes de cada prueba
  beforeEach(async function () {
    // Obtener la dirección del propietario
    [owner] = await ethers.getSigners();

    // Desplegar una instancia del contrato CopyrightMusic
    CopyrightMusic = await ethers.getContractFactory("CopyrightMusic");
    copyrightMusic = await CopyrightMusic.deploy();
  });

  // Prueba específica para verificar la emisión inicial de tokens
  it("Should mint initial supply", async function () {
    // Definir la cantidad inicial de tokens en unidades atómicas (wei)
    const initialSupply = ethers.parseUnits("1000000", 18);

    // Verificar que el balance del propietario sea igual a la cantidad inicial
    expect(await copyrightMusic.balanceOf(owner.address)).to.equal(
      initialSupply
    );

    // Obtener la cantidad total de tokens en circulación
    const totalSupply = await copyrightMusic.totalSupply();

    // Verificar que la cantidad total de tokens sea igual a la cantidad inicial
    expect(totalSupply).to.equal(initialSupply);
  });
});
