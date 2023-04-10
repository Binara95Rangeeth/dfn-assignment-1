export default class Stock {
    constructor(symbol, exchange, open, high, low, close, bid, ask, tradeDate) {
        this.symbol = symbol;
        this.exchange = exchange;
        this.open = open;
        this.high = high;
        this.low = low;
        this.close = close;
        this.bid = bid;
        this.ask = ask;
        this.tradeDate = tradeDate;
    }
}