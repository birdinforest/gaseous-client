import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import * as S from './NewPasswordForm.styles';
import * as Auth from 'components/layouts/auth/AuthLayout.styles';

export const NewPasswordForm: React.FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleSubmit = () => {
    notification.open({
      message: t('common.success'),
      description: t('newPassword.successReset'),
    });

    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <Auth.FormWrapper>
      <Form layout="vertical" onFinish={handleSubmit} requiredMark="optional">
        <Auth.BackWrapper onClick={() => navigate(-1)}>
          <Auth.BackIcon />
          {t('common.back')}
        </Auth.BackWrapper>
        <Auth.FormTitle>{t('newPassword.title')}</Auth.FormTitle>
        <S.Description>{t('newPassword.description')}</S.Description>
        <Auth.FormItem
          name="password"
          label={t('common.password')}
          rules={[{ required: true, message: t('common.passwordError') }]}
        >
          <Auth.FormInputPassword placeholder={t('common.password')} />
        </Auth.FormItem>
        <Auth.FormItem
          name="confirmPassword"
          label={t('common.confirmPassword')}
          dependencies={['password']}
          rules={[
            { required: true, message: t('common.confirmPasswordError') },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t('common.confirmPasswordError')));
              },
            }),
          ]}
          hasFeedback
        >
          <Auth.FormInputPassword placeholder={t('common.confirmPassword')} />
        </Auth.FormItem>
        <Form.Item noStyle>
          <S.SubmitButton type="primary" htmlType="submit">
            {t('newPassword.resetPassword')}
          </S.SubmitButton>
        </Form.Item>
      </Form>
    </Auth.FormWrapper>
  );
};