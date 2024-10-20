const merge = require('deepmerge');

const APP_NAMESPACE = 'happy-grant';

function getData() {
    return JSON.parse(localStorage.getItem(APP_NAMESPACE)) || {};
}

function putData(data) {
    const updated = merge(getData(), data);
    localStorage.setItem(APP_NAMESPACE, JSON.stringify(updated));
}

export { getData, putData };
