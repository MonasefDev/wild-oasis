import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Button from './ui/Button';
import Heading from './ui/Heading';
import Row from './ui/Row';

function App() {
  const StyledApp = styled.div`
    padding: 3rem;
    background-color: var(--color-brand-200);
  `;
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type="vertical">
          <Row type="horizontal">
            <Heading as="h1">Heading H1</Heading>
            <Button>Click</Button>
            <Button variation="danger" size="large">
              Click here !!
            </Button>
          </Row>
          <Row type="vertical">
            <Heading as="h2">Heading h2</Heading>
            <Heading as="h3">Heading h3</Heading>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
}

export default App;
