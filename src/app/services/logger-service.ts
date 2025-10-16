import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class LoggerService {
  private prod = environment.production;

  debug(...args: unknown[]) {
    if (!this.prod) console.debug(...args);
  }
  info(...args: unknown[]) {
    if (!this.prod) console.info(...args);
  }
  warn(...args: unknown[]) {
    console.warn(...args);
  }
  error(...args: unknown[]) {
    console.error(...args);
  }
}