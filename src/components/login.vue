<template>
  <div class="login-page">
    <div class="login-background">
      <div class="overlay-image"></div>
    </div>
    <div class="login-form">
      <!-- <div class="mini-logo">
        <center><img src="./img/Logotemp.svg" alt="Mini Logo"></center>
      </div> -->


      <div v-if="!SignUp">
    <!-- <br><br><br><br> -->
      <div class="p-5">
       
          <h1 ><center><strong class="h5 secondary-text mb-4">Login into your account</strong></center></h1>
      
        <form class="user" @submit.prevent="login" >
          <div class="form-group">
            <input type="email" class="form-control  form-control-user"  v-model="email" id="email" placeholder="Enter Email Address..." required>
          </div>
          <div class="form-group password-container">
          <input
            type="password"
            class="form-control  form-control-user"
            v-model="password"
            id="password"
            placeholder="Enter Password"
            required
          >
         
          <i class="fa password-toggle" @click="togglePasswordVisibility" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
          </div>
          <div class="login-section">
            <div class="custom-control custom-checkbox small">
          <input type="checkbox" class="custom-control-input" id="customCheck" v-model="rememberMe">
          <label class="custom-control-label small-text" for="customCheck">Remember Me</label>
        

          </div>
          <button class="login-button">
            <span v-if="loading">
          <i class="fa fa-spinner fa-spin"></i> Logging In...
        </span>
        <span v-else>Login</span>
          </button> 
        </div>
        </form>
         
       
          <hr>
          <div class="login-section">
            <div class="login-divider"></div>
            <div style="font-size: 12px; color: #fff">Or Sign in with</div>
            <div class="login-divider"></div>
          </div>
          <hr>
          
          <div class="google-button-container">
      <GoogleLogin :callback="handleLoginResponse"/><br>
    </div>

    <center><div class="btn btn-facebook btn-user btn-block" style="width: 225px; height: 38px; padding-top: 8px; font-size: 13px;" @click="logInWithFacebook">
       Login with Facebook <i class="fab fa-facebook-f fa-fw"></i>
    </div></center>
          
          <br>
         
          <!-- <a href="index.html" class="btn btn-facebook btn-user btn-block">
              <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
          </a> -->

         <center> <div style="font-size: 12px; color: #fff">Not Sign Up yet? <span @click="SignUpPage" style="font-size: 12px; color: #46edf9; cursor: pointer;">Sign Up</span> here!.</div></center>

      </div>
      </div>

      
       <div v-else-if="SignUp">
        <div class="login-form">
          <div class="p-5">
        <br>

        <center><div style="font-size: 14px; color: #fff">Sign Up </div></center>
        <hr>
        <form class="user" @submit.prevent="Register">
                  <div class="form-group">
            <input type="signupemail" class="form-control"  
            v-model="Signupemail" id="signupemail"
             placeholder="Enter Email Address..."
             style="font-size: 14px;" 
             required
             
             >
          </div>


          <div class="form-group form-group1">
            <select v-model="selectedCountryCode" class="country-toggle">
              <option v-for="(country, index) in countryCodes" :key="index" 
                      :value="country.code" @click="selectCountry(country.code)"
                      style="width: 100px; border: none; border-color: #fff;"
              >{{ country.name }} {{ country.code }}</option>
            </select>
            <input type="tel" class="form-control" maxlength="11" id="phone" v-model="Signupephone" style="text-indent: 80px; font-size: 14px;"
                  pattern="[0-9]*">
           
          </div>


          
            <div class="form-group password-container">
          <input
            type="password"
            class="form-control "
            v-model="signuppassword"
            id="password"
            placeholder="Enter Password"
            style="font-size: 14px;"
            required
          >
         
          <i class="fa password-toggle" @click="togglePasswordVisibility" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
          </div>

          <div class="form-group password-container">
          <input
            type="password"
            class="form-control "
            v-model="signuppasswordconfirm"
            id="passwordconfirm"
            placeholder="Confirm Password"
            style="font-size: 14px;"
            required
          >
         
          <i class="fa password-toggle" @click="togglePasswordVisibility3" :class="showPassword3 ? 'fa-eye-slash' : 'fa-eye'"></i>
          </div>
          <button class="signup-button" :disabled="loading">
            Sign Up
          </button>
       
        </form>
        
          <hr>
          <center> <div style="font-size: 12px; color: #fff">Already Sign Up? <span @click="SignUp = false" style="font-size: 12px; color: #46edf9; cursor: pointer;">Login in</span> here!.</div></center>
          
        </div>
        </div>
       </div>


    </div>
  </div>
