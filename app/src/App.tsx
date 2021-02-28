import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import tw, { css, styled } from 'twin.macro'
import Disclaimer from './Pages/Survey/Disclaimer';
import Survey from './Pages/Survey/Survey';
import Statistics from './Pages/Admin/Statistics';
import Controllcenter from './Pages/Admin/Controllcenter';

function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <Switch>
          <Route exact path="/disclaimer">
            <Disclaimer />
          </Route>
          <Route exact path="/survey">
            <Survey />
          </Route>
          <Route exact path="/admin/controllcenter">
            <Controllcenter />
          </Route>
          <Route exact path="/admin/statistics">
            <Statistics />
          </Route>
          <Redirect from="/" to="/survey" />
          <Route>
            <Survey />
          </Route>
        </Switch>
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div(() => [
  tw`
    min-h-screen justify-center items-center flex
    bg-gradient-to-t from-indigo-500 to-indigo-100
  `
])