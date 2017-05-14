import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
//import { HomePage } from '../pages/home/home';
import { ServicesPage } from '../pages/services/services';
import { AboutUsPage} from '../pages/aboutUs/aboutUs';
import { RequestsPage} from '../pages/requests/requests';
import { ServiceProviderDetailsPage} from '../pages/serviceProviderDetails/serviceProviderDetails';
import { ServiceProviderListPage} from '../pages/serviceProviderList/serviceProviderList'; 
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
  //  HomePage,
    ServicesPage,
	AboutUsPage,
	RequestsPage,
	ServiceProviderDetailsPage,
	ServiceProviderListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
 //   HomePage,
    ServicesPage,
	AboutUsPage,
	RequestsPage,
	ServiceProviderDetailsPage,
	ServiceProviderListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
