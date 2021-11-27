// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract BookingSystem {
    
    enum Company { VOID, PEPSI, COLA }
    mapping(address => Company) public Users;

    address constant nullAddress = 0x0000000000000000000000000000000000000000;

    struct Room { uint8 id; string name; }
    mapping(uint8 /* roomId */ => mapping(uint8 /* hour */ => address /* occupant */)) public availabilities;

    Room[] public Rooms;

    event ReservationApplied(address indexed user, uint8 indexed roomId, uint8 time);
    event ReservationCancelled(address indexed user, uint8 indexed roomId, uint8 time);
    
    constructor() {
        Rooms.push(Room({id: 1, name: "C01"}));
        Rooms.push(Room({id: 2, name: "C02"}));
        Rooms.push(Room({id: 3, name: "C03"}));
        Rooms.push(Room({id: 4, name: "C04"}));
        Rooms.push(Room({id: 5, name: "C05"}));
        Rooms.push(Room({id: 6, name: "C06"}));
        Rooms.push(Room({id: 7, name: "C07"}));
        Rooms.push(Room({id: 8, name: "C08"}));
        Rooms.push(Room({id: 9, name: "C09"}));
        Rooms.push(Room({id: 10, name: "C10"}));
        Rooms.push(Room({id: 11, name: "P11"}));
        Rooms.push(Room({id: 12, name: "P12"}));
        Rooms.push(Room({id: 13, name: "P13"}));
        Rooms.push(Room({id: 14, name: "P14"}));
        Rooms.push(Room({id: 15, name: "P15"}));
        Rooms.push(Room({id: 16, name: "P16"}));
        Rooms.push(Room({id: 17, name: "P17"}));
        Rooms.push(Room({id: 18, name: "P18"}));
        Rooms.push(Room({id: 19, name: "P19"}));
        Rooms.push(Room({id: 20, name: "P20"}));
    }

    function assignToCompany(Company company) public {
        Users[msg.sender] = company;
    }

    modifier mustBelongToCompany(address user) {
        require(Users[user] != Company.VOID, "Booking is only allowed to members of COLA or PEPSI");
        _;
    }

    function applyReservation(uint8 roomId, uint8 hour) mustBelongToCompany(msg.sender) public {
        require(availabilities[roomId][hour] == nullAddress, "This room is already booked at this time.");
        
        availabilities[roomId][hour] = msg.sender;
        emit ReservationApplied(msg.sender, roomId, hour);
    }

    function cancelReservation(uint8 roomId, uint8 hour) mustBelongToCompany(msg.sender) public {
        require(msg.sender == availabilities[roomId][hour], "You cannot cancel this reservation");

        availabilities[roomId][hour] = nullAddress;
        emit ReservationCancelled(msg.sender, roomId, hour);
    }

   
}