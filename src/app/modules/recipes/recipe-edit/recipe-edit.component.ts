import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
// @ts-ignore
import FOOD_PLACEHOLDER from '../../../../assets/img/food-placeholder.jpg';
import {Ingredient} from '../../../shared/models/ingredient.model';
import {Recipe} from "../../../shared/models/recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  private id: number;

  public recipeForm: FormGroup;
  public imgPlaceholder = false;
  public FOOD_PLACEHOLDER = FOOD_PLACEHOLDER;

  // Form Controls Getters
  public get name(): AbstractControl { return this.recipeForm.get('name'); }
  public get description(): AbstractControl { return this.recipeForm.get('description'); }
  public get imgPath(): AbstractControl { return this.recipeForm.get('imagePath'); }
  public get ingredients(): AbstractControl { return this.recipeForm.get('ingredients'); }
  public get ingredientsControls(): AbstractControl[] { return (this.ingredients as FormArray).controls; }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService) { }

  ngOnInit() {
    // Adding to observable to react to changes
    this.route.params.subscribe(
      (params:Params) => {

        this.id = +params.id;

        // If id exist (edit mode) then fetch it, otherwise create new
        let recipe = this.recipeService.getRecipeById(this.id);
        if (recipe == undefined) {
          recipe = new Recipe( null,'', '', '', [new Ingredient('', 1)]);
          this.imgPlaceholder = true;
        }
        this.initForm(recipe);
      }
    );
  }

  public onSubmit(): void {
    // Save or Update recipe
    // Since we're using a Generator to gen RecipeModels id we need to create a new recipe or use the last one with the id
    const {name, description, imagePath, ingredients} = this.recipeForm.value;
    const recipe = new Recipe(this.id, name, description, imagePath || this.FOOD_PLACEHOLDER, ingredients);

    const newRecipe = this.recipeService.saveRecipe(recipe);

    this.navigateBack(newRecipe.id);
  }

  public onCancel(): void {
    this.navigateBack();
  }

  public onAddIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  public onDeleteIngredient(index: number): void {
    // To delete dynamic FromGroup / FormControls we need to use the removeAt() method from FormArray
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  // Utils
  private initForm(recipe: Recipe): void {

    this.recipeForm = new FormGroup({
      name: new FormControl(recipe.name, Validators.required),
      description: new FormControl(recipe.description, Validators.required),
      imagePath: new FormControl(recipe.imagePath, {updateOn: 'blur'}),
      // Mapping Ingredients to a FormGroup
      ingredients: new FormArray(recipe.ingredients.map(ing => {
        return new FormGroup({
          name: new FormControl(ing.name, Validators.required),
          amount: new FormControl(ing.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        })
      }))
    });

    // On Image Change
    this.imgPath.valueChanges.subscribe(data => {
      this.imgPlaceholder = data === null || data.trim() === '';
    })
  }

  private navigateBack(id?: number): void {
    if(id) {
      this.router.navigate(['recipes', id])
    } else {
      this.router.navigate(['recipes'])
    }
  }
}

/* What happens here is that, whenever we assign a component to a rote and load it in a <router-outlet> we can get the
 * route this component is loaded and its metadata such as params, query, data ...
 * In here, we're using a Observable, which is from Reactive Programming, basically when we subscribe to an Observable
 * we are listening to its changes, and whenever it changes we'll execute a anonymous function
 */

/*
 * For building the Reactive Form it's needed to know if the form is new or already exists (to fill the fields), for that
 * we can use the "editMode"
 */

/*
 *  "imagePath: new FormControl(recipe.imagePath || FOOD_PLACEHOLDER, {updateOn: "blur"})"
 * This will tell Angular to only run validation on this control after the user blur
 */

/*
 * To save / submit the form, a new Recipe was created with the form values, and with the id passed by the router.
 * In the RecipeService a new method was created "saveRecipe" that would find if it's a new or updated recipe based on
 * the id
 */
