export const resolveDates = (query: URLSearchParams) => {
    const startDate = query.get('startDate');
    const endDate = query.get('endDate');
    var date = new Date();
    let _startDate;
    let _endDate;

    if (startDate === '') {
        _startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    } else {
        _startDate = new Date(startDate + '');
    }

    if (endDate === '') {
        _endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        _endDate.setDate(_endDate.getDate() + 1)
    } else {
        _endDate = new Date(endDate + '');
    }

    return {
        startDate: _startDate,
        endDate: _endDate,
    }
}