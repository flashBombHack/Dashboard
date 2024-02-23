
export default {
  methods: {
    checkTokenExpiration() {
      const token = sessionStorage.getItem('token');
      const expirationTimestamp = sessionStorage.getItem('tokenExpiration');
  
      if (token && expirationTimestamp) {
        const currentTime = Date.now() / 1000; 
  
        if (currentTime > expirationTimestamp) {
          this.logout(); 
        }
      }
    },
  
    logout() {
  
      const confirmation = window.confirm('Your session has expired. You will be logged out.');
    
      
      if (confirmation) {
      
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('tokenExpiration');
        
       
        this.$router.push('/login');
      }
    },
    

      setupTokenExpirationCheck() {
      
        const expirationTimestamp = Math.floor(Date.now() / 1000) + 3000; // 60 seconds = 1 minute
        sessionStorage.setItem('tokenExpiration', expirationTimestamp);
        
        setInterval(this.checkTokenExpiration, 60000);
      },
    },
  
    created() {
      this.setupTokenExpirationCheck();
    },
  };

