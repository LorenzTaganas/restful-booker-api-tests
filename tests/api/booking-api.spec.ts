
import { test, expect } from '../../fixtures/api-fixtures';

import {
  authData,
  bookingData,
  updatedBookingData,
} from '../../data/booking-data';

test.describe('Restful Booker API Tests', () => {

  // POSITIVE TEST: Complete booking lifecycle
  test('Should authenticate, create, update, verify, and delete a booking',
    async ({ bookingApi }) => {

      let token: string | undefined;
      let bookingId: number | undefined;

      try {
        // STEP 1: AUTHENTICATION
        const authResponse =
          await bookingApi.authenticate(authData);

        expect(authResponse.status()).toBe(200);

        const authBody = await authResponse.json();

        expect(authBody).toHaveProperty('token');
        expect(typeof authBody.token).toBe('string');
        expect(authBody.token.length).toBeGreaterThan(0);

        const authToken: string = authBody.token;
        token = authToken;

        // STEP 2: CREATE BOOKING
        const createResponse =
          await bookingApi.createBooking(bookingData);

        expect(createResponse.status()).toBe(200);

        const createBody = await createResponse.json();

        expect(createBody).toHaveProperty('bookingid');
        expect(createBody).toHaveProperty('booking');

        expect(typeof createBody.bookingid).toBe('number');
        expect(createBody.booking).toMatchObject(bookingData);

        const createdBookingId: number = createBody.bookingid;
        bookingId = createdBookingId;

        // STEP 3: UPDATE BOOKING
        const updateResponse =
          await bookingApi.updateBooking(
            createdBookingId,
            authToken,
            updatedBookingData
          );

        expect(updateResponse.status()).toBe(200);

        const updateBody = await updateResponse.json();

        expect(updateBody).toMatchObject(updatedBookingData);

        // STEP 4: VERIFY UPDATED BOOKING
        const getResponse =
          await bookingApi.getBooking(createdBookingId);

        expect(getResponse.status()).toBe(200);

        const getBody = await getResponse.json();

        expect(getBody).toMatchObject(updatedBookingData);

        // STEP 5: DELETE BOOKING
        const deleteResponse =
          await bookingApi.deleteBooking(
            createdBookingId,
            authToken
          );

        expect(deleteResponse.status()).toBe(201);

        // Prevent duplicate cleanup
        bookingId = undefined;

      } finally {
        // CLEANUP if an earlier step fails
        if (bookingId !== undefined && token !== undefined) {
          const cleanupResponse =
            await bookingApi.deleteBooking(bookingId, token);

          expect(cleanupResponse.status()).toBe(201);
        }
      }
    }
  );


  // NEGATIVE TEST: Invalid authentication token
  test('Should reject booking update with an invalid token',
    async ({ bookingApi }) => {

      let token: string | undefined;
      let bookingId: number | undefined;

      try {
        // STEP 1: AUTHENTICATION
        const authResponse =
          await bookingApi.authenticate(authData);

        expect(authResponse.status()).toBe(200);

        const authBody = await authResponse.json();

        expect(typeof authBody.token).toBe('string');

        const authToken: string = authBody.token;
        token = authToken;

        // STEP 2: CREATE BOOKING
        const createResponse =
          await bookingApi.createBooking(bookingData);

        expect(createResponse.status()).toBe(200);

        const createBody = await createResponse.json();

        expect(typeof createBody.bookingid).toBe('number');

        const createdBookingId: number = createBody.bookingid;
        bookingId = createdBookingId;

        // STEP 3: ATTEMPT UPDATE WITH INVALID TOKEN
        const invalidUpdateResponse =
          await bookingApi.updateBooking(
            createdBookingId,
            'invalid-token',
            updatedBookingData
          );

        // Expected: API rejects unauthorized update
        expect(invalidUpdateResponse.status()).toBe(403);

      } finally {
        // CLEANUP USING VALID TOKEN
        if (bookingId !== undefined && token !== undefined) {
          const cleanupResponse =
            await bookingApi.deleteBooking(bookingId, token);

          expect(cleanupResponse.status()).toBe(201);
        }
      }
    }
  );

});
