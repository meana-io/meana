export default interface Partition {
  time: string;
  diskIdentifier?: string;
  path?: string;
  usedSpace?: string;
  capacity?: string;
  fileSystem?: string;
  name?: string;
}
