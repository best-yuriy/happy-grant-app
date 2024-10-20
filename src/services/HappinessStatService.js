import { getData, putData } from "./LocalStorageService";
import dayjs from "dayjs";

function _getHappinessStats() {
    const stats = (getData()['happiness-stats'] || [])
    return stats;
}

function _putHappinessStats(stats) {
    putData({ 'happiness-stats': stats });
}

// Input dates in this module are always converted to calendar date strings.
function _toCalendarDayString(date) {
    if (typeof date === 'string' || date instanceof String) {
        return date;
    }
    else if (dayjs.isDayjs(date)) {
        return date.format('YYYY-MM-DD');
    }
    else {
        throw new Error(`Expected dayjs or String, but got ${typeof date}: ${date}.`);
    }
}

function getStat(date) {
    date = _toCalendarDayString(date);

    const stats = _getHappinessStats();
    const stat = stats.find(element => element['date'] == date) || {};
    return stat['value'];
}

function setStat(date, value) {
    date = _toCalendarDayString(date);

    const stats = _getHappinessStats();
    const index = stats.findIndex(element => element['date'] >= date);

    if (index === -1) {
        stats.push({ date, value });
        _putHappinessStats(stats);
    }
    else if (stats[index]['date'] == date) {
        stats[index]['value'] = value;
        _putHappinessStats(stats);
    }
    else {
        const newStats = 
            stats.slice(0, index)
                .concat([{ date, value }])
                .concat(stats.slice(index));
        _putHappinessStats(newStats);
    }
}

function getStatsDaily(startDate, endDate) {
    startDate = _toCalendarDayString(startDate);
    endDate = _toCalendarDayString(endDate);

    const stats = _getHappinessStats();

    const maybeStartIndex = stats.findIndex(element => element['date'] >= startDate);
    if (maybeStartIndex === -1) return [];

    const maybeEndIndex = stats.findIndex(element => element['date'] >= endDate);
    const endIndex = maybeEndIndex === -1 ? stats.length : maybeEndIndex;

    return stats.slice(maybeStartIndex, endIndex);
}

function getStatsWeekly(startDate, endDate) {
    startDate = _toCalendarDayString(startDate);
    endDate = _toCalendarDayString(endDate);
    
    throw new Error("unimplemented")
}

export { getStat, setStat, getStatsDaily, getStatsWeekly };
