import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenAiService } from '../../services/gen-ai.service';

@Component({
  selector: 'app-search-page',
  imports: [HeaderComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private genAI = inject(GenAiService);

  formSearch: FormGroup = this.formBuilder.group({
    ingredient: ['', Validators.required]
  });
  listFood = [];
  isLoading = false;

  ngOnInit(): void {
    const listFood = localStorage.getItem('LIST_FOOD_BY_INGREDIENT');
    if (listFood) {
      this.listFood = JSON.parse(listFood);
    }
  }

  generateRecipesByIngredient() {
    localStorage.removeItem('LIST_FOOD_BY_INGREDIENT');
    this.isLoading = true;
    this.listFood = [];
    const payload = {
      ingredient: this.formSearch.value.ingredient,
      quantity_people: 2
    }

    this.genAI.getRecipesByIngredients(payload).then((data) => {
      localStorage.setItem('LIST_FOOD_BY_INGREDIENT', JSON.stringify(data["result"]));
      this.listFood = data["recipes"];
      this.isLoading = false;
    });
  }

  openDetail(item) {
    localStorage.setItem('DETAIL_FOOD', JSON.stringify(item));
    this.router.navigate(['/detail-food']);
  }
}
