class Model 
{
  constructor () 
  {
    this.players = 
    [
      {
        name: "Jim Hoskins",
        score: 31,
        id: 1,
      },
      {
        name: "Andree Hoskins",
        score: 35,
        id: 2,
      },
      {
        name: "Alena Hoskins",
        score: 42,
        id: 3,
      },
    ];
     this.totalScore = 0;
     this.inputValue = "";     
     this.callback = null;
  }

  subscribe(render) 
  {
     this.callback = render;
  }

  notify() 
  {
     this.callback();
  }

  addPlayer(name) 
  {
    this.players.push(
      {
       name: name,
       score: 0,
       id: this.players.length + 1,
       
      });
    this.inputValue = "";
    this.notify();
 }

 suma(players)
 {
   let suma = 0;
   for(let i in players)
   {
      suma += players[i].score;
   }
   this.totalScore = suma;
   return this.totalScore;
 }
}

const Header = ({model}) => 
{
  return (
    <div className="header">
      <Stats model={model} />
      <Stopwatch />
    </div>
  )
}

const Stats = ({ model }) => 
{
  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{model.players.length}</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{model.suma(model.players)}</td>
        </tr>
      </tbody>
    </table>
  )
}

const Stopwatch = () => 
{
  return (
    <div className="stopwatch">
      <h2>Stopwatch</h2>
      <h1 className="stopwatch-time">0</h1>
      <button>Start</button><button>Reset</button>
    </div>
  )
}
const PlayerList = ({ model }) => 
{
  const list = model.players.map((item, index) => 
  {
    return (
      <div key={item.id} className="player">
        <label className="player-name">{item.name}</label>
        <div className="player-score counter">
          <button className="counter-action decrement">-</button><label className="counter-score">{item.score}</label><button className="counter-action increment">+</button>
        </div>
      </div>
    );
  });
  return (
    <div>
      {list}
    </div>
  )
}

const PlayerForm = () => 
{
  return (
    <div className="add-player-form">
    <form onSubmit={e => {
               e.preventDefault();
               model.addPlayer(model.inputValue);
      }}
    >
      <input type="text" placeholder="Enter a Name" value={model.inputValue} onChange={e => {(model.inputValue = e.target.value);
      model.notify()}} />
      <input type="submit" value ="Add Player"/>
    </form>
    </div>
  )
}

const Application = ({title, model}) => 
{
  return (
    <div>
      <h1>{title}</h1>
      <Header model={model} />
      <PlayerList model={model} />
      <PlayerForm />
    </div>
  );
}

let model = new Model();

let render = () => 
{
  ReactDOM.render(<Application title="Scoreboard"
  model={model} />, document.getElementById('container'));
};

model.subscribe(render); 

render(); 