import { useState } from 'react';
import N_K_Tabs from './N_K_tabs';
import FinancialResult from './FinancialResult';
import './InfoCenter.css';

const InfoCenterTabs = () => {
  const [activeTab, setActiveTab] = useState('hAndK');

  return (
    <div className="info-center">
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'hAndK' ? 'btn btn-primary' : 'btn btn-secondary'} `}
          onClick={() => setActiveTab('hAndK')}
        >
          Расчет параметров N и K 
        </button>
        <button
          className={`tab ${activeTab === 'financialResult' ? 'btn btn-primary' : 'btn btn-secondary'} `}
          onClick={() => setActiveTab('financialResult')}
        >
          Предварительный расчет финансового результата
        </button>
      </div>
      <div className="tab-content">
        {activeTab === 'hAndK' && <N_K_Tabs />}
        {activeTab === 'financialResult' && <FinancialResult />}
      </div>
    </div>
  );
};

export default InfoCenterTabs;
