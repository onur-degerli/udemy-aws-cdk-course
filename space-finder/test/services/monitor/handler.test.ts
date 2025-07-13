import { handler } from '../../../src/services/monitor/handler';

describe('Monitor lambda tests', () => {
  const fetchSpy = jest.spyOn(global, 'fetch');
  fetchSpy.mockImplementation(() => Promise.resolve({} as any));

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('makes requests for records in SnsEvent', async () => {
    await handler(
      {
        Records: [
          {
            Sns: {
              Message: 'Test Message',
            },
          },
        ],
      } as any,
      {}
    );

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(expect.any(String), {
      method: 'POST',
      body: JSON.stringify({
        text: `We have a problem: Test Message`,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  test('No sns records, no requests', async () => {
    await handler(
      {
        Records: [],
      } as any,
      {}
    );

    expect(fetchSpy).not.toHaveBeenCalled();
  });
});
