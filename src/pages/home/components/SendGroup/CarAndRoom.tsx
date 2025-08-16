import React, { useState, useEffect } from 'react';
import { Input, Button, Switch, DatePicker, Form, Space, TextArea } from 'antd-mobile';
import styles from './CarAndRoom.module.less';
import dayjs from 'dayjs';
import { createOrUpdateCarRoom } from '../../../../api/api';

const CarAndRoom: React.FC<{ initData?: any; actionType: 'create' | 'update' }> = ({
  initData,
  actionType,
}) => {
  const [showReturnTime, setShowReturnTime] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (initData) {
      // 确保日期字段是 Date 对象
      const formData = {
        ...initData,
        departureTime: initData.departureTime ? new Date(initData.departureTime) : undefined,
        returnTime: initData.returnTime ? new Date(initData.returnTime) : undefined,
      };

      form.setFieldsValue(formData);
      setShowReturnTime(initData.needBack || false);
    }
  }, [initData, form]);

  return (
    <Form
      form={form}
      layout="horizontal"
      className={styles['car-room-form']}
      onFinish={(values) => {
        const formatted = {
          ...values,
          departureTime: values.departureTime
            ? dayjs(values.departureTime).format('YYYY/MM/DD HH:mm')
            : undefined,
          returnTime: values.returnTime
            ? dayjs(values.returnTime).format('YYYY/MM/DD HH:mm')
            : undefined,
          title: initData?.title || dayjs().format('YYYYMMDDHHmmss拼车房'),
        };
        if (actionType === 'update') {
          createOrUpdateCarRoom({ ...formatted, id: initData?.id, title: '1', isSave: true });
        } else {
          createOrUpdateCarRoom(formatted);
        }
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
        <button className={styles['car-room-exchange-btn']} type="button">
          ⇄
        </button>
        <Form.Item name="endLocation">
          <Input placeholder="自治区直辖县" className={styles['car-room-input']} />
        </Form.Item>
        <Form.Item name="needBack" valuePropName="checked" childElementPosition="right">
          <Switch style={{ marginLeft: 8 }} />
        </Form.Item>
        <span className={styles['car-room-switch-label']}>往返</span>
      </div>
      {/* 时间 */}
      <div className={styles['car-room-row']} style={{ alignItems: 'center' }}>
        <span className={styles['car-room-label']}>出发时间：</span>
        <Form.Item
          name="departureTime"
          style={{ flex: 1 }}
          trigger="onConfirm"
          onClick={(_, ref) => ref.current?.open()}
        >
          <DatePicker precision="minute" min={new Date()}>
            {(value) => (value ? dayjs(value).format('YYYY/MM/DD  HH:mm') : '选择返回时间')}
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
              {(value) => (value ? dayjs(value).format('YYYY/MM/DD HH:mm') : '选择返回时间')}
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
          <Form.Item name="vehicleType">
            <Input placeholder="输入车型" className={styles['car-room-input']} />
          </Form.Item>
          <div style={{ display: 'flex', alignItems: 'center', width: 150 }}>
            <Form.Item name="carPrice" extra={<span style={{ color: '#888' }}>￥</span>}>
              <Input placeholder="请输入价格" className={styles['car-room-input']} />
            </Form.Item>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', width: 150 }}>
            <Form.Item name="carDescription" extra={<span style={{ color: '#888' }}>座</span>}>
              <Input
                placeholder="几座车"
                type="number"
                min={1}
                max={100}
                className={styles['car-room-input']}
              />
            </Form.Item>
          </div>
        </div>
      </div>
      {/* 住所 */}
      <div style={{ marginTop: 8 }}>
        <div className={styles['car-room-row']}>
          <span className={styles['car-room-label']}>住所：</span>
        </div>
        <div className={styles['car-room-row']} style={{ marginTop: 0 }}>
          <Form.Item name="roomName">
            <Input placeholder="店名" className={styles['car-room-input']} />
          </Form.Item>
          <div style={{ display: 'flex', alignItems: 'center', width: 150 }}>
            <Form.Item name="roomPrice" extra={<span style={{ color: '#888' }}>￥</span>}>
              <Input placeholder="请输入价格" className={styles['car-room-input']} />
            </Form.Item>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', width: 150 }}>
            <Form.Item name="roomDescription" extra={<span style={{ color: '#888' }}>座</span>}>
              <Input
                placeholder="几人房"
                type="number"
                min={1}
                max={100}
                className={styles['car-room-input']}
              />
            </Form.Item>
          </div>
        </div>
      </div>

      {/* 可拼人数 */}
      <div className={styles['car-room-row']} style={{ alignItems: 'center', marginTop: 8 }}>
        <span className={styles['car-room-label']}>可拼</span>
        <Form.Item name="targetNumber" extra={<span style={{ color: '#888' }}>人</span>}>
          <Input type="number" min={1} max={100} className={styles['car-room-input']} />
        </Form.Item>
      </div>
      {/* 备注 */}
      <div className={styles['car-room-row']} style={{ alignItems: 'flex-start', marginTop: 8 }}>
        <span className={styles['car-room-label']} style={{ marginTop: 8 }}>
          备注：
        </span>
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
        <Button color="primary" type="submit">
          {actionType === 'update' ? '更新' : '立即发布'}
        </Button>
        {actionType !== 'update' && (
          <Button
            color="default"
            type="button"
            onClick={() => {
              const values = form.getFieldsValue();
              const formatted = {
                ...values,
                departureTime: values.departureTime
                  ? dayjs(values.departureTime).format('YYYY/MM/DD HH:mm')
                  : undefined,
                returnTime: values.returnTime
                  ? dayjs(values.returnTime).format('YYYY/MM/DD HH:mm')
                  : undefined,
                title: dayjs().format('YYYYMMDDHHmmss拼车房'),
                isSave: true,
              };
              createOrUpdateCarRoom(formatted);
            }}
          >
            暂存
          </Button>
        )}
      </div>
    </Form>
  );
};

export default CarAndRoom;
