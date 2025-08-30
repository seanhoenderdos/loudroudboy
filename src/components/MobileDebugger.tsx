import React, { useEffect, useState } from 'react';

const MobileDebugger: React.FC = () => {
  const [debugInfo, setDebugInfo] = useState({
    isMobile: false,
    userAgent: '',
    screenWidth: 0,
    screenHeight: 0,
    viewportWidth: 0,
    viewportHeight: 0,
    touchSupport: false,
  });

  useEffect(() => {
    const updateDebugInfo = () => {
      setDebugInfo({
        isMobile:
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent,
          ),
        userAgent: navigator.userAgent,
        screenWidth: screen.width,
        screenHeight: screen.height,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      });
    };

    updateDebugInfo();
    window.addEventListener('resize', updateDebugInfo);

    return () => window.removeEventListener('resize', updateDebugInfo);
  }, []);

  // Only show in development
  if (import.meta.env.PROD) return null;

  return (
    <div
      className="fixed top-4 left-4 bg-black/80 text-white p-2 text-xs rounded z-50 max-w-xs"
      style={{ display: 'none' }} // Hidden by default, can be shown via console
      id="mobile-debugger"
    >
      <div>
        <strong>Mobile Debug Info:</strong>
      </div>
      <div>Is Mobile: {debugInfo.isMobile ? 'Yes' : 'No'}</div>
      <div>Touch Support: {debugInfo.touchSupport ? 'Yes' : 'No'}</div>
      <div>
        Screen: {debugInfo.screenWidth}x{debugInfo.screenHeight}
      </div>
      <div>
        Viewport: {debugInfo.viewportWidth}x{debugInfo.viewportHeight}
      </div>
      <div>UA: {debugInfo.userAgent.substring(0, 50)}...</div>
    </div>
  );
};

export default MobileDebugger;
