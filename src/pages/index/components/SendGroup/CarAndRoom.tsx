import React from 'react';
import { Input, Button, Switch, DatePicker, Form, Space, TextArea } from 'antd-mobile';
import styles from './CarAndRoom.module.less';
import dayjs from 'dayjs';

const CarAndRoom: React.FC = () => {
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
        <Form.Item name="from" style={{ marginBottom: 0 }}>
          <Input placeholder="晋中市" className={styles['car-room-input']} />
        </Form.Item>
        <button className={styles['car-room-exchange-btn']} type="button">⇄</button>
        <Form.Item name="to" style={{ marginBottom: 0 }}>
          <Input placeholder="自治区直辖县" className={styles['car-room-input']} />
        </Form.Item>
        <Switch style={{ marginLeft: 8 }} />
        <span className={styles['car-room-switch-label']}>往返</span>
      </div>
      {/* 时间 */}
      <div className={styles['car-room-row']} style={{ alignItems: 'center' }}>
        <span className={styles['car-room-label']}>时间：</span>
        <Form.Item name="date" style={{ flex: 1, marginBottom: 0 }} trigger="onConfirm" onClick={(_, ref) => ref.current?.open()}>
          <DatePicker precision="minute" min={new Date()}>
            {value => value ? dayjs(value).format('YYYY/MM/DD  HH.mm') : '2025/09/02  8.00'}
          </DatePicker>
        </Form.Item>
      </div>
      {/* 出行 */}
      <div style={{ marginTop: 8 }}>
        <div className={styles['car-room-row']} style={{ marginBottom: 0 }}>
          <span className={styles['car-room-label']}>出行：</span>
        </div>
        <div className={styles['car-room-row']} style={{ marginTop: 0 }}>
          <Form.Item name="carType" style={{ flex: 2, marginBottom: 0 }}>
            <Input placeholder="输入车型" className={styles['car-room-input']} />
          </Form.Item>
          <Form.Item name="carPrice" style={{ flex: 1, margin: '0 8px', minWidth: 50, marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Input placeholder="请输入价格" className={styles['car-room-input']} />
              <span style={{ marginLeft: 4, color: '#888' }}>￥</span>
            </div>
          </Form.Item>
          <Form.Item name="carSeats" style={{ flex: 1, marginBottom: 0, minWidth: 60 }}>
            <Input placeholder="几座车" className={styles['car-room-input']} />
            <span style={{ marginLeft: 4, color: '#888' }}>座</span>
          </Form.Item>
        </div>
      </div>
      {/* 住所 */}
      <div style={{ marginTop: 8 }}>
        <div className={styles['car-room-row']} style={{ marginBottom: 0 }}>
          <span className={styles['car-room-label']}>住所：</span>
        </div>
        <div className={styles['car-room-row']} style={{ marginTop: 0 }}>
          <Form.Item name="roomName" style={{ flex: 2, marginBottom: 0 }}>
            <Input placeholder="店名" className={styles['car-room-input']} />
          </Form.Item>
          <Form.Item name="roomPrice" style={{ flex: 1, margin: '0 8px', minWidth: 50, marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Input placeholder="价格" className={styles['car-room-input']} />
              <span style={{ marginLeft: 4, color: '#888' }}>￥</span>
            </div>
          </Form.Item>
          <Form.Item name="roomPeople" style={{ flex: 1, marginBottom: 0, width: 30 }}>
            <Input placeholder="几人房" className={styles['car-room-input']} />
            <span style={{ marginLeft: 4, color: '#888' }}>人</span>
          </Form.Item>
        </div>
      </div>
      {/* 可拼人数 */}
      <div className={styles['car-room-row']} style={{ alignItems: 'center', marginTop: 8 }}>
        <span className={styles['car-room-label']}>可拼</span>
        <Form.Item name="peopleNum" initialValue={1} style={{ marginBottom: 0 }}>
          <Input type="number" min={1} max={100} style={{ width: 60 }} className={styles['car-room-input']}
          />
        </Form.Item>

      </div>
      {/* 备注 */}
      <div className={styles['car-room-row']} style={{ alignItems: 'flex-start', marginTop: 8 }}>
        <span className={styles['car-room-label']} style={{ marginTop: 8 }}>备注：</span>
        <Form.Item name="remark" style={{ flex: 1, marginBottom: 0 }}>
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

export default CarAndRoom;
