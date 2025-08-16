import React, { useState } from 'react';

import styles from '../../index.module.less';
import {
  DatePicker,
  Button,
  Badge,
  Checkbox,
  Switch,
  Form,
  Input,
  Space,
  Radio,
  Empty,
  SpinLoading,
} from 'antd-mobile';
import dayjs from 'dayjs';
import { GroupItem } from './GroupItem';
import { useRequest } from 'ahooks';
import { queryGroupList } from '../../../../api/api';
import { isEmpty } from 'lodash';

const GroupList = () => {
  // 使用 useRequest 调用 queryGroupList
  const { data, loading, error, run, refresh } = useRequest(
    async (params?: any) => {
      const result = await queryGroupList({
        ...params,
        MinPeople: 1,
      });
      return result;
    },
    {
      manual: false, // 自动执行
      defaultParams: [{}], // 默认参数
      onSuccess: (result) => {
        console.log('团购列表加载成功:', result);
      },
      onError: (error) => {
        console.error('团购列表加载失败:', error);
      },
    },
  );

  // 格式化时间
  const formatTime = (timeString: string) => {
    if (!timeString) return '时间待定';
    try {
      return dayjs(timeString).format('YYYY.M.D HH:mm');
    } catch {
      return '时间待定';
    }
  };

  // 处理表单提交
  const handleFormSubmit = (values: any) => {
    const formatted = {
      ...values,
      DepartureDate: values.DepartureDate
        ? dayjs(values.DepartureDate).format('YYYY-MM-DD')
        : undefined,
    };
    console.log('筛选表单提交:', formatted);
    // 调用 API 进行筛选
    run(formatted);
  };

  return (
    <div
      style={{
        overflowY: 'auto',
        height: '100vh',
      }}
    >
      <Form className={styles.form} layout="horizontal" onFinish={handleFormSubmit} footer={null}>
        {/* 出发地-目的地-往返 */}
        <div className={styles['filter-row']}>
          <Form.Item name="FromLocation">
            <Input placeholder="出发地" className={styles['filter-input']} />
          </Form.Item>
          <button className={styles['exchange-btn']} type="button">
            ⇄
          </button>
          <Form.Item name="ToLocation">
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
            name="DepartureDate"
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
        <Form.Item name="MinPeople" label="可拼" initialValue={1} extra={<span>人</span>}>
          <Input type="number" min={1} max={100} />
        </Form.Item>
        <Form.Item name="Status" label="团坑状态">
          <Radio.Group>
            <Space direction="horizontal">
              <Radio value="NotStarted">待成团</Radio>
              <Radio value="InProgress">进行中</Radio>
              <Radio value="Completed">已完成</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="GroupType" label="项目" valuePropName="checked">
          <Space direction="horizontal">
            <Checkbox value="Car">车</Checkbox>
            <Checkbox value="Room">房</Checkbox>
            <Checkbox value="CarRoom">车房</Checkbox>
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

      {/* 数据展示区域 */}
      <div className={styles['group-list']}>
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <SpinLoading />
            <div style={{ marginTop: '10px', color: '#999' }}>加载中...</div>
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ color: '#ff4d4f' }}>加载失败，请重试</div>
            <Button
              size="small"
              color="primary"
              style={{ marginTop: '10px' }}
              onClick={() => run()}
            >
              重新加载
            </Button>
          </div>
        )}

        {!loading && !error && data?.items?.length === 0 && (
          <Empty description="暂无团购信息" style={{ padding: '40px 0' }} />
        )}

        {!loading &&
          !error &&
          !isEmpty(data?.items) &&
          data?.items?.map((item) => (
            <GroupItem key={item.title} item={item} onRefresh={refresh} />
          ))}
      </div>
    </div>
  );
};

export default GroupList;
