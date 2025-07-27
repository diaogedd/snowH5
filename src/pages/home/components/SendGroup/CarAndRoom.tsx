import React, { useState } from 'react';
import { Input, Button, Switch, DatePicker, Form, Space, TextArea } from 'antd-mobile';
import styles from './CarAndRoom.module.less';
import dayjs from 'dayjs';
import { createOrUpdateCarRoom } from '../../../../api/api'


const CarAndRoom: React.FC = () => {
  const [showReturnTime, setShowReturnTime] = useState(false);
  return (
    <Form
      layout="horizontal"
      className={styles['car-room-form']}
      onFinish={values => {
        const formatted = {
          ...values,
          departureTime: values.departureTime ? dayjs(values.departureTime).format('YYYY/MM/DD HH:mm') : undefined,
          returnTime: values.returnTime ? dayjs(values.returnTime).format('YYYY/MM/DD HH:mm') : undefined,
          title: dayjs().format('YYYYMMDDHHmmss拼车房'),
        };
        createOrUpdateCarRoom(formatted);
        console.log('发布表单提交:', formatted);
      }}
      onValuesChange={(changedValues) => {
        if ('needBack' in changedValues) {
          setShowReturnTime(changedValues.needBack);
        }
      }}
      footer={null}
    >
      {/* 地点 */}
      <div className={styles['car-room-row']} style={{ alignItems: 'center' }}>
        <span className={styles['car-room-label']}>地点：</span>
        <Form.Item name="startLocation">
          <Input placeholder="晋中市" className={styles['car-room-input']} />
        </Form.Item>
        <button className={styles['car-room-exchange-btn']} type="button">⇄</button>
        <Form.Item name="endLocation">
          <Input placeholder="自治区直辖县" className={styles['car-room-input']} />
        </Form.Item>
        <Form.Item
          name='needBack'
          valuePropName="checked"
          childElementPosition='right'
        >
          <Switch style={{ marginLeft: 8 }} />
        </Form.Item>
        <span className={styles['car-room-switch-label']}>往返</span>
      </div>
      {/* 时间 */}
      <div className={styles['car-room-row']} style={{ alignItems: 'center' }}>
        <span className={styles['car-room-label']}>出发时间：</span>
        <Form.Item name="departureTime" style={{ flex: 1 }} trigger="onConfirm" onClick={(_, ref) => ref.current?.open()}>
          <DatePicker precision="minute" min={new Date()}>
            {value => value ? dayjs(value).format('YYYY/MM/DD  HH:mm') : '选择返回时间'}
          </DatePicker>
        </Form.Item>

      </div>
      {/* 返回时间 - 只在往返模式显示 */}
      {showReturnTime && (
        <div className={styles['car-room-row']} style={{ alignItems: 'center', marginTop: 8 }}>
          <span className={styles['car-room-label']}>返回时间：</span>
          <Form.Item
            name="returnTime"
            style={{ flex: 1 }}
            trigger="onConfirm"
            onClick={(_, ref) => ref.current?.open()}
          >
            <DatePicker precision="minute" min={new Date()}>
              {value => value ? dayjs(value).format('YYYY/MM/DD HH:mm') : '选择返回时间'}
            </DatePicker>
          </Form.Item>
        </div>
      )}
      {/* 出行 */}
      <div style={{ marginTop: 8 }}>
        <div className={styles['car-room-row']}>
          <span className={styles['car-room-label']}>出行：</span>
        </div>
        <div className={styles['car-room-row']} style={{ marginTop: 0 }}>
          <Form.Item name="vehicleType" style={{ flex: 1 }}>
            <Input placeholder="输入车型" className={styles['car-room-input']} />
          </Form.Item>
          <Form.Item name="carPrice" style={{ flex: 1, margin: '0 8px', minWidth: 50 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Input placeholder="请输入价格" className={styles['car-room-input']} />
              <span style={{ marginLeft: 4, color: '#888' }}>￥</span>
            </div>
          </Form.Item>
          <Form.Item name="carDescription" style={{ flex: 1, minWidth: 60 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Input placeholder="几座车" type="number" min={1} max={100} className={styles['car-room-input']} />
              <span style={{ marginLeft: 4, color: '#888' }}>座</span>
            </div>
          </Form.Item>
        </div>
      </div>
      {/* 住所 */}
      <div style={{ marginTop: 8 }}>
        <div className={styles['car-room-row']}>
          <span className={styles['car-room-label']}>住所：</span>
        </div>
        <div className={styles['car-room-row']} style={{ marginTop: 0 }}>
          <Form.Item name="roomName" style={{ flex: 1 }}>
            <Input placeholder="店名" className={styles['car-room-input']} />
          </Form.Item>
          <Form.Item name="roomPrice" style={{ flex: 1, margin: '0 8px', minWidth: 50 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Input placeholder="价格" className={styles['car-room-input']} />
              <span style={{ marginLeft: 4, color: '#888' }}>￥</span>
            </div>
          </Form.Item>
          <Form.Item name="roomDescription" style={{ flex: 1, width: 30 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Input placeholder="几人房" type="number" min={1} max={100} className={styles['car-room-input']} />
              <span style={{ marginLeft: 4, color: '#888' }}>人</span>
            </div>

          </Form.Item>
        </div>
      </div>
      {/* 可拼人数 */}
      <div className={styles['car-room-row']} style={{ alignItems: 'center', marginTop: 8 }}>
        <span className={styles['car-room-label']}>可拼</span>
        <Form.Item name="targetNumber" initialValue={1}>
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
        <Form.Item name="remarks" style={{ flex: 1 }}>
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
        {/* <Button color='default' type="button">暂存</Button> */}
      </div>
    </Form>
  );
};

export default CarAndRoom;
