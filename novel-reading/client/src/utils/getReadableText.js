export const getReadableText = (slug) => {
    // Define a function to capitalize the first letter of each word
    const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

    // Split the slug by hyphens
    const words = slug.split('-');

    // Capitalize each word and join them with spaces
    const readableText = words.map(word => capitalize(word)).join(' ');

    // Replace common Vietnamese characters (if needed)
    const vietnameseCharacters = {
        'a': 'áàảãạ',
        'e': 'éèẻẽẹ',
        'i': 'íìỉĩị',
        'o': 'óòỏõọ',
        'u': 'úùủũụ',
        'y': 'ýỳỷỹỵ',
        'd': 'đ'
    };

    let result = readableText;

    Object.keys(vietnameseCharacters).forEach(key => {
        const chars = vietnameseCharacters[key].split('');
        chars.forEach(char => {
            const regex = new RegExp(char, 'gi');
            result = result.replace(regex, key);
        });
    });

    return result;
};