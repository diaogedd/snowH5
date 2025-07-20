import React from 'react';
import { Input, Button, Switch, DatePicker, Form, Space, TextArea } from 'antd-mobile';
import styles from './CarAndRoom.module.less';
import dayjs from 'dayjs';

const CarForm: React.FC = () => {
  return (
    <Form
      layout="horizontal"
      className={styles['car-room-form']}
      onFinish={values => {
        const formatted = {
          ...values,
          date: values.date ? dayjs(values.date).format('YYYY/MM/DD HH.mm') : undefined,
        };
        console.log('发布表单提交:', formatted);
      }}
      footer={null}
    >
      {/* 地点 */}
      <div className={styles['car-room-row']} style={{ alignItems: 'center' }}>
        <span className={styles['car-room-label']}>地点：</span>
        <Form.Item name="from">
          <Input placeholder="晋中市" className={styles['car-room-input']} />
        </Form.Item>
        <button className={styles['car-room-exchange-btn']} type="button">⇄</button>
        <Form.Item name="to">
          <Input placeholder="自治区直辖县" className={styles['car-room-input']} />
        </Form.Item>
        <Switch style={{ marginLeft: 8 }} />
        <span className={styles['car-room-switch-label']}>往返</span>
      </div>
      {/* 时间 */}
      <div className={styles['car-room-row']} style={{ alignItems: 'center' }}>
        <span className={styles['car-room-label']}>时间：</span>
        <Form.Item name="date" style={{ flex: 1 }} trigger="onConfirm" onClick={(_, ref) => ref.current?.open()}>
          <DatePicker precision="minute" min={new Date()}>
            {value => value ? dayjs(value).format('YYYY/MM/DD  HH.mm') : '2025/09/02  8.00'}
          </DatePicker>
        </Form.Item>
      </div>
      {/* 可拼人数 */}
      <div className={styles['car-room-row']} style={{ alignItems: 'center', marginTop: 8 }}>
        <span className={styles['car-room-label']}>可拼</span>
        <Form.Item name="peopleNum" initialValue={1}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input type="number" min={1} max={100} style={{ width: 60 }} className={styles['car-room-input']}
            />
            <span style={{ marginLeft: 4, color: '#888' }}>人</span>
          </div>

        </Form.Item>

      </div>
      {/* 备注 */}
      <div className={styles['car-room-row']} style={{ alignItems: 'flex-start', marginTop: 8 }}>
        <span className={styles['car-room-label']} style={{ marginTop: 8 }}>备注：</span>
        <Form.Item name="remark" style={{ flex: 1 }}>
          <TextArea
            placeholder=""
            className={styles['car-room-textarea']}
            style={{ minHeight: 100, resize: 'none' }}
            autoSize={{ minRows: 4, maxRows: 6 }}
          />
        </Form.Item>
      </div>
      {/* 按钮 */}
      <div className={styles['car-room-btns']}>
        <Button color='primary' type="submit">立即发布</Button>
        <Button color='default' type="button">暂存</Button>
      </div>
    </Form>
  );
};

export default CarForm;
