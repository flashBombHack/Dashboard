<template>
  <dashboard-layout>
    <div class="head-text">Dashboard</div>
    <div class="subhead-text">Here's a quick view of your onboarded businesses and their transactions.</div>

  

  </dashboard-layout>
</template>
  
  <script>
  import DashboardLayout from './DashboardLayout.vue';
  // import axios from 'axios'; 

  
  export default {
    name: 'main-dashboard',

  
    components: {
      DashboardLayout,
    },

  
  };
  </script>
  
  <style>

  .canvasTop {
    border-top: 1px;
  }

.tab-buttons {
  display: flex;
  margin-bottom: 40px;
}

.tab-buttons button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
  margin-right: 10px;
  padding: 10px;
  color: #b0a8a8;
}

.tab-buttons button.activeTab {
  border-bottom: 2px solid #6F48FF; /* Active tab indicator color */
  color: #000; /* Active tab text color */
}

.calendar-dropdown {
  border-radius: 5px;
  display: flex;
  margin-left: 850px;
  font-size: 12px;
  height: 25px;
  
}

.dropdown-select {
  margin-right: 5px;
  border: 1px solid #000;
  text-align: center;
  border-radius: 3px;
  font-size: 12px;
  transition: border-color 0.3s ease-in-out;
}

.dropdown-select:hover {
  border-color: #4CAF50; /* Green border on hover */
}

.dropdown-select::-webkit-scrollbar {
  width: 2px; /* Set the width of the scrollbar */
}

.dropdown-select::-webkit-scrollbar-thumb {
  background-color: #c6c5cb; /* Set the color of the scrollbar thumb */
  border-radius: 3px; /* Optional: Add rounded corners to the thumb */
}


  .custom-icon-size{
    height: 70px;
    width: auto;
  }

.big-white-card {
    background-color: #FFF; /* White background color */
    margin: 20px 40px; /* Margin as needed */
    padding: 20px; /* Padding as needed */
    height: 500px;
  }

  .center-content {
    text-align: center;
    margin-top: 160px;
    
  }


  .write-up {
    font-size: 16px;
    margin-top: 10px;
    color: #000;
    font-weight: bold;
  }

  .head-text {
  margin-left: 40px;
  font-size: 22px;
  color: #000;
  font-weight: bold;
  }

  .oval-icon{
    margin-left: 70px;
  }
  .oval-icon2{
    margin-left: 58px;
  }

  .oval-icon3{
    margin-left: 110px;
  }

  .subhead-text{
  margin-left: 40px;
  font-size: 14px;
}

.subhead-text2{
  font-size: 14px;
}

.dashboard-cards {
  display: flex;
  justify-content: space-between;
  margin: 20px 40px;
}

.dashboard-card {
  flex: 1;
  /* border: 1px solid #624915; */
  /* border-radius: 5px; */
  padding-top: 10px;
  background-color: #FFF9ED;
  height: 90px;
  width: 100px;

}

.card1-border{
  border-left: 1px solid #624915 ;
  border-top: 1px solid #624915 ;
  border-bottom: 1px solid #624915 ;
  border-radius: 3px;
}

.card2-border{
  border-left: 1px solid #624915 ;
  border-top: 1px solid #624915 ;
  border-bottom: 1px solid #624915 ;
}

.card3-border{
  border-left: 1px solid #624915 ;
  border-top: 1px solid #624915 ;
  border-bottom: 1px solid #624915 ;
  border-right: 1px solid #624915 ;
}

.card4-border{
  border-right: 1px solid #624915 ;
  border-top: 1px solid #624915 ;
  border-bottom: 1px solid #624915 ;
  border-radius: 3px;

}

.card3-header {
  font-size: 13px;
 
  margin-left: 20px;
  color: #000;
}

.card-value {
  font-size: 20px;
  margin-top: 10px;
  margin-left: 20px;
  margin-bottom: 0px;
  font-weight: bolder;
  color: #000;
}
  
  </style>
  