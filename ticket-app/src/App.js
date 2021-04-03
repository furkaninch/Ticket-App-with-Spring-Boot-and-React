import { HashRouter as Router, Switch , Route, Redirect } from 'react-router-dom';

import HomePage from './pages/HomePage';
import TopBar from './components/TopBar';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateTicket from './pages/CreateTicket';
import MyTicketsPage from './pages/MyTicketsPage';
import TicketUpdatePage from './pages/TicketUpdatePage';
import Footer from './components/Footer';

const App = () => {

  const {isLoggedIn} = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn
  }));

  return (
    <div>
      <Router>
        <TopBar />
        <Switch>
          <Route exact path = "/" component = {HomePage}/>
          {!isLoggedIn && <Route path = "/login" component = {LoginPage}/>}
          {!isLoggedIn && <Route path = "/register" component = {RegisterPage}/>}
          {isLoggedIn && <Route path = "/createticket" component= {CreateTicket}/>}
          {isLoggedIn && <Route path = "/mytickets" component= {MyTicketsPage}/>}
          {isLoggedIn && <Route path = "/updateticket" component= {TicketUpdatePage}/>}
          <Redirect to = "/"/>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
