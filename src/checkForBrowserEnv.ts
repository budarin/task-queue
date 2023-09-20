export function checkForBrowserEnv(): never | void {
    if (!('window' in globalThis)) {
        throw new Error('This package is designed to work in the browser only!');
    }
}