</template>

<script>
import axios from 'axios';
//import router from '../router';
import {decodeCredential} from 'vue3-google-login';



export default {
  name: 'login-name',
  data() {
    return {

      loggedIn:false,
      user:null,
      email: '',
      password: '',
      notification: null,
      showSuccessMessage: false,
      errorMessage: '',
      successMessage: '',
      showPassword: false,
      showPassword1: false,
      showPassword2: false,
      showPassword3: false,
      rememberMe: false,
      loading: false,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      showNewPasswordForm: false,
      SignUp: false,
      passwordPattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/,
      holdToken: '',

      phoneNumber: '',
      selectedCountryCode: '+972', 
      countryCodes: [
    {
        "code": "+7 840",
        "name": "AB"
    },
    {
        "code": "+93",
        "name": "AF"
    },
    {
        "code": "+355",
        "name": "AL"
    },
    {
        "code": "+213",
        "name": "DZ"
    },
    {
        "code": "+1 684",
        "name": "AS"
    },
    {
        "code": "+376",
        "name": "AD"
    },
    {
        "code": "+244",
        "name": "AO"
    },
    {
        "code": "+1 264",
        "name": "AI"
    },
    {
        "code": "+672",
        "name": "AQ"
    },
    {
        "code": "+1 268",
        "name": "AG"
    },
    {
        "code": "+54",
        "name": "AR"
    },
    {
        "code": "+374",
        "name": "AM"
    },
    {
        "code": "+297",
        "name": "AW"
    },
    {
        "code": "+61",
        "name": "AU"
    },
    {
        "code": "+43",
        "name": "AT"
    },
    {
        "code": "+994",
        "name": "AZ"
    },
    {
        "code": "+1 242",
        "name": "BS"
    },
    {
        "code": "+973",
        "name": "BH"
    },
    {
        "code": "+880",
        "name": "BD"
    },
    {
        "code": "+1 246",
        "name": "BB"
    },
    {
        "code": "+375",
        "name": "BY"
    },
    {
        "code": "+32",
        "name": "BE"
    },
    {
        "code": "+501",
        "name": "BZ"
    },
    {
        "code": "+229",
        "name": "BJ"
    },
    {
        "code": "+1 441",
        "name": "BM"
    },
    {
        "code": "+975",
        "name": "BT"
    },
    {
        "code": "+591",
        "name": "BO"
    },
    {
        "code": "+387",
        "name": "BA"
    },
    {
        "code": "+267",
        "name": "BW"
    },
    {
        "code": "+55",
        "name": "BR"
    },
    {
        "code": "+246",
        "name": "IO"
    },
    {
        "code": "+1 284",
        "name": "VG"
    },
    {
        "code": "+673",
        "name": "BN"
    },
    {
        "code": "+359",
        "name": "BG"
    },
    {
        "code": "+226",
        "name": "BF"
    },
    {
        "code": "+257",
        "name": "BI"
    },
    {
        "code": "+855",
        "name": "KH"
    },
    {
        "code": "+237",
        "name": "CM"
    },
    {
        "code": "+1",
        "name": "CA"
    },
    {
        "code": "+238",
        "name": "CV"
    },
    {
        "code": "+1 345",
        "name": "KY"
    },
    {
        "code": "+236",
        "name": "CF"
    },
    {
        "code": "+235",
        "name": "TD"
    },
    {
        "code": "+56",
        "name": "CL"
    },
    {
        "code": "+86",
        "name": "CN"
    },
    {
        "code": "+61",
        "name": "CX"
    },
    {
        "code": "+61",
        "name": "CC"
    },
    {
        "code": "+57",
        "name": "CO"
    },
    {
        "code": "+269",
        "name": "KM"
    },
    {
        "code": "+242",
        "name": "CG"
    },
    {
        "code": "+243",
        "name": "CD"
    },
    {
        "code": "+682",
        "name": "CK"
    },
    {
        "code": "+506",
        "name": "CR"
    },
    {
        "code": "+385",
        "name": "HR"
    },
    {
        "code": "+53",
        "name": "CU"
    },
    {
        "code": "+599",
        "name": "CW"
    },
    {
        "code": "+357",
        "name": "CY"
    },
    {
        "code": "+420",
        "name": "CZ"
    },
    {
        "code": "+45",
        "name": "DK"
    },
    {
        "code": "+253",
        "name": "DJ"
    },
    {
        "code": "+1 767",
        "name": "DM"
    },
    {
        "code": "+1 849",
        "name": "DO"
    },
    {
        "code": "+1 829",
        "name": "DO"
    },
    {
        "code": "+670",
        "name": "TL"
    },
    {
        "code": "+593",
        "name": "EC"
    },
    {
        "code": "+20",
        "name": "EG"
    },
    {
        "code": "+503",
        "name": "SV"
    },
    {
        "code": "+240",
        "name": "GQ"
    },
    {
        "code": "+291",
        "name": "ER"
    },
    {
        "code": "+372",
        "name": "EE"
    },
    {
        "code": "+251",
        "name": "ET"
    },
    {
        "code": "+500",
        "name": "FK"
    },
    {
        "code": "+298",
        "name": "FO"
    },
    {
        "code": "+679",
        "name": "FJ"
    },
    {
        "code": "+358",
        "name": "FI"
    },
    {
        "code": "+33",
        "name": "FR"
    },
    {
        "code": "+594",
        "name": "GF"
    },
    {
        "code": "+689",
        "name": "PF"
    },
    {
        "code": "+241",
        "name": "GA"
    },
    {
        "code": "+220",
        "name": "GM"
    },
    {
        "code": "+995",
        "name": "GE"
    },
    {
        "code": "+49",
        "name": "DE"
    },
    {
        "code": "+233",
        "name": "GH"
    },
    {
        "code": "+350",
        "name": "GI"
    },
    {
        "code": "+30",
        "name": "GR"
    },
    {
        "code": "+299",
        "name": "GL"
    },
    {
        "code": "+1 473",
        "name": "GD"
    },
    {
        "code": "+590",
        "name": "GP"
    },
    {
        "code": "+1 671",
        "name": "GU"
    },
    {
        "code": "+502",
        "name": "GT"
    },
    {
        "code": "+44",
        "name": "GG"
    },
    {
        "code": "+224",
        "name": "GN"
    },
    {
        "code": "+245",
        "name": "GW"
    },
    {
        "code": "+592",
        "name": "GY"
    },
    {
        "code": "+509",
        "name": "HT"
    },
    {
        "code": "+379",
        "name": "VA"
    },
    {
        "code": "+504",
        "name": "HN"
    },
    {
        "code": "+852",
        "name": "HK"
    },
    {
        "code": "+36",
        "name": "HU"
    },
    {
        "code": "+354",
        "name": "IS"
    },
    {
        "code": "+91",
        "name": "IN"
    },
    {
        "code": "+62",
        "name": "ID"
    },
    {
        "code": "+98",
        "name": "IR"
    },
    {
        "code": "+964",
        "name": "IQ"
    },
    {
        "code": "+353",
        "name": "IE"
    },
    {
        "code": "+44",
        "name": "IM"
    },
    {
        "code": "+972",
        "name": "IL"
    },
    {
        "code": "+39",
        "name": "IT"
    },
    {
        "code": "+225",
        "name": "CI"
    },
    {
        "code": "+1 876",
        "name": "JM"
    },
    {
        "code": "+81",
        "name": "JP"
    },
    {
        "code": "+44",
        "name": "JE"
    },
    {
        "code": "+962",
        "name": "JO"
    },
    {
        "code": "+7 7",
        "name": "KZ"
    },
    {
        "code": "+254",
        "name": "KE"
    },
    {
        "code": "+686",
        "name": "KI"
    },
    {
        "code": "+965",
        "name": "KW"
    },
    {
        "code": "+996",
        "name": "KG"
    },
    {
        "code": "+856",
        "name": "LA"
    },
    {
        "code": "+371",
        "name": "LV"
    },
    {
        "code": "+961",
        "name": "LB"
    },
    {
        "code": "+266",
        "name": "LS"
    },
    {
        "code": "+231",
        "name": "LR"
    },
    {
        "code": "+218",
        "name": "LY"
    },
    {
        "code": "+423",
        "name": "LI"
    },
    {
        "code": "+370",
        "name": "LT"
    },
    {
        "code": "+352",
        "name": "LU"
    },
    {
        "code": "+853",
        "name": "MO"
    },
    {
        "code": "+389",
        "name": "MK"
    },
    {
        "code": "+261",
        "name": "MG"
    },
    {
        "code": "+265",
        "name": "MW"
    },
    {
        "code": "+60",
        "name": "MY"
    },
    {
        "code": "+960",
        "name": "MV"
    },
    {
        "code": "+223",
        "name": "ML"
    },
    {
        "code": "+356",
        "name": "MT"
    },
    {
        "code": "+692",
        "name": "MH"
    },
    {
        "code": "+596",
        "name": "MQ"
    },
    {
        "code": "+222",
        "name": "MR"
    },
    {
        "code": "+230",
        "name": "MU"
    },
    {
        "code": "+262",
        "name": "YT"
    },
    {
        "code": "+52",
        "name": "MX"
    },
    {
        "code": "+691",
        "name": "FM"
    },
    {
        "code": "+373",
        "name": "MD"
    },
    {
        "code": "+377",
        "name": "MC"
    },
    {
        "code": "+976",
        "name": "MN"
    },
    {
        "code": "+382",
        "name": "ME"
    },
    {
        "code": "+1 664",
        "name": "MS"
    },
    {
        "code": "+212",
        "name": "MA"
    },
    {
        "code": "+258",
        "name": "MZ"
    },
    {
        "code": "+95",
        "name": "MM"
    },
    {
        "code": "+264",
        "name": "NA"
    },
    {
        "code": "+674",
        "name": "NR"
    },
    {
        "code": "+977",
        "name": "NP"
    },
    {
        "code": "+31",
        "name": "NL"
    },
    {
        "code": "+687",
        "name": "NC"
    },
    {
        "code": "+64",
        "name": "NZ"
    },
    {
        "code": "+505",
        "name": "NI"
    },
    {
        "code": "+227",
        "name": "NE"
    },
    {
        "code": "+234",
        "name": "NG"
    },
    {
        "code": "+683",
        "name": "NU"
    },
    {
        "code": "+672",
        "name": "NF"
    },
    {
        "code": "+850",
        "name": "KP"
    },
    {
        "code": "+1 670",
        "name": "MP"
    },
    {
        "code": "+47",
        "name": "NO"
    },
    {
        "code": "+968",
        "name": "OM"
    },
    {
        "code": "+92",
        "name": "PK"
    },
    {
        "code": "+680",
        "name": "PW"
    },
    {
        "code": "+970",
        "name": "PS"
    },
    {
        "code": "+507",
        "name": "PA"
    },
    {
        "code": "+675",
        "name": "PG"
    },
    {
        "code": "+595",
        "name": "PY"
    },
    {
        "code": "+51",
        "name": "PE"
    },
    {
        "code": "+63",
        "name": "PH"
    },
    {
        "code": "+64",
        "name": "PN"
    },
    {
        "code": "+48",
        "name": "PL"
    },
    {
        "code": "+351",
        "name": "PT"
    },
    {
        "code": "+1 787",
        "name": "PR"
    },
    {
        "code": "+974",
        "name": "QA"
    },
    {
        "code": "+262",
        "name": "RE"
    },
    {
        "code": "+40",
        "name": "RO"
    },
    {
        "code": "+7",
        "name": "RU"
    },
    {
        "code": "+250",
        "name": "RW"
    },
    {
        "code": "+590",
        "name": "BL"
    },
    {
        "code": "+290",
        "name": "SH"
    },
    {
        "code": "+1 869",
        "name": "KN"
    },
    {
        "code": "+1 758",
        "name": "LC"
    },
    {
        "code": "+590",
        "name": "MF"
    },
    {
        "code": "+508",
        "name": "PM"
    },
    {
        "code": "+1 784",
        "name": "VC"
    },
    {
        "code": "+685",
        "name": "WS"
    },
    {
        "code": "+378",
        "name": "SM"
    },
    {
        "code": "+239",
        "name": "ST"
    },
    {
        "code": "+966",
        "name": "SA"
    },
    {
        "code": "+221",
        "name": "SN"
    },
    {
        "code": "+381",
        "name": "RS"
    },
    {
        "code": "+248",
        "name": "SC"
    },
    {
        "code": "+232",
        "name": "SL"
    },
    {
        "code": "+65",
        "name": "SG"
    },
    {
        "code": "+1 721",
        "name": "SX"
    },
    {
        "code": "+421",
        "name": "SK"
    },
    {
        "code": "+386",
        "name": "SI"
    },
    {
        "code": "+677",
        "name": "SB"
    },
    {
        "code": "+252",
        "name": "SO"
    },
    {
        "code": "+27",
        "name": "ZA"
    },
    {
        "code": "+500",
        "name": "GS"
    },
    {
        "code": "+82",
        "name": "KR"
    },
    {
        "code": "+211",
        "name": "SS"
    },
    {
        "code": "+34",
        "name": "ES"
    },
    {
        "code": "+94",
        "name": "LK"
    },
    {
        "code": "+249",
        "name": "SD"
    },
    {
        "code": "+597",
        "name": "SR"
    },
    {
        "code": "+47",
        "name": "SJ"
    },
    {
        "code": "+268",
        "name": "SZ"
    },
    {
        "code": "+46",
        "name": "SE"
    },
    {
        "code": "+41",
        "name": "CH"
    },
    {
        "code": "+963",
        "name": "SY"
    },
    {
        "code": "+886",
        "name": "TW"
    },
    {
        "code": "+992",
        "name": "TJ"
    },
    {
        "code": "+255",
        "name": "TZ"
    },
    {
        "code": "+66",
        "name": "TH"
    },
    {
        "code": "+670",
        "name": "TL"
    },
    {
        "code": "+228",
        "name": "TG"
    },
    {
        "code": "+690",
        "name": "TK"
    },
    {
        "code": "+676",
        "name": "TO"
    },
    {
        "code": "+1 868",
        "name": "TT"
    },
    {
        "code": "+216",
        "name": "TN"
    },
    {
        "code": "+90",
        "name": "TR"
    },
    {
        "code": "+993",
        "name": "TM"
    },
    {
        "code": "+1 649",
        "name": "TC"
    },
    {
        "code": "+688",
        "name": "TV"
    },
    {
        "code": "+256",
        "name": "UG"
    },
    {
        "code": "+380",
        "name": "UA"
    },
    {
        "code": "+971",
        "name": "AE"
    },
    {
        "code": "+44",
        "name": "GB"
    },
    {
        "code": "+1",
        "name": "US"
    },
    {
        "code": "+598",
        "name": "UY"
    },
    {
        "code": "+998",
        "name": "UZ"
    },
    {
        "code": "+678",
        "name": "VU"
    },
    {
        "code": "+39",
        "name": "VA"
    },
    {
        "code": "+58",
        "name": "VE"
    },
    {
        "code": "+84",
        "name": "VN"
    },
    {
        "code": "+681",
        "name": "WF"
    },
    {
        "code": "+967",
        "name": "YE"
    },
    {
        "code": "+260",
        "name": "ZM"
    },
    {
        "code": "+263",
        "name": "ZW"
    }
],



    };
  },

 created() {


    const rememberedEmail = localStorage.getItem('rememberedEmail');
  const rememberedPassword = localStorage.getItem('rememberedPassword');

  if (rememberedEmail && rememberedPassword) {
    this.email = rememberedEmail;
    this.password = rememberedPassword;
    this.rememberMe = true; 
  }
  },

  async mounted () {
    try{
      await this.loadFacebookSDK(document, 'script', 'facebook-jssdk')
   await this.initFacebook()
    if (this.$store.state.auth.redirect) {
      localStorage.setItem('redirect', this.$store.state.auth.redirect)
    }

    }catch(error){
      console.log(error)

    }
    
  },


  methods: {

    async fetchUserData() {
  window.FB.api('/me', { fields: 'name, email' }, (userData) => {
    if (userData && !userData.error) {
      console.log('User data:', userData);
      const email = userData.email;
      const name = userData.name;
       console.log('Email:', email);
       console.log('Name:', name);
       sessionStorage.setItem('withpic', 'false');
       sessionStorage.setItem('withName', 'true');
        sessionStorage.setItem('fullname', name);
      
        this.ValidateEmail(email);
    } else {
      console.error('Error fetching user data:', userData.error);
    }
  });
},

  // Method to request email permission
  requestEmailPermission() {
    window.FB.login((response) => {
      if (response.authResponse) {
        // Email permission granted, fetch user data
        this.fetchUserData();
      } else {
        console.log('User cancelled email permission request.');
      }
    }, { scope: 'email' });
  },

    async logInWithFacebook() {
  // Trigger Facebook login dialog
  window.FB.login((response) => {
    if (response.authResponse) {
      // User is logged in
      // console.log('Logged in Successfully', response);
      this.holdToken = response.authResponse.accessToken;
      // console.log('Token gotten',response.authResponse.accessToken);

      // Check if the email permission is granted
      window.FB.api('/me/permissions', (permissionsResponse) => {

        console.log('permission response',permissionsResponse);
       
        if (permissionsResponse && !permissionsResponse.error) {
          const emailPermission = permissionsResponse.data.find(permission => permission.permission === 'email');
          if (emailPermission && emailPermission.status === 'granted') {
            
            this.fetchUserData();
          } else {
            // Email permission is not granted, re-prompt the user to grant it
            this.requestEmailPermission();
          }
        } else {
          console.error('Error fetching permissions:', permissionsResponse.error);
        }
      });
    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  },{ scope: 'email' });
},

    async initFacebook() {
      // Initialize Facebook SDK
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: '2382395061951503', // Your Facebook App ID
          cookie: true,
          xfbml: true,
          version: 'v12.0'
        });
      };
    },
    async loadFacebookSDK() {
      // Dynamically load Facebook SDK script asynchronously
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    },

  
    selectCountry(code) {
      this.selectedCountryCode = code;
    },


    async Register(event) {
      event.preventDefault();

      const form = event.target;

 
const EmailInput = document.getElementById('signupemail');
const PhoneInput = document.getElementById('phone');


if (!EmailInput || !PhoneInput) {
  EmailInput.setCustomValidity("Email or Phone input elements are missing.");
  return;
}

if (EmailInput.value === "") {
  EmailInput.setCustomValidity("Email is required!");
  form.reportValidity();
  return;
}

if (PhoneInput.value === "") {
  PhoneInput.setCustomValidity("Phone is required!");
  form.reportValidity();
  return;
}

if (!/^\d+$/.test(this.Signupephone)) {
    PhoneInput.setCustomValidity("Invalid phone format! Only numbers are allowed.");
    form.reportValidity();
    return;
  }




this.loading = true;
EmailInput.setCustomValidity("");
PhoneInput.setCustomValidity("");

if (!form.checkValidity()) {
  form.reportValidity();
  return;
}

EmailInput.setCustomValidity("");
PhoneInput.setCustomValidity("");

if (!form.checkValidity()) {
  form.reportValidity();
  return;
}

      if (this.signuppassword !== this.signuppasswordconfirm) {
    this.$toast.open({
      message: 'Passwords do not match',
      type: 'warning',
      duration: 3000,
    });
  } else if (!this.isPasswordComplex(this.signuppassword)) {
    this.$toast.open({
      message: 'At least One Uppercase,One Lowercase ,One Number and One Special character is required',
      type: 'warning',
      duration: 6000,
    });
  } else if (this.signuppassword.length < 8) {
    this.$toast.open({
      message: 'Password must be more than or equal to 8 characters',
      type: 'warning',
      duration: 6000,
    });
  }else {

    try{
      const response = await axios.get(`${this.$config.GETUSERDETAILS_ENDPOINT}/${this.Signupemail}`);

      console.log('email gotten',response.data.Email);
      
      if( response.status == 200 && response.data.Email === this.Signupemail){
        this.SignUp = false;
        this.$toast.open({
              message: `This Email already exist, please login using your credentials`,
              type: 'warning', 
              duration: 3000, 
            });
      }

    } catch(error){
      try {
    const response = axios.post(this.$config.ADDUSER_ENDPOINT, {
      Email: this.Signupemail,
      Phone: this.selectedCountryCode + this.Signupephone,
      FullName: this.Signupemail,
      Password: this.signuppassword
    });
    if (response.status == 200) {
      
      this.$toast.open({
              message: `You have Sign Up successfully, please login`,
              type: 'success', 
              duration: 3000, 
            });
            this.SignUp = false;
        
        } else {
          this.SignUp = false;
          this.$toast.open({
              message: `You have Sign Up successfully, please login`,
              type: 'success', 
              duration: 3000, 
            });
        }
  } catch (error) {
  if (error.response && error.response.data && error.response.data.message) {
    this.$toast.open({
              message: error.response.data.message,
              type: 'warning', 
              duration: 3000, 
            });
  } else {
    this.$toast.open({
              message: `An error occurred during login. Please try again later.`,
              type: 'error', 
              duration: 3000, 
            });
  }

  setTimeout(() => {
    this.errorMessage = ''; 
  }, 3000);

  console.error(error);

}
    }

    }
this.loading = false;

    },

    async ValidateEmail(email){
      try{
      const response = await axios.get(`${this.$config.GETUSERDETAILS_ENDPOINT}/${email}`);

      console.log('email gotten',response.data.Email);
      
      if( response.status == 200 && response.data.Email === email){
        this.$router.push('/dashboard');
        sessionStorage.setItem('UserId', response.data.ID);
        sessionStorage.setItem('Email', response.data.Email);
        sessionStorage.setItem('token', this.holdToken);
        this.$toast.open({
              message: `You have Logged in successfully`,
              type: 'success', 
              duration: 3000, 
            });
      } 
    } catch(error){
      console.log('User not found when checked',error);
      this.SignUp = true;
        this.$toast.open({
              message: `Please sign up to continue`,
              type: 'warning', 
              duration: 3000, 
            });
    }
    },

    handleLoginResponse(response) {
      try {
        console.log('Logged in');
        console.log(response);
        
        this.user = decodeCredential(response.credential);
        sessionStorage.setItem('picture', this.user.picture);
        sessionStorage.setItem('withpic', 'true');
        sessionStorage.setItem('fullname', this.user.name);
        this.holdToken = response.credential;
        this.ValidateEmail(this.user.email);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    },

    SignUpPage(){
     this.SignUp = true;
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
      const passwordInput = document.getElementById('password');

      if (this.showPassword) {
        passwordInput.type = 'text';
      } else {
        passwordInput.type = 'password';
      }
    },

    togglePasswordVisibility1() {
      this.showPassword1 = !this.showPassword1;
      const passwordInput = document.getElementById('currentPassword');

      if (this.showPassword1) {
        passwordInput.type = 'text';
      } else {
        passwordInput.type = 'password';
      }
    },

    togglePasswordVisibility2() {
      this.showPassword2 = !this.showPassword2;
      const passwordInput = document.getElementById('newPassword');

      if (this.showPassword2) {
        passwordInput.type = 'text';
      } else {
        passwordInput.type = 'password';
      }
    },

    togglePasswordVisibility3() {
      this.showPassword3 = !this.showPassword3;
      const passwordInput = document.getElementById('passwordconfirm'); 

      if (this.showPassword3) {
        passwordInput.type = 'text';
      } else {
        passwordInput.type = 'password';
      }
    },
    
  async login(event) {

    event.preventDefault();
  const form = event.target;

 
  const EmailInput = document.getElementById('email');
  const PasswordInput = document.getElementById('password');


  if (!EmailInput || !PasswordInput) {
    EmailInput.setCustomValidity("Email or Password input elements are missing.");
    return;
  }

  if (EmailInput.value === "") {
    EmailInput.setCustomValidity("Email is required!");
    form.reportValidity();
    return;
  }

  if (PasswordInput.value === "") {
    PasswordInput.setCustomValidity("Password is required!");
    form.reportValidity();
    return;
  }

  this.loading = true;
  EmailInput.setCustomValidity("");
  PasswordInput.setCustomValidity("");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  EmailInput.setCustomValidity("");
  PasswordInput.setCustomValidity("");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  try {
    const response = await axios.post(this.$config.USERLOGIN_ENDPOINT, {
      Email: this.email,
      Password: this.password
    });

    console.log('Response gotten',response)
    if(response.status == 200){
      
      console.log('Logged in');
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('withpic', 'false');
      sessionStorage.setItem('withName', 'false');
      sessionStorage.setItem('Email', response.data.Email);
      sessionStorage.setItem('UserId', response.data.ID);
      this.$router.push('/dashboard');
      this.$toast.open({
              message: `You have Logged in successfully`,
              type: 'success', 
              duration: 3000, 
            });
     
    } else{
     
      this.$toast.open({
              message: `User does not exist or Invalid Credentials`,
              type: 'error', 
              duration: 3000, 
            });
    }
    

  
  } catch (error) {
    this.loading = false;
   console.log(error);
   this.$toast.open({
              message: `user does not exist or Invalid Credentials`,
              type: 'error', 
              duration: 3000, 
            });
  }
  },

    showNotification(message, type) {
      this.notification = {
        message,
        type
      };
      alert(message);
    },


    async resetPassword(event) {
  event.preventDefault();


  if (this.newPassword !== this.confirmPassword) {
    this.$toast.open({
      message: 'Passwords do not match',
      type: 'warning',
      duration: 3000,
    });
  } else if (!this.isPasswordComplex(this.newPassword)) {
    this.$toast.open({
      message: 'At least One Uppercase,One Lowercase ,One Number and One Special character is required',
      type: 'warning',
      duration: 6000,
    });
  } else {
    this.loading = true;

    try {
   
      const response = await axios.put(this.$config.RESETPASSWORD_ENDPOINT, {
        email: this.email,
        previousPassword: this.currentPassword,
        newPassword: this.newPassword,
      });

      if (response.data.message === 'Password updated successfully.') {
        this.showNewPasswordForm = false;
        this.$toast.open({
          message: 'Password reset successful. You can now log in with your new password.',
          type: 'success',
          duration: 3000,
        });
        this.$router.push('/login'); 
      } else if (response.data.message === 'New password must be different from the previous password.') {
        this.$toast.open({
          message: 'New password must be different from the previous password.',
          type: 'warning',
          duration: 3000,
        });
      } 
      else {
        this.$toast.open({
          message: 'Password reset failed. Please check your current password.',
          type: 'error',
          duration: 3000,
        });
      }
    } catch (error) {
      this.$toast.open({
        message: 'An error occurred during password reset. Please try again later.',
        type: 'error',
        duration: 3000,
      });
      console.error(error);
    }

    this.loading = false;
  }
},

isPasswordComplex(password) {
 
  const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*!])/;
  return passwordPattern.test(password);
},


   
  }
};
</script>




