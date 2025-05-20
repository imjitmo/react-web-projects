import { ModuleCreationProps } from '../models/Modules';
import supabase, { supabaseUrl } from './supabase';

export const createModule = async (moduleData: ModuleCreationProps) => {
  const imageInstance = moduleData.moduleImg instanceof File ? moduleData.moduleImg.name : null;
  const imageInstanceName = imageInstance?.replace(/[^a-zA-Z0-9 -]*/g, '').toLocaleLowerCase();
  const imageName = `${new Date().getTime()}_${imageInstanceName?.substring(0, 4).replace(/\s/g, '')}.pdf`;
  const imagePath = `${supabaseUrl}/storage/v1/object/public/modules/${imageName}`;
  const fileType = moduleData.moduleImg instanceof File ? moduleData.moduleImg.type : null;

  const { data: module, error: moduleError } = await supabase.from('tblModules').insert({
    moduleName: moduleData.moduleName,
    fileUrl: imagePath,
    fileType: fileType,
  });
  if (moduleError) {
    console.error(moduleError);
    throw new Error('Module could not be created');
  }

  const { error } = await supabase.storage.from('modules').upload(imageName, moduleData.moduleImg);
  if (error) {
    console.error(error);
    throw new Error('Room image could not be uploaded');
  }

  return module;
};

export const viewAllModules = async () => {
  const { data: modules, error: modulesError } = await supabase
    .from('tblModules')
    .select('*')
    .order('created_at', { ascending: false });
  if (modulesError) {
    console.error(modulesError);
    throw new Error('Modules could not be fetched');
  }
  return modules;
};

export const viewModule = async (id: string) => {
  const { data: module, error: moduleError } = await supabase.from('tblModules').select('*').eq('id', id);
  if (moduleError) {
    console.error(moduleError);
    throw new Error('Module could not be fetched');
  }
  return module;
};
