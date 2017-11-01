import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule,enableProdMode } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule,FabContainer } from 'ionic-angular';

import { MyApp } from './app.component';

// Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Modules
import { AngularFireModule } from 'angularfire2';
import { IonicStorageModule } from '@ionic/storage';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { MaterialIconsModule } from 'ionic2-material-icons';
// import { TooltipsModule } from 'ionic-tooltips';
import { IonicImageViewerModule } from 'ionic-img-viewer';

// Providers
import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService,AdminService,CacheService,AppService,FileService,MailService } from "../shared/services"; 
import { PlatformUtil,DialogUtil,HelperUtil } from "../shared/utils"; 

// Ionic native
import { Clipboard } from '@ionic-native/clipboard';
import { BrowserTab } from '@ionic-native/browser-tab';
import { InAppBrowser } from '@ionic-native/in-app-browser';

// import { ComponentsModule } from "../components/components.module";

// AF2 Settings
export const firebaseConfig = {
    apiKey: "AIzaSyDsUKRYcTMx0EI2jtLAKY84j2dM9vTKW68",
    authDomain: "showcase-it.firebaseapp.com",
    databaseURL: "https://showcase-it.firebaseio.com",
    projectId: "showcase-it",
    storageBucket: "showcase-it.appspot.com",
    messagingSenderId: "648259907848"
};

enableProdMode();

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialIconsModule,
    IonicImageViewerModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    SuperTabsModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,SplashScreen,FabContainer,
    UserService,AdminService,CacheService,AppService,FileService,MailService,
    PlatformUtil,DialogUtil,HelperUtil,
    Clipboard,InAppBrowser,BrowserTab,
    AngularFireDatabase,AngularFireAuth,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