<style>

.form-group1 {
  position: relative; 
}

.form-control {
  padding-right: 90px; 
}

.country-toggle {
  position: absolute;
  top: 50%; 
  right: 70%; 
  transform: translateY(-50%);
  background: none;
  border: 0px solid #fff;
  margin-bottom: 10px;
  cursor: pointer;
  padding: 0;
  width: 80px;
  height: 35px;
  font-size: 12px;
  z-index: 1; 
}


.country-toggle1 {
  position: absolute;
  top: 42.5%;
  right: 262px; 
  transform: translateY(-50%);
  background: none;
  border: 0px solid #fff; 
  margin-bottom: 10px;
  cursor: pointer;
  padding: 0;
  width: 80px; 
  height: 35px;
  font-size: 12px;
  
}

.signup-button{
  width: 140px;
  height: 33px;
  background-color: #4fa4ff;
  color: #fff;
  border-radius: 5px;
  border: 2px #fff;
  font-size: 14px;
 
}

.login-divider{
  height: 0.5px;
  width: 100px;
  font-size: 10px;
  background-color: #b3b3b3ac;
}

.login-section{
  justify-content: space-between;
  display: flex;
}

.login-button{
  width: 170px;
  height: 35px;
  background-color: #4fa4ff;
  color: #fff;
  border-radius: 5px;
  border: 2px #fff;
}

