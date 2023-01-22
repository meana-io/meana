export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return 'N/A';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const formatBytesWithoutName = (bytes: number, decimals = 2): number => {
  if (bytes === 0) return 0;
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
};

export const formatBytesGetName = (bytes: number): string => {
  if (bytes === 0) return 'N/A';
  return ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][
    Math.floor(Math.log(bytes) / Math.log(1024))
  ];
};


export const toFormatBytesInNumber = (value: string) => {
  if (!value.match(/^[0-9]+$/m)) {
    return value;
  }

  const parsed = parseInt(value, 10);
  return Number.isInteger(parsed) ? formatBytes(parsed) : value;
};
