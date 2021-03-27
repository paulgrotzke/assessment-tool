import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import tw, { styled } from 'twin.macro'
import Survey from './Pages/Survey/Survey'
import Controllcenter from './Pages/Admin/Controllcenter'
import "tailwindcss/tailwind.css"

const App = () => {
  return (
    <Wrapper>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Survey />
          </Route>
          <Route exact path="/admin">
            <Controllcenter />
          </Route>
          <Redirect from="/" to="/" />
        </Switch>
      </BrowserRouter>
    </Wrapper>
  )
}

export default App

const Wrapper = styled.div(() => [
  tw`
    h-screen flex justify-center items-center
    bg-gradient-to-t from-indigo-500 to-indigo-100
  `,
])
