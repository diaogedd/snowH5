import React from 'react';
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

interface MyGroupsItemProps {
  item: GroupData;
}

export const MyGroupsItem: React.FC<MyGroupsItemProps> = ({ item }) => {
  const handleAction = (action: string) => {
    console.log(`${action} group ${item.id}`);
    // 这里可以添加具体的操作逻辑
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '进行中':
        return styles.statusActive;
      case '待确认':
        return styles.statusPending;
      case '已完成':
        return styles.statusCompleted;
      case '已取消':
        return styles.statusCancelled;
      default:
        return '';
    }
  };

  return (
    <div className={styles.groupCard}>
      <div className={styles.cardHeader}>
        <span className={styles.groupType}>{item.type}</span>
        <span className={`${styles.groupStatus} ${getStatusColor(item.status)}`}>
          {item.status}
        </span>
      </div>

      <div className={styles.cardContent}>
        {item.type === '拼车' ? (
          <>
            <div className={styles.infoRow}>起点: {item.origin}</div>
            <div className={styles.infoRow}>终点: {item.destination}</div>
            <div className={styles.infoRow}>出发时间: {item.departureTime}</div>
          </>
        ) : (
          <>
            <div className={styles.infoRow}>{item.hotelName}</div>
            <div className={styles.infoRow}>入住时间: {item.checkInTime}</div>
          </>
        )}
        <div className={styles.infoRow}>发起人: {item.leaderName}</div>
        {item.price && <div className={styles.priceRow}>价格: {item.price}</div>}
      </div>

      <div className={styles.cardActions}>
        {item.canCancel && (
          <button
            className={styles.actionBtn}
            onClick={() => handleAction('取消')}
          >
            取消
          </button>
        )}
        {item.canConfirm && (
          <button
            className={`${styles.actionBtn} ${styles.primaryBtn}`}
            onClick={() => handleAction('确认')}
          >
            确认
          </button>
        )}
        {item.canPay && (
          <button
            className={`${styles.actionBtn} ${styles.primaryBtn}`}
            onClick={() => handleAction('支付')}
          >
            支付
          </button>
        )}
        {item.canView && (
          <button
            className={styles.actionBtn}
            onClick={() => handleAction('查看')}
          >
            查看详情
          </button>
        )}
      </div>
    </div>
  );
}; 