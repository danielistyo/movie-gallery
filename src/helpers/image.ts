export default (type: 'w200' | 'w300' | 'w500' | 'original', imagePath: string): string => {
  return `https://image.tmdb.org/t/p/${type}/${imagePath}`;
};
