import { shortenPublicHoliday, validateInput } from '../helpers';
import { SUPPORTED_COUNTRIES } from '../config';

describe('Validate supported countries', () => {
    it('should return true for supported country 1', () => {
        const providedInfo = { year: 2024, country: SUPPORTED_COUNTRIES[0] };
        expect(validateInput(providedInfo)).toBe(true);
    });
    it('should return true for supported country 2', () => {
        const providedInfo = { year: 2024, country: SUPPORTED_COUNTRIES[1] };
        expect(validateInput(providedInfo)).toBe(true);
    });
    it('should return true for supported country 3', () => {
        const providedInfo = { year: 2024, country: SUPPORTED_COUNTRIES[2] };
        expect(validateInput(providedInfo)).toBe(true);
    });
    it('should return true for supported country 4', () => {
        const providedInfo = { year: 2024, country: SUPPORTED_COUNTRIES[3] };
        expect(validateInput(providedInfo)).toBe(true);
    });
});
describe('Validate unsupported countries', () => {
    it('should throw an error if a country doesnt exists in supported country array', () => {
        const providedInfo = { year: 2024, country: 'TR' };
        expect(() => {
            validateInput(providedInfo)
        }).toThrow(`Country provided is not supported, received: ${providedInfo.country}`);
    });
});
describe('Validate not current year', () => {
    it('should throw an error if a year doesnt correct', () => {
        const providedInfo = { year: 1234, country: 'FR' };
        expect(() => {
            validateInput(providedInfo)
        }).toThrow(`Year provided not the current, received: ${providedInfo.year}`);
    });
});
describe('Short Public Holiday', () => {
    it('should throw an error if a year doesnt correct', () => {
        const providedInfo = {
            date: "2024-05-01",
            localName: "Fête du Travail",
            name: "Labour Day",
            countryCode: "FR",
            fixed: false,
            global: true,
            counties: null,
            launchYear: null,
            types: [
                "Public"
            ]
        };;
        expect(
            shortenPublicHoliday(providedInfo)
        ).toEqual(
            {
                name: providedInfo.name,
                localName: providedInfo.localName,
                date: providedInfo.date,
            });
    });
});