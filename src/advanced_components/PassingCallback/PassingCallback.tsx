import React, {
  ReactNode,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { gsap } from 'gsap';

type BoxProps = {
  children: ReactNode;
  addAnimation: (animation: gsap.core.Tween, index: number) => void;
  index: number;
};

type CircleProps = {
  children: ReactNode;
  addAnimation: (animation: gsap.core.Tween, index: number) => void;
  index: number;
  rotation?: number | string;
};

const Box: React.FC<BoxProps> = (props) => {
  const el = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const animation = gsap.to(el.current, { x: -100 });
    props.addAnimation(animation, props.index);

    return () => {
      animation.progress(0).kill();
    };
  }, [props]);

  return (
    <div className="box" ref={el}>
      {props.children}
    </div>
  );
};

const Circle: React.FC<CircleProps> = (props) => {
  const ele = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const animation = gsap.to(ele.current, { rotate: props.rotation, x: 200 });
    props.addAnimation(animation, props.index);

    return () => {
      animation.progress(0).kill();
    };
  }, [props]);

  return (
    <div className="circle" ref={ele}>
      {props.children}
    </div>
  );
};

const PassingCallback: React.FC = () => {
  const [tl, setTl] = useState<gsap.core.Timeline>();
  const [reversed, setReversed] = useState(false);

  const addAnimation = useCallback(
    (animation: gsap.core.Tween, index: number) => {
      tl && tl.add(animation, index * 0.1);
    },
    [tl]
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      setTl(tl);
    });
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    tl && tl.reversed(reversed);
  }, [reversed, tl]);

  return (
    <div>
      <button onClick={() => setReversed(!reversed)}>Toggle</button>
      <Box addAnimation={addAnimation} index={0}>
        Box
      </Box>
      <Circle addAnimation={addAnimation} rotation={360} index={1}>
        Circle
      </Circle>
    </div>
  );
};

export default PassingCallback;
