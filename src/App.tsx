import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { authPages, pages } from './pages';
import Login from './pages/login';
import { fetchUsers } from './store/actions/userActions';
import { userLoginWithToken } from './store/reducers/userReducer';
import { path } from './utils/consts';

function App() {
  const { auth, users } = useAppSelector(state => state.user);

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  
  useEffect(() => {
    if (users.length > 1) {
      dispatch(userLoginWithToken(localStorage.getItem('token') || ''))
    }
  }, [users])

  return (
    <div className="App h-100">
      <Routes>

        {
          !auth ?
            <>
              {
                pages.map((el: any, idx: number) => (
                  <Route key={idx} path={el.path} element={el.element} />
                ))
              }
              <Route path='*' element={<Login />} />
            </> :
            <>
              {
                authPages.map((el: any, idx: number) => (
                  <Route key={idx} path={el.path} element={el.element} />
                ))
              }
              <Route path="*" element={<Navigate to={path.CONTACTS} replace />} />
            </>
        }

      </Routes>
    </div>
  );
}

export default App;
