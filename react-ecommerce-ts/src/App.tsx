import { Button } from '@/components/ui/button';

function App() {
  const handleClick = () => {
    alert('haha');
  };
  return (
    <div>
      <Button className="text-white rounded-full" size="lg" onClick={handleClick}>
        Click me
      </Button>
    </div>
  );
}

export default App;
