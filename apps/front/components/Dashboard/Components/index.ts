import { RamPreview, RamForm, RamComponent } from '../Components/Ram';
import { CpuPreview, CpuForm, CpuComponent } from '../Components/Cpu';

export const COMPONENT_HEIGHT = 250 as const;

export type Component = {
  title: string;
  key: string;
  previewComponent: React.ElementType;
  formComponent: React.ElementType;
  component: React.ElementType;
};

export const COMPONENTS: Component[] = [
  {
    title: 'RAM',
    key: 'ram_component',
    previewComponent: RamPreview,
    formComponent: RamForm,
    component: RamComponent,
  },
  {
    title: 'CPU',
    key: 'cpu_component',
    previewComponent: CpuPreview,
    formComponent: CpuForm,
    component: CpuComponent,
  },
];
