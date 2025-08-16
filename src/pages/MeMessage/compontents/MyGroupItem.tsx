import React, { useState } from 'react';
import styles from './MeGroup.module.less';
import type { GroupPurchaseItem } from '../../../api/api';
import { GROUP_TYPE, GROUP_STATUS } from '../../../const';
import { Tag, Toast, Modal, List } from 'antd-mobile';
import { useRequest } from 'ahooks';
import { deleteSkiResort } from '../../../api/api';
import dayjs from 'dayjs';

interface MyGroupItemProps {
  item: GroupPurchaseItem;
  onEdit: (id: string, type: string) => void;
  onRefresh: () => void;
  type: string;
}

export const MyGroupItem: React.FC<MyGroupItemProps> = ({ item, onEdit, onRefresh, type }) => {
  const { run: deleteGroup } = useRequest(() => deleteSkiResort({ id: item.id }), {
    manual: true,
  });
  const [showModal, setShowModal] = useState(false);
  const handleAction = (action: string) => {
    console.log(`${action} group ${item.title}`);
    // 这里可以添加具体的操作逻辑
  };

  const handleDelete = () => {
    Modal.confirm({
      title: '删除确认',
      content: `确定要删除团购"${item.title}"吗？此操作不可恢复。`,
      onConfirm: async () => {
        await deleteGroup();
        Toast.show({
          icon: 'success',
          content: '删除成功',
        });
        onRefresh();
      },
    });
  };

  return (
    <div className={styles.groupCard}>
      <div className={styles.cardHeader}>
        <span className={styles.groupType}>{GROUP_TYPE[item.groupType] || '未知类型'}</span>
        <span className={styles.groupStatus}>
          {item.status == 'NotStarted' && <Tag color="default">{GROUP_STATUS[item.status]}</Tag>}
          {item.status == 'InProgress' && <Tag color="primary">{GROUP_STATUS[item.status]}</Tag>}
          {item.status == 'Closed' && <Tag color="warning">{GROUP_STATUS[item.status]}</Tag>}
          {item.status == 'Success' && <Tag color="success">{GROUP_STATUS[item.status]}</Tag>}
        </span>
      </div>

      <div className={styles.cardContent}>
        <>
          <div className={styles.infoRow}>起点: {item.startLocation || '地点待定'}</div>
          <div className={styles.infoRow}>终点: {item.endLocation || '地点待定'}</div>
          <div className={styles.infoRow}>
            出发时间: {dayjs(item.departureTime).format('YYYY-MM-DD HH:mm') || '时间待定'}
          </div>
          {item.vehicleType && <div className={styles.infoRow}>车型: {item.vehicleType}</div>}
        </>
        <>
          <div className={styles.infoRow}>{item.roomName || '住宿待定'}</div>
          <div className={styles.infoRow}>入住时间: {item.checkInTime || '时间待定'}</div>
          {item.roomLocation && <div className={styles.infoRow}>位置: {item.roomLocation}</div>}
        </>

        <div className={styles.infoRow}>
          人数: {item.currentNumber || 0}/{item.targetNumber || 0}
        </div>

        <div className={styles.infoRow}>
          价格:
          {item.groupType === 'Car' && item.carPrice
            ? `¥${item.carPrice}`
            : item.groupType === 'Room' && item.roomPrice
              ? `¥${item.roomPrice}`
              : item.groupType === 'CarAndRoom' && (item.carPrice || item.roomPrice)
                ? `¥${(item.carPrice || 0) + (item.roomPrice || 0)}`
                : '价格待定'}
        </div>

        {item.remarks && <div className={styles.infoRow}>备注: {item.remarks}</div>}
      </div>

      <div className={styles.cardActions}>
        {item.status == 'NotStarted' && (
          <>
            <button className={styles.actionBtn} onClick={handleDelete}>
              删除
            </button>
            <button
              className={styles.actionBtn}
              onClick={() => onEdit(String(item.id), item.groupType)}
            >
              修改
            </button>
            <button className={styles.actionBtn}>发布</button>
          </>
        )}
        {item.status == 'InProgress' && (
          <>
            <button className={styles.actionBtn} onClick={() => handleAction('取消')}>
              取消拼团
            </button>
          </>
        )}
        {item.status !== 'NotStarted' && (
          <>
            <button className={styles.actionBtn} onClick={() => setShowModal(true)}>
              查看已拼人
            </button>
          </>
        )}
        {item.status == 'Closed' && <></>}
        {item.status == 'Success' && <></>}
        <Modal
          visible={showModal}
          onClose={() => {
            setShowModal(false);
          }}
        >
          <List header="用户列表">
            {item.participants?.map((user) => (
              <List.Item key={user.name} description={user.description}>
                {user.name}
              </List.Item>
            ))}
          </List>
        </Modal>
      </div>
    </div>
  );
};
