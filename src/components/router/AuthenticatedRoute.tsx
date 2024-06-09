import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginVerify } from '@app/api/auth.api';

const Authentication = (Component: React.FC) => {
  return (props: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      loginVerify()
        .then((response) => {
          // If the call is successful, do nothing and render the component
        })
        .catch((error) => {
          // If the call fails, redirect to the login page
          navigate('/auth/login');
        });
    }, [navigate]);

    // @ts-ignore
    return <Component {...props} />;
  };
};

export default Authentication;
