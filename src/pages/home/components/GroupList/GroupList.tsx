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

// 本地数据类型定义，用于适配 GroupItem 组件
interface LocalGroupItem {
  id: string;
  title: string;
  location: string;
  time: string;
  carType?: string;
  people: number;
  left: number;
  remark?: string;
  type: 'car' | 'room' | 'car-room';
}

const GroupList = () => {
  // 使用 useRequest 调用 queryGroupList
  const { data, loading, error, run } = useRequest(
    async () => {
      const result = await queryGroupList();
      return result;
    },
    {
      manual: false, // 自动执行
      onSuccess: (result) => {
        console.log('团购列表加载成功:', result);
      },
      onError: (error) => {
        console.error('团购列表加载失败:', error);
      },
    }
  );

  // 将 API 数据转换为本地组件需要的格式
  const transformGroupData = (apiData: any): LocalGroupItem[] => {
    if (!apiData?.data) return [];
    
    return apiData.data.map((item: any) => ({
      id: item.id,
      title: item.title || '未命名团购',
      location: `${item.creator?.name || '未知'} 发起的${getGroupTypeText(item.groupType)}`,
      time: formatTime(item.creationTime),
      carType: item.groupType === 'Car' ? '车型待定' : undefined,
      people: item.targetNumber || 0,
      left: Math.max(0, (item.targetNumber || 0) - (item.currentNumber || 0)),
      remark: item.description || '',
      type: getGroupType(item.groupType),
    }));
  };

  // 获取团购类型文本
  const getGroupTypeText = (groupType: string) => {
    switch (groupType) {
      case 'Car': return '拼车';
      case 'Room': return '拼房';
      case 'CarRoom': return '拼车房';
      default: return '拼团';
    }
  };

  // 获取团购类型
  const getGroupType = (groupType: string): 'car' | 'room' | 'car-room' => {
    switch (groupType) {
      case 'Car': return 'car';
      case 'Room': return 'room';
      case 'CarRoom': return 'car-room';
      default: return 'car';
    }
  };

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
      date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : undefined,
    };
    console.log('筛选表单提交:', formatted);
    // TODO: 这里可以添加筛选逻辑，重新调用 API
    // run(formatted);
  };

  // 转换后的数据
  const groupListData = transformGroupData(data);

  return (
    <>
      <Form
        className={styles.form}
        layout="horizontal"
        onFinish={handleFormSubmit}
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

        {!loading && !error && groupListData.length === 0 && (
          <Empty
            description="暂无团购信息"
            style={{ padding: '40px 0' }}
          />
        )}

        {!loading && !error && groupListData.length > 0 && (
          groupListData.map((item) => (
            <GroupItem key={item.id} item={item} />
          ))
        )}
      </div>
    </>
  );
};

export default GroupList;
