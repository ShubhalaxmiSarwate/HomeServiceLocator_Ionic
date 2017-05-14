import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { HomePage } from '../pages/home/home';
import { ServicesPage } from '../pages/services/services';
import { AboutUsPage} from '../pages/aboutUs/aboutUs';
import { RequestsPage} from '../pages/requests/requests';
import { ServiceProviderDetailsPage} from '../pages/serviceProviderDetails/serviceProviderDetails';
import { ServiceProviderListPage} from '../pages/serviceProviderList/serviceProviderList';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage: any = HomePage;
  rootPage: any = ServicesPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
     // { title: 'Home', component: HomePage },
      { title: 'Services', component: ServicesPage },
	  { title: 'About Us', component: AboutUsPage },
	  { title: 'Requests', component: RequestsPage },
	  { title: 'Service Provider', component: ServiceProviderDetailsPage },
	  { title: 'List of SPs', component: ServiceProviderListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
