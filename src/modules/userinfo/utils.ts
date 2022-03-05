const canvasToBlob = (canvas: any): any => {
  return new Promise(function (resolve) {
    canvas.toBlob(
      (blob: any) => {
        // const previewUrl = window.URL.createObjectURL(blob);
        resolve(blob)
      },
      'image/jpeg',
      1,
    );
  });
};

export const generateUrlBlob = async (canvas: any, crop: any) => {
  if (!crop || !canvas) {
    return null;
  }

  const blob: Blob = await canvasToBlob(canvas);

  const file = new File([blob], "avatar.jpeg", { type: "image/jpeg" })

  return file
}
