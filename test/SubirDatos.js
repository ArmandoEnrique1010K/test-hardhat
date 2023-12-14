// Importar bibliotecas necesarias
const { expect } = require("chai");
const { ethers } = require("hardhat");

// Conjunto de pruebas para la carga de datos (Upload Data)
describe("Carga de datos sin emitir recompensa", function () {
  // Variable para almacenar la fábrica del contrato CopyrightMusic
  let CopyrightMusic;
  // Variable para interactuar con una instancia específica del contrato CopyrightMusic
  let copyrightMusic;
  // Variable para representar la dirección del propietario durante las pruebas
  let owner;

  // Configuración previa a cada prueba.
  beforeEach(async function () {
    // Obtener la dirección del propietario
    [owner] = await ethers.getSigners();

    // Desplegar una instancia del contrato CopyrightMusic
    CopyrightMusic = await ethers.getContractFactory("CopyrightMusic");
    copyrightMusic = await CopyrightMusic.deploy();
  });

  // Prueba específica para subir datos sin emitir tokens como recompensa
  it("Should upload data without issuing tokens", async function () {
    // Subir datos utilizando la función subirDatos
    await copyrightMusic.connect(owner).subirDatos(
      "Song Title",
      "Album",
      0, // Pop - EntityGenero
      "Language",
      "Main Artist",
      ["Guest Artist 1", "Guest Artist 2"],
      1,
      1,
      2023,
      "ISRC123"
    );

    // Verificar los detalles de los datos subidos
    const data = await copyrightMusic.obtenerDatosSubidos(1);
    expect(data[0]).to.equal("Song Title");
    // Agrega más verificaciones según sea necesario
  });
});
