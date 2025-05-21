import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})


export class HomePage implements OnInit {

  pokemons: any[] = [];
  offset = 0;
  limit = 3000;
  loading = false;
  searchTerm = '';
  filteredPokemons: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons(event?: any) {
    if(this.loading) return;
    this.loading = true;
    this.http.get<any>(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`).subscribe((res)=>{
      this.pokemons=[...this.pokemons,...res.results];
      this.offset += this.limit;
      this.loading = false;

      if(event){
        event.target.complete();
      }

      if(res.nex === null && event){
        event.target.disabled = true;
      }

    })
  }

  getImageUrl(index: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png`;
  }

    searchPokemon() {
    const term = this.searchTerm.trim().toLowerCase();
    if (term.length === 0) {
      this.filteredPokemons = this.pokemons;
      return;
    }

    this.filteredPokemons = this.pokemons.filter(p =>
      p.name.toLowerCase().includes(term)
    );
  }

  goToDetails(pokemon: any) {
    const id = this.getPokemonIdFromUrl(pokemon.url);
    this.router.navigate(['/pokemon', id]);
  }

  getPokemonIdFromUrl(url: string): number {
    const parts = url.split('/');
    return +parts[parts.length - 2];
  }

  getImageUrlFromPokemon(pokemon: any): string {
    const id = this.getPokemonIdFromUrl(pokemon.url);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

}
