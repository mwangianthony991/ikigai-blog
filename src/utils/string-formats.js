function convertStringToTitleCase(str) {
    if (!str) {
        return ""
    }
  
    return str.toLowerCase().split(' ').map(function (word) {
       return word.charAt(0).toUpperCase().concat(word.substr(1));
    }).join(' ');
}

export {convertStringToTitleCase};