.google-button-container {
  text-align: center;
}

.custom-google-button {
  background-color: #fff; 
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

.custom-google-button:hover {
  background-color: #c13524; 
}

.goggle-button{
  width: 250px;
  height: 20px;
  background-color: #fff;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 5px;
}

.secondary-text{
  color: #fff;
}
.password-container {
  position: relative;
}

.password-toggle {
  position: absolute;
  top: 50%;
  right: 20px; 
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}



.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
}

.notification.success {
  background-color: green;
}

.notification.error {
  background-color: red;
}

.logo-image {
  background-image: url(./img/HDBG2.jpg);
  min-height: 100vh; 
}


.login-page {
  display: flex;
  height: 100vh;
}

.login-background {
  flex: 2;
  background-image: url('./img/5153829.jpg');
  background-size: cover;
}

.login-form {
  flex: 1;
  background-color: #0c071c;
  padding: 20px;
  position: relative;
  justify-content: center;
  align-items: center;
}

.mini-logo {
  position: absolute;
  top: 30px;
  left: 60px;
  padding: 10px; 
}

.mini-logo img {
  width: 100px; 
  height: auto; 
}

strong {
  color: black; 
  font-weight: bold;
}

.small-text {
  font-size: 12px;
}

.form-control {
  height: 5px;
}

