import React from 'react';
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

interface MyGroupItemProps {
  item: GroupData;
}

export const MyGroupItem: React.FC<MyGroupItemProps> = ({ item }) => {
  const handleAction = (action: string) => {
    console.log(`${action} group ${item.id}`);
    // 这里可以添加具体的操作逻辑
  };

  return (
    <div className={styles.groupCard}>
      <div className={styles.cardHeader}>
        <span className={styles.groupType}>{item.type}</span>
        <span className={styles.groupStatus}>{item.status}</span>
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
      </div>

      <div className={styles.cardActions}>
        {item.canDelete && (
          <button className={styles.actionBtn} onClick={() => handleAction('删除')}>
            删除
          </button>
        )}
        {item.canModify && (
          <button className={styles.actionBtn} onClick={() => handleAction('修改')}>
            修改
          </button>
        )}
        {item.canCancel && (
          <button className={styles.actionBtn} onClick={() => handleAction('取消')}>
            取消
          </button>
        )}
        {item.canPublish && (
          <button
            className={`${styles.actionBtn} ${styles.primaryBtn}`}
            onClick={() => handleAction('发布')}
          >
            发布
          </button>
        )}
        {item.canShare && (
          <button className={styles.actionBtn} onClick={() => handleAction('分享')}>
            分享
          </button>
        )}
      </div>
    </div>
  );
};
