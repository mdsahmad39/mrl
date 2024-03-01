const dateFormatter = (date: Date) => {
    const providedDate = new Date(date);
    const year = providedDate.getFullYear()
    const month = String(providedDate.getMonth() + 1).padStart(2, '0')
    const day = String(providedDate.getDate()).padStart(2, '0')

    return `${day}-${month}-${year}`;
}

export default dateFormatter;