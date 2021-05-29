import logo from './logo.svg';
import './theme/App.scss';
// components
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header title="Welcome to the app!" />
      <Footer />
    </div>
  );
}

export default App;
