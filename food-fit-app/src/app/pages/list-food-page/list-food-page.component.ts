import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { Router } from '@angular/router';
import { GenAiService } from '../../services/gen-ai.service';

@Component({
  selector: 'app-list-food-page',
  imports: [HeaderComponent],
  templateUrl: './list-food-page.component.html',
  styleUrl: './list-food-page.component.scss'
})
export class ListFoodPageComponent implements OnInit {
  listFood = [];
  isLoading = false;
  private genAI = inject(GenAiService);
  private router = inject(Router);

  ngOnInit(): void {
    const listFood = localStorage.getItem('LIST_FOOD');
    if (listFood) {
      this.listFood = JSON.parse(listFood);
    } else {
      this.generateRecipes();
    }
  }

  generateRecipes() {
    localStorage.removeItem('LIST_FOOD');
    this.isLoading = true;
    this.listFood = [];

    this.genAI.generatedRecipes().then((data) => {
      console.log('SALIDA', data);
      this.isLoading = false;
      this.listFood = data['recipes'];
      localStorage.setItem('LIST_FOOD', JSON.stringify(this.listFood));
    });
  }

  openDetail(item) {
    localStorage.setItem('DETAIL_FOOD', JSON.stringify(item));
    this.router.navigate(['/detail-food']);
  }
}