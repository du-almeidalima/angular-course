import {Ingredient} from '../models/ingredient.model';

export class RecipeModel {

  public id: number;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(id?: number, name?: string, description?: string, imagePath?: string, ingredients?: Ingredient[]) {
    this.id = id;
    this.name = name || null;
    this.description = description || null;
    this.imagePath = imagePath || null;
    this.ingredients = ingredients || null;
  }
}
