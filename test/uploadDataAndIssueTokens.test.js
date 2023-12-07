const { expect } = require("chai");
const { ethers } = require("hardhat");
/* Pruebas unitarias para el contrato CopyrightMusic, enfocadas en la carga de datos y emisión de tokens como recompensa. */
describe("Upload Data and Issue Tokens", function () {
  let CopyrightMusic;
  let copyrightMusic;
  let owner;
  let addr1;
  let addr2;
  let DataManagement;

  // Configuración previa a cada prueba.
  beforeEach(async function () {
    // Obtener instancias de los signatarios
    [owner, addr1, addr2] = await ethers.getSigners();

    // Desplegar el contrato DataManagement
    DataManagement = await ethers.getContractFactory("DataManagement");
    const dataManagement = await DataManagement.deploy();

    // Desplegar el contrato principal CopyrightMusic
    CopyrightMusic = await ethers.getContractFactory("CopyrightMusic");
    copyrightMusic = await CopyrightMusic.deploy(dataManagement.address);
  });

  // Prueba: Subir datos y emitir tokens como recompensa.
  it("Should upload data and issue tokens as reward", async function () {
    // Subir datos utilizando la función subirDatos
    await copyrightMusic.connect(owner).subirDatos(
      "Song Title",
      "Album",
      0, // Pop as EntityGenero
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

    // Verificar la emisión de tokens como recompensa
    const [rewardRecipient, rewardAmount] = await getEventParams(
      copyrightMusic,
      "RecompensaTokens"
    );

    expect(rewardRecipient).to.equal(owner.address);
    expect(rewardAmount).to.equal(5); // Ajustar si es necesario
  });

  // Función auxiliar para obtener los parámetros de un evento.
  async function getEventParams(contract, eventName) {
    // Esperar a que se mine la transacción de despliegue
    await contract.deployTransaction.wait();

    // Obtener el recibo de la transacción de despliegue
    const tx = await contract.provider.getTransactionReceipt(
      contract.deployTransaction.hash
    );

    // Verificar si la transacción contiene logs
    if (tx.logs) {
      // Buscar el log correspondiente al evento
      const event = tx.logs.find((log) =>
        log.topics.includes(contract.interface.getEventTopic(eventName))
      );

      // Verificar si se encontró el log
      if (event) {
        // Analizar el log para obtener los argumentos del evento
        const parsedEvent = contract.interface.parseLog(event);
        return parsedEvent.args;
      }
    }

    // Devolver un array vacío si no se encontraron logs
    return [];
  }
});
