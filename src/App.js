import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HeaderComponent from "./components/header.component";
import FooterComponent from "./components/footer.component";
import usersPage from "./pages/users.page";
import commentsPage from "./pages/comments.page";
import postsPage from "./pages/posts.page";
import { history } from "./helper/history";

function App() {
  return (
    <Router history={history}>
      <div className="App">

        <HeaderComponent />

        <Route exact path="/" component={usersPage} />
        <Route path="/users" component={usersPage} />
        <Route path="/comments" component={commentsPage} />
        <Route path="/posts" component={postsPage} />
        <FooterComponent />
      </div>

    </Router>
  );
}

export default App;
