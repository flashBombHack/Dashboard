<template>
    <dashboard-layout>
      
      <center><div class="head-text">Packages</div>
      <div class="subhead-text">Choose your desired plan to get access to our service</div></center>
      <div class="package-cards">
        <center>
        <!-- Freemium Package -->
        <div class="package-card package-border1">
         
        <div class="package-header">FREEMIUM</div>
        <div class="package-text">Starters</div>
        <div class="package-amount1">FREE</div>
          <ul>
            <div class="package-text">Basic features</div>
            <div class="package-text">Limited access</div>
          </ul>
          <div v-if="packageID == 'Freemium'">
            <div class="package-button1X  package-button-text">Active</div>
          </div>
          <div v-else>
          <div class="package-button1 package-button-text" >Free</div>
        </div>
        </div>
    </center>

    <center>
      <div>
    <!-- Silver Package -->
    <div class="package-card package-border2">
      <div class="package-header">STARTER</div>
      <div class="package-text">Basic Plan</div>
      <div class="package-amount2">4$</div>
      <div class="package-text1">MONTHLY</div>
      <ul>
        <div class="package-text">Additional features</div>
        <div class="package-text">More access</div>
      </ul>
      <div v-if="packageID == 'Starter'">
            <div class="package-button2X  package-button-text">Active</div>
          </div>
          <div v-else>
            <div v-if="loading">
          <i class="fa fa-spinner fa-spin" style="margin-top: 150px; font-size: 20px;"></i>
            </div>
            <div v-else>
            <div v-if="isRouteActive('dashboard-packages')">
              <center><div class="mr-2" style="margin-top: 150px;" id="paypal-button-container-starter"></div></center> 
          </div>
        </div>
           
        </div>
    </div>
  </div>
    </center>
        
    <center>
        <!-- Gold Package -->
        <div class="package-card package-border3">

          <div class="package-header">MASTER</div>
          <div class="package-text">For Business</div>
          <div class="package-amount3">5$</div>
          <div class="package-text2">MONTHLY</div>
          <ul>
            <div class="package-text">Premium features</div>
            <div class="package-text">Full access</div>
          </ul>
          <div v-if="packageID == 'Master'">
            <div class="package-button3X  package-button-text">Active</div>
          </div>
          <div v-else>
            <div v-if="loading2">
          <i class="fa fa-spinner fa-spin" style="margin-top: 150px; font-size: 20px;"></i>
            </div>
            <div v-else>
            <div v-if="isRouteActive('dashboard-packages')">
            <center><div class="mr-2" style="margin-top: 150px;" id="paypal-button-container-master"></div></center>
          </div> 
        </div>
        </div>
         
         
        </div>
    </center>
    <center>
        <!-- Diamond Package -->
        <div class="package-card package-border4">
          <div class="package-header">VIP</div>
          <div class="package-text">For Enterprise</div>
          <div class="package-amount4">15$</div>
          <div class="package-text3">MONTHLY</div>
          <ul>
            <div class="package-text">Exclusive features</div>
            <div class="package-text">Unlimited access</div>
          </ul>
          <div v-if="packageID == 'VIP'">
            <div class="package-button4X  package-button-text">Active</div>
          </div>
          <div v-else>
            <div v-if="loading3">
          <i class="fa fa-spinner fa-spin" style="margin-top: 150px; font-size: 20px;"></i>
            </div>
            <div v-else>
            <div v-if="isRouteActive('dashboard-packages')">
            <center><div class="mr-2" style="margin-top: 150px;" id="paypal-button-container-vip"></div></center> 
          </div>
        </div>
        </div>
          
        
        </div>
    </center>
    

      </div>

      <div class="modal-overlay" v-show="showSuccessModal">
    <Modal class="custom-modal custom-modal-width" v-show="showSuccessModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" @click="refreshPage">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>
          <div class="modal-body">


            <div class="center-content3" style="margin-top: 0px;">
        <img class="custom-icon-sizeX mb-4" src="@/components/img/Sales_Assests/checkmark.svg" alt="Custom Icon">
        <div class="write-upX">Payment Successful</div>
        <div class="subhead-text2" style="margin-bottom: 160px; color: #000;">Your payment of <strong>{{ amount }}</strong> was successfull!</div>
       
      
      </div>
            </div>

        </div>
      </div>
    </Modal>
  </div>
    </dashboard-layout>
  </template>
  
  <script>
  import DashboardLayout from './DashboardLayout.vue';
  import axios from 'axios';
 
