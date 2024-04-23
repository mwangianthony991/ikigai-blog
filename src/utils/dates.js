function orderByDatesDesc(array) {
    const orderedArray = array.sort((a, b) => {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
    
        return dateA - dateB;
    }).reverse()

    return orderedArray
}

export {orderByDatesDesc};
