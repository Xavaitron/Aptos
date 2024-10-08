module 0xccc::future {
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::coin;
    use aptos_framework::timestamp;
    use aptos_framework::coin::Coin;
    use std::simple_map::{SimpleMap,Self};
    use std::signer;
    use std::vector;
    struct Container<T> has key,store,drop,copy { t: T }
    struct Stock has store,drop,copy{
        total:u64,bonded:u64,val:u64,futuresAffected:vector<u64>,futuresAffectedSize:u64
    }
    
    struct Future has store,drop,copy{
        client:address,stockID:u64,initStockVal:u64,expiryDate:u64,bullish:bool,risk:u64,done:bool
    }
    entry fun transferMoney(sender:address, receiver:address, amount:u64){
        
    }
//     entry fun add<T>(account: &signer, t: T) {
//     move_to<Container<T>>(account, Container { t })
//   }
    fun init_module(account: &signer) {
        // let admin = deployer;
        let contracts:SimpleMap<u64,Future> = simple_map::create();
        let stocks=vector::empty<Stock>();
        let stockDependents:SimpleMap<u64,vector<u64>> = simple_map::create();
        let size:u64=0;
        move_to<Container<u128>>(account, Container<u128> { t:0 });
        move_to<Container<u64>>(account, Container<u64> { t:size });
        move_to<Container<vector<Stock>>>(account, Container<vector<Stock>> { t:stocks });
        move_to<Container<SimpleMap<u64,Future>>>(account, Container<SimpleMap<u64,Future>> { t:contracts });
        // move_to<Container<SimpleMap<u64,vector<u64>>>>(account, Container<SimpleMap<u64,vector<u64>>> { t:stockDependents });
    }
    const RATE:u64 = 1;
    const MIN_EXTEND_TIME:u64=3*3600;
    // fun getContracts(addr: address,k:u64): Future acquires Container{
    //     simple_map::borrow(borrow_global_mut<Container<SimpleMap<u64,Future>>>(addr).t,k)
    // }
     fun getSize(addr: address): u64 acquires Container{
        borrow_global_mut<Container<u64>>(addr).t
    }
     fun addToContracts(cid:u64,new:Future,addr: address) acquires Container{
        simple_map::add(&mut borrow_global_mut<Container<SimpleMap<u64,Future>>>(addr).t,cid,new);
    }
     fun setSize(addr: address,v:u64) acquires Container{
        let k= &mut borrow_global_mut<Container<u64>>(addr).t;
        *k=v;
    }
    public fun getStockVal(addr: address,id:u64): u64 acquires Container{
        (*vector::borrow(&borrow_global_mut<Container<vector<Stock>>>(addr).t,id)).val
    }
    fun setStockVal(addr:address,sid:u64,val:u64) acquires Container{
        let a:&mut Stock = (vector::borrow_mut(&mut borrow_global_mut<Container<vector<Stock>>>(addr).t,sid));
        a.val = val;
    }
    fun addStockDependents(addr:address,sid:u64,cid:u64) acquires Container{
        let a:&mut Stock = vector::borrow_mut(&mut borrow_global_mut<Container<vector<Stock>>>(addr).t,sid);
        a.futuresAffectedSize=a.futuresAffectedSize+1;
        vector::push_back(&mut a.futuresAffected,cid);
    }
    public fun buyFutures(sign:&signer,caller:address, stockId:u64,quantity:u64,isBullish:bool,risk_:u64):u64 acquires Container{
        // transferMoney(caller,admin, risk_+RATE);
        let ad =signer::address_of(sign);
        let size = getSize(ad);
        let stocks = getStockVal(ad,stockId);
        addToContracts(size,Future{
            client:caller,
            stockID : stockId,
            initStockVal:stocks,
            expiryDate:timestamp::now_seconds()+24*3600,
            bullish:isBullish,
            risk : risk_,
            done:false
        },ad);
        addStockDependents(ad,stockId,size);
        setSize(ad,size+1);
        return size
        // return 1
    }
    public fun extendFuture(sign:&signer,contractId:u64,time:u64)acquires Container{
        let ad =signer::address_of(sign);
        let c:&mut Future= simple_map::borrow_mut(&mut borrow_global_mut<Container<SimpleMap<u64,Future>>>(ad).t,&contractId);
        assert!(ad==c.client && c.expiryDate-timestamp::now_seconds()>=MIN_EXTEND_TIME,42);
        c.expiryDate=c.expiryDate+time;
    }
    public fun setVal(sign:&signer,stockId:u64,val:u64) acquires Container{
        let ad =signer::address_of(sign);
        assert!(ad==@admin_addr,42);
        // stockVal[stockId] = val;
        let a:&mut Stock = (vector::borrow_mut(&mut borrow_global_mut<Container<vector<Stock>>>(ad).t,stockId));
        a.val = val;
        // checkConts(ad,a);
    }
    public fun checkConts(ad:address,a:&mut Stock)acquires Container{
        let contracts:&mut SimpleMap<u64,Future> = &mut borrow_global_mut<Container<SimpleMap<u64,Future>>>(ad).t;
        let it:u64 = 0;
        let val:u64 = a.val;
        while (it < a.futuresAffectedSize){
            let c:&mut Future = simple_map::borrow_mut(contracts,vector::borrow(&a.futuresAffected,it));
            if(!c.done && (c.expiryDate<=timestamp::now_seconds() || a.val > c.risk+c.initStockVal || a.val < c.initStockVal-c.risk)){
                if(val>c.initStockVal){
            if(c.bullish){
                transferMoney(@admin_addr,c.client,min(2*c.risk,c.risk+val-c.initStockVal));
            }
            else{transferMoney(@admin_addr,c.client,max(0,c.risk-val+c.initStockVal));}
        }else{
            if(c.bullish){
                transferMoney(@admin_addr,c.client,max(0,c.risk-c.initStockVal+val));
            }
            else{transferMoney(@admin_addr,c.client,min(2*c.risk,c.risk-val+c.initStockVal));}
        };
            };
            it=it+1;
        }
    }
    public fun addStock(sign:&signer,val:u64,total:u64):u128 acquires Container{
        let ad =signer::address_of(sign);
        vector::push_back(&mut borrow_global_mut<Container<vector<Stock>>>(ad).t,
        Stock{
            total:total,
            bonded:0, 
            val:val,
            futuresAffected:vector::empty<u64>(),
            futuresAffectedSize:0});
        let k= &mut borrow_global_mut<Container<u128>>(ad).t;
        *k=*k+1;
        return *k
    }
    public fun min(a:u64,b:u64):u64{
        if(a>b){return b}
        else{ return a}
    }
    public fun max(a:u64,b:u64):u64{
        if(a>b){return a}
        else{ return b}
    }
    public fun mature(ad:address,val:u64,c: Future,cid:u64)acquires Container{
        assert!(!c.done && (c.expiryDate<=timestamp::now_seconds() || val > c.risk+c.initStockVal || val < c.initStockVal-c.risk),42);
        if(val>c.initStockVal){
            if(c.bullish){
                transferMoney(@admin_addr,c.client,min(2*c.risk,c.risk+val-c.initStockVal));
            }
            else{transferMoney(@admin_addr,c.client,max(0,c.risk-val+c.initStockVal));}
        }else{
            if(c.bullish){
                transferMoney(@admin_addr,c.client,max(0,c.risk-c.initStockVal+val));
            }
            else{transferMoney(@admin_addr,c.client,min(2*c.risk,c.risk-val+c.initStockVal));}
        };
        let m:&mut Future = simple_map::borrow_mut(&mut borrow_global_mut<Container<SimpleMap<u64,Future>>>(ad).t,&cid);
        m.done = true;
    }
#[test]
    public fun do(){

    }
}
