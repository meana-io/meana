export default interface Partition {
  path: string;
  capacity: string;
  usedSpace: string;
  fileSystem: string;
  diskIdentifier?: string;
}
