export default {
// Ruta de Archivos Modificados
//backend\node_modules\@strapi\admin\admin\src\pages\HomePage\index.js
//backend\node_modules\@strapi\admin\admin\src\pages\HomePage\HomeHeader.js

//backend\node_modules\@strapi\admin\admin\src\content-manager\components\RelationInputDataManager\RelationInputDataManager.js

config: {
   
    locales: ['en', 'de'],

    translations: {
      en: {
        "app.components.LeftMenu.navbrand.title": "Payment",
        "app.components.LeftMenu.navbrand.workplace": "Dashboard",
        "Auth.form.welcome.title": "",
        "Auth.form.welcome.subtitle": "Log in to your App",
        "app.components.HomePage.welcome.again": "",
        "app.components.HomePage.welcomeBlock.content.again":"Dashboard",
        "app.components.HomePage.button.blog":"Begin",
        
      },
     
    },
  
    tutorials: false,
   
    notifications: { releases: false },
  },
  bootstrap(app) {
    console.log(app);
  },
};
