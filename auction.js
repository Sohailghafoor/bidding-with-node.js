class Bidding {
  startingPrice = 0;
  numberOfWinners = 0;
  bidders = [];
  constructor(startingPrice, numberOfWinners) {
    this.startingPrice = startingPrice;
    this.numberOfWinners = numberOfWinners;
  }
  bid(walletAddress, amount, timestamp) {
    const object = { walletAddress, amount, timestamp, outbidAmount: 0 };
    if (this.bidders.length < this.numberOfWinners) {
      this.bidders.push(object);
    } else {
      // we get the lowest bidder
      const lowestIndex = this.lowestBidderIndex();
      const lowestBidder = this.bidders[lowestIndex];
      const outbidAmount = amount - lowestBidder.amount;
      object.outbidAmount = outbidAmount;
      sendMoney(
        lowestBidder.walletAddress,
        lowestBidder.amount +
          (6 * outbidAmount) / 100 +
          (14 * lowestBidder.outbidAmount) / 100
      );
      this.bidders[lowestIndex] = object;
    }
  }
  lowestBidderIndex() {
    const lowestBidder = null;
    const lowestBidderIndex = null;
    this.bidders.forEach((bidder, index) => {
      if (lowestBidder) {
        if (
          bidder.amount < lowestBidder.amount ||
          (bidder.amount == lowestBidder.amount &&
            bidder.timestamp < lowestBidder.timestamp)
        ) {
          lowestBidder = bidder;
          lowestBidderIndex = index;
        }
      } else {
        lowestBidderIndex = index;
        lowestBidder = bidder;
      }
    });
    return lowestBidderIndex;
  }
  lowestBidder() {
    return this.bidders[this.lowestBidderIndex()];
  }
}
module.exports = new Bidding("1.1", "10");
