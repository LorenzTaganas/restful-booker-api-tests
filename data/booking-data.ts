
export const bookingData = {
  firstname: 'Lorenz',
  lastname: 'Tester',
  totalprice: 1500,
  depositpaid: true,

  bookingdates: {
    checkin: '2026-12-01',
    checkout: '2026-12-05',
  },

  additionalneeds: 'Breakfast',
};

export const updatedBookingData = {
  firstname: 'Lorenz',
  lastname: 'UpdatedTester',
  totalprice: 2000,
  depositpaid: false,

  bookingdates: {
    checkin: '2026-12-10',
    checkout: '2026-12-15',
  },

  additionalneeds: 'Lunch',
};

export const authData = {
  username: 'admin',
  password: 'password123',
};

// TypeScript interfaces
export interface BookingPayload {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds: string;
}

export interface AuthCredentials {
  username: string;
  password: string;
}
