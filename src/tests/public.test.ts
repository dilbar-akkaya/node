import axios from 'axios';
import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays } from '../services/public-holidays.service';

describe('Get lists of holidays by year and country', () => {
    test('should return list of holidays', async () => {
        const year = 2024;
        const country = 'FR';
        const returnedData = [
            {
                "date": "2024-01-01",
                "localName": "Jour de l'an",
                "name": "New Year's Day",
            }
        ]
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: returnedData }));
        const listResponse = await getListOfPublicHolidays(year, country);
        expect(listResponse).toEqual(returnedData);
    });
});

describe('Check today is public holiday', () => {
    test('should return true, if status code 200', async () => {
        const country = 'FR';
        const returnedValue = true;
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 200 }));
        const booleanResponse = await checkIfTodayIsPublicHoliday(country);
        expect(booleanResponse).toEqual(returnedValue);
    });
    test('should return false, if status code 204', async () => {
        const country = 'FR';
        const returnedValue = false;
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 204 }));
        const booleanResponse = await checkIfTodayIsPublicHoliday(country);
        expect(booleanResponse).toEqual(returnedValue);
    });
});

describe('Get next public holidays for country', () => {
    test('should return next public holidays', async () => {
        const year = 2024;
        const country = 'FR';
        const returnedData = [
            {
                "date": "2024-05-01",
                "localName": "Fête du Travail",
                "name": "Labour Day",
            }
        ]
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: returnedData }));
        const nextHolidayResponse = await getListOfPublicHolidays(year, country);
        expect(nextHolidayResponse).toEqual(returnedData);
    });
});