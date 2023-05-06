import axios from "axios";

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

const obj = new Bidding("1.1", "5");
// obj.bid("0xduysf78safdya98c", 5, new Date().getTime());

// console.log("here is the class data", obj);
const data = { ...obj };
axios
  .post("http://localhost:8081/start-bid", data)
  .then((response) => console.log(response));

// module.exports = obj;
// obj.bid("0xduysf7ya98c", 85, new Date().getTime());
