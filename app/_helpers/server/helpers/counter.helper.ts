export const codeBuilder = (counter: number, prefix: string, len: number) => {
    const counterString = `${(counter).toString().padStart(len, '0')}`;
    return `${prefix}${counterString}`;
}