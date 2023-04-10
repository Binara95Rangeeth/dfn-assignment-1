import Stock from "./stock.js";

class Datastore {
    constructor() {
        if (!Datastore._instance) {
            this.stockCollection = [];
            this.stockByExchange = {};
            this.stockMap = {};
            this.exchangeTypes = ['All', 'NASDAQ'];
            Datastore._instance = this;
        }
        return Datastore._instance;
    }

    addStock(symbol, exchange) {

        if (!(this.stockMap[symbol])) {
            let newStock = new Stock(symbol, exchange, 0, 0, 0, 0, 0, 0, this.getTime());

            this.stockCollection.push(newStock);
            this.stockMap[symbol] = newStock;

            if (this.stockByExchange[exchange]) {
                this.stockByExchange[exchange].push(newStock);
            } else {
                this.stockByExchange[exchange] = [];
                this.stockByExchange[exchange].push(newStock);
            }
        } else {
            console.log("This object is already in the array.");
            return;
        }

        if (!this.exchangeTypes.includes(exchange)) {
            this.exchangeTypes.push(exchange);
        }
    }


    getStockByExchange(exchange) {
        if (exchange === 'All') {
            return this.stockCollection;
        }

        return this.stockByExchange[exchange] ? this.stockByExchange[exchange] : [];
    }

    getStock(symbol) {
        let ret;

        this.stockMap[symbol] ? ret = this.stockMap[symbol] : ret = null;
    }

    getTime() {
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-UK');
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        return `${formattedDate} ${hours}:${minutes}:${seconds}`;
    }

    createRandDataPoint(int) {
        return Math.floor(Math.random() * int).toFixed(2);
    }

    updateStockData() {
        let rand = Math.floor(Math.random() * this.stockCollection.length);
        let randStock = this.stockCollection[rand];

        if (randStock) {
            randStock.open = this.createRandDataPoint(20);
            randStock.high = this.createRandDataPoint(20);
            randStock.bid = this.createRandDataPoint(20);
            randStock.low = this.createRandDataPoint(20);
            randStock.close = this.createRandDataPoint(20);
            randStock.ask = this.createRandDataPoint(20);
            randStock.tradeDate = this.getTime();
        }
    }
}

// Datastore instance
const datastore = new Datastore();

// Data input
datastore.addStock('1010', 'TDWL');
datastore.addStock('1020', 'TDWL');
datastore.addStock('1090', 'TDWL');
datastore.addStock('2040', 'TDWL');
datastore.addStock('1040', 'TDWL');

datastore.addStock('EMAAR', 'DFM');
datastore.addStock('DFM', 'DFM');
datastore.addStock('DIB', 'DFM');
datastore.addStock('SHUAA', 'DFM');
datastore.addStock('UPP', 'DFM');


export default datastore;