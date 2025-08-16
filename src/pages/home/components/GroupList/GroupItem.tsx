import type React from 'react';
import styles from '../../index.module.less';
import { Badge, Toast } from 'antd-mobile';
import type { GroupPurchaseItem } from '../../../../api/api';
import { GROUP_TYPE, GROUP_STATUS } from '../../../../const';
import { joinGroupPurchase } from '../../../../api/api';

export const GroupItem: React.FC<{
  item: GroupPurchaseItem;
  onRefresh: () => void;
}> = ({ item, onRefresh }) => {
  // 计算剩余人数
  const leftCount = Math.max(0, item.targetNumber - item.currentNumber);

  return (
    <>
      <div className={styles['group-card']} key={item.title}>
        <div className={styles['group-card-main']}>
          <div className={styles['group-card-title']}>{item.title || '未命名团购'}</div>
          <div className={styles['group-card-info']}>
            <span className={styles['group-type']}>{GROUP_TYPE[item.groupType] || '未知类型'}</span>
            <span className={styles['group-status']}>
              {GROUP_STATUS[item.status] || '未知状态'}
            </span>
          </div>
          <div className={styles['group-card-info']}>
            {item.startLocation && item.endLocation
              ? `${item.startLocation} → ${item.endLocation}`
              : item.roomLocation || item.roomName || '地点待定'}
          </div>
          <div className={styles['group-card-info']}>
            {item.departureTime
              ? `出发时间：${item.departureTime}`
              : item.checkInTime && item.checkOutTime
                ? `${item.checkInTime} ~ ${item.checkOutTime}`
                : item.checkInTime || '时间待定'}
          </div>
          {item.vehicleType && (
            <div className={styles['group-card-info']}>车型：{item.vehicleType}</div>
          )}
          {item.roomName && <div className={styles['group-card-info']}>住宿：{item.roomName}</div>}
          <div className={styles['group-card-info']}>
            可拼{item.targetNumber || 0}人 (已加入{item.currentNumber || 0}人)
          </div>
          <div className={styles['group-card-info']}>
            价格：
            {item.groupType === 'Car' && item.carPrice
              ? `¥${item.carPrice}`
              : item.groupType === 'Room' && item.roomPrice
                ? `¥${item.roomPrice}`
                : item.groupType === 'CarAndRoom' && (item.carPrice || item.roomPrice)
                  ? `¥${(item.carPrice || 0) + (item.roomPrice || 0)}`
                  : '价格待定'}
          </div>
          {item.remarks && <div className={styles['group-card-remark']}>备注：{item.remarks}</div>}
        </div>
        <div className={styles['group-card-side']}>
          <Badge
            content={`仅剩${leftCount}位`}
            color={leftCount === 0 ? 'default' : 'danger'}
            className={styles['group-card-badge']}
          />
          <button
            className={styles['group-card-btn']}
            disabled={leftCount === 0}
            onClick={async () => {
              await joinGroupPurchase({ id: item.id });
              Toast.show({
                icon: 'success',
                content: '加入成功',
              });
              onRefresh();
            }}
          >
            {leftCount === 0 ? '已满员' : '立即拼'}
          </button>
        </div>
      </div>
    </>
  );
};
