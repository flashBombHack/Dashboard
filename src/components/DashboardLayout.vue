<template>

<body id="page-top">

<div id="wrapper">

 



<!-- Sidebar For Sale Executive bg-gradient  -->
    <ul class="navbar-nav sidebar  accordion shadow-right stroke-right" id="accordionSidebar" style="background-color: #0b130c;">
        <!-- Sidebar - Brand -->
        
   <center> 
    <div style="margin-top: 20px;">
      <img class="custom-icon" src="./img/assests/dashboardicongray.svg" alt="Custom Icon">
    <span class="card-text" style="font-size: 17px; font-weight: bold; color: #fff;">LOGO</span>
  </div>
    </center>



<!-- Nav Item - Utilities Collapse Menu -->
<div class="centered-container">

  <center><div class="profile-image-container">  
        <div v-if="withpic == 'true' && userPic != null">
          <img class="profile-image" :src="userPic" alt="Profile"><br>
        </div>
        <div v-else>
          <img class="profile-image" src="./img/undraw_profile.svg" alt="Profile Image"><br>
        </div>
        <div v-if="withpic == 'false' && withName == 'false'">
          <span style="color: #fff; font-weight: bold; font-size: 12px; margin-top: 5px;">Welcome</span>
        </div>
        <div v-else>
        <span style="color: #fff; font-weight: bold; font-size: 12px; margin-top: 5px;"> {{userFullName}}</span>
      </div>
      </div>
    </center>


      <!-- Nav Item - Sales Dashboard as Card -->
      <router-link v-if="isRouteActive('dashboard')" class="nav-link" to="/dashboard">
  <div class="card-container custom-active">
    <img class="custom-icon" src="./img/assests/Home-icon-black.svg" alt="Custom Icon">
    <span class="card-text">Home</span>
  </div>
</router-link>
<router-link v-else class="nav-link" to="/dashboard">
  <div class="card-container">
    <img class="custom-icon" src="./img/assests/Home-icon-white.svg" alt="Custom Icon">
    <span class="card-text" style="color: #fff;">Home</span>
  </div>
</router-link>

<!-- Nav Item - Sales Business as Card -->
<router-link v-if="isRouteActive('dashboard-plugin')" class="nav-link" to="/plugin">
  <div class="card-container custom-active">
    <img class="custom-icon" src="./img/assests/plugin-black.svg" alt="Custom Icon">
    <span class="card-text">Plugin</span>
  </div>
</router-link>
<router-link v-else class="nav-link" to="/plugin">
  <div class="card-container">
    <img class="custom-icon" src="./img/assests/plugin-white.svg" alt="Custom Icon">
    <span class="card-text" style="color: #fff;">Plugin</span>
  </div>
</router-link>

<router-link v-if="isRouteActive('dashboard-packages')" class="nav-link" to="/packages">
  <div class="card-container custom-active">
    <img class="custom-icon" src="./img/Sales_Assests/business_logo.svg" alt="Custom Icon">
    <span class="card-text">Our Packages</span>
  </div>
</router-link>
<router-link v-else class="nav-link" to="/packages">
  <div class="card-container">
    <img class="custom-icon" src="./img/Sales_Assests/business_graylogo.svg" alt="Custom Icon">
    <span class="card-text" style="color: #fff;">Our Packages</span>
  </div>
</router-link>
   

      <center><div class="logout-card" @click="logout">
        <img class="custom-icon " src="./img/Sales_Assests/logout_icon.svg" alt="Custom Icon">
          <span class="logout-text">Logout</span>
        </div></center>
  </div>

    

    </ul>
  

