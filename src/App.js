import './theme/App.scss';
// components
import Header from './components/Header';
import Footer from './components/Footer';
import CarSearch from './components/CarSearch';

function App() {
  return (
    <>
      <Header title="RentalCars.com" cssClasses="columns is-mobile is-centered px-4 mb-0" />
      <CarSearch cssClasses="columns is mobile is-centered is-multiline p-5" title="Car Hire – Search, Compare &amp; Save"/>
      <Footer cssClasses="has-text-centered" />
    </>
  );
}

export default App;
