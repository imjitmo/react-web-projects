import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createModule, viewAllModules, viewModule } from '../api/ModulesAPI';

export const useCreateModule = () => {
  const queryClient = useQueryClient();

  const { mutate: createNewModule, isPending: isCreating } = useMutation({
    mutationFn: createModule,
    onSuccess: () => {
      toast.success('Module Added', { id: 'module' });
      queryClient.invalidateQueries({ queryKey: ['module'] });
    },
    onError: (error) => {
      toast.error(error.message, { id: 'module' });
      console.error(error.message);
    },
  });

  return { createNewModule, isCreating };
};

export const useViewModules = () => {
  const { data: moduleData, isPending } = useQuery({
    queryKey: ['module'],
    queryFn: () => viewAllModules(),
  });

  return { moduleData, isPending };
};

export const useViewSingleModule = (id: string) => {
  const { data: getModule, isPending } = useQuery({
    queryKey: ['module'],
    queryFn: () => viewModule(id),
  });

  return { getModule, isPending };
};

export const useViewOneModule = () => {
  const { mutate: getModule, isPending } = useMutation({
    mutationFn: viewModule,
  });

  return { getModule, isPending };
};