<!-- Content Wrapper -->
<div id="content-wrapper" class="d-flex flex-column">
    <div id="content">

        <!-- Topbar -->
        <nav class="navbar navbar-expand navbar-light stroke bg-light topbar mb-4 static-top">
            <div v-if="isRouteActive('dashboard')">
            <span class="card-text2">Home</span>
          </div>
          <div v-else-if="isRouteActive('dashboard-plugin')">
            <span class="card-text2">Plugin</span>
          </div>
          <div v-else>
            <span class="card-text2">Packages</span>
          </div>


            <!-- <ul class="navbar-nav ml-auto">
                <div class="profile-card" @click="openProfileModal">
                  <img class="custom-icon" src="./img/Sales_Assests/profileicon.svg" alt="Custom Icon">
                    <span class="profile-text"><strong>My Profile</strong></span>
                </div>


            </ul> -->
     

        </nav>
       
          <slot></slot>


    </div>
        <!-- End of Topbar -->

        <!-- End of Dashboard Global-->
   <!-- Footer -->
  <footer class="sticky-footer bg-light">
        <div class="container my-auto">
            <div class="copyright text-center my-auto">
                <!-- <span>Copyright &copy; Property of SWWIPE FINANCIAL SERVICES LIMITED</span> -->
                <!-- Add Licenced by Central Bank of Nigeria-->
            </div>
        </div>
    </footer>
    <!-- End of Footer -->

</div>
<!-- End of Content Wrapper -->

</div>

</body>


</template>

<script>
import commonScript from './common.js';
import {googleLogout} from 'vue3-google-login'
// import axios from 'axios';

export default {
  name: 'DashboardLayout',
  mixins: [commonScript],
  data() {
    return {
      showPasswordResetDialog: false,
      showProfile: false,
      userPic: 'Default',
      userEmail: '',
      withpic: '',
      withName: '',
      userFullName: '',
      userDepartment: '',
      props: {
        userRole: String,
        firstName: String,
      },
      showPassword: false,
      showPassword2: false,
      confirmshowPassword: false,
      newPassword: '',
    confirmPassword2: '',
    currentPassword: '',
    userDetails: null,
    showProfileDialog: false,
    showlogoutDialog: false,
    isLoading: true,
    };
  },
  async mounted() {
    try{
    await this.getpic();

    }catch(error){
      console.error(error);
    }
    this.withpic = sessionStorage.getItem('withpic');
    this.withName = sessionStorage.getItem('withName');
    
    console.log('With pic',this.withpic);
    this.userEmail = sessionStorage.getItem('email');
    this.userFullName = sessionStorage.getItem('fullname');
    this.loadStyles();
   
    
  },
  computed: {
  isRouteActive() {
    return (routeName) => {
      return this.$route.name === routeName;
    };
  },
  isActiveRoute(menuPath) {
 
  return this.$route.path.startsWith(menuPath);
},

},

methods: {
  async getpic(){
    this.userPic = sessionStorage.getItem('picture');
    console.log('gotton Pic urL',this.userPic);
  },

   logout(){
    googleLogout();
    sessionStorage.removeItem('UserId');
    sessionStorage.removeItem('Email');
    sessionStorage.removeItem('picture');
    sessionStorage.removeItem('withpic');
    sessionStorage.removeItem('fullname');
    sessionStorage.removeItem('token');
    this.$router.push('/login');

   },
},

};

</script>

<style>

@import 'https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i';
@import './css/sb-admin-2.css';
@import './css/sb-admin-2.min.css';
@import './vendor/fontawesome-free/css/all.min.css';

.logout-button {
  background-color: #6F48FF;
  color: #FFF;
  border: none;
  text-align: center;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 20px;
  width: 100px;
  height: 40px;
}

.logout-cancel {
  background-color: #929196;
  color: #FFF;
  border: none;
  padding: 10px 10px;
  font-size: 12px;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 20px;
  width: 100px;
  height: 40px;
}

.modal-text{
  font-size: 12px;
  color: #000;
}

.modal-text2{
  font-size: 10px;
  font-weight: lighter;

}

.custom-modal-width{
  width: 430px;
}

.modal-header-text {
  margin-left: 2px;
  font-size: 15px;
  transition: color 0.3s;
  font-weight: bold;
  color: #000;
}

.profile-card {
  display: flex;
  align-items: center;
  padding: 8px 15px;
  background-color: #F1F3F9;
  color: #000;
  border-radius: 10px;
  font-size: 12px;
  width: 120px;
  height: 30px;
  cursor: pointer;
  margin-top: 0px; /* Adjust margin as needed */
  transition: background-color 0.3s;
  margin-bottom: 0px; 
}

.profile-card:hover{
  background-color: #dfe0e5 ;
}

