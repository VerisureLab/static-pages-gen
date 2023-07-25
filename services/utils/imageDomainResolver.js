export const imageDomainResolver = (elementImage, variant = 'web') => {
  return process.env.CDN_BASE_URL + '/' + elementImage.variants[variant].fileName;
};