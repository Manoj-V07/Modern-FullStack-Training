'use client';

interface GrandchildProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function Grandchild({ count, setCount }: GrandchildProps) {
  return (
    <div>
      <h4>Grandchild (Drilling)</h4>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}