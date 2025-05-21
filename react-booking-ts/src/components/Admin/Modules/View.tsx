import { Button } from '@/components/ui/button';
import { useViewOneModule } from '@/hooks/use/useModules';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const View = () => {
  const { id } = useParams<{ id: string }>();
  // const { getModule } = useViewSingleModule(id!);
  const { getModule } = useViewOneModule();
  const [onModuleName, setOnModuleName] = useState('');
  const [onFileUrl, setOnFileUrl] = useState([
    {
      uri: '',
    },
  ]);
  // useEffect(() => {
  //   if (getModule) {
  //     setOnFileUrl([
  //       {
  //         uri: getModule[0]?.fileUrl,
  //       },
  //     ]);
  //   }
  // }, [getModule]);

  useEffect(() => {
    getModule(id as string, {
      onSuccess: (data) => {
        setOnFileUrl([
          {
            uri: data[0]?.fileUrl,
          },
        ]);
        setOnModuleName(data[0]?.moduleName);
      },
      onError: (error) => {
        console.error('Error fetching module:', error);
      },
    });
  }, [getModule, id]);
  console.log(onFileUrl[0].uri);
  return (
    <div className="flex flex-col flex-wrap gap-4 p-4 overflow-auto">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold">{onModuleName}</h1>
        <a href={onFileUrl[0].uri} target="_blank">
          <Button className="text-slate-950 bg-yellow-400 hover:bg-blue-950 hover:text-slate-50">
            Download File
          </Button>
        </a>
      </div>
      <DocViewer
        documents={onFileUrl}
        pluginRenderers={DocViewerRenderers}
        theme={{
          primary: '#fcc800',
          secondary: '#ffffff',
          tertiary: '#1c398e',
          textPrimary: '#00000',
          textSecondary: '#fcc800',
          textTertiary: '#ffffff',
          disableThemeScrollbar: false,
        }}
        className=" overflow-y-scroll max-h-screen"
      />
    </div>
  );
};
export default View;
