import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FullyPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
function ProtecteRoute({ children }) {
  const navigate = useNavigate();
  // 1. Load the authenticated user
  const { isAuthenticated, isLoading } = useUser();

  // 2. if there is no authenticated user, redirect to login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login');
  }, [isAuthenticated, isLoading, navigate]);
  // 3. while Loading show a spinner
  if (isLoading)
    return (
      <FullyPage>
        <Spinner />
      </FullyPage>
    );
  // 4. if there is  authenticated user, render the app
  if (isAuthenticated) return children;
}

export default ProtecteRoute;
