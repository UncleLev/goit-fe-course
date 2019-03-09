'use strict';

const products = {
  bread: 10,
  milk: 15,
  apples: 20,
  chicken: 50,
  cheese: 40,
};


function Cashier(name, productDatabase) {
  this.name = name;
  this.productDatabase = productDatabase;
  this.customerMoney = 0;
  this.getCustomerMoney = function (value) {
    this.customerMoney = value;
  }
  this.countTotalPrice = function (Object) {
    let total = 0;
    for(let key in Object) {
      total += Object[key] * productDatabase[key];
    }
    return total;
  }
  this.countChange = function() {
    if (totalPrice <= this.customerMoney) {
      return  this.customerMoney - totalPrice ;  
    } else {
      return null;
    }
  }
  this.onSuccess = function(change) {
    console.log(`Спасибо за покупку, ваша сдача ${change}!`);
  }
  this.onError = function() {
    console.log('Очень жаль, вам не хватает денег на покупки');
  }
  this.reset = function() {
    this.customerMoney = 0;
  }
}

const order = {
  bread: 2,
  milk: 2,
  apples: 1,
  cheese: 1
};

const mango = new Cashier('Stepan', products);

console.log(mango.name); 
console.log(mango.productDatabase);
console.log(mango.customerMoney); 

const totalPrice = mango.countTotalPrice(order);

console.log(totalPrice);

mango.getCustomerMoney(300);

console.log(mango.customerMoney);

const change = mango.countChange();

console.log(change);

if (change !== null) {
  mango.onSuccess(change);
} else {
  mango.onError(); 
}

mango.reset();

console.log(mango.customerMoney); // 0