import { NavBar, SpinLoading } from 'antd-mobile';
import { useParams } from 'react-router-dom';
import { GROUP_TYPE } from '../../const';
import { queryGroupByID } from '../../api/api';
import { useRequest } from 'ahooks';
import CarForm from '../home/components/SendGroup/CarForm';
import RoomForm from '../home/components/SendGroup/RoomForm';
import CarAndRoomForm from '../home/components/SendGroup/CarAndRoom';

export const UpdateGroup = () => {
  const { type, id } = useParams<{ type: keyof typeof GROUP_TYPE; id: string }>();

  const { data, loading } = useRequest(async () => {
    const result = await queryGroupByID({ id: id || '' });
    return result;
  });

  return (
    <div>
      <NavBar onBack={() => window.history.back()}>更新 {type ? GROUP_TYPE[type] : '拼团'}</NavBar>
      {loading && <SpinLoading />}
      {type === 'Car' && <CarForm initData={data} actionType="update" />}
      {type === 'Room' && <RoomForm initData={data} actionType="update" />}
      {type === 'CarAndRoom' && <CarAndRoomForm initData={data} actionType="update" />}
    </div>
  );
};
