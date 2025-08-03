import React from 'react';
import { Tabs } from 'antd-mobile';
import CarAndRoom from './CarAndRoom';
import CarForm from './CarForm';
import RoomForm from './RoomForm';
import styles from './index.module.less';

const SendGroup: React.FC = () => {
  return (
    <Tabs defaultActiveKey="car" className={styles.tabs}>
      <Tabs.Tab title="车房" key="car">
        <CarAndRoom />
      </Tabs.Tab>
      <Tabs.Tab title="车" key="carOnly">
        <CarForm />
      </Tabs.Tab>
      <Tabs.Tab title="房" key="roomOnly">
        <RoomForm />
      </Tabs.Tab>
    </Tabs>
  );
};

export default SendGroup;
