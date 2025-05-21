import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss']
})
export class PokemonDetailsPage {
  pokemon: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`).subscribe((data) => {
      this.pokemon = data;
    });
  }
}
