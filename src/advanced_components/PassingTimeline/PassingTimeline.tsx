import React, { ReactNode, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './styles.scss';

type BoxProps = {
  children: ReactNode;
  timeline: gsap.core.Timeline | undefined;
  index: number;
};

type CircleProps = {
  children: ReactNode;
  timeline: gsap.core.Timeline | undefined;
  index: number;
  rotation: number | string;
};

const Box: React.FC<BoxProps> = (props) => {
  const el = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    props.timeline &&
      props.timeline.to(el.current, { x: -100 }, props.index * 0.1);

    return () => {
      props.timeline?.progress(0).kill();
    };
  }, [props.timeline, props.index]);

  return (
    <div className="box" ref={el}>
      {props.children}
    </div>
  );
};

const Circle: React.FC<CircleProps> = (props) => {
  const ele = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    props.timeline &&
      props.timeline.to(
        ele.current,
        { rotate: props.rotation, x: 100 },
        props.index * 0.1
      );

    return () => {
      props.timeline?.progress(0).kill();
    };
  }, [props.timeline, props.rotation, props.index]);

  return (
    <div className="circle" ref={ele}>
      {props.children}
    </div>
  );
};

const PassingTimeline: React.FC = () => {
  const [tl, setTl] = useState<gsap.core.Timeline>();
  const [reversed, setReversed] = useState(false);

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
    <div className="passingtimeline-root">
      <button onClick={() => setReversed(!reversed)}>Toggle</button>
      <Box timeline={tl} index={0}>
        Box
      </Box>
      <Circle timeline={tl} rotation={360} index={1}>
        Circle
      </Circle>
    </div>
  );
};

export default PassingTimeline;
