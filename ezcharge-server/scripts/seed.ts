import mongoose from 'mongoose';

import {
  ChargingStation,
  ChargingStationSchema,
} from '../src/charging-station/schemas/charging-station.schema';
import {
  ChargingSlot,
  ChargingSlotSchema,
} from '../src/charging-slot/schemas/charging-slot.schema';
import {
  Reservation,
  ReservationSchema,
} from '../src/reservation/schemas/reservation.schema';
import {
  PaymentMethod,
  PaymentMethodSchema,
} from '../src/payment-method/schemas/payment-method.schema';
import {
  Transaction,
  TransactionSchema,
} from '../src/transaction/schemas/transaction.schema';
import { faker } from "@faker-js/faker";
import { exit } from "@nestjs/cli/actions";
import axios from "axios";
import * as fs from "fs";

const ChargingStationModel = mongoose.model(
  'ChargingStation',
  ChargingStationSchema,
);
const ChargingSlotModel = mongoose.model('ChargingSlot', ChargingSlotSchema);
const ReservationModel = mongoose.model('Reservation', ReservationSchema);
const PaymentMethodModel = mongoose.model('PaymentMethod', PaymentMethodSchema);
const TransactionModel = mongoose.model('Transaction', TransactionSchema);

async function connectToDatabase() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ezcharge');
}

async function seedData() {
  const userTransactionsMap = new Map();
  const promises = [];

  for (let i = 0; i < 50; i++) {
    const chargingSlots = [];
    const chargingStationOwner = faker.number.int({ min: 1, max: 20 });

    for (let slotNum = 0; slotNum < faker.number.int({ min: 1, max: 5 }); slotNum++) {
      const reservations = [];

      for (let reservationNum = 0; reservationNum < faker.number.int({ min: 1, max: 20 }); reservationNum++) {
        const userId = faker.number.int({ min: 21, max: 40 });
        const userTransactions = userTransactionsMap.get(userId) || [];
        const transaction = new TransactionModel({
          timeStamp: faker.date.recent(),
          amount: faker.finance.amount(),
          type: faker.finance.transactionType(),
        });
        promises.push(transaction.save());

        userTransactions.push(transaction);
        userTransactionsMap.set(userId, userTransactions);

        const totalKw = faker.number.int({ min: 20, max: 100 })
        const pricePerKw = faker.number.int({ min: 20, max: 60 })/100
        const reservation = new ReservationModel({
          user: userId,
          startTime: faker.date.recent(),
          endTime: faker.date.future(),
          duration: faker.number.int({ min: 1, max: 3 }) * 30,
          transactionId: transaction._id,
          totalKW: totalKw,
          pricePerKw: pricePerKw,
          totalPrice: totalKw*pricePerKw
        });
        promises.push(reservation.save());

        reservations.push(reservation);
      }

      const chargingSlot = new ChargingSlotModel({
        reservations: reservations,
      });
      promises.push(chargingSlot.save());

      chargingSlots.push(chargingSlot);
    }

   const [long , lat ] = faker.location.nearbyGPSCoordinate({ origin: [41.1, -7.9], radius: 100, isMetric: true })

    const chargingStation = new ChargingStationModel({
      owner: chargingStationOwner,
      name: faker.company.name(),
      location: {
        type: 'Point',
        coordinates: [long, lat],
      },
      address: faker.location.streetAddress(),
      slots: chargingSlots,
      operationTime: {
        start: faker.number.int({ min: 1, max: 12 }) + ':00',
        end: faker.number.int({ min: 13, max: 24 }) + ':00',
      },
      unavailability: [
        {
          slotNumber: faker.number.int({ min: 1, max: 5 }),
          startTime: faker.date.recent(),
          endTime: faker.date.future(),
        },
      ],
      kwhCapacity: faker.helpers.arrayElement([50, 125, 250, 350]),
      plugType: faker.helpers.arrayElement(['CCS2', 'Type2', 'Tesla']),
      pricePerKw: faker.number.int({ min: 20, max: 60 })/100
    });
    promises.push(chargingStation.save());
  }

  for (let [userId, transactions] of userTransactionsMap.entries()) {
    const userPaymentMethods = [];

    for (let paymentNum = 0; paymentNum < faker.number.int({ min: 1, max: 10 }); paymentNum++) {
      const paymentMethod = new PaymentMethodModel({
        user: userId,
        cardNumber: faker.finance.creditCardNumber(),
        cardName: faker.person.fullName(),
        expirationDate: faker.date.future().toISOString(),
        defaultMethod: faker.datatype.boolean(),
      });

      // randomly select a transaction from the transactions array
      const randomTransaction = transactions[Math.floor(Math.random() * transactions.length)];

      // Assign transaction to the payment method
      paymentMethod.transactions = [randomTransaction];

      // save the payment method immediately
      await paymentMethod.save();

      userPaymentMethods.push(paymentMethod);
    }
  }

  await Promise.all(promises);
}

async function registerUsers(role, numUsers) {
    const users = [];
    for (let i = 0; i < numUsers; i++) {
      const username = faker.internet.userName();
      const password = faker.internet.password();
      const email = faker.internet.email();
      const response = await axios.post('http://127.0.0.1:8085/register', {
        username,
        password,
        roles: role,
        email,
      });
      users.push({
        username,
        password,
        roles: role,
        email,
        responseStatus: response.status,
        responseStatusText: response.statusText,
      });
    }
    return users;
  }

connectToDatabase()
  .then(async () => {
    console.log('Connected to MongoDB');
    await seedData();
    const adminUsers = await registerUsers('admin', 20);
    const regularUsers = await registerUsers('user', 20);
    // Write users to a JSON file
    fs.writeFileSync('./scripts/users.json', JSON.stringify({ adminUsers, regularUsers }));
    console.log('Data seeded');
    exit()
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  });


