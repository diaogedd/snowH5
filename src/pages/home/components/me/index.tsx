import React from 'react';
import styles from './me.module.less';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd-mobile';

const Me: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.mePage}>
      <div className={styles.profileCard}>
        <img
          className={styles.avatar}
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="avatar"
        />
        <div className={styles.profileInfo}>
          <div className={styles.profileTop}>
            <span className={styles.nickname}>邓沙</span>
            <span className={styles.setting}>设置 &gt;</span>
          </div>
          <div className={styles.profileMeta}>
            <span className={styles.id}>ID: 12345678</span>
            <span className={styles.level}>
              {' '}
              <span className={styles.levelIcon}></span>
              <span className={styles.levelIcon}></span>
            </span>
          </div>
          <div className={styles.profileStats}>拼团累计3次，连约累计5次</div>
        </div>
      </div>
      <div className={styles.btnList}>
        <Button color="primary" className={styles.meBtn} onClick={() => navigate('/me-message')}>
          个人信息
        </Button>
        <Button color="primary" className={styles.meBtn} onClick={() => navigate('/me-group')}>
          我的发团
        </Button>
        <Button color="primary" className={styles.meBtn} onClick={() => navigate('/me-join')}>
          我的拼团
        </Button>
      </div>
    </div>
  );
};

export default Me;
