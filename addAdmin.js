
    let url = "http://localhost:3000/admin"
    let change = document.getElementById("change")
    let changeBtn = document.querySelector(".changeBtn")
    let tbody = document.querySelector("tbody")
    showData()
    function allStaff(){
      changeBtn.children[1].classList.remove('active')
      changeBtn.children[0].classList.add('active')
      document.location.reload(true)
    }
    
    function addStaff(){
      change.innerHTML = `
            <div class="form-wrap">
                 <form action="/admin" method="POST">
                      <h1>Add Staff</h1>
                      <input type="text" placeholder="Name" required name="name" >
                      <input type="text" placeholder="Username" required name="username" >
                      <input type="password" placeholder="Password" required  name="password" >
                      <input type="password" placeholder="Confirm Password" required name="conPassword" >
                      <input type="submit" value="Sign Up">
                 </form>
            </div>
      `
      changeBtn.children[0].classList.remove('active')
      changeBtn.children[1].classList.add('active')
    }
    
    
    // show services in page
    function showData(){
       let StaffData = ""
       /*get request*/
       fetch(url)
       .then(res => res.json())
       .then(data => {
             data.forEach(function(item,index){
                  let admin = "No"
                  if(item.isAdmin == "true"){
                    admin = "Yes"
                  }
                  
                  StaffData += `
                        <tr>
                           <td>01</td>
                           <td><img src="../assets/img/icon/user.png" alt=""></td>
                           <td>${item.name}</td>
                           <td>${item.username}</td>
                           <td>${admin}</td>
                           <td>
                              <span class="action_btn">
                                    <a href="#!" onclick="sendData(${index})">Create Admin</a>
                                    <a href="#!" id="${item._id}" onclick="remove(this.id)">Remove</a>
                              </span>
                           </td>
                        </tr>
                  `
             }) 
             tbody.innerHTML = StaffData
        })
        .catch((e)=>{
             console.log(e)
        })
     }
    
    
    
    function sendData(index){
        let obj = {}
        fetch(url)
        .then(res => res.json())
        .then(data => {
               let Data = data[index]
               console.log(Data.name)
               
               obj = {
                 "name":Data.name,
                 "username":Data.username,
                 "isAdmin":"true",
                 "password":Data.password
               }
    
              fetch(url + "/" + Data._id , {
                   method: 'PATCH',
                   headers:{
                           'Content-Type': 'application/json'
                   },
                   body: JSON.stringify(obj),
              })
              .then(res => res.json())
              .then(data => {
                    showData()
              })
              .catch(error => {
                    console.log(error);
              });
            
           showData()
         })
    
    .catch((e)=>{
       console.log(e)
    })
    showData()
}
    
    
    
    
    
    
    // delete function
    function remove(id){
       fetch(url + "/" + id, {
           method: 'DELETE'
       })
       .then(() => {showData()})
       .catch(err => {
           console.error(err)
       });
       showData()
    }