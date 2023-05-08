import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';

type BoxProps = {
  children: ReactNode;
  endX: number;
};

const randomX = gsap.utils.random(100, 500, 1, true);

const Box: React.FC<BoxProps> = (props) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const ctx = useRef(gsap.context());
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ctx.current = gsap.context(() => {});
    return () => ctx.current.revert();
  }, [ctx]);

  useEffect(() => {
    ctx.current.add(() => {
      gsap.to(boxRef.current, {
        x: props.endX,
      });
    });
  }, [props.endX]);

  return (
    <div className="box" ref={boxRef}>
      {props.children}
    </div>
  );
};

const DynamicGsap: React.FC = () => {
  const [endX, setEndX] = useState(0);

  return (
    <div>
      <button type="button" onClick={() => setEndX(randomX())}>
        Move the box randomly
      </button>
      <Box endX={endX}>{endX}</Box>
    </div>
  );
};

export default DynamicGsap;