export default {
  name: 'packages-dashboard',

  components: {
    DashboardLayout,
  },
  data() {
    return {
      resultMessage: "",
      showSuccessModal: false,
      amount: '',
      UserID: '',
      packageID: '',
      paypalButtonVisible: false, 
      paypalButtonInstance1: null,
      paypalButtonInstance2: null,
      paypalButtonInstance3: null,
      RenderSM: false,
      loading: false,
      loading2: false,
      loading3: false,
    };
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
  async mounted() {
    try{
      this.loading = true;
      this.loading2 = true;
      this.loading3 = true;
    await this.GetUserToken();
    if(this.packageID != 'Starter'){
     
    await this.initPaypalStarter();
    }
    if(this.packageID != 'Master'){
      await this.initPaypalMaster();
    }
    if(this.packageID != 'VIP' && this.RenderSM){
      console.log('Starting to render VIP')
      await this.initPaypalVIP();
    }
    
   
    }catch(error){
      console.log('An error was encountered',error);
    }

  },

//   computed: {
//   isRouteActive() {
//     return (routeName) => {
//       return this.$route.name === routeName;
//     };
//   },
// },

  watch: {
    $route() {
     
      if (!this.isRouteActive('dashboard-packages') && this.paypalButtonInstance1 || this.paypalButtonInstance2 || this.paypalButtonInstance3 ) {
        this.paypalButtonInstance1.close();
        this.paypalButtonInstance2.close(); 
        this.paypalButtonInstance3.close();
        this.paypalButtonVisible = false;
      }
    }
  },

  methods: {

    // isRouteActive(routeName) {
    //   return this.$route.name === routeName;
    // },


    refreshPage() {
   this.showSuccessModal = false;
  },

    async GetUserToken(){
      this.UserID = sessionStorage.getItem('UserId');
 
      try{
      const response = await axios.get(`${this.$config.GETUSERTOKEN_ENDPOINT}/${this.UserID }`);

      this.packageID = response.data.Package;
      
    } catch(error){
      console.log(error);
    }
    },

    async updateLicense(subscriptionId, Package){
      this.UserID = sessionStorage.getItem('UserId');
 
      try{
      const response = await axios.put(`${this.$config.UPDATEUSERTOKEN_ENDPOINT}/${this.UserID }`,
      {
        status: 1,
        package: Package,
        subscriptionId: subscriptionId
      });

      if(response.status == 200){
        await this.GetUserToken()
      }
      
    } catch(error){
      console.log(error);
    }

    },

    //Start Package
    async initPaypalStarter() {
      this.loading = false;
      try {
        const response = await fetch(this.$config.CREATESUB_STARTER_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userAction: "SUBSCRIBE_NOW" })
        });

        const data = await response.json();

        if (data?.id) {
          this.resultMessage = `Successful subscription...<br><br>`;
          this.loading = false;
          this.renderPaypalButtonStarter(data.id);
        } else {
          console.error(
            { callback: "createSubscription", serverResponse: data },
            JSON.stringify(data, null, 2)
          );

          const errorDetail = data?.details?.[0];
          this.resultMessage =
            `Could not initiate PayPal Subscription...<br><br>` +
            `${errorDetail?.issue || ""} ${errorDetail?.description || data?.message || ""} ` +
            (data?.debug_id ? `(${data.debug_id})` : "");
        }
      } catch (error) {
        console.error(error);
        this.resultMessage = `Could not initiate PayPal Subscription...<br><br>${error}`;
      }
    },

    renderPaypalButtonStarter(subscriptionId) {
      this.loading = false;
      try {
        const paypalButtonContainer = document.getElementById("paypal-button-container-starter");
        if (!paypalButtonContainer) {
          console.log('Starter button not found');
          return; // Exit if the container is not available (user navigated away)
        }

        console.log('Starting to Render');
        this.RenderSM = true;
        this.paypalButtonInstance1 = window.paypal.Buttons({
          style: {
            shape: "rect",
            layout: "vertical"
          },
          createSubscription: async () => {
            return subscriptionId;
          },
          onApprove: (data) => {
            if (data.orderID) {
              this.resultMessage = `You have successfully subscribed to the plan. Your subscription id is: ${data.subscriptionID}`;
              this.amount = '4$';
              this.showSuccessModal = true;
              const Package = 'Starter';
              this.updateLicense(data.subscriptionID, Package);
            } else {
              this.resultMessage = `Failed to activate the subscription: ${data.subscriptionID}`;
            }
          }
        });

        this.paypalButtonInstance1.render("#paypal-button-container-starter")
          .then(() => {
            this.paypalButtonVisible = true; // Set flag to true when button rendering completes
          });
      } catch (error) {
        console.error("Error rendering PayPal button:", error);
        this.resultMessage = `Could not render PayPal button: ${error}`;
      }
    },

     //Master Package
     async initPaypalMaster() {
      this.loading2 = false;
      try {
        const response = await fetch(this.$config.CREATESUB_MASTER_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userAction: "SUBSCRIBE_NOW" })
        });

        const data = await response.json();

        if (data?.id) {
          this.resultMessage = `Successful subscription...<br><br>`;
          this.renderPaypalButtonMaster(data.id);
        } else {
          console.error(
            { callback: "createSubscription", serverResponse: data },
            JSON.stringify(data, null, 2)
          );

          const errorDetail = data?.details?.[0];
          this.resultMessage =
            `Could not initiate PayPal Subscription...<br><br>` +
            `${errorDetail?.issue || ""} ${errorDetail?.description || data?.message || ""} ` +
            (data?.debug_id ? `(${data.debug_id})` : "");
        }
      } catch (error) {
        console.error(error);
        this.resultMessage = `Could not initiate PayPal Subscription...<br><br>${error}`;
      }
    },

    renderPaypalButtonMaster(subscriptionId) {
      try {
        const paypalButtonContainer = document.getElementById("paypal-button-container-master");
        if (!paypalButtonContainer) {
          console.log('Master button not found');
          return; // Exit if the container is not available (user navigated away)
        }

        console.log('Starting to Render');
        this.RenderSM = true;
        this.paypalButtonInstance2 = window.paypal
        .Buttons({
          style: {
            shape: "rect",
            layout: "vertical"
          },
          createSubscription: async () => {
            return subscriptionId;
          },
          onApprove: (data) => {
            if (data.orderID) {
              this.resultMessage = `You have successfully subscribed to the plan. Your subscription id is: ${data.subscriptionID}`;
              this.amount = '5$'
              this.showSuccessModal = true;
              const Package = 'Master';
              this.updateLicense(data.subscriptionID, Package);
            } else {
              this.resultMessage = `Failed to activate the subscription: ${data.subscriptionID}`;
            }
          }
        });
        this.paypalButtonInstance2.render("#paypal-button-container-master")
          .then(() => {
            this.paypalButtonVisible = true; // Set flag to true when button rendering completes
          });
      } catch (error) {
    console.error("Error rendering PayPal button:", error);
    this.resultMessage = `Could not render PayPal button: ${error}`;
  }

        
    },

     //Master Package
     async initPaypalVIP() {
      this.loading3 = false;
      try {
        const response = await fetch(this.$config.CREATESUB_VIP_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userAction: "SUBSCRIBE_NOW" })
        });

        const data = await response.json();

        if (data?.id) {
          this.resultMessage = `Successful subscription...<br><br>`;
          this.renderPaypalButtonVIP(data.id);
        } else {
          console.error(
            { callback: "createSubscription", serverResponse: data },
            JSON.stringify(data, null, 2)
          );

          const errorDetail = data?.details?.[0];
          this.resultMessage =
            `Could not initiate PayPal Subscription...<br><br>` +
            `${errorDetail?.issue || ""} ${errorDetail?.description || data?.message || ""} ` +
            (data?.debug_id ? `(${data.debug_id})` : "");
        }
      } catch (error) {
        console.error(error);
        this.resultMessage = `Could not initiate PayPal Subscription...<br><br>${error}`;
      }
    },

    renderPaypalButtonVIP(subscriptionId) {
      try {
        const paypalButtonContainer = document.getElementById("paypal-button-container-vip");
        if (!paypalButtonContainer) {
          console.log('VIP button not found');
          return; 
        }
       

        console.log('Starting to Render');
        this.paypalButtonInstance3 = window.paypal
        .Buttons({
          style: {
            shape: "rect",
            layout: "vertical"
          },
          createSubscription: async () => {
            return subscriptionId;
          },
          onApprove: (data) => {
            if (data.orderID) {
              this.resultMessage = `You have successfully subscribed to the plan. Your subscription id is: ${data.subscriptionID}`;
              this.amount = '15$'
              this.showSuccessModal = true;
              const Package = 'VIP';
              this.updateLicense(data.subscriptionID, Package);
            } else {
              this.resultMessage = `Failed to activate the subscription: ${data.subscriptionID}`;
            }
          }
        });
        this.paypalButtonInstance3.render("#paypal-button-container-vip")
          .then(() => {
            this.paypalButtonVisible = true;
          });
      } catch (error) {
    console.error("Error rendering PayPal button:", error);
    this.resultMessage = `Could not render PayPal button: ${error}`;
  }

        
    },


  }

};
</script>
  
  
  <style>

