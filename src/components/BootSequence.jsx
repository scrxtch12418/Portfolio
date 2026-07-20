import React from 'react';

const BootSequence = () => {
  return (
    <div id="bootSequence" role="status" aria-label="Loading portfolio">
      <canvas id="bootRain" aria-hidden="true"></canvas>
      <div className="boot-grid" aria-hidden="true"></div>
      <div className="boot-interface">
        <div className="boot-kicker">SARVASVA.EXE // INITIALIZING</div>
        <div className="boot-title" data-text="SIGNAL INCOMING">SIGNAL INCOMING</div>
        <div className="boot-meter"><span id="bootMeter"></span></div>
        <div className="boot-readout">
          <span id="bootStatus">DECODING VISUAL SYSTEM</span>
          <span id="bootPercent">000%</span>
        </div>
      </div>
      <div className="boot-corner boot-corner-tl">[ BOOT_01 ]</div>
      <div className="boot-corner boot-corner-br">MEMORY // 0xFF04</div>
    </div>
  );
};

export default BootSequence;
