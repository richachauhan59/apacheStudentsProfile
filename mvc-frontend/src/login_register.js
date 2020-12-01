import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import App from './App'

export default class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email: "",
            password: "",
            isSignIn:false,
            isLogin:false,
            cards: false
        }
    }

    handleRegister = (e) => {
        e.preventDefault()
        const {email, password} = this.state
        // this.setState({isRegister : true})
        console.log(email, password)
        axios({
            method : "post",
            url : "http://localhost:5000/api/auth/register",
            data: {
                email: email,
                password: password
            },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
          this.setState({isSignIn: false})

        }).catch(err => {
            console.log(err, err.type)
        })
    }

     handleLogin = (e) => {
        const {email, password} = this.state
        e.preventDefault()
        axios({
            method : "post",
            url : "http://localhost:5000/api/auth/login",
            data: {
                email: email,
                password: password
            },
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            this.setState({cards : true, isLogin: false})
        }).catch(err => {
            console.log(err)
        })
    }

    onChange = (e) => {
      const { email , password} = this.state
      const {name, value} = e.target
      this.setState({[name] : value })
    }
  

    render(){
      const {email, password, isSignIn, isLogin, cards} = this.state
        return(
            <div style={{textAlign:"center"}}>
                {
                  isSignIn ? 

                <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <div >
                    <Avatar >
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Sign in
                    </Typography>
                    <form noValidate>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        autoComplete="email"
                        autoFocus
                      />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                      />
                      <Button
                      onClick={this.handleRegister} type="submit"fullWidth
                      variant="contained" color="primary">Sign In </Button>
                    </form>
                  </div>
                </Container>
                :
                  <Button style={{float:"right", margin:"1%"}}
                  onClick={() => { this.setState({ isSignIn : true})}} type="submit"
                  variant="contained" color="primary">Sign Up </Button>
                  
                }
                
                
                {
                  isLogin ? 
          
                <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <div>
                    <Avatar >
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Login
                    </Typography>
                    <form noValidate>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        autoComplete="email"
                        autoFocus
                      />
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                      />
                      <Button 
                      onClick={this.handleLogin} type="submit"fullWidth
                      variant="contained" color="primary">Submit </Button>
                    </form>
                  </div>
                </Container>
                :
                  <Button style={{float:"right", margin:"1%"}}
                  onClick={() => { this.setState({ isLogin : true})}} type="submit"
                  variant="contained" color="primary">Login </Button>
                }
                {
                  cards ? <App /> : <h1 style={{color:"red"}} >User needs to Login First </h1> 
                }
            </div>
        )
    }
}