.custombutton:hover {
  background-color: #8C6DFF;
  color: #ffffff;
}

.custombutton {
  display: inline-block;
  font-weight: 400;
  color: #ffffff;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.35rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

form.user .custombutton-user {
  background-color: #8C6DFF;
  font-size: 0.8rem;
  border-radius: 10rem;
  padding: 0.75rem 1rem;
}





.custombutton:hover {
  color: #dfdadae7;
}


.custom-control-input:checked ~ .custom-control-label::before {
  background-color: #8C6DFF;
  border-color: #8C6DFF;
}

.custombutton-block {
  display: block;
  width: 100%;
}

.custombutton-block + .custombutton-block {
  margin-top: 0.5rem;
}

input[type="submit"].custombutton-block,
input[type="reset"].custombutton-block,
input[type="button"].custombutton-block {
  width: 100%;
}

@media (max-width: 1200px) {
  .country-toggle {
  right: 65%; 

}
}

@media (max-width: 900px) {
  .country-toggle {
  right: 40%; 

}
  
}


@media (max-width: 767px) {

  .login-page {
    flex-direction: column-reverse; 
  }

  .country-toggle {
  right: 75%; 

}

 

  .login-background {
    display: none;
  }

  .overlay-image {
    display: none; 
  }

  .login-form {
    flex: 1;
    background-color: #0c071c;
    padding: 20px;
    position: relative;
    justify-content: center;
    align-items: center;
    width: 100%; 
  }

  .mini-logo {
    position: static; 
    padding: 10px; 
    text-align: center; 
    margin-top: 20px; 
  }

  .mini-logo img {
    width: 120px;
    height: auto;
  }
  
  strong {
    color: black;
    font-weight: bold;
  }

  .small-text {
    font-size: 12px;
  }
}




</style>