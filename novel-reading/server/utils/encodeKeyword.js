function encodeKeyword(text){
    // Vietnamese character map
    const encodedKeyword = encodeURIComponent(text).replace(/%20/g, '+');
    return encodedKeyword;
}


module.exports = {
    encodeKeyword
};