.package-button1X {
    margin-top: 170px;
    width: 190px;
    height: 35px;
    background-color: #2f2e63;
    border: 1.5px solid #2f2e63;
    cursor: pointer;
    border-radius: 4px;
    color: #fff;
    font-weight: bold;
    text-align: center;
    align-items: center;
    padding-top: 6px;
  }

  .package-button2X {
    margin-top: 152px;
    width: 190px;
    height: 35px;
    background-color: #3ab071;
    border: 1.5px solid #3ab071;
    cursor: pointer;
    border-radius: 4px;
    color: #fff;
    font-weight: bold;
    text-align: center;
    align-items: center;
    padding-top: 6px;
  }

  .package-button3X {
    margin-top: 152px;
    width: 190px;
    height: 35px;
    background-color: #47a4f0;
    border: 1.5px solid #47a4f0;
    cursor: pointer;
    border-radius: 4px;
    color: #fff;
    font-weight: bold;
    text-align: center;
    align-items: center;
    padding-top: 6px;
  }
  .package-button4X {
    margin-top: 152px;
    width: 190px;
    height: 35px;
    background-color: #d12b2b;
    border: 1.5px solid #d12b2b;
    cursor: pointer;
    border-radius: 4px;
    color: #fff;
    font-weight: bold;
    text-align: center;
    align-items: center;
    padding-top: 6px;
  }


  .checkmark-icon {
    width: 16px; 
    height: auto;
    margin-right: 5px; 
  }
