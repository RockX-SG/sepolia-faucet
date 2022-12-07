import React, { useMemo } from 'react';
import { useScroll, useWindowSize } from 'react-use';
import Header from '../../modules/Header';
import Footer from '../../modules/Footer';
import Faucet from './modules/Faucet';
import Questions from './modules/Questions';
import Tip from './modules/Tip';
function Index() {
  const scrollRef = React.useRef(null);
  const { y } = useScroll(scrollRef);
  const { height, width } = useWindowSize();
  const showTip = useMemo(() => y + height < 1540, [y, height]);
  const showFixedTip = useMemo(() => width > 1400, [width]);
  return (
    <div ref={scrollRef} className="flex flex-col h-full overflow-auto">
      <Header />
      <div className="shrink-0">
        <Faucet showFixedTip={showFixedTip} />
        <Questions />
      </div>
      <Footer />
      <Tip show={showTip} showFixedTip={showFixedTip} />
    </div>
  );
}

export default Index;
