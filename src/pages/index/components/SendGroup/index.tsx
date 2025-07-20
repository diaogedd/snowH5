import React from 'react';
import { Tabs } from 'antd-mobile';
import CarAndRoom from './CarAndRoom';
import styles from './index.module.less';
const SendGroup: React.FC = () => {
  return (
    <Tabs defaultActiveKey="car" className={styles.tabs} >
      <Tabs.Tab title="车房" key="car">
        <CarAndRoom />
      </Tabs.Tab>
      <Tabs.Tab title="车" key="carOnly">
        {/* 车表单，可后续实现 */}
      </Tabs.Tab>
      <Tabs.Tab title="房" key="roomOnly">
        {/* 房表单，可后续实现 */}
      </Tabs.Tab>
    </Tabs>
  );
};

export default SendGroup;
