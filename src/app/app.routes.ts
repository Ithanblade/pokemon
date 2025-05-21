import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'pokemon-details',
    loadComponent: () => import('./pokemon-details/pokemon-details.page').then(m => m.PokemonDetailsPage)
  },
  {
    path: 'pokemon/:id',
    loadComponent: () => import('./pokemon-details/pokemon-details.page').then(m => m.PokemonDetailsPage)
  }
];
