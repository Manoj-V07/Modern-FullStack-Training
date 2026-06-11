import Grandchild from './Grandchild';

interface ParentProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function Parent({ count, setCount }: ParentProps) {
  return (
    <div>
      <h3>Parent (Drilling)</h3>
      <Grandchild count={count} setCount={setCount} />
    </div>
  );
}
