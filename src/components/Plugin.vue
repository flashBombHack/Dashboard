<template>
  <dashboard-layout>
    <div class="page-content">
      <div class="credentials-card">
        <div class="card-header">
          <h2>Your {{ packageID }} License</h2>
        </div>
        <div class="card-body">

          <div v-if="loading">
          <i class="fa fa-spinner fa-spin"></i> Loading Token Details
          </div>
          <div v-else>
          <div class="credentials">
            <div class="credential">
              <div class="credential-label">Package: </div>
              <div class="credential-package"><center>{{ packageID }}</center></div>
         
            </div>
            <div class="credential">
              <div class="credential-label">Status: </div>
              <div v-if="status == 1">
              <div class="credential-package2"><center>Active</center></div>
            </div>
            <div v-else>
              <div class="credential-package3"><center>Disable</center></div>
            </div>
         
            </div>
            <div class="credential">
              <div class="credential-label">Client ID:</div>
              <div class="credential-value" id="client-id" >{{ clientId }}</div>
              <button class="copy-button" @click="copyToClipboard('client-id', $event)">Copy</button>
            </div>
            <div class="credential">
              <div class="credential-label">Token:</div>
              <div class="credential-value" id="token" style="margin-left: 15px;">{{ truncatedToken }}</div>
              <button class="copy-button" @click="copyToClipboard('token', $event)">Copy</button>
            </div>
            <div v-if="packageID != 'Freemium'">
            <div class="credential">
            <div class="credential-label">Sub-ID:</div>
            <div class="credential-value2" style="margin-left: 10px;">{{ subscriptionID }}</div>
          </div>
          

          <!-- Cancel Subscription button -->
          <button class="cancel-subscription-button" @click="showcancelDialog = true">Cancel Subscription</button>
        </div>
      </div>
    </div>

          <div class="additional-info">
            <div class="info-section">
              <h3>Description:</h3>
              <p>Your premium license grants you access to all features and updates of our product for one year.</p>
            </div>
            <div class="info-section">
              <h3>Usage Instructions:</h3>
              <p>1. Use the provided Client ID and Token to authenticate your application with our servers.</p>
              <p>2. Enjoy the full functionality of our product without any limitations.</p>
            </div>
            <div class="info-section">
              <h3>Renewal Information:</h3>
              <p>Your license will expire after one year. To continue receiving updates and support, please renew your license before it expires.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-overlay" v-show="showcancelDialog">
  <Modal class="custom-modal custom-modal-width" v-show="showcancelDialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="modal-header-text">
            Cancel Subscription
          </div>
          <button type="button" class="close" @click="showcancelDialog = false">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body modal-text">
          Are you sure you want to cancel your {{ packageID }} Subscription?<br><br>
          <strong>Note: </strong>You will be downgraded to freemium package.
        </div>

        <div class="modal-footer">
          <button class="logout-cancel" @click="showcancelDialog = false">Cancel</button>
          <!-- <button type="button" class="btn btn-secondary" @click="showlogoutDialog = false">Cancel</button> -->
          <button class="confirm-cancel-button" @click="CancelSubscription">Yes</button>
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
  name: 'plugin-page',

  components: {
    DashboardLayout,
  },

  data() {
    return {
      clientId: '', 
      token: '', 
      packageID: '',
      status: '',
      subscriptionID: '',
      showcancelDialog: false,
      loading: true,
    };
  },

  async mounted() {
    try{
      await this.GetUserToken();
      this.loading = false;
    }catch(error){
      console.log(error)
    }
   
  },

  computed: {
    truncatedToken() {
      return this.truncateToken(this.token);
    }
  },

  methods: {

    refreshPage() {
    window.location.reload();
  },

    async CancelSubscription(){
      const UserID = sessionStorage.getItem('UserId');
 
      try{
      const response = await axios.post(this.$config.CANCELSUBSCRIPTION_ENDPOINT,
      {
        userId: UserID
      });

      if(response.status == 200){
        this.showcancelDialog = false;
        this.GetUserToken();
        this.$toast.open({
              message: `Your Subscription has been successfully Cancelled`,
              type: 'success', 
              duration: 3000, 
            });
            
      } else {
        this.showcancelDialog = false;
        this.$toast.open({
              message: `Something went wrong, please try again later!`,
              type: 'warning', 
              duration: 3000, 
            });
      }
      
    } catch(error){
      console.log(error);
      this.$toast.open({
              message: error,
              type: 'error', 
              duration: 3000, 
            });
    }
    },
  
    copyToClipboard(id, event) {
    const textToCopy = document.getElementById(id).textContent;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        event.target.innerText = 'Copied!';
      })
      .catch((error) => {
        console.error('Unable to copy text:', error);
      });
  },

    truncateToken(token) {
      if (token.length <= 50) {
        return token;
      } else {
        return token.slice(0, 47) + '...'; 
      }
    },

    async GetUserToken(){
      const UserID = sessionStorage.getItem('UserId');
 
      try{
      const response = await axios.get(`${this.$config.GETUSERTOKEN_ENDPOINT}/${parseInt(UserID)}`);

      this.clientId = response.data.ClientID;
      this.token = response.data.Token;
      this.packageID = response.data.Package;
      this.status = response.data.Status;
      this.subscriptionID = response.data.SubscriptionID;
      
    } catch(error){
      console.log(error);
    }
    },


    
  },
};
</script>

<style scoped>

.confirm-cancel-button {
  background-color: #349f33;
  color: #FFF;
  border: none;
  text-align: center;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 5px;
  width: 100px;
  height: 40px;
}
.cancel-subscription-button{
  border: 2px solid #f14040;
  background-color: #f14040;
  border-radius: 5px;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  width: 100%;
}
.credential-package3 {
  font-weight: bold;
  font-size: 12px;
  color: #fff;
  border-radius: 20px;
  width: 70px;
  height: 20px;
  background-color: #a41f1f;
  padding-top: 1px;
  margin-left: 10px;

}
.credential-package2 {
  font-weight: bold;
  font-size: 12px;
  color: #fff;
  border-radius: 20px;
  margin-left: 10px;
  width: 70px;
  height: 20px;
  background-color: #177933;
  padding-top: 1px;

}

.credential-package {
  font-weight: bold;
  font-size: 12px;
  color: #fff;
  border-radius: 20px;
  width: 70px;
  height: 20px;
  background-color: #000;
  padding-top: 1px;

}
.page-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.credentials-card {
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  max-width: 600px;
}

.card-header {
  text-align: center;
  margin-bottom: 30px;
  color: #000;
  font-size: 12px;
}

.credentials {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  
}

.credential {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
}

.credential-label {
  font-weight: bold;
  margin-right: 10px;
  font-size: 12px;
  color: #000;
}

.credential-value {
  flex-grow: 1;
  color: #c08f24;
  font-size: 12px;
  font-weight: bold;
}
.credential-value2 {
  flex-grow: 1;
  color: #000;
  font-size: 12px;
}

.copy-button {
  background-color: transparent;
  color: #000;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 10px;
  height: 25px;
  width: 50px;
}

.copy-button:hover {
  background-color: #76a4ff;
}

.additional-info {
  border-top: 1px solid #ddd;
  padding-top: 30px;
}

.info-section {
  margin-bottom: 30px;
}

.info-section h3 {
  margin-bottom: 15px;
  font-size: 20px;
  color: #3ab071;
}

.info-section p {
  font-size: 16px;
  color: #555;
}
</style>
