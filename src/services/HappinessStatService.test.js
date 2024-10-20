const dayjs = require('dayjs');
const { getStat, setStat, getStatsDaily, getStatsWeekly } = require('./HappinessStatService')

describe('HappinessStatsService', () => {

    beforeEach(() => localStorage.clear());

    const today = dayjs().startOf('day');

    it('should return null for a stat that has not been set before', () => {
        expect(getStat(today)).toBeNull;
    })

    it('should get and set a single stat', () => {
        setStat(today, 75);
        expect(getStat(today)).toBe(75);
    });

    it('should set multiple stats in different date order', () => {
        setStat(today.add(3, 'day'), 50);
        setStat(today.add(5, 'day'), 100);
        setStat(today.add(1, 'day'), 0);
        setStat(today.add(4, 'day'), 75);
        setStat(today.add(2, 'day'), 25);

        expect(getStat(today.add(1, 'day'))).toBe(0);
        expect(getStat(today.add(2, 'day'))).toBe(25);
        expect(getStat(today.add(3, 'day'))).toBe(50);
        expect(getStat(today.add(4, 'day'))).toBe(75);
        expect(getStat(today.add(5, 'day'))).toBe(100);
    });
});
