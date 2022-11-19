
export function setSessionStorage(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}

export function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getSessionStorage(key) {
    return JSON.parse(sessionStorage.getItem(key));
}

export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function removeSessionStorage(key) {
    return sessionStorage.removeItem(key);
}

export function removeLocalStorage(key) {
    return localStorage.removeItem(key);
}