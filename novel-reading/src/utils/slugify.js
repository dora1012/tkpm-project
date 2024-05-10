export function slugify(text){
      // Vietnamese character map
      const from = "àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ";
      const to   = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd";

      // Replace Vietnamese characters with ASCII characters
      let updatedText = text.toLowerCase().split('').map((char, index) => {
      let i = from.indexOf(char);
      return i > -1 ? to[i] : char;
      }).join('');

      // Replace spaces and special characters with hyphens
      updatedText = updatedText.replace(/\s+/g, '-'); // Replace spaces with hyphens
      updatedText = updatedText.replace(/[^a-z0-9-]/g, ''); // Remove all non-alphanumeric characters except hyphens

      return updatedText;
};