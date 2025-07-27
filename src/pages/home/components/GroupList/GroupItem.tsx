import type React from 'react';
import styles from '../../index.module.less';
import { Badge } from 'antd-mobile';


export const GroupItem: React.FC<{
  item: any
}> = ({ item }) => {
  return <>
    <div className={styles['group-card']} key={item.id}>
      <div className={styles['group-card-main']}>
        <div className={styles['group-card-title']}>{item.title}</div>
        <div className={styles['group-card-info']}>{item.location}</div>
        <div className={styles['group-card-info']}>{item.time}</div>
        {item.carType && <div className={styles['group-card-info']}>车型：{item.carType}</div>}
        <div className={styles['group-card-info']}>可拼{item.people || 2}人</div>
        {item.remark && <div className={styles['group-card-remark']}>备注：{item.remark}</div>}
      </div>
      <div className={styles['group-card-side']}>
        <Badge content={`仅剩${item.left}位`} color="danger" className={styles['group-card-badge']} />
        <button className={styles['group-card-btn']}>立即拼</button>
      </div>
    </div>
  </>
}