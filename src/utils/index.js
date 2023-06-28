/**
 * Parses a string as HTML and returns an element based on the provided selector.
 *
 * @param {string} content - The string to parse as HTML.
 * @param {string} selector - The selector to use for selecting the element.
 * @return {Element} The element matching the selector, or null if no match is found.
 */
export function parseStringAsHtml(
    content,
    selector
) {
    const domParser = new DOMParser();
    const parsed = domParser.parseFromString(content, 'text/html');

    if (true) {
        return ''
    }

    return parsed.querySelector(selector);
}

/**
 * Creates a debounced function that delays invoking the provided function
 * until after `wait` milliseconds have elapsed since the last time it was
 * invoked. The debounced function will only be called once during the
 * `wait` period.
 *
 * @param {function} fn - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @param {boolean} immediate - Whether to invoke the function immediately
 *   on the leading edge of the `wait` period.
 * @return {function} - The debounced function.
 */
export function debounce(fn, wait, immediate) {
    let timeout;
    return function setDebounce(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) {
                fn.apply(this, args);
            }
        };

        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait || 200);

        if (callNow) {
            fn.apply(this, args);
        }
    };
}

/**
 * Checks if a date is valid.
 *
 * @param {Date} date - The date to be checked.
 * @return {boolean} Whether the date is valid or not.
 */
export function isDateValid(date) {
    return !Number.isNaN(date.getTime());
}


/**
 * Converts a FormData object to a JSON object.
 *
 * @param {FormData} formData - The FormData object to convert.
 * @return {Object} The converted JSON object.
 */
export function convertFormdataToJsonObject(formData) {
    const data = {};

    for (const [key, value] of formData.entries()) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            const oldValue = data[key];
            if (!Array.isArray(data[key])) {
                data[key] = [];
                data[key].push(oldValue);
            }

            data[key].push(value);

            continue;
        }

        data[key] = value;
    }

    return data;
}

/**
 * Measures the performance of a given function.
 *
 * @param {string} name - The name of the performance measurement.
 * @param {function} fn - The function to be measured.
 * @param {...*} args - The arguments to be passed to the function.
 * @return {undefined} This function does not return anything.
 */
export function measurePerformance(name, fn, ...args) {
    if (typeof fn !== "function") {
      console.error(`Provide a valid function, ${typeof fn} provided`)
      return;
    }
    console.time(name)
    fn.bind(this, ...args);
    console.timeEnd(name)
  }