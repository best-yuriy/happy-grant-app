const happinessLevelRepo = [];

function setHappinessLevel(date, value) {
    const happinessLevel = happinessLevelRepo.find(obj => obj.date.isSame(date));
    if (happinessLevel) {
        happinessLevel.value = value;
    } else {
        happinessLevelRepo.push({ date, value });
    }
}

function getHappinessLevel(date) {
    return happinessLevelRepo.find(obj => obj.date.isSame(date));
}

export { setHappinessLevel, getHappinessLevel };