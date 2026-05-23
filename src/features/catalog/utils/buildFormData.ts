export const buildFormData = (body: object, files?: File[]) => {
  const formData = new FormData();

  if (files?.length) {
    files.forEach((file) => {
      formData.append('images', file);
    });
  }

  Object.entries(body).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(`${key}[]`, String(item)));
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  return formData;
};
