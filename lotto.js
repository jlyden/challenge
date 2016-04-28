"use strict";

// CONSTANTS
var MAX3 = 50;
var MAX4 = 40;
var MAX5 = 60;


// define Machine constructor
function Machine(name) {
    this.name = name;
    this.nextIDNum = 1000;

    // Make customers a dictionary where IDs are keys and tickets bought are values
    this.customers = [];
    this.tickets = [];

    this.pick3Left = MAX3;
    this.pick4Left = MAX4;
    this.pick5Left = MAX5;
}


// define Customer constructor
function Customer(machine) {
    function generate_id(machine) {
      var id = machine.nextIDNum;
      machine.nextIDNum += 1;
      return id;
    };
    this.id = generate_id(machine);
    this.getID = function() { return this.id; }
    machine.customers.push(this.id);
}


function Ticket(pick, ownerID, machine) {
    var pick = Math.round(pick);
    console.log(pick);
    if (pick != 3 && pick != 4 && pick != 5) {
      throw new Error("Invalid ticket type in Ticket instance!");
    }

    this.pick = pick;
    this.ownerID = ownerID;

    function generate_ticket(pick, machine) {
        // create ticket
        var value = "";
        for (var i = 0; i < pick; i++) {
            var digit = Math.floor(Math.random() * 10);
            value += digit;
        }

        // validate ticket
        var flag = true;
        for (var i = 0; i < machine.tickets.length; i++) {
            if (machine.tickets[i] == value) {
                flag = false;
                break;
            }
        }
        if (flag == false) {
            return generate_ticket(pick, machine);
        }
        else {
            return value;
        }
    }

    this.value = generate_ticket(pick, machine);
    machine.tickets.push(this.value);

    switch (pick){
      case 3: machine.pick3Left -= 1; break;
      case 4: machine.pick4Left -= 1; break;
      case 5: machine.pick5Left -= 1; break;
    }
}


// create instance of Machine
var machine = new Machine("machine");
// create instance of Customer
var owner = new Customer(machine);
// create instance of Ticket
new Ticket(3, owner.getID, machine);

console.log(machine);


function single_type_ticket_purchase(num3, picksLeft, ownerID, machine) {
    var leftovers = 0;
    // none left to sell
    if (picksLeft == 0) {
      leftovers += num3;
    }
    // plenty to sell
    else if (picksLeft >= num3) {
      for (var i = 0; i < num3.length; i++) {
        var tic = new Ticket(3, ownerID, machine);
      }
    }
    // fewer than requested
    else if (picksLeft < num3) {
      for (var i = 0; i < picksLeft; i++) {
        var tic = new Ticket(3, ownerID, machine);
        num3 -= 1;
      }
      leftovers += num3;
    }
    return leftovers;
}


function total_ticket_purchase(x,y,z,ID,machine) {
  // validate input
  var num3,num4,num5,ownerID,extra;
  if (typeof x === 'undefined') { num3 = 0; }
  else { num3 = Math.round(x); }
  if (typeof y === 'undefined') { num4 = 0; }
  else { num4 = Math.round(y); }
  if (typeof z === 'undefined') { num5 = 0; }
  else { num5 = Math.round(z); }
  if ( num3 + num4 + num5 > 5 ) {
    throw new Error("Invalid ticket request - you can only get 5!");
  }
  if (typeof ID === 'undefined') {
    var owner = new Customer (machine);
    ownerID = owner.getID(); }
  else {
    ownerID = ID;
  }

  // purchase pick3s
  if (num3 > 0) {
    var leftovers = single_type_ticket_purchase(num3, machine.pick3Left, ownerID, machine);
    extra += leftovers;
  }
  // purchase pick4s
  if (num4 > 0) {
    var leftovers = single_type_ticket_purchase(num4, machine.pick4Left, ownerID, machine);
    extra += leftovers;
  }
  // purchase pick5s
  if (num5 > 0) {
    var leftovers = single_type_ticket_purchase(num5, machine.pick5Left, ownerID, machine);
    extra += leftovers;
  }

  // looking to purchase "extra" tickets because first choice wasn't available?
  if (extra > 0) {
    if (machine.pick3Left == 0) {
      if (machine.pick4Left == 0) {
        if (machine.pick5Left == 0) {
          // if ALL ticket types are gone:
          throw new Error("No more tickets available!");
        }
        else {
          // if ONLY pick5s remain, buy as many as possible (within request)
          var leftovers = single_type_ticket_purchase(extra, machine.pick5Left, ownerID, machine);
          // if tickets run out before request completely filled:
          if (leftovers > 0) {
            throw new Error("No more tickets available!");
          }
        }
      }
      // specified for clarity
      else if (machine.pick4Left < 0 && machine.pick5Left == 0)
    }
      }

    }

  }
}


// Winner Drawing
