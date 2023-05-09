import React from 'react';
import { gsap } from 'gsap';
import './styles.scss';

const { useEffect, useRef, useImperativeHandle, forwardRef } = React;

type CircleRef = {
  moveTo: (x: number, y: number) => void;
};

type CircleProps = {
  size: 'sm' | 'md' | 'lg';
  delay: number;
};

const Circle = forwardRef<unknown, CircleProps>((props, ref) => {
  const el = useRef<HTMLDivElement>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        moveTo(x: number, y: number) {
          gsap.to(el.current, { x, y, delay: props.delay });
        },
      };
    },
    [props.delay]
  );

  // component implementation

  return <div ref={el} className={`circle ${props.size}`}></div>;
});

const ImperativeCommunication: React.FC = () => {
  const circleRefs = useRef<CircleRef[]>([]);

  circleRefs.current = [];

  useEffect(() => {
    const { innerWidth, innerHeight } = window;
    circleRefs.current.forEach((ref) =>
      ref.moveTo(innerWidth / 2, innerHeight / 2)
    );

    const onMove = (e: PointerEvent) => {
      //   console.log(ev);
      const { clientX, clientY } = e;
      circleRefs.current.forEach((ref) => ref.moveTo(clientX, clientY));
    };

    window.addEventListener('pointermove', onMove);

    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const addCircleRef = (ref: CircleRef) => {
    if (ref) {
      circleRefs.current.push(ref);
    }
  };

  return (
    <div className="imperative-root">
      <Circle size="sm" ref={addCircleRef} delay={0} />
      <Circle size="md" ref={addCircleRef} delay={0.1} />
      <Circle size="lg" ref={addCircleRef} delay={0.2} />
    </div>
  );
};

export default ImperativeCommunication;
