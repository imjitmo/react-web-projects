import { useViewSingleModule } from '@/hooks/use/useModules';
import { useParams } from 'react-router-dom';

const View = () => {
  const { id } = useParams<{ id: string }>();
  const { getModule } = useViewSingleModule(id!);
  const fileUrl = getModule ? getModule[0]?.fileUrl : '';

  return (
    <div className="w-full overflow-y-scroll flex flex-col flex-wrap gap-4 p-4">
      <h1 className="text-2xl font-bold">{getModule ? getModule[0]?.moduleName : ''}</h1>
      <iframe
        src={`https://view.officeapps.live.com/op/embed.aspx?src=${fileUrl}`}
        className="w-full h-screen"
      >
        {getModule && getModule[0]?.moduleName}
      </iframe>
    </div>
  );
};
export default View;
