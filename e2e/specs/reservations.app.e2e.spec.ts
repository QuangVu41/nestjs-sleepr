describe('Reservations', () => {
  beforeAll(async () => {
    const userCreds = {
      email: 'truongquangvu413@gmail.com',
      password: 'Quangvu413..',
    };

    await fetch('http://auth:3001', {
      method: 'POST',
      body: JSON.stringify(userCreds),
    });
  });

  it('Create', () => {});
});
