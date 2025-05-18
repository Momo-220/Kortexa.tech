'use client';

import { AppProgressBar } from 'next-nprogress-bar';

const PageProgressBar = () => {
  return (
    <AppProgressBar
      height="1px"
      color="#6366F1"
      options={{ 
        showSpinner: false,
        minimum: 0.15,
        easing: 'ease',
        speed: 300
      }}
      shallowRouting
    />
  );
};

export default PageProgressBar; 