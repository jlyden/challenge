"use strict";

// CONSTANTS
var MAX3 = 50;
var MAX4 = 40;
var MAX5 = 60;


// define Machine constructor
function Machine(name) {
    this.name = name;
    this.nextIDNum = 1000;
    this.customers = [];

    this.pick3 = [];
    this.pick4 = [];
    this.pick5 = [];

//    this.pick3_rem = MAX3 - this.pick3.length;
//    this.pick4_rem = MAX4 - this.pick4.length;
//    this.pick5_rem = MAX5 - this.pick5.length;
}


// define Customer constructor

// helper functions
function generate_id(machine) {
    var id = machine.nextIDNum;
    machine.nextIDNum += 1;
    return id;
}
// end helper functions

function Customer(machine) {
    this.id = generate_id(machine);
//    this.tickets = [];
    machine.customers += this.id;

    function get_id() {
      return this.id;
    }
}


// define Ticket constructor

// helper functions
function get_tickets(pick, machine) {
    var tkt_array;

    switch (pick) {
        case 3:
            tkt_array = machine.pick3;
            break;
        case 4:
            tkt_array = machine.pick4;
            break;
        case 5:
            tkt_array = machine.pick5;
            break;
        default:
            throw new Error("Issue in get_tickets.");
    }
    return tkt_array;
}

function validate_ticket(pick, value) {
    var tkt_array = get_tickets(pick, machine);

    var flag = true;
    for (var i = 0; i < tkt_array.length; i++) {
        if (tkt_array[i] == value) {
            flag = false;
            break;
        }
    }
    return flag;
}

function generate_ticket(pick) {
    var value = "";
    for (var i = 0; i < pick; i++) {
        var digit = Math.floor(Math.random() * 10);
        value += digit;
    }
    if (validate_ticket(pick,value) == true) {
        return value;
    }
    else {
        return generate_ticket(pick);
    }
}

/*
function place_ticket(pick, machine, value) {
  switch (pick) {
      case 3:
          machine.pick3 += value;
          break;
      case 4:
          machine.pick4 += value;
          break;
      case 5:
          machine.pick5 += value;
          break;
    }
    return;
}
*/
// end helper functions

function Ticket(pick, ownerID, machine) {
    var pick = Math.round(pick);
    console.log(pick);
    if (pick != 3 && pick != 4 && pick != 5) {
      throw new Error("Invalid ticket type in Ticket instance!");
    }

    this.pick = pick;
    this.ownerID = ownerID;
    this.value = generate_ticket(pick, machine);
//    place_ticket(pick, machine, this.value);
}


// create instance of Machine
var machine = new Machine("machine");
// create instance of Customer
var owner = new Customer(machine);
// create instance of Ticket
new Ticket(3, ownerID, machine);

console.log(machine);


// Ticket purchase
function purchase_tickets(x,y,z,ID) {
  // validate input
  var num3,num4,num5,ownerID,extra;
  var availability = {};

  if (typeof x === 'undefined') { num3 = 0; }
  else { num3 = Math.floor(x); }
  if (typeof y === 'undefined') { num4 = 0; }
  else { num4 = Math.floor(y); }
  if (typeof z === 'undefined') { num5 = 0; }
  else { num5 = Math.floor(z); }
  if ( num3 + num4 + num5 > 5 ) {
    throw new Error("Invalid ticket request - you can only get 5!");
  }
  if (typeof ID === 'undefined') {
    var owner = new Customer(machine);
    ownerID = owner.get_id(); }
  else {
    ownerID = ID;
  }

  // purchase pick3s
  if (num3 > 0) {
    // still have pick3s left?
    var sellable = MAX3 - machine.pick3.length;
    // none left
    if (sellable == 0) {
      extra += num3;
      availability[3] = 0;
    }
    // plenty to sell
    else if (sellable >= num3) {
      for (var i = 0; i < num3.length; i++) {
        var tic = new Ticket(3, ownerID, machine);
        machine.pick3 += tic;
        sellable -= 1;
      }
      availability[3] = sellable;
    }
    // fewer than requested
    else {
      for (var i = 0; i < sellable; i++) {
        var tic = new Ticket(3, ownerID, machine);
        machine.pick3 += tic;
      }
      extra += (num3 - sellable);
      availability[3] = 0;
    }
  }

  // purchase pick4s
  if (num4 > 0) {
    // still have pick4s left?
    var sellable = MAX4 - machine.pick4.length;
    // none left
    if (sellable == 0) {
      extra += num4;
      availability[4] = 0;
    }
    // plenty to sell
    else if (sellable >= num4) {
      for (var i = 0; i < num4.length; i++) {
        var tic = new Ticket(4, ownerID, machine);
        machine.pick4 += tic;
        sellable -= 1;
      }
      availability[4] = sellable;
    }
    // fewer than requested
    else {
      for (var i = 0; i < sellable; i++) {
        var tic = new Ticket(4, ownerID, machine);
        machine.pick4 += tic;
      }
      extra += (num4 - sellable);
      availability[4] = 0;
    }
  }

  // purchase pick5s
  if (num5 > 0) {
    // still have pick5s left?
    var sellable = MAX5 - machine.pick5.length;
    // none left
    if (sellable == 0) {
      extra += num5;
      availability[5] = 0;
    }
    // plenty to sell
    else if (sellable >= num5) {
      for (var i = 0; i < num5.length; i++) {
        var tic = new Ticket(5, ownerID, machine);
        machine.pick5 += tic;
        sellable -= 1;
      }
      availability[5] = sellable;
    }
    // fewer than requested
    else {
      for (var i = 0; i < sellable; i++) {
        var tic = new Ticket(5, ownerID, machine);
        machine.pick5 += tic;
      }
      extra += (num5 - sellable);
      availability[5] = 0;
    }
  }

  // looking to purchase "extra" tickets because first choice wasn't available?
  if (extra > 0) {
    if (availability.length == 0) { throw new Error("No more tickets available!"); }
    else {
      //
      if (availability.length == 1) {

      }

    }

  }
}


// for i in overage
// http://stackoverflow.com/questions/4550505/getting-random-value-from-an-array
// var X = availability[Math.floor(Math.random() * availability.length)];
// add ticket to pickX array
// pickX-rem -= 1

// Winner Drawing
