import './theme/App.scss';
// components
import Header from './components/Header';
import Footer from './components/Footer';
import CarSearch from './components/CarSearch';

function App() {
  return (
    <>
      <Header title="Welcome to the app!" cssClasses="columns is-mobile is-centered px-4 mb-0" />
      <CarSearch cssClasses="columns is mobile is-centered is-multiline p-5"/>
      <Footer cssClasses="has-text-centered" />
    </>
  );
}

export default App;
