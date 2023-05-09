import {
  HoverBox,
  RotateElement,
  GsapContextEle,
  CustomComponent,
  GsapTimeline,
  DynamicGsap,
} from './components';
import {
  PassingTimeline,
  PassingCallback,
  PassingUsingContext,
  FadeInComponent,
  RegisterEffectSample,
} from './advanced_components';
import './App.css';

function App() {
  return (
    <>
      {/* <HoverBox />
      <RotateElement /> */}
      <GsapContextEle />
      {/* <CustomComponent /> */}
      {/* <GsapTimeline />
      <DynamicGsap /> */}
      {/* <PassingTimeline /> */}
      {/* <PassingCallback /> */}
      {/* <PassingUsingContext /> */}
      {/* <FadeInComponent /> */}
      <RegisterEffectSample />
    </>
  );
}

export default App;
