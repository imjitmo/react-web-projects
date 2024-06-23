import List from './List';

const Menu = () => {
  return (
    <section
      id="menu"
      className="w-full min-h-screen bg-slate-50 flex flex-col items-center justify-center relative"
    >
      <List />
      <div className="bg-[url('https://lgprkxqjhxzbuavhsdgr.supabase.co/storage/v1/object/public/assets/products_bg.jpg')] bg-cover bg-bottom opacity-5 absolute inset-0 z-[0]"></div>
    </section>
  );
};
export default Menu;
