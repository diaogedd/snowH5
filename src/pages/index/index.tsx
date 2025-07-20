import React, { useState } from "react";
import {
  DatePicker,
  Selector,
  Button,
  TabBar,
  Badge,
  CapsuleTabs,
  Checkbox,
  Switch,
  Form,
  Input,
  Space,
  Radio,
} from "antd-mobile";
import { UserOutline, AddCircleOutline, TeamOutline } from "antd-mobile-icons";
import styles from "./index.module.less";
import dayjs from "dayjs";
import GroupList from "./components/GroupList";
import SendGroup from "./components/SendGroup"

const groupList = [
  {
    id: 1,
    type: "car",
    title: "小花发起的拼车",
    location: "111 → 222",
    time: "2025.7.11 8:00",
    people: 4,
    left: 1,
    remark: "喜欢胜的",
  },
  {
    id: 1,
    type: "car",
    title: "小花发起的拼车",
    location: "111 → 222",
    time: "2025.7.11 8:00",
    people: 4,
    left: 1,
    remark: "喜欢胜的",
  },
  {
    id: 2,
    type: "room",
    title: "小6发起的拼房",
    location: "北京 我爱我家民宿soft（墨尔本店）",
    time: "2025.7.11~7.12 1晚/1间",
    people: 2,
    left: 1,
    remark: "喜欢邂逅的",
  },
  {
    id: 3,
    type: "car-room",
    title: "小绿发起的拼车房",
    location: "111 → 222",
    time: "2025.7.11 8:00",
    carType: "坦克300",
    left: 1,
    remark: "",
  },
];

const IndexPage: React.FC = () => {
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
      {/* <GroupList groupList={groupList} /> */}
      <SendGroup />
      <TabBar safeArea className={styles.tabbar}>
        <TabBar.Item key="1" icon={<TeamOutline />} title="拼团" />
        <TabBar.Item key="2" icon={<AddCircleOutline />} title="发团" />
        <TabBar.Item key="3" icon={<UserOutline />} title="我" />
      </TabBar>
    </div>
  );
};

export default IndexPage;
