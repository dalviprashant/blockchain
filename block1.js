const SHA256=require('crypto-js/sha256');
class Transaction
{
    constructor(from_address,to_address,amount)
    {
        this.from_address=from_address;
        this.to_address=to_address;
        this.amount=amount;
    }
}
class Block
{
    constructor(timestamp,data,prev_hash='')
    {
        this.timestamp=timestamp;
        this.data=data;
        this.prev_hash=prev_hash;
        this.hash=this.generateHash();
        this.nonce=0;
    }
    generateHash()
    {
        return SHA256(this.timestamp+JSON.stringify(this.data)+this.nonce).toString();
    }
    mineBlock(difficulty)
    {
        console.log('\nbegin mining.... ')
        while(this.hash.substring(0,difficulty)!==Array(difficulty+1).join("0"))
        {
            this.nonce++;
           this.hash= this.generateHash();
            
            //console.log('\nh')
        }           
    }
}
class Blockchain
{
    constructor()
    {
        this.chain=[this.createGenesisBlock()];
        this.difficulty=4;
    }
    createGenesisBlock()
    {
        return new Block(0,'01/01/2017',"this is the genesis block",'0');
    }
    getLatestBlock()
    {
        return this.chain[this.chain.length-1];
    }
    addBlock(newBlock)
    {
        newBlock.prev_hash=this.getLatestBlock().hash;
        //newBlock.hash=newBlock.generateHash();
        newBlock.mineBlock(this.difficulty)
        this.chain.push(newBlock);
    }
    isValid()
    {
        for(let i=1;i<this.chain.length;i++)
        {
            if(this.chain[i].hash!=this.chain[i].generateHash())
            {
                console.log('because of this');
                return false;
            }
            if(this.chain[i].prev_hash!=this.chain[i-1].hash)
                return false;
        }
        return true;
    }
}

let obj=new Blockchain();
obj.addBlock(new Block(1,"10/12/2017",{amount:5}));
console.log('\nblock added..')
obj.addBlock(new Block(2,"10/12/2018",{amount:6}));
console.log('\nblock added..')
//obj.chain[1].data={amount:100};
console.log('Is chain valid?',obj.isValid());
console.log(JSON.stringify(obj,null,4));