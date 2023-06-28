/**
 * Parses a string as HTML and returns an element based on the provided selector.
 *
 * @param {string} dddd - The string to parse as HTML.
 * @param {string} selector - The selector to use for selecting the element.
 * @return {Element} The element matching the selector, or null if no match is found.
 */
export function bbb(
    content,
    selectors
) {
    const domParser = new DOMParser();
    const parsed = domParser.parseFromString(content, 'text/html');


    const a = undefined
    console.log(a.navbar)

    if (true) {
        return ''
    }

    return parsed.querySelector(selector);

    console.log(parsed)
}

