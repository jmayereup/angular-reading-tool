export function splitByLineBreaks(str: string): string[] {
    if (!str) {
        return [];
    }
    let regex = /\r?\n|\r/g;
    let result = str.split(regex);
    return result;
}


export function addLineBreaks(text: string): string {
    return text.replace(/([.?!])\s*(?=[A-Z])/g, '$1\n');
}

export function removeLineBreaks(str: string): string {
    return str.replace(/(\r\n|\n|\r)/gm, '');
}


