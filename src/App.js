import './App.css';
import WeatherApp from "./components/WeatherApp"
//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

function App() {
  return (
    <div className="app">
      <WeatherApp/>
    </div>
  );
}

export default App;
