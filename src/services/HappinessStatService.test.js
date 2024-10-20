const { getStat, setStat, getStatsDaily, getStatsWeekly } = require('./HappinessStatService')

describe('HappinessStatsService', () => {

    beforeEach(() => localStorage.clear());

    const day1 = '2024-01-01';
    const day2 = '2024-01-02';
    const day3 = '2024-01-03';
    const day4 = '2024-01-04';
    const day5 = '2024-01-05';
    const day6 = '2024-01-06';

    it('should return null for a stat that has not been set before', () => {
        expect(getStat(day1)).toBeNull;
    })

    it('should get and set a single stat', () => {
        setStat(day1, 75);
        expect(getStat(day1)).toBe(75);
    });

    it('should set multiple stats in different date order', () => {
        setStat(day3, 50);
        setStat(day5, 100);
        setStat(day1, 0);
        setStat(day4, 75);
        setStat(day2, 25);

        expect(getStat(day1)).toBe(0);
        expect(getStat(day2)).toBe(25);
        expect(getStat(day3)).toBe(50);
        expect(getStat(day4)).toBe(75);
        expect(getStat(day5)).toBe(100);
    });

    it('should update a stat that was previousl set', () => {
        setStat(day2, 0);
        
        // Update the only item in the series.
        setStat(day2, 25);
        expect(getStat(day2)).toBe(25);

        // Add the second item to the series.
        setStat(day1, 0);

        // Update earliest item in the series.
        setStat(day1, 50);
        expect(getStat(day1)).toBe(50);

        // Update the latest item in the series.
        setStat(day2, 75);
        expect(getStat(day2)).toBe(75);

        // Add the third item to the series.
        setStat(day3, 0);

        // Update the middle item in the series.
        setStat(day2, 100);
        expect(getStat(day2)).toBe(100);
    });

    it('should get daily stats for the specified interval', () => {
        setStat(day2, 0);
        setStat(day3, 25);
        setStat(day4, 50);

        expect(getStatsDaily(day2, day3))
            .toEqual([{ date: day2, value: 0 }]);
        
        expect(getStatsDaily(day2, day4))
            .toEqual([{ date: day2, value: 0 }, { date: day3, value: 25 }]);
        
        expect(getStatsDaily(day2, day5))
            .toEqual([{ date: day2, value: 0 }, { date: day3, value: 25 }, { date: day4, value: 50 }]);
        
        expect(getStatsDaily(day2, day6))
            .toEqual([{ date: day2, value: 0 }, { date: day3, value: 25 }, { date: day4, value: 50 }]);

        expect(getStatsDaily(day3, day6))
            .toEqual([{ date: day3, value: 25 }, { date: day4, value: 50 }]);

        expect(getStatsDaily(day4, day6))
            .toEqual([{ date: day4, value: 50 }]);
    });
});
