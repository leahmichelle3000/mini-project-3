// import React, {Fragment} from 'react';

// class PropsDisplayer extends React.Component {


//     constructor(props) {
//         super(props);
//     this.state={
//         mood:' ok ',
//         hungry: false,
//         greeting: ''
//         };
//         this.returnHelloName=this.returnHelloName.bind(this)
//     };

//     changeMood = (newMood) => {
//         this.setState({mood:newMood})

//     returnHelloName = (greetUser) => {
//             this.setState({greeting:greetUser})
//     };

//     render() {

//         // const stringProps = JSON.stringify(this.props);

//         return (
// <Fragment>


//             <div>this is a state{this.state.mood}<br></br></div>
//             <div><p>{this.state.mood}</p><button onClick={()=>this.changeMood('happy')} 
//             type="button">Click here to change mood</button></div>


// <div><input id="name"{this.state.greeting}/>
// <br></br>
// </div>
//     <p>{{this.state.greeting}}</p>
//     <button onClick=(()=>this.returnHelloName(document.getElementById("name").value))
//     type="button">Click here to be greeted</button></div>

//             <h1>Check out my Props</h1>
//             <h2 style={{"color":this.props.xyz}}>Get to know</h2>
//             <h2>{stringProps}</h2>
//             </div>
//             </Fragment>
//         )
// };
// }
// }

// export default PropsDisplayer;
