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

    this.pick3_rem = MAX3 - this.pick3.length;
    this.pick4_rem = MAX4 - this.pick4.length;
    this.pick5_rem = MAX5 - this.pick5.length;
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
    this.tickets = [];
    machine.customers += this.id;
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
    place_ticket(pick, machine, this.value);
}


// create instance of Machine
var machine = new Machine("machine");
// create instance of Customer
var owner = new Customer(machine);
// create instance of Ticket
new Ticket(3, owner, machine);

console.log(machine);


// Ticket purchase
function purchase_tickets(x,y,z,ID) {
  var x,y,z,owner;

  if (typeof x === 'undefined') { x = 0; }
  if (typeof y === 'undefined') { y = 0; }
  if (typeof z === 'undefined') { z = 0; }
  if (typeof ID === 'undefined') {
    var owner = new Customer(machine); }
  else {

  }
}


// input: x,y,z,ID
// -- x,y,z = # of 3,4,5 tickets to purchase
// --- if sum(x,y,z) - 5 > 0, reject input
// -- ID = customer ID
// --- if no ID provided, create customer

// where X = 3, 4, 5
// if pickX-rem == 0
// overage += #sought
// elif pickX-rem >= #sought
// for i in #sought, create pickX ticket
// add ticket to pickX array
// pickX-rem -= 1
// add ticket to customer array
// else
// for i in pickX-rem-copy, create pickX ticket
// add ticket to pickX array
// pickX-rem -= 1
// add ticket to customer array
// overage += #sought - pickX-rem-copy

// after purchasing requested tickets
// if overage
// check availability
// availability = [3,4,5]
// if pickX-rem < 1
// remove X from availability
// for i in overage
// if availability
// http://stackoverflow.com/questions/4550505/getting-random-value-from-an-array
// var X = availability[Math.floor(Math.random() * availability.length)];
// add ticket to pickX array
// pickX-rem -= 1
// add ticket to customer array

// Winner Drawing
