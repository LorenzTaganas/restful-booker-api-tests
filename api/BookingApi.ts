
import {
  APIRequestContext,
  APIResponse,
} from '@playwright/test';

import {
  BookingPayload,
  AuthCredentials,
} from '../data/booking-data';

export class BookingApi {
  constructor(private request: APIRequestContext) {}

  // 1. Generate authentication token
  async authenticate(
    credentials: AuthCredentials
  ): Promise<APIResponse> {
    return await this.request.post('/auth', {
      data: credentials,
    });
  }

  // 2. Create a new booking
  async createBooking(
    booking: BookingPayload
  ): Promise<APIResponse> {
    return await this.request.post('/booking', {
      data: booking,
    });
  }

  // 3. Update an existing booking
  async updateBooking(
    bookingId: number,
    token: string,
    booking: BookingPayload
  ): Promise<APIResponse> {
    return await this.request.put(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
      },
      data: booking,
    });
  }

  // 4. Retrieve a booking
  async getBooking(
    bookingId: number
  ): Promise<APIResponse> {
    return await this.request.get(`/booking/${bookingId}`);
  }

  // 5. Delete a booking
  async deleteBooking(
    bookingId: number,
    token: string
  ): Promise<APIResponse> {
    return await this.request.delete(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
  }
}
