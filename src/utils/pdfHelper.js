export const getBase64ImageFromUrl = async (imageUrl) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = imageUrl;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width || 32;
            canvas.height = img.height || 32;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/png');
            resolve(dataUrl);
        };
        img.onerror = () => {
            reject(new Error("Failed to load image"));
        };
    });
};

export const addLogoToDoc = async (doc, x = 170, y = 5, w = 25, h = 25) => {
    try {
        const logoData = await getBase64ImageFromUrl('/favicon.ico');
        doc.addImage(logoData, 'PNG', x, y, w, h);
    } catch (e) {
        console.error("Could not load logo", e);
    }
};
