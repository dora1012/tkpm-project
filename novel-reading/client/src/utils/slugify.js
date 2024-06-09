export function slugify(text) {
    // Check if the text is undefined or null
    if (typeof text !== 'string') return ''; // Return an empty string if the text is not valid

    // Vietnamese character map
    const from = "àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ";
    const to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd";

    // Trim the input text
    text = text.trim();

    // Replace Vietnamese characters with ASCII characters
    let updatedText = text.toLowerCase().split('').map((char, index) => {
        let i = from.indexOf(char);
        return i > -1 ? to[i] : char;
    }).join('');

    // Replace spaces around hyphens with a single hyphen
    updatedText = updatedText.replace(/\s*-\s*/g, '-');

    // Replace remaining spaces with hyphens
    updatedText = updatedText.replace(/\s+/g, '-');

    // Remove all non-alphanumeric characters except hyphens
    updatedText = updatedText.replace(/[^a-z0-9-]/g, '');

    // Remove any leading or trailing hyphens
    updatedText = updatedText.replace(/^-+|-+$/g, '');

    return updatedText;
}