.user-profile-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0px; /* Adjust margin as needed */
  background-color: #F8F9FC;
  width: 180px;
  border-radius: 3%;
}

.profile-image-container {
 align-items: center;
  border-radius: 20%;
  overflow: hidden;
  margin-bottom: 100px; 
  margin-top: 5px; 
}

.profile-image {
  width: 45px; /* Adjust size as needed */
  height: 45px; /* Adjust size as needed */
  object-fit: cover;
  border-radius: 50%;
}

.status-indicator {
  position: absolute;
  bottom: 0;
  right: 2px;
  width: 10px; /* Adjust size as needed */
  height: 10px; /* Adjust size as needed */
  background-color: #4CAF50; /* Green color */
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 2px; /* Adjust font size as needed */
  z-index: 2;
}

.user-info {
  text-align: center;
  white-space: nowrap; /* Prevent text from breaking into a new line */
  overflow: hidden; /* Hide overflow text */
  text-overflow: ellipsis; /* Display ellipsis (...) when text overflows */
}

.user-name {
  font-size: 12px;
  font-weight: bold;
  color:#000;
}

.user-email {
  font-size: 10px;
  color: #777;
  margin-bottom: 20px; 
}

.logout-card {
  position: fixed;
  display: flex;
  align-items: center;
  padding: 8px 15px;
  background-color: #0b130c;
  color: #fff;
  border-radius: 5px;
  font-size: 12px;
  width: 150px;
  height: 30px;
  cursor: pointer;
  margin-top: 120px; /* Adjust margin as needed */
  transition: background-color 0.3s;
  margin-bottom: 20px; 
}

.custom-icon2 {
  width: 6px; /* Set the width of your custom icon */
  height: 6px; /* Set the height of your custom icon */
  margin-right: 0px; /* Add margin if needed */
}

.logout-card:hover {
  background-color: #333; /* Change background color on hover */
}

.logout-card i {
  margin-right: 8px;
}

.centered-container {
  margin-top: 40px;
  align-items: center;
  justify-content: center;
  height: 100%; /* Make the container take the full height of the sidebar */
}


.custom-icon {
  width: 20px; /* Set the width of your custom icon */
  height: 20px; /* Set the height of your custom icon */
  margin-right: 10px; /* Add margin if needed */
}

.card-container {
  display: flex;
  align-items: center;
  width: 180px;
  height: 30px;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.card-text {
  margin-left: 2px;
  font-size: 12px;
  transition: color 0.3s;
}

.stroke {
  border-bottom: 1px solid #d8d6d6; /* Add a bottom border only */
}

.stroke-right {
  border-right: 1px solid #f1f0f0; /* Add a bottom border only */
}


.card-text2 {
  margin-left: 30px;
  font-size: 12px;
  transition: color 0.3s;
}

.custom-active {
  background-color: #fff; /* Change the background color for the active state */
}

.custom-active .card-text {
  color: #0b0a0c; /* Change the text color for the active state */
}

.resized2-img {
 position: relative;
 right: 0px;
 bottom: 0px;
  width: auto;
  height: 60px; 

}


.custom-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
  transition: all 0.3s ease; 
}


.custom-modal input[type="password"] {
    width: 350px; 
  }

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1000; 
  display: flex;
  justify-content: center;
  align-items: center;
}
  .password-reset-dialog {
    position: absolute;
    top: 50px;
    right: 10px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 20px;
    z-index: 1000;
    border-radius: 8px;
    width: 300px;
  }

.resized-img {
 position: relative;
 right: 0px;
 bottom: 0px;
  width: auto;
  height: 100px; 

}

.bold-white-text {
  font-weight: bold;
  color: white;
  font-size: 12px;
  margin-top: 10px;
}

.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.img-profile {
  width: 60px;
  height: 60px;
  
}

.text-gray-600 {
  font-size: 12px;
  color: gray;

}

.background-image {
  background-image: url(./img/SwwipeBG2.png);
  background-size: cover;
  background-position: center;
  min-height: 50vh; 
}

@media (max-width: 767px) {
 
  .background-image {
    background-size: contain;
    min-height: 30vh;
  }


}

@media (max-width: 575px) {

  .resized-img {

    width: auto;
    height: 30px;
  }


}

</style>