
const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
  };
  
  const isEmpty = (string) => {
    if(!string) return true;
    if (String(string).trim() === '') return true;
    else return false;
  };

  const isNotLogin = (string) => {
    console.log(string)
    let logins = ['googleId', 'facebookId', 'mobile'];
      let ind = logins.indexOf(string);
      if(ind === -1) return true;
      else return false;
  };


  exports.validateLoginData = (data) => {
    let errors = {};
  
    if (isEmpty(data.id)) errors.id = 'ID Must not be empty';
    if (isEmpty(data.type)) errors.type = 'User type must not be empty';
    if (isNotLogin(data.loginType)) errors.loginType = 'Login type must be valid';
    if (isEmpty(data.loginType)) errors.loginType = 'Login type must not be empty';

  
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };


  exports.validateSetupData = (data) => {
    let errors = {};
    
    if (isEmpty(data.id)) errors.id = 'ID Must not be empty';
    if (isEmpty(data.type)) errors.type = 'User type must not be empty';
    if (isNotLogin(data.loginType)) errors.loginType = 'Login type must be valid';
    if (isEmpty(data.loginType)) errors.loginType = 'Login type must not be empty';

    
    return {
      errors,
      valid: Object.keys(errors).length === 0 ? true : false
    };
  };
  