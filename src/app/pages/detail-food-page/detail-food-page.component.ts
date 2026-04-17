import { Component, inject } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { GenAiService } from '../../services/gen-ai.service';

@Component({
  selector: 'app-detail-food-page',
  imports: [HeaderComponent],
  templateUrl: './detail-food-page.component.html',
  styleUrl: './detail-food-page.component.scss'
})
export class DetailFoodPageComponent {
  detailFood;
  private genAI = inject(GenAiService);

  constructor() {
    const detailFoodString = localStorage.getItem('DETAIL_FOOD');
    this.detailFood = detailFoodString ? JSON.parse(detailFoodString) : null;
    this.generatedImageFood(this.detailFood.name);
  }

  generatedImageFood(name) {
    const payload = {
      food: name
    }

    this.genAI.generatedImageFood(payload).then((data) => {
      this.detailFood.image = data.bytesBase64Encoded;
    });
  }
}
