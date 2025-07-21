import React, { useState } from 'react';
import { Input, Button, Form, TextArea, CalendarPicker } from 'antd-mobile';
import styles from './CarAndRoom.module.less';
import dayjs from 'dayjs';

const RoomForm: React.FC = () => {
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);
  const [calendarVisible, setCalendarVisible] = useState(false);

  return (
    <Form
      layout="horizontal"
      className={styles['car-room-form']}
      onFinish={values => {
        const formatted = {
          ...values,
          dateRange: dateRange
            ? `${dayjs(dateRange[0]).format('YYYY/MM/DD')} ~ ${dayjs(dateRange[1]).format('YYYY/MM/DD')}`
            : undefined,
        };
        console.log('发布表单提交:', formatted);
      }}
      footer={null}
    >
      {/* 地点 */}
      <div className={styles['car-room-row']} style={{ alignItems: 'center' }}>
        <span className={styles['car-room-label']}>地点：</span>
        <Form.Item name="from">
          <Input placeholder="城市/区域" className={styles['car-room-input']} />
        </Form.Item>
        <Form.Item name="to">
          <Input placeholder="酒店名" className={styles['car-room-input']} />
        </Form.Item>
      </div>
      {/* 时间区间 - CalendarPicker */}
      <div className={styles['car-room-row']} style={{ alignItems: 'center' }}>
        <span className={styles['car-room-label']}>时间：</span>
        <div style={{ flex: 1 }}>
          <div
            className={styles['car-room-input']}
            style={{ cursor: 'pointer', background: '#f7f8fa', minHeight: 32, display: 'flex', alignItems: 'center' }}
            onClick={() => setCalendarVisible(true)}
          >
            {dateRange
              ? `${dayjs(dateRange[0]).format('YYYY/MM/DD')} ~ ${dayjs(dateRange[1]).format('YYYY/MM/DD')}`
              : '请选择入住和离开日期'}
          </div>
          <CalendarPicker
            visible={calendarVisible}
            selectionMode="range"
            onClose={() => setCalendarVisible(false)}
            onConfirm={val => {
              setDateRange(val as [Date, Date]);
              setCalendarVisible(false);
            }}
            min={new Date()}
            max={dayjs().add(1, 'year').toDate()}
          />
        </div>
      </div>
      {/* 可拼人数 */}
      <div className={styles['car-room-row']} style={{ alignItems: 'center', marginTop: 8 }}>
        <span className={styles['car-room-label']}>可拼</span>
        <Form.Item name="peopleNum" initialValue={1}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input type="number" min={1} max={100} style={{ width: 60 }} className={styles['car-room-input']} />
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

export default RoomForm;
