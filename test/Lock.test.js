/*
// SPDX-License-Identifier: MIT
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CopyrightMusic", function () {
  let CopyrightMusic;
  let copyrightMusic;
  let owner;
  let addr1;
  let addr2;
  let dataManagement;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Despliega la biblioteca DataManagement
    const DataManagement = await ethers.getContractFactory("DataManagement");
    dataManagement = await DataManagement.deploy(); // Cambio en esta línea

    // Despliega el contrato CopyrightMusic vinculándolo con la biblioteca
    CopyrightMusic = await ethers.getContractFactory("CopyrightMusic", {
      libraries: {
        DataManagement: dataManagement.address,
      },
    });
    copyrightMusic = await CopyrightMusic.deploy();
  });

  it("Should deploy and mint initial supply", async function () {
    // Verificar la propiedad del contrato
    expect(await copyrightMusic.owner()).to.equal(owner.address);

    // Verificar el suministro inicial de tokens del propietario
    const initialSupply = ethers.utils.parseUnits("1000000", 18);
    expect(await copyrightMusic.balanceOf(owner.address)).to.equal(
      initialSupply
    );

    // Verificar que el suministro total de tokens es correcto
    const totalSupply = await copyrightMusic.totalSupply();
    expect(totalSupply).to.equal(initialSupply);
  });

  it("Should upload data and issue tokens as reward", async function () {
    // Subir datos
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

  async function getEventParams(contract, eventName, filter = {}) {
    const txReceipt = await (await contract.deployTransaction).wait();
    const events = txReceipt.events || [];

    const matchingEvents = events.filter(
      (event) => event.event === eventName && (!filter || event.args)
    );

    if (matchingEvents.length > 0) {
      return matchingEvents[0].args;
    }

    // If the event is not found in the deployment transaction, look for it in the contract's address
    const filterFromBlock = txReceipt.blockNumber + 1;
    const filterToBlock = "latest";
    const logs = await ethers.provider.getLogs({
      ...filter,
      address: contract.address,
      fromBlock: filterFromBlock,
      toBlock: filterToBlock,
    });

    const parsedLogs = logs.map((log) => contract.interface.parseLog(log));

    const matchingLogs = parsedLogs.filter(
      (parsedLog) => parsedLog.name === eventName
    );

    if (matchingLogs.length > 0) {
      return matchingLogs[0].args;
    }

    return null;
  }
});



*/

/*
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lock Contract", function () {
  let lockContract;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    const Lock = await ethers.getContractFactory("Lock");
    lockContract = await Lock.deploy(
      // Establecer el tiempo de desbloqueo en el futuro
      Math.floor(Date.now() / 1000) + 3600 // 1 hora en el futuro
    );

    await lockContract.deployed();
  });

  it("Should not allow withdrawal before unlock time", async function () {
    await expect(lockContract.connect(owner).withdraw()).to.be.revertedWith(
      "You can't withdraw yet"
    );
  });

  it("Should not allow withdrawal by non-owner", async function () {
    // Asegurarse de que se haya pasado el tiempo de desbloqueo
    await ethers.provider.send("evm_increaseTime", [3600]); // Aumentar el tiempo en 1 hora
    await ethers.provider.send("evm_mine", []); // Mina un nuevo bloque para que se actualice el tiempo

    await expect(lockContract.connect(addr1).withdraw()).to.be.revertedWith(
      "You aren't the owner"
    );
  });

  it("Should allow withdrawal by owner after unlock time", async function () {
    // Asegurarse de que se haya pasado el tiempo de desbloqueo
    await ethers.provider.send("evm_increaseTime", [3600]); // Aumentar el tiempo en 1 hora
    await ethers.provider.send("evm_mine", []); // Mina un nuevo bloque para que se actualice el tiempo

    const initialBalance = await owner.getBalance();

    await expect(lockContract.connect(owner).withdraw())
      .to.emit(lockContract, "Withdrawal")
      .withArgs(await lockContract.balance(), await lockContract.unlockTime());

    const finalBalance = await owner.getBalance();

    // Verificar que el balance del propietario haya aumentado después de la retirada
    expect(finalBalance).to.be.gt(initialBalance);
  });
});

*/
