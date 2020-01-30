import {Ingredient} from '../models/ingredient.model';

export class RecipeModel {

  public id: number;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor()

  constructor(id?: number, name?: string, description?: string, imagePath?: string, ingredients?: Ingredient[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
