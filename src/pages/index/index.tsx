import React, { useState, useEffect } from "react";
import {
  TabBar,
  CapsuleTabs,
} from "antd-mobile";
import { UserOutline, AddCircleOutline, TeamOutline } from "antd-mobile-icons";
import styles from "./index.module.less";

import GroupList from "./components/GroupList";
import SendGroup from "./components/SendGroup"
import Me from './components/me/index'
import { apiFetch } from '../../auth/oidc';


const IndexPage: React.FC = () => {
  const [activeKey, setActiveKey] = useState("1");

  useEffect(() => {
    console.log('apiFetch');

    apiFetch('/api/identity/users')
  }, []);

  return (
    <div className={styles["group-page"]}>
      {/* 顶部Banner */}
      <div className={styles["banner"]}>
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
          alt="banner"
          className={styles["banner-img"]}
        />
        <div className={styles["banner-header"]}>
          <span className={styles["logo-text"]}>SnowNow</span>
          <button className={styles["mine-btn"]}>我的</button>
        </div>
        <div className={styles["banner-tabs"]}>
          <CapsuleTabs defaultActiveKey="1" className={styles["capsule-tabs"]}>
            <CapsuleTabs.Tab title="雪场" key="1" />
            <CapsuleTabs.Tab title="雪山群" key="2" />
          </CapsuleTabs>
        </div>
      </div>
      {activeKey === "1" && <GroupList />}
      {activeKey === "2" && <SendGroup />}
      {activeKey === "3" && <Me />}
      <TabBar safeArea className={styles.tabbar} activeKey={activeKey} onChange={setActiveKey}>
        <TabBar.Item key="1" icon={<TeamOutline />} title="拼团" />
        <TabBar.Item key="2" icon={<AddCircleOutline />} title="发团" />
        <TabBar.Item key="3" icon={<UserOutline />} title="我" />
      </TabBar>
    </div>
  );
};

export default IndexPage;
