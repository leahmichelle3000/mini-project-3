import logo from './logo.svg';
import './App.css';
// import PropsDisplayer from './component/PropsDisplayer';

function App() {
  // const name = "Leah";
  // const idx = 3;
  // const element = <img src={user.avatarUrl} />;



return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <img src={user.avatarUrl} /> */}
        <div><PropsDisplayer age={["egg","fruit","water"]} www="777" xyz="cyan"></PropsDisplayer></div>
        {/* <p id={idx}>
          Edit and save to reload.{formatName(user)}
        </p> */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
      
          Learn React
        </a>
      </header>
    </div>
  );
}




export default App;
