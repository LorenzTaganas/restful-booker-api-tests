
export const authSchema = {
  type: 'object',
  required: ['token'],
  properties: {
    token: {
      type: 'string',
      minLength: 1,
    },
  },
  additionalProperties: true,
};

export const bookingSchema = {
  type: 'object',
  required: [
    'firstname',
    'lastname',
    'totalprice',
    'depositpaid',
    'bookingdates',
  ],
  properties: {
    firstname: { type: 'string' },
    lastname: { type: 'string' },
    totalprice: { type: 'number' },
    depositpaid: { type: 'boolean' },
    bookingdates: {
      type: 'object',
      required: ['checkin', 'checkout'],
      properties: {
        checkin: { type: 'string' },
        checkout: { type: 'string' },
      },
      additionalProperties: true,
    },
    additionalneeds: { type: 'string' },
  },
  additionalProperties: true,
};

export const createBookingSchema = {
  type: 'object',
  required: ['bookingid', 'booking'],
  properties: {
    bookingid: { type: 'number' },
    booking: bookingSchema,
  },
  additionalProperties: true,
};
