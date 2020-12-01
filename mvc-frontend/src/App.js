import React from 'react';
import axios from 'axios';
import './App.css'
import Modal from 'react-modal'
import { Pagination } from '@material-ui/lab'

Modal.setAppElement('#root')

const customStyles = {
  content : {
    top         : '30%',
    left        : '50%',
    right       : 'auto',
    bottom      : 'auto',
    marginRight : '-50%',
    padding     : '5%',
    transform   : 'translate(-50%, -50%)',
    background  : '#76b0a7',
    borderRadius: '5px'
  }
};

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      loading: true,
      AddStudent:false,
      students: [],
      Name: "",
      Blood_Group:"",
      Email: "",
      City : "",
      Image_Link :"",
      Gender : "",
      IsUpdate: false,
      page:1,
      totalCount: 0,
      _id : ""
    }
  }



  componentDidMount = () => {
    axios.get( `http://localhost:5000/api/user/?page=${this.state.page}&limit=${"6"}`).then(res => {
      this.setState({
        students: res.data.current,
        loading: false,
        totalCount: res.data.totalCount
      })
    })
  }

  FinalChange = () => {
    axios.get(`http://localhost:5000/api/user/?page=${this.state.page}&limit=${"6"}`).then(res => {
      this.setState({
        students: res.data.current,
        loading: false,
        totalCount: res.data.totalCount
      })
    })
  }

  handleDelete = (id) => {
    axios({
      method: "delete",
      url: "http://localhost:5000/api/user/delete/" + id
    })
      .then((res) => this.FinalChange())
      .catch((err) => console.log(err));
  };

  OnAdd = () => {
    this.setState({AddStudent: true})
    const { Name, Blood_Group, Email, City, Image_Link, Gender} = this.state
    const data = new FormData()
      data.append("Name", Name )
      data.append("Blood_Group", Blood_Group )
      data.append("Email", Email )
      data.append("City", City )
      data.append("Image_Link", Image_Link )
      data.append("Gender", Gender )

    axios({
      method: "post",
      url: "http://localhost:5000/api/user/add",
      data: data,
      headers: {
          "Content-Type": "application/json"
      }
      }).then(res => {
          this.setState({students: [...this.state.students, res.data]})
      })
      .catch(err => {
        console.log(err)
      })
  }

  onChange = (e) => {
    const { Name, Blood_Group, Email, City, Image_Link, Gender} = this.state
    const {name, value, type, files} = e.target
    console.log(name, value, type, files)
    if(type == "file"){
      this.setState({[name] : files[0]})
    }
    else{
      this.setState({[name] : value })
    }
  }
 

  PageChange= async (e,value)=>{
    await this.setState({page:value})
    axios.get(`http://localhost:5000/api/user/?page=${value}&limit=5`)
    .then(res => {
        this.setState({
            students: [...res.data.current],
            totalCount: res.data.totalCount
        })
    })
    .catch(err => console.log(err))
  }


  

  HandleUpdate = ( e, id)  => {
    e.preventDefault()
    const { Name, Blood_Group, Email, City, Image_Link, Gender, _id} = this.state
    axios({
      method: "post",
      url: "http://localhost:5000/api/user/update/" + _id ,
      data: {
          Name: Name,
          City: City,
          Image_Link: Image_Link,
          Gender: Gender,
          Blood_Group: Blood_Group,
          Email: Email
      },
      headers: {
          "Content-Type": "application/json"
      }
      }).then(res => {
          this.setState({IsUpdate: false})
          this.FinalChange()
      })
      .catch(err => {
        console.log(err)
      })
  }

  ModalVisible = (e, item) => {
    this.setState({
      Name: item.Name,
      Email: item.Email,
      Blood_Group: item.Blood_Group,
      City: item.City,
      Gender: item.Gender,
      Image_Link: item.Image_Link,
      _id: item._id
    })
    this.setState({IsUpdate: true})
  }

  convertLink =(str)=>{
    let i = str.indexOf("uploads")
    if(i === -1){
      return str
    }
    let link = "http://localhost:5000/" + str.slice(i,str.length+1)
    return link
  }

  render(){
    const {students, totalCount, loading, AddStudent, IsUpdate, Name, Blood_Group, Email, Image_Link, City, Gender} = this.state
    return (
      <div className = "App">
        <div className="navBar" >
        <button onClick={this.OnAdd}>+</button>
        </div>
        <div  >
        {loading ? ( <p>Students are Loading...</p> )
          :
          students.map(item=> (
            <section style={{width: "500px"}} className="card-list" key={item._id}>
              <article className="card">
                <header className="card-header">
                  <p>{item.Email}</p>
                  <h2>{item.Name}</h2>
                </header>
        
                <div className="card-author">
                  <a className="author-avatar" href="#">
                    <img src={
                      this.convertLink(item.Image_Link )} />
                  </a>
                  <div className="blood">
                    <div className="blood-prefix">Blood Group: {" "} {item.Blood_Group}</div>
                    <div className="blood-prefix">Gender: {" "} {item.Gender}</div>
                    <div className="blood-prefix">City: {" "} {item.City}</div>
                </div>
                </div>
                <div className="btn-div">
                 <button onClick={(e) => this.handleDelete(item._id)} >Delete</button>
                 <button onClick={(e) => this.ModalVisible(e, item)}>Edit</button>
                 
                 <Modal isOpen={IsUpdate} onRequestClose={()=> this.setState({IsUpdate: false})} style={customStyles}>
                    <form onSubmit={(e) => this.HandleUpdate(e, item._id) } >
                        <label >Name:</label><br/>
                        <input name="Name" value={Name} onChange={this.onChange} type="text"/><br/>
                        <label >Blood Group:</label><br/>
                        <input name="Blood_Group" value={Blood_Group} onChange={this.onChange} type="text" /><br/>
                        <label >Email:</label><br/>
                        <input name="Email" value={Email} onChange={this.onChange} type="text" /><br/>
                        <label >City:</label><br/>
                        <input name="City" value={City} onChange={this.onChange} type="text"/><br/>
                        <label>Image Link:</label><br/>
                        <input name="Image_Link" onChange={this.onChange} type="file" /><br/>
                        <label >Gender:</label><br/>
                        <input name="Gender" value={Gender} onChange={this.onChange} type="text" /><br/>
                        <input value="update" type="submit" />
                    </form>
                 </Modal>

                </div>
              </article>
            </section>
          
          ))
        }
        </div>
         
          <Modal isOpen={AddStudent} onRequestClose={()=> this.setState({AddStudent: false})} style={customStyles}>
            <form onSubmit={this.OnAdd}>
                <label >Name:</label><br/>
                <input name="Name" value={this.state.Name} onChange={this.onChange} type="text"/><br/>
                <label>Blood Group:</label><br/>
                <input name="Blood_Group" value={this.state.Blood_Group} onChange={this.onChange} type="text" /><br/>
                <label>Email:</label><br/>
                <input name="Email" value={this.state.Email} onChange={this.onChange} type="text" /><br/>
                <label>City:</label><br/>
                <input name="City" value={this.state.City} onChange={this.onChange} type="text"/><br/>
                <label >Image Link:</label><br/>
                <input name="Image_Link"  onChange={this.onChange} type="file" /><br/>
                <label >Gender:</label><br/>
                <input name="Gender" value={this.state.Gender} onChange={this.onChange} type="text" /><br/>
                <input type="submit" /> 
            </form>
          </Modal>

          <Pagination className="pagination" count={Math.ceil(totalCount / 5)} variant="outlined" page={this.state.page} onChange={this.PageChange}  />
        {/* <Route path="/login" comonent={Login}/> */}
        {/* <Link to="/login"/> */}
      </div>
    );
  }
}

export default App