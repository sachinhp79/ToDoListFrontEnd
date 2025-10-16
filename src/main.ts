import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideAnimations } from '@angular/platform-browser/animations'; // add this
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations() // add this
  ]
}).catch(err => console.error(err));
