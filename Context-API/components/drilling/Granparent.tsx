'use client';

import { useState } from 'react';
import Parent from './Parent';

export default function Grandparent() {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <h2>Grandparent (Drilling)</h2>
      <Parent count={count} setCount={setCount} />
    </div>
  );
}

// If A,B,C are using the state variables from the context, then the changes made through
//  any component will trigger rest of the components to re-render with the update state
