import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './styles.scss';

const GsapTimeline: React.FC = () => {
  const [reversed, setReversed] = useState(false);
  const timelineRootRef = useRef<HTMLDivElement>(null);
  const tl = useRef(gsap.timeline());
  const circleRef = useRef<HTMLDivElement>(null);

  //   console.log(tl.current);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current && tl.current.progress(0).kill();
      //   const timelineRoot = timelineRootRef.current;
      //   const timelineWidth = timelineRoot?.offsetWidth;
      //   const xPosition =
      //     timelineWidth && circleRef.current
      //       ? timelineWidth - circleRef.current.offsetWidth - 2
      //       : 100;

      tl.current = gsap
        .timeline()
        .to('.box', {
          rotation: 360,
        })
        .to('.circle', {
          x: 500,
        });
      return () => ctx.revert();
    }, timelineRootRef);
  }, []);

  useEffect(() => {
    tl.current.reversed(reversed);
  }, [reversed]);

  return (
    <div className="timeline-root" ref={timelineRootRef}>
      <div className="button-container">
        <button type="button" onClick={() => setReversed(!reversed)}>
          Toggle
        </button>
      </div>
      <div className="box">Box</div>
      <div className="circle" ref={circleRef}>
        Circle
      </div>
    </div>
  );
};

export default GsapTimeline;
