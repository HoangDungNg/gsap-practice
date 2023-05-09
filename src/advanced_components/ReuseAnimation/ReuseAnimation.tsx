import {
  forwardRef,
  ReactNode,
  useRef,
  useLayoutEffect,
  useEffect,
} from 'react';
import { gsap } from 'gsap';

type ReuseAnimationProps = {
  children: ReactNode;
  stagger: number;
  x: number;
};

const ReuseAnimation = forwardRef<unknown, ReuseAnimationProps>(
  (props, ref) => {
    const ele = useRef<HTMLSpanElement>(null);
    const animation = useRef<gsap.core.Tween | undefined>();

    useLayoutEffect(() => {
      const ctx = gsap.context(() => {
        animation.current = gsap.from(ele.current?.children ?? '', {
          opacity: 0,
          stagger: props.stagger,
          x: props.x,
        });
      });

      return () => {
        ctx.revert();
      };
    }, []);

    // forward the animation instance
    useEffect(() => {
      // call the function with the 'animation.current' value as the argument
      if (typeof ref === 'function') {
        ref(animation.current);
        // else, passing animation.current as a reference to ref.current so the parent component can access ref.current.reserved()
      } else if (ref) {
        ref.current = animation.current;
      }
    }, [ref]);

    return <span ref={ele}>{props.children}</span>;
  }
);

const FadeInComponent: React.FC = () => {
  const animation = useRef<gsap.core.Animation>();

  const toggle = () => {
    animation.current?.reversed(!animation.current.reversed());
  };

  return (
    <>
      <div>
        <button onClick={toggle}>Toggle</button>
      </div>
      <ReuseAnimation stagger={0.1} x={100} ref={animation}>
        <div className="box">Box 1</div>
        <div className="box">Box 2</div>
      </ReuseAnimation>
    </>
  );
};

export default FadeInComponent;
