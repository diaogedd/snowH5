import React, { useState } from 'react';
import { Tabs, NavBar, Empty, SpinLoading, Button } from 'antd-mobile';
import { useRequest } from 'ahooks';

import { MyGroupItem } from './MyGroupItem';
import { queryMeGroupList, queryMyGroupPurchase } from '../../../api/api';
import type { GroupPurchaseItem } from '../../../api/api';
import styles from './MeGroup.module.less';
import { useNavigate } from 'react-router-dom';

import { GROUP_STATUS } from '../../../const';

export const MeGroup: React.FC<{ title: string; type: string }> = ({ title, type }) => {
  const [activeTab, setActiveTab] = useState('全部');
  const navigate = useNavigate();
  const handleBack = () => {
    window.history.back();
  };
  const useApi = type === 'create' ? queryMeGroupList : queryMyGroupPurchase;
  // 使用 useRequest 调用 queryMeGroupList
  const { data, loading, error, run, refresh } = useRequest(
    async () => {
      const result = await queryMeGroupList({
        MinPeople: 1,
      });
      return result;
    },
    {
      manual: false, // 自动执行
      onSuccess: (result) => {
        console.log('我的团购列表加载成功:', result);
      },
      onError: (error) => {
        console.error('我的团购列表加载失败:', error);
      },
    },
  );

  const onEdit = (id: string, type: string) => {
    navigate(`/update-group/${type}/${id}`);
  };
  const renderMyGroupItem = (item: GroupPurchaseItem) => {
    return (
      <MyGroupItem
        key={item.title || item.id}
        item={item}
        onEdit={onEdit}
        type={type}
        onRefresh={refresh}
      />
    );
  };
  return (
    <div className={styles.container}>
      <NavBar onBack={handleBack} className={styles.navbar}>
        {title}
      </NavBar>

      <Tabs activeKey={activeTab} onChange={setActiveTab} className={styles.tabs}>
        <Tabs.Tab title="全部" key="全部" />
        <Tabs.Tab title={GROUP_STATUS['NotStarted']} key="NotStarted" />
        <Tabs.Tab title={GROUP_STATUS['InProgress']} key="InProgress" />
        <Tabs.Tab title={GROUP_STATUS['Closed']} key="Closed" />
        <Tabs.Tab title={GROUP_STATUS['Success']} key="Success" />
      </Tabs>

      <div className={styles.groupList}>
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

        {!loading && !error && (!data?.items || data.items.length === 0) && (
          <Empty description="暂无团购信息" style={{ padding: '40px 0' }} />
        )}

        {!loading && !error && data?.items && data.items.length > 0 && (
          <>
            {activeTab === '全部' && data?.items?.map((item: any) => renderMyGroupItem(item))}
            {activeTab === 'NotStarted' &&
              data?.items
                ?.filter((item: any) => item.status === 'NotStarted')
                ?.map((item: any) => renderMyGroupItem(item))}
            {activeTab === 'InProgress' &&
              data?.items
                ?.filter((item: any) => item.status === 'InProgress')
                ?.map((item: any) => renderMyGroupItem(item))}
            {activeTab === 'Closed' &&
              data?.items
                ?.filter((item: any) => item.status === 'Closed')
                ?.map((item: any) => renderMyGroupItem(item))}
            {activeTab === 'Success' &&
              data?.items
                ?.filter((item: any) => item.status === 'Success')
                ?.map((item: any) => renderMyGroupItem(item))}
          </>
        )}
      </div>
    </div>
  );
};
