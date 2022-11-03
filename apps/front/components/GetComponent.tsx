import { COMPONENTS } from './Dashboard/Components';

interface GetComponentProps {
  componentName: string;
  query: string;
}

const GetComponent: React.FC<GetComponentProps> = ({
  componentName,
  query,
}) => {
  const ComponentToRender = COMPONENTS[componentName]?.component;

  if (!ComponentToRender) {
    return <div>Missing component!</div>;
  }

  return <ComponentToRender query={query} />;
};

export default GetComponent;
