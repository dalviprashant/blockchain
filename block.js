const SHA256=require('crypto-js/sha256');

class Block
{
    constructor(index,timestamp,data,prev_hash='')
    {
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.prev_hash=prev_hash;
        this.hash=this.generateHash();
    }
    generateHash()
    {
        return SHA256(this.index+this.timestamp+JSON.stringify(this.data)).toString();
    }
}
class Blockchain
{
    constructor()
    {
        this.chain=[this.createGenesisBlock()];
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
        this.chain.push(newBlock);
    }
    isValid()
    {
        for(let i=1;i<this.chain.length;i++)
        {
            if(this.chain[i].hash!=this.chain[i].generateHash())
                return false;
            if(this.chain[i].prev_hash!=this.chain[i-1].hash)
                return false;
        }
        return true;
    }
}

let obj=new Blockchain();
obj.addBlock(new Block(1,"10/12/2017",{amount:5}));
obj.addBlock(new Block(2,"10/12/2018",{amount:6}));
//obj.chain[1].data={amount:100};
console.log('Is chain valid?',obj.isValid());
//console.log(JSON.stringify(obj,null,4));