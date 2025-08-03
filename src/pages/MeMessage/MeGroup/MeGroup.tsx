import React, { useState } from 'react';
import { Tabs, NavBar } from 'antd-mobile';

import { MyGroupItem } from './MyGroupItem';
import styles from './MeGroup.module.less';

interface GroupData {
  id: number;
  type: '拼车' | '拼房';
  status: '已完成' | '待发布' | '拼团中' | '已成团';
  origin?: string;
  destination?: string;
  departureTime?: string;
  hotelName?: string;
  checkInTime?: string;
  canDelete?: boolean;
  canModify?: boolean;
  canPublish?: boolean;
  canCancel?: boolean;
  canShare?: boolean;
}

const mockData: GroupData[] = [
  {
    id: 1,
    type: '拼车',
    status: '已完成',
    origin: '墨尔本',
    destination: '澳洲',
    departureTime: '2025.7.11 8:00',
    canDelete: true,
  },
  {
    id: 2,
    type: '拼房',
    status: '已完成',
    hotelName: '我爱我家民宿soft (墨尔本店)',
    checkInTime: '2025.7.11-7.12 1晚/1间',
    canDelete: true,
    canPublish: true,
  },
  {
    id: 3,
    type: '拼车',
    status: '待发布',
    origin: '墨尔本',
    destination: '澳洲',
    departureTime: '2025.7.11 8:00',
    canDelete: true,
    canModify: true,
    canPublish: true,
  },
  {
    id: 4,
    type: '拼房',
    status: '待发布',
    hotelName: '我爱我家民宿soft (墨尔本店)',
    checkInTime: '2025.7.11-7.12 1晚/1间',
    canDelete: true,
    canModify: true,
    canPublish: true,
  },
  {
    id: 5,
    type: '拼车',
    status: '拼团中',
    origin: '墨尔本',
    destination: '澳洲',
    departureTime: '2025.7.11 8:00',
    canCancel: true,
    canShare: true,
  },
  {
    id: 6,
    type: '拼车',
    status: '已成团',
    origin: '墨尔本',
    destination: '澳洲',
    departureTime: '2025.7.11 8:00',
  },
];

export const MeGroup: React.FC = () => {
  const [activeTab, setActiveTab] = useState('全部');

  const handleBack = () => {
    window.history.back();
  };

  const getFilteredData = (tab: string) => {
    if (tab === '全部') return mockData;
    return mockData.filter((item) => {
      switch (tab) {
        case '待发布':
          return item.status === '待发布';
        case '待成团':
          return item.status === '拼团中';
        case '已完成':
          return item.status === '已完成' || item.status === '已成团';
        default:
          return true;
      }
    });
  };

  return (
    <div className={styles.container}>
      <NavBar onBack={handleBack} className={styles.navbar}>
        我的发团
      </NavBar>

      <Tabs activeKey={activeTab} onChange={setActiveTab} className={styles.tabs}>
        <Tabs.Tab title="全部" key="全部" />
        <Tabs.Tab title="待发布" key="待发布" />
        <Tabs.Tab title="待成团" key="待成团" />
        <Tabs.Tab title="已完成" key="已完成" />
      </Tabs>

      <div className={styles.groupList}>
        {getFilteredData(activeTab).map((item) => (
          <MyGroupItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