.write-upX {
    font-size: 17px;
    color: #000;
    font-weight: bold;
  }

.center-content3 {
    text-align: center;
    margin-top: 140px;
    
  }

.small-text {
  font-size: 12px;
  text-align: center;
  color: #777;
}

.modal-text3{
  font-size: 12px;
  font-weight: lighter;

}

.modal-header-text2 {
  margin-left: 2px;
  font-size: 17px;
  transition: color 0.3s;
  font-weight: bold;
  color: #000;
}

.custom-modal-width2{
  width: 450px;
}

.custom-icon-sizeX{
  height: 150px;
  width: auto;
}

.center-content2 {
    text-align: center;
    margin-top: 120px;
    
  }

.custom-icon7 {
  width: 100px; 
  height: auto; 
  margin-right: 0px; 
}
  .package-text{
    font-size: 11px;
  }
  .package-text1{
    font-size: 12px;
    color: #3ab071;
    margin-bottom: 15px;
    font-weight: bold;
  }
  .package-text2{
    font-size: 12px;
    color: #47a4f0;
    margin-bottom: 15px;
    font-weight: bold;
  }
  .package-text3{
    font-size: 12px;
    color: #d12b2b;
    margin-bottom: 15px;
    font-weight: bold;
  }

  .package-amount1{
    font-size: 27px;
    font-weight: bold;
    color: #2f2e63;
    margin-top: 15px;
    margin-bottom: 15px;

  }
  .package-amount2{
    font-size: 27px;
    font-weight: bold;
    color: #3ab071;
    margin-top: 15px;
   

  }
  .package-amount3{
    font-size: 27px;
    font-weight: bold;
    color: #47a4f0;
    margin-top: 15px;
    

  }
  .package-amount4{
    font-size: 27px;
    font-weight: bold;
    color: #d12b2b;
    margin-top: 15px;
    

  }
  
  .package-cards {
    display: flex;
    justify-content: space-between;
    padding: 30px;
    padding-left: 30px;
    padding-right: 60px;
  }
  
  .package-card {
    background-color: transparent;
    border-radius: 5px;
    padding: 20px;
    width: 230px;
    height: 380px;
    transition: transform 0.3s;
  }

  .package-card:hover{
    transform: scale(1.09);
    background-color: #fff;
}

  .package-border1{
    border: 1.5px solid #2f2e63;
  }
  .package-border2{
    border: 1.5px solid #2dab32;
  }
  .package-border3{
    border: 1.5px solid #47a4f0;
  }
  .package-border4{
    border: 1.5px solid #d12b2b;
  }
  
  .package-button {
    margin-top: 150px;
    width: 180px;
    height: 35px;
    background-color: #3ab071;
    color: #fff;
    text-align: center;
    align-items: center;
    padding-top: 6px;
  }

  .package-button1 {
    margin-top: 170px;
    width: 180px;
    height: 35px;
    background-color: transparent;
    border: 1.5px solid #2f2e63;
    color: #000;
    text-align: center;
    align-items: center;
    padding-top: 6px;
  }

  .package-button2 {
    margin-top: 150px;
    width: 180px;
    height: 35px;
    background-color: #3ab071;
    color: #fff;
    text-align: center;
    align-items: center;
    padding-top: 6px;
  }
  .package-button3 {
    margin-top: 150px;
    width: 180px;
    height: 35px;
    background-color: #47a4f0;
    color: #fff;
    text-align: center;
    align-items: center;
    padding-top: 6px;
  }
  .package-button4 {
    margin-top: 150px;
    width: 180px;
    height: 35px;
    background-color: #d12b2b;
    color: #fff;
    text-align: center;
    align-items: center;
    padding-top: 6px;
  }

  .package-button-text{
    font-size: 12px;
  }

  .package-header{
    font-size: 16px;
    font-weight: bold;
    color: #000;
   
  }
  </style>
  