import { NodePackage } from './NodePackage';

export interface NodePackageExtended extends NodePackage {
  upgradable: boolean;
  cve: boolean;
}
