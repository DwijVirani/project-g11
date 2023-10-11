const { loginService, getUserByUsername, registerService } = require('../../services/driverService');

const validateRegisterUser = (userData) => {
  if (!userData.full_name || userData.full_name === '') {
    return {
      validation: false,
      errorMessage: 'Full name is required',
    };
  } else if (!userData.email || userData.email === '') {
    return {
      validation: false,
      errorMessage: 'Email is required',
    };
  } else if (!userData.username || userData.username === '') {
    return {
      validation: false,
      errorMessage: 'Username is required',
    };
  } else if (!userData.password || userData.password === '') {
    return {
      validation: false,
      errorMessage: 'Password is required',
    };
  } else if (!userData.gender || userData.gender === '') {
    return {
      validation: false,
      errorMessage: 'Gender is required',
    };
  } else if (!userData.phone || userData.phone === '') {
    return {
      validation: false,
      errorMessage: 'Phone number is required',
    };
  } else if (userData.phone.length !== 10) {
    return {
      validation: false,
      errorMessage: 'Phone number must me 10 digits',
    };
  } else if (!userData.vehicle_model || userData.vehicle_model === '') {
    return {
      validation: false,
      errorMessage: 'Vehicle Model is required',
    };
  } else if (!userData.vehicle_color || userData.vehicle_color === '') {
    return {
      validation: false,
      errorMessage: 'Vehicle Color is required',
    };
  } else if (!userData.license_plate_number || userData.license_plate_number === '') {
    return {
      validation: false,
      errorMessage: 'License Plate is required',
    };
  } else {
    return {
      validation: true,
    };
  }
};

const checkUsername = async (userData) => {
  try {
    const user = await getUserByUsername(userData.username);
    if (user) {
      return {
        validation: false,
        errorMessage: 'User name already exists. Please use different username',
      };
    } else {
      return {
        validation: true,
      };
    }
  } catch (error) {
    throw error;
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await loginService(username, password);

    if (result) {
      req.session.user = {
        username: result.username,
        email: result.email,
        role: result.role,
      };
      req.session.isLoggedIn = true;

      return res.redirect('/dashboard');
    } else {
      return res.render('login', { layout: false, errMsg: 'No user with provided credentials found' });
    }
  } catch (error) {
    return res.render('login', { layout: false, errMsg: error.message });
  }
};

const register = async (req, res) => {
  try {
    const payload = req.body;
    const validationResult = validateRegisterUser(payload);
    const usernameValidation = await checkUsername(payload);

    if (validationResult.validation === false) {
      return res.render('register', { layout: false, errMsg: validationResult.errorMessage });
    } else if (usernameValidation.validation === false) {
      return res.render('register', { layout: false, errMsg: usernameValidation.errorMessage });
    }

    const result = await registerService(payload);
    if (result) {
      req.session.user = {
        username: result.username,
        email: result.email,
        role: result.role,
      };
      req.session.isLoggedIn = true;

      return res.redirect('/dashboard');
    } else {
      return res.render('register', { layout: false, errMsg: 'Error Occurred while creating account' });
    }
  } catch (error) {
    return res.render('register', { layout: false, errMsg: error.message });
  }
};
module.exports = {
  login,
  register,
};
