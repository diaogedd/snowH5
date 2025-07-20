import React, { useState } from 'react';
import { Form, Input, ImageUploader, Button } from 'antd-mobile';
import { LeftOutline } from 'antd-mobile-icons';
import type { ImageUploadItem } from 'antd-mobile/es/components/image-uploader';
import styles from './meMessage.module.less';

const MeMessage: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    gender: '',
    contact: '',
    region: '',
    birthday: '',
    school: '',
  });
  const [fileList, setFileList] = useState<ImageUploadItem[]>([{
    url: 'https://randomuser.me/api/portraits/women/44.jpg',
  }]);

  const handleChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const mockUpload = async (file: File) => {
    return {
      url: URL.createObjectURL(file),
    };
  };

  const handleFinish = () => {
    console.log('表单提交数据:', form, '头像:', fileList[0]?.url);
    // 可在此处发起 API 请求
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className={styles.meMsgPage}>
      <div className={styles.headerBar}>
        <Button fill='none' onClick={handleBack} className={styles.backBtn}>
          <LeftOutline fontSize={24} />
        </Button>
        <span className={styles.pageTitle}>个人信息</span>
      </div>
      <Form className={styles.formBox} onFinish={handleFinish} mode='default'>
        <Form.Item label="头像">
          <ImageUploader
            value={fileList}
            onChange={setFileList}
            upload={async (file) => ({ url: URL.createObjectURL(file) })}
            maxCount={1}
          />
        </Form.Item>
        <Form.Item label="名字">
          <Input name="name" clearable className={styles.inputStyle} />
        </Form.Item>
        <Form.Item label="性别">
          <Input name="gender" clearable className={styles.inputStyle} />
        </Form.Item>
        <Form.Item label="联系方式">
          <Input name="contact" clearable className={styles.inputStyle} />
        </Form.Item>
        <Form.Item label="地区">
          <Input name="region" clearable className={styles.inputStyle} />
        </Form.Item>
        <Form.Item label="生日">
          <Input name="birthday" clearable className={styles.inputStyle} />
        </Form.Item>
        <Form.Item label="学校">
          <Input name="school" clearable className={styles.inputStyle} />
        </Form.Item>
        <Button className={styles.saveBtn} color='primary' type="submit">保存</Button>
      </Form>
    </div>
  );
};

export default MeMessage; 