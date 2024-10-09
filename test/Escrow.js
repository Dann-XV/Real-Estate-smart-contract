const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe('Escrow', () => {
    let buyer, seller, inspector, lender;
    let realEstate, escrow;

    beforeEach(async () => {
        [buyer, seller, inspector, lender] = await ethers.getSigners();//a list of free accts and assigns the first to the buyer and second to seller

        // Deploy Real Estate Contract
        const RealEstate = await ethers.getContractFactory('RealEstate');
        realEstate = await RealEstate.deploy();

        // Mint
        let transaction = await realEstate.connect(seller).mint("https://ipfs.io/ipfs/QmTudSYeM7mz3PkYEWXWqPjomRPHogcMFSq7XAvsvsgAPS")        
        await transaction.wait()

        // Deploy Escrow Contract
        const Escrow = await ethers.getContractFactory('Escrow');
        escrow = await Escrow.deploy(
            realEstate.address,
            seller.address,
            inspector.address,
            lender.address
        );
    })

    describe('Deployment', async () => {
        it('Returns nftAddress', async () =>{
            const result = await escrow.nftAddress();
            expect(result).to.be.equal(realEstate.address);
        })

        it('Returns seller', async () =>{
            const result = await escrow.seller();
            expect(result).to.be.equal(seller.address);
        })
        it('Returns inspector', async () =>{
            const result = await escrow.inspector();
            expect(result).to.be.equal(inspector.address);
        })
        it('Returns lender', async () =>{
            const result = await escrow.lender();
            expect(result).to.be.equal(lender.address);
        })
    })
})

// 2:15:51
