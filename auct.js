class Bidding {
  startingPrice = 0;
  numberOfWinners = 0;
  bidders = [];
  constructor(startingPrice, numberOfWinners) {
    this.startingPrice = startingPrice;
    this.numberOfWinners = numberOfWinners;
  }
  bid(walletAddress, amount, outbidAmount) {
    const object = { walletAddress, amount, outbidAmount };
    if (this.bidders.length < this.numberOfWinners) {
      this.bidders.push(object);
    }
  }
}
const Auc = new Bidding("0.001", "5");
const bid = Auc.bid("0xkhoida789698", "0.001", "12");
console.log("Here is the New Auc", Auc);
