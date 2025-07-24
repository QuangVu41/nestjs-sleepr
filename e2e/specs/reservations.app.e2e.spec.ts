describe('Reservations', () => {
  let jwt: string;

  beforeAll(async () => {
    const userCreds = {
      email: 'truongquangvu413@gmail.com',
      password: 'Quangvu413..',
    };

    await fetch('http://auth:3001/users', {
      method: 'POST',
      body: JSON.stringify(userCreds),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const res = await fetch('http://auth:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify(userCreds),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    jwt = await res.text();
  });

  it('Create && Get', async () => {
    const resCreate = await fetch('http://reservations:3000/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authentication: jwt,
      },
      body: JSON.stringify({
        startDate: '2025-10-01T00:00:00.000Z',
        endDate: '2025-10-02T00:00:00.000Z',
        placeId: '1234567890abcdef12345678',
        invoiceId: '0987654321fedcba09876543',
        charge: {
          amount: 17,
          card: {
            cvc: '333',
            exp_month: 10,
            exp_year: 2026,
            number: '4242 4242 4242 4242',
          },
        },
      }),
    });

    expect(resCreate.ok).toBeTruthy();
    const createdReservation = await resCreate.json();

    const resGet = await fetch(
      `http://reservations:3000/reservations/${createdReservation._id}`,
    );
    const reservation = await resGet.json();

    expect(createdReservation).toEqual(reservation);
  });
});
