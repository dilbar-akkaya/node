import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays } from "../services/public-holidays.service";

describe('Get lists of holidays by year and country', () => {
    test('should return  holidays and status code will be 200', async () => {
        const year = 2024;
        const countryCode = 'FR';
        const listResponse = await getListOfPublicHolidays(year, countryCode)
        expect(Array.isArray(listResponse)).toBeTruthy();
    });
});

describe('Check today is public holiday', () => {
    test('should return false if status 204', async () => {
        const countryCode = 'FR';
        const response = await checkIfTodayIsPublicHoliday(countryCode)
        expect(response).toBe(false);
    });
});
describe('Get next public holidays for country', () => {
    test('should return next public holidays', async () => {
        const countryCode = 'FR';
        const response = await getNextPublicHolidays(countryCode)
        expect(Array.isArray(response)).toBeTruthy();
    });
});
