import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes)
  ]
};



// import { ApplicationConfig } from '@angular/core';
// import { provideHttpClient } from '@angular/common/http';
// import { provideRouter } from '@angular/router';
// import { TransferTableComponent } from './components/transfer-table/transfer-table';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideHttpClient(),
//     provideRouter([
//       {
//         path: '',
//         component: TransferTableComponent,
//       },
//     ]),
//   ],
// };
