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
    constructor(timestamp,transaction,prev_hash='')
    {
        this.timestamp=timestamp;
      
        this.prev_hash=prev_hash;
        this.hash=this.generateHash();
        this.nonce=0;
        this.transaction=transaction;
    }
    generateHash()
    {
        return SHA256(this.timestamp+JSON.stringify(this.transaction)+this.nonce).toString();
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
        this.difficulty=2;
        this.pendingtransactions=[];
        this.reward=100;
    }
    createGenesisBlock()
    {
        return new Block('01/01/2017',"this is the genesis block",'0');
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
    createTransaction(trans)
    {
        this.pendingtransactions.push(trans);
    }
    getBalance(addr)
    {
        let bal=0;
        for(const block of this.chain)
        {
            for(const transa of block.transaction)
            {
                if(transa.from_address===addr)
                    bal-=transa.amount;
                if(transa.to_address===addr)
                    bal+=transa.amount;
                
            }
        }
        return bal;
    }
    mine(myaddress)
    {
        let newBlock=new Block(Date.now(),this.pendingtransactions);
        newBlock.prev_hash=this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
        console.log('block added');
        console.log('hash generated:',newBlock.hash);
        this.pendingtransactions=[new Transaction(null,myaddress,this.reward)];
    } 
    isValid()
    {
        for(let i=1;i<this.chain.length;i++)
        {
            if(this.chain[i].hash!=t    his.chain[i].generateHash())
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
obj.createTransaction(new Transaction('addr1','addr2',100));

obj.createTransaction(new Transaction('addr2','addr1',50));

obj.mine('pd');
console.log('pd balance is ',obj.getBalance('pd'));
console.log('addr2 balance is ',obj.getBalance('addr2'));

obj.createTransaction(new Transaction('addr1','addr2',10));


obj.mine('pd');
console.log('pd balance is ',obj.getBalance('pd'));
console.log('addr1 balance is ',obj.getBalance('addr1'));



