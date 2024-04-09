import request from "supertest";
describe('Check today is public holiday', () => {
    test('should return status code 204 if today is not holidays', async () => {
        const countryCode = 'FR';
        const response = await request('https://date.nager.at').get(`/api/v3/IsTodayPublicHoliday/${countryCode}`)
        expect(response.status).toBe(204);
    });
});

describe('Get list of public holidays', () => {
    test('should return list of holidays and status code 200', async () => {
        const year = 2024;
        const countryCode = 'FR';
        const response = await request('https://date.nager.at').get(`/api/v3/PublicHolidays/${year}/${countryCode}`)
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });
});