import { NgModule, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  createUrlTreeFromSnapshot,
  RouterModule,
  Routes,
} from '@angular/router';
import { SupabaseService } from './services/supabase.service';
import { map } from 'rxjs/operators';

const authGuard = (next: ActivatedRouteSnapshot) => {
  return inject(SupabaseService).sessionObservable.pipe(
    map((session) =>
      session !== null ? true : createUrlTreeFromSnapshot(next, ['/', 'login'])
    )
  );
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/auth.component').then((c) => c.AuthComponent),
  },
  {
    path: 'account',
    loadComponent: () =>
      import('./components/account/account.component').then(
        (c) => c.AccountComponent
      ),
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
