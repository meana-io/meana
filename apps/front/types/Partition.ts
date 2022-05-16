type FileSystem =
  | 'FAT'
  | 'FAT12'
  | 'FAT16'
  | 'FAT32'
  | 'exFAT'
  | 'NTFS'
  | 'HFS'
  | 'HFS+'
  | 'HPFS'
  | 'APFS'
  | 'UFS'
  | 'ext2'
  | 'ext3'
  | 'ext4'
  | 'XFS'
  | 'btrfs'
  | 'Files-11'
  | 'Veritas File System'
  | 'VMFS'
  | 'ZFS'
  | 'ReiserFS'
  | 'ScoutFS';

interface Partition {
  id: string;
  diskId: string;
  path: string;
  usedSpace: number;
  capacity: number;
  fileSystem: FileSystem;
  created_at: string;
  updated_at: string;
}

export default Partition;
