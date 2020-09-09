import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button type = "danger">Click me</Button>
        <PrimaryButton type = "primary">Click me</PrimaryButton>
        <DangerousButton >Click me</DangerousButton>

      </header>
    </div>
  );
}


function Button(props) {
  const buttonStyle = {};
  buttonStyle["--border-radius"] = "10px";
  return <button className="Button" style={buttonStyle}>{props.children}</button>
}

function PrimaryButton(props) {
  const buttonStyle = {};
  buttonStyle["--normal-background"] = "blue";
  buttonStyle["--hover-background"] = "darkblue";
  buttonStyle["--active-background"] = "lightblue";
  buttonStyle["--border-radius"] = "10px";
  return <button className="Button" style={buttonStyle}>{props.children}</button>
}

function DangerousButton(props) {
  const buttonStyle = {};
  buttonStyle["--normal-background"] = "red";
  buttonStyle["--hover-background"] = "darkred";
  buttonStyle["--active-background"] = "pink";
  buttonStyle["--border-radius"] = "10px";
  return <button className="Button" style={buttonStyle}>{props.children}</button>
}

export default App;
