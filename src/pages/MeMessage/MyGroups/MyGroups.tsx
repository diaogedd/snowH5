import React, { useState } from 'react';
import { Tabs, NavBar } from 'antd-mobile';
import { MyGroupsItem } from './MyGroupsItem';
import styles from './MyGroups.module.less';

interface GroupData {
  id: number;
  type: '拼车' | '拼房';
  status: '进行中' | '待确认' | '已完成' | '已取消';
  origin?: string;
  destination?: string;
  departureTime?: string;
  hotelName?: string;
  checkInTime?: string;
  leaderName: string;
  price?: string;
  canCancel?: boolean;
  canConfirm?: boolean;
  canPay?: boolean;
  canView?: boolean;
}

const mockData: GroupData[] = [
  {
    id: 1,
    type: '拼车',
    status: '进行中',
    origin: '墨尔本',
    destination: '澳洲',
    departureTime: '2025.7.11 8:00',
    leaderName: '小花',
    price: '¥50',
    canCancel: true,
    canView: true,
  },
  {
    id: 2,
    type: '拼房',
    status: '待确认',
    hotelName: '我爱我家民宿soft (墨尔本店)',
    checkInTime: '2025.7.11-7.12 1晚/1间',
    leaderName: '小6',
    price: '¥200',
    canCancel: true,
    canConfirm: true,
  },
  {
    id: 3,
    type: '拼车',
    status: '待确认',
    origin: '墨尔本',
    destination: '澳洲',
    departureTime: '2025.7.15 9:00',
    leaderName: '小绿',
    price: '¥60',
    canCancel: true,
    canConfirm: true,
  },
  {
    id: 4,
    type: '拼房',
    status: '已完成',
    hotelName: '墨尔本市中心酒店',
    checkInTime: '2025.6.20-6.22 2晚/1间',
    leaderName: '小明',
    price: '¥300',
    canView: true,
  },
  {
    id: 5,
    type: '拼车',
    status: '已取消',
    origin: '墨尔本',
    destination: '澳洲',
    departureTime: '2025.7.10 7:00',
    leaderName: '小红',
    price: '¥45',
    canView: true,
  },
  {
    id: 6,
    type: '拼车',
    status: '进行中',
    origin: '墨尔本',
    destination: '澳洲',
    departureTime: '2025.7.20 10:00',
    leaderName: '小李',
    price: '¥55',
    canCancel: true,
    canPay: true,
  },
];

export const MyGroups: React.FC = () => {
  const [activeTab, setActiveTab] = useState('全部');

  const handleBack = () => {
    window.history.back();
  };

  const getFilteredData = (tab: string) => {
    if (tab === '全部') return mockData;
    return mockData.filter(item => {
      switch (tab) {
        case '进行中':
          return item.status === '进行中';
        case '待确认':
          return item.status === '待确认';
        case '已完成':
          return item.status === '已完成';
        default:
          return true;
      }
    });
  };

  return (
    <div className={styles.container}>
      <NavBar onBack={handleBack} className={styles.navbar}>
        我的拼团
      </NavBar>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        className={styles.tabs}
      >
        <Tabs.Tab title="全部" key="全部" />
        <Tabs.Tab title="进行中" key="进行中" />
        <Tabs.Tab title="待确认" key="待确认" />
        <Tabs.Tab title="已完成" key="已完成" />
      </Tabs>

      <div className={styles.groupList}>
        {getFilteredData(activeTab).map(item => (
          <MyGroupsItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}; 