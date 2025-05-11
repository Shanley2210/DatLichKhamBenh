export const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

export const bufferToBase64Url = (buffer) => {
    if (!buffer) return '';

    const byteArray = new Uint8Array(buffer.data);
    const blob = new Blob([byteArray], { type: 'image/webp' });
    return URL.createObjectURL(blob);
};
