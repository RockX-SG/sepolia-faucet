import React from 'react';
import Header from '../../modules/Header';
import Footer from '../../modules/Footer';
import Faucet from './modules/Faucet';
import Questions from './modules/Questions';
function Index() {
  return (
    <div className="flex flex-col h-full overflow-auto">
      <Header />
      <div className="shrink-0">
        <Faucet />
        <Questions />
      </div>
      <Footer />
    </div>
  );
}

export default Index;
