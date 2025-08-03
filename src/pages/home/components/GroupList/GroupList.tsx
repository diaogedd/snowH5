import React from 'react';

import styles from '../../index.module.less';
import { DatePicker, Button, Checkbox, Switch, Form, Input, Space, Radio } from 'antd-mobile';
import dayjs from 'dayjs';
import { GroupItem } from './GroupItem';

interface GroupItem {
  id: number;
  type: string;
  title: string;
  location: string;
  time: string;
  people?: number;
  left: number;
  remark?: string;
  carType?: string;
}

interface GroupListProps {
  groupList: GroupItem[];
}
const groupList = [
  {
    id: 1,
    type: 'car',
    title: '小花发起的拼车',
    location: '111 → 222',
    time: '2025.7.11 8:00',
    people: 4,
    left: 1,
    remark: '喜欢胜的',
  },
  {
    id: 1,
    type: 'car',
    title: '小花发起的拼车',
    location: '111 → 222',
    time: '2025.7.11 8:00',
    people: 4,
    left: 1,
    remark: '喜欢胜的',
  },
  {
    id: 2,
    type: 'room',
    title: '小6发起的拼房',
    location: '北京 我爱我家民宿soft（墨尔本店）',
    time: '2025.7.11~7.12 1晚/1间',
    people: 2,
    left: 1,
    remark: '喜欢邂逅的',
  },
  {
    id: 3,
    type: 'car-room',
    title: '小绿发起的拼车房',
    location: '111 → 222',
    time: '2025.7.11 8:00',
    carType: '坦克300',
    left: 1,
    remark: '',
  },
];
const GroupList = () => {
  return (
    <>
      <Form
        className={styles.form}
        layout="horizontal"
        onFinish={(values) => {
          // 格式化 date 字段
          const formatted = {
            ...values,
            date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
          };
          console.log('筛选表单提交:', formatted);
        }}
        footer={null}
      >
        {/* 出发地-目的地-往返 */}
        <div className={styles['filter-row']}>
          <Form.Item name="from">
            <Input placeholder="出发地" className={styles['filter-input']} />
          </Form.Item>
          <button className={styles['exchange-btn']} type="button">
            ⇄
          </button>
          <Form.Item name="to">
            <Input placeholder="目的地" className={styles['filter-input']} />
          </Form.Item>
          <div>
            <Switch className={styles['filter-switch']} />
            <span className={styles['filter-switch-label']}>往返</span>
          </div>
        </div>
        {/* 时间-人数-可拼 */}
        <div className={styles['filter-row']}>
          <Form.Item
            name="date"
            label="时间"
            trigger="onConfirm"
            onClick={(_, datePickerRef) => {
              datePickerRef.current?.open();
            }}
          >
            <DatePicker>
              {(value) => (value ? dayjs(value).format('YYYY-MM-DD') : '请选择日期')}
            </DatePicker>
          </Form.Item>
        </div>
        <Form.Item name="peopleNum" label="可拼" initialValue={1} extra={<span>人</span>}>
          <Input type="number" min={1} max={100} />
        </Form.Item>
        <Form.Item name="teamType" label="团坑状态">
          <Radio.Group>
            <Space direction="horizontal">
              <Radio value="1">待成团</Radio>
              <Radio value="2">已成团</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="project" label="项目" valuePropName="checked">
          <Space direction="horizontal">
            <Checkbox value="1">车</Checkbox>
            <Checkbox value="2">房</Checkbox>
          </Space>
        </Form.Item>
        <Space direction="horizontal" className={styles.bottomBox}>
          <Button size="small" color="default" type="reset">
            重置
          </Button>
          <Button size="small" color="primary" type="submit">
            查询
          </Button>
        </Space>
      </Form>
      <div className={styles['group-list']}>
        {groupList.map((item) => (
          <GroupItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
};

export default GroupList;
