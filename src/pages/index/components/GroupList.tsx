import React from 'react';

import styles from '../index.module.less';
import {
  DatePicker,
  Button,
  Badge,
  Checkbox,
  Switch,
  Form,
  Input,
  Space,
  Radio
} from "antd-mobile";
import dayjs from 'dayjs'

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
const GroupList: React.FC<GroupListProps> = ({ groupList }) => {
  return (
    <>
      <Form
        className={styles.form}
        layout="horizontal"
        onFinish={values => {
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
          <Form.Item name="from" >
            <Input placeholder="出发地" className={styles['filter-input']} />
          </Form.Item>
          <button className={styles['exchange-btn']} type="button">⇄</button>
          <Form.Item name="to" >
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
            name='date'
            label='时间'
            trigger='onConfirm'

            onClick={(_, datePickerRef) => {
              datePickerRef.current?.open()
            }}
          >
            <DatePicker>
              {value =>
                value ? dayjs(value).format('YYYY-MM-DD') : '请选择日期'
              }
            </DatePicker>
          </Form.Item>
        </div>
        <Form.Item name="peopleNum" label='可拼' initialValue={1} extra={<span>人</span>}>

          <Input type="number" min={1} max={100} />
        </Form.Item>
        <Form.Item name="teamType" label='团坑状态'>
          <Radio.Group>
            <Space direction='horizontal'>
              <Radio value='1'>待成团</Radio>
              <Radio value='2'>已成团</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="project" label='项目' valuePropName="checked" >
          <Space direction='horizontal'>
            <Checkbox value='1'>车</Checkbox>
            <Checkbox value='2'>房</Checkbox>
          </Space>
        </Form.Item>
        <Space direction='horizontal' className={styles.bottomBox}>
          <Button size="small" color="default" type="reset">重置</Button>
          <Button size="small" color="primary" type="submit">查询</Button>
        </Space>
      </Form>
      <div className={styles['group-list']}>
        {groupList.map(item => (
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
        ))}
      </div>
    </>

  );
};

export default GroupList;
