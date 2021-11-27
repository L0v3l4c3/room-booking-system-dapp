const BookingSystem = artifacts.require("BookingSystem");

const nullAddress = "0x0000000000000000000000000000000000000000";

contract("BookingSystem", ([account, account2]) => {
  it("generates 20 rooms by default", async () => {
    const instance = await BookingSystem.deployed();

    const rooms = await Promise.allSettled([
      instance.Rooms.call(0),
      instance.Rooms.call(1),
      instance.Rooms.call(2),
      instance.Rooms.call(3),
      instance.Rooms.call(4),
      instance.Rooms.call(5),
      instance.Rooms.call(6),
      instance.Rooms.call(7),
      instance.Rooms.call(8),
      instance.Rooms.call(9),
      instance.Rooms.call(10),
      instance.Rooms.call(11),
      instance.Rooms.call(12),
      instance.Rooms.call(13),
      instance.Rooms.call(14),
      instance.Rooms.call(15),
      instance.Rooms.call(16),
      instance.Rooms.call(17),
      instance.Rooms.call(18),
      instance.Rooms.call(19)
    ]);

    assert(rooms.filter(room => room.status === "fulfilled").length === 20, "Invalid number of rooms generated from constructor");
  })

  it("assigns a user to a company", async () => {
    const instance = await BookingSystem.deployed();

    const unassignedUser = Number(await instance.Users.call(account));

    assert(unassignedUser === 0, "User should not have a company by default");

    await instance.assignToCompany(1, { from: account });

    const assignedUser = Number(await instance.Users.call(account));

    assert(assignedUser === 1, "User should now belong to company 1");
  })

  it("successfully books a room", async () => {
    const instance = await BookingSystem.deployed();

    const noOccupant = await instance.availabilities.call(2, 12);

    assert(noOccupant === nullAddress, "There should not be any occupant by default");

    await instance.applyReservation(2, 12, { from: account });

    const occupant = await instance.availabilities.call(2, 12);

    assert(occupant === account, "The new occupant should be the booker");
  })

  it("successfully cancels a booking", async () => {
    const instance = await BookingSystem.deployed();

    await instance.applyReservation(4, 12, { from: account });

    const occupant = await instance.availabilities.call(4, 12);

    assert(occupant === account, "The new occupant should be the booker");

    await instance.cancelReservation(4, 12, { from: account });

    const noOccupant = await instance.availabilities.call(4, 12);

    assert(noOccupant === nullAddress, "There should not be any occupant after cancelling a booking");
  })

  it("gets rejected when trying to book an occupied room", async () => {
    const instance = await BookingSystem.deployed();

    await instance.applyReservation(5, 12, { from: account });

    const occupant = await instance.availabilities.call(5, 12);

    assert(occupant === account, "The new occupant should be the booker");

    try {
      await instance.applyReservation(5, 12, { from: account })
      assert(false === true, "It should not book an already booked room")
    } catch (err) {
      assert(err.reason === "This room is already booked at this time.", "The booking should not proceed if the room is already booked");
    }
  })

  it("gets rejected when trying to cancel the booking of another user", async () => {
    const instance = await BookingSystem.deployed();

    await instance.assignToCompany(1, { from: account2 })
    await instance.applyReservation(6, 12, { from: account });

    const occupant = await instance.availabilities.call(6, 12);

    assert(occupant === account, "The new occupant should be the booker");

    try {
      await instance.applyReservation(6, 12, { from: account2 })
      assert(false === true, "It should not book an already booked room")
    } catch (err) {
      assert(err.reason === "This room is already booked at this time.", "Booking an already booked room should not be possible")
    }
  })
})