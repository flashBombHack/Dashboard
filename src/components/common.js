// common.js

export default {
    data() {
      return {
        firstName: '',
        department: '',
        userId: '',
        role:'',
        styles: [
          './vendor/fontawesome-free/css/all.min.css',
          'https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i',
          './vendor/select2/select2.min.css',
          './vendor/datepicker/daterangepicker.css',
          './vendor/datatables/dataTables.bootstrap4.min.css'
        ]
      };
    },
  
    mounted() {
      this.firstName = sessionStorage.getItem('firstName');
      this.department = sessionStorage.getItem('department');
      this.userId = sessionStorage.getItem('userId');
      this.role = sessionStorage.getItem('role');

    },
    
    methods: {
      loadStyles() {
        this.styles.forEach((style) => {
          const linkElement = document.createElement('link');
          linkElement.rel = 'stylesheet';
          linkElement.href = style;
          document.head.appendChild(linkElement);
        });
      }
    }
  };
  