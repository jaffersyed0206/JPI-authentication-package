const ServiceChecker = require('./checkers/servicechecker');
const NullProject = require('./checkers/nullProject');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
let JPIAuth = {
    projectApi: "",
    currentUserUid: "",
    serivceInitialization(Json) {
     return new Promise((resolve, reject) => {
        ServiceChecker(Json) !== null ? reject(ServiceChecker(Json)) : 
        this.projectApi = Json.projectapi;
        resolve(true);
     })
    },
    registerFunction: function(val) {},
    checkAuthStatus: function(listner) {
        this.registerFunction = listner
    },
    RegisterMethods: {
      registerUserEmailAndPassword(email, password, firstname, lastname, username , usertoken ,mapJson) {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
                  if (email === null || password === null) {
                     reject("Your email and password parameters cannot be empty")
                  }
                  if (typeof email !== "string" || typeof password !== "string") {
                    reject("Your email and/or password parameters are not string values")
                  }
                  if (firstname !== null || lastname !== null || username !== null || usertoken !== null) {
                      if (typeof firstname !== "string" || typeof lastname !== "string" || typeof username !== "string" || typeof usertoken !== "string") {
                          reject("Make sure that your parameters for the `firstname`, `lastname` or `username` are all strings.")
                      }
                  }
                  const mapNames = []
                  if (mapJson !== undefined) {
                    if (typeof mapJson !== "object") {
                        reject("Your mapJson value is not a object");
                    }
                    let object = Object.keys(mapJson);
                    for (let i = 0; i < object.length; i++) {
                        mapNames.push(object[i]);
                    }
                  }

                  let visuals = mapJson;
                  visuals["username"] = username;
                  visuals["password"] = password;
                  visuals["firstname"] = firstname;
                  visuals["lastname"] = lastname;
                  visuals["email"] = email;
                  visuals["usertoken"] = usertoken;

                  const data = {
                      email: email,
                      password: password,
                      firstname: firstname,
                      lastname: lastname,
                      username: username,
                      usertoken: usertoken,
                      mapJson: mapJson,
                      mapNames: mapNames,
                      visuals: visuals
                  }

                  const xhr = new XMLHttpRequest();
                  xhr.open("POST", "http://localhost:8080/jpiauth/register/registeremailandpassword/" + JPIAuth.projectApi, true);
                  xhr.onload = function() {
                   const response = JSON.parse(this.responseText);
                       if (response.exists !== true) {
                           reject("Users credentials already exists")
                       } else {
                          resolve(response);
                       }
                  }
                  xhr.setRequestHeader("Accept" , "application/json");
                  xhr.setRequestHeader("Content-Type" , "application/json");
                  xhr.send(JSON.stringify(data));                  
            }, 1000);
          });
      },
      registerUserUsernameAndPassword(username, password, firstname, lastname, email , usertoken , mapJson) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username === null || password === null) {
                    reject("Your username and password parameters cannot be empty")
                 }
                  if (typeof username !== "string" || typeof password !== "string") {
                    reject("Your username and/or password parameters are not string values")
                  }
                  if (firstname !== null || lastname !== null || email !== null || usertoken !== null) {
                      if (typeof firstname !== "string" || typeof lastname !== "string" || typeof username !== "string" || typeof usertoken !== "string") {
                          reject("Make sure that your parameters for the `firstname`, `lastname` or `email` are all strings.")
                      }
                  }
                  const mapNames = []
                  if (mapJson !== undefined) {
                    if (typeof mapJson !== "object") {
                        reject("Your mapJson value is not a object");
                    }
                    let object = Object.keys(mapJson);
                    for (let i = 0; i < object.length; i++) {
                        mapNames.push(object[i]);
                    }
                  }

                  let visuals = mapJson;
                  visuals["username"] = username;
                  visuals["password"] = password;
                  visuals["firstname"] = firstname;
                  visuals["lastname"] = lastname;
                  visuals["email"] = email;
                  visuals["usertoken"] = usertoken;
                  

                  const data = {
                    email: email,
                    password: password,
                    firstname: firstname,
                    lastname: lastname,
                    username: username,
                    usertoken: usertoken,
                    mapJson: mapJson,
                    mapNames: mapNames,
                    visuals: visuals
                  }

                  const xhr = new XMLHttpRequest();
                  xhr.open("POST" , "http://localhost:8080/jpiauth/register/registerusernameandpassword/" + JPIAuth.projectApi, true);
                  xhr.onload = function() {
                    const response = JSON.parse(this.responseText);
                       if (response.exists !== true) {
                           reject("Users credentials already exists")
                       } else {
                          resolve(response);
                       }
                  }
                  xhr.setRequestHeader("Accept" , "application/json");
                  xhr.setRequestHeader("Content-Type" , "application/json");
                  xhr.send(JSON.stringify(data));
            }, 1000);     
        });
      }, 
    },
    AuthMethods: {
      signInEmailAndPassword(email, password) {
          return new Promise((resolve, reject) => {
           setTimeout(() => {
            if (NullProject(JPIAuth.projectApi) == false) {
                reject("This method has not been authorized because of the fact that you have not either ran the serivceInitialization method or the serivceInitialization method came with an error ")
            }
            if (typeof email !== "string" || typeof password !== "string") {
                reject("Your email and/or your password parameter(s) are not string")
            }
            const data = {
                email: email,
                password: password
            }
            const xhr = new XMLHttpRequest();
            xhr.open("POST" ,  "http://localhost:8080/jpiauth/login/signinemailandpassword/" + JPIAuth.projectApi, true);
            xhr.onload = function () {
                const response = JSON.parse(this.responseText);
                if (response.exists !== true) {
                    reject("Error on login request")
                } else {
                    JPIAuth.currentUserUid = response.userid
                    JPIAuth.AuthMethods.currentUser = response;
                    JPIAuth.registerFunction(true);
                   resolve(response);
                }
            }
            xhr.setRequestHeader("Accept" , "application/json");
            xhr.setRequestHeader("Content-Type" , "application/json");
            xhr.send(JSON.stringify(data));
           }, 1000);
          })
      },
      signInUsernameAndPassword(username, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (NullProject(JPIAuth.projectApi) == false) {
                    reject("This method has not been authorized because of the fact that you have not either ran the serivceInitialization method or the serivceInitialization method came with an error");
                }
                if (typeof username !== "string" || typeof password !== "string") {
                    reject("Your username and/or your password parameter(s) are not string");
                }
                const data = {
                    username: username,
                    password: password
                }
                const xhr = new XMLHttpRequest();
                xhr.open("POST" ,  "http://localhost:8080/jpiauth/login/loginusernameandpassword/" + JPIAuth.projectApi, true);
                xhr.onload = function () {
                const response = JSON.parse(this.responseText);
                if (response.exists !== true) {
                    reject("Error on login request")
                } else {
                    JPIAuth.currentUserUid = response.userid
                    JPIAuth.AuthMethods.currentUser = response;
                    JPIAuth.registerFunction(true);
                    resolve(response);
                }
             }
             xhr.setRequestHeader("Accept" , "application/json");
             xhr.setRequestHeader("Content-Type" , "application/json");
             xhr.send(JSON.stringify(data));
            }, 1000);
        })
      },
      logoutUser() {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (NullProject(JPIAuth.projectApi) == false) {
                    reject("This method has not been authorized because of the fact that you have not either ran the serivceInitialization method or the serivceInitialization method came with an error ")
                }
                if (JPIAuth.currentUserUid === "") {
                    reject("There is no user currently signed in")
                }
                const xhr = new XMLHttpRequest();
                xhr.open("GET" , "http://localhost:8080/jpiauth/logout/" + JPIAuth.projectApi + "/" + JPIAuth.currentUserUid, true);
                xhr.onload = function() {
                  const response = JSON.stringify(this.responseText);
                      resolve(response);
                      JPIAuth.registerFunction(false);
                      JPIAuth.currentUserUid = "";
                      JPIAuth.AuthMethods.currentUser = {
                        username: '',
                        email: '',
                        firstname: '',
                        lastname: '',
                        userid: '',
                        usertoken: '',
                        appJson: {}
                      }
                }
                xhr.send();
            }, 1000);
          })
      },
      currentUser: {
          username: '',
          email: '',
          firstname: '',
          lastname: '',
          userid: '',
          usertoken: '',
          appJson: {}
      }
    }
}

JPIAuth.serivceInitialization();

JPIAuth.AuthMethods.


module.exports = JPIAuth;
