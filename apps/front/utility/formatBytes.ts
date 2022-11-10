export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return 'N/A';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};



export const toFormatBytesInNumber = (value: string) => {
  const parsed = parseInt(value, 10);
  return Number.isInteger(parsed) ? formatBytes(parsed) : value;
};
