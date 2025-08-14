import styled from '@emotion/styled';

export const Root = styled.div`
  display: flex;
  min-height: 100vh;
   display: 'flex',
    height: '100vh',
    overflow: 'hidden',
`;

export const Sidebar = styled.div(({ theme }) => ({
  width: '250px',
  padding: theme.spacing(3),
  borderRight: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.mode === 'dark' ? '#050519' : '#33363F',
  color: '#ffffff',
  [theme.breakpoints.down('sm')]: {
    display: 'none', // Hide on mobile
  },
  marginLeft: '20px',marginTop: '20px',marginBottom: '20px', borderRadius: '10px'
}));

export const TopBar = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  backgroundColor: theme.palette.mode === 'dark' ? '#282C34' : '#33363F',
  color: '#ffffff',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

export const MainContent = styled.div(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
}));

export const ChatPaper = styled.div(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  minHeight: '300px',
  backgroundColor: theme.palette.background.paper,
}));

export const HistoryBox = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));


