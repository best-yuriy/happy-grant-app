import { getData, putData } from "./LocalStorageService";
import dayjs from "dayjs";

function _getHappinessStats() {
    return getData()['happiness-stats'] || [];
}

function getStat(date) {
    const stats = _getHappinessStats();
    const stat = stats.find((element) => date.isSame(element.date)) || {};
    return stat['value'];
}

function setStat(date, value) {
    const stats = _getHappinessStats();
    const index = stats.findIndex((element) => !date.isBefore(dayjs(element['date'])));
    if (index === -1) {
        stats.push({ date, value });
        putData({ 'happiness-stats': stats });
    }
    else if (dayjs(stats[index]['date']).isSame(date)) {
        stats[index]['value'] = value;
        putData({ 'happiness-stats': stats });
    }
    else {
        const newStats = 
            stats.slice(0, index)
                .concat([{ date, value }])
                .concat(stats.slice(index));
        putData({ 'happiness-stats': newStats });
    }
}

function getStatsDaily(startDate, endDate) { throw new Error("unimplemented") }

function getStatsWeekly(startDate, endDate) { throw new Error("unimplemented") }

export { getStat, setStat, getStatsDaily, getStatsWeekly };