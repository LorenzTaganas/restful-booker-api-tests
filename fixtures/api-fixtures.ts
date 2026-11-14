
import { test as base, expect } from '@playwright/test';
import { BookingApi } from '../api/BookingApi';

type ApiFixtures = {
  bookingApi: BookingApi;
};

export const test = base.extend<ApiFixtures>({
  bookingApi: async ({ request }, use) => {
    // Setup: create the reusable API client
    const bookingApi = new BookingApi(request);

    await use(bookingApi);

    // Teardown: Playwright manages the request
    // fixture lifecycle after the test finishes.
  },
});

export { expect };
