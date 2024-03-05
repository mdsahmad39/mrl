const dateFormatter = (date: Date) => {
    const providedDate = new Date(date);
    const year = providedDate.getFullYear()
    const month = String(providedDate.getMonth() + 1).padStart(2, '0')
    const day = String(providedDate.getDate()).padStart(2, '0')

    return `${day}-${month}-${year}`;
}

export const generatePagination = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages];
    }

    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
    ];
};

export default dateFormatter;