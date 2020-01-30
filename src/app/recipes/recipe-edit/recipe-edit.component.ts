import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {RecipeService} from "../../services/recipe.service";
import {RecipeModel} from "../recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  private editMode: boolean;
  private id: number;

  public recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    // Adding to observable to react to changes
    this.route.params.subscribe(
      (params:Params) => {

        this.id = +params.id;
        this.editMode = params.id != null;

        // If id exist (edit mode) then fetch it, otherwise create new
        this.initForm(this.recipeService.getRecipe(this.id) || new RecipeModel());
      }
    );
  }

  public onSubmit(): void {
    console.log(this.recipeForm.value);
}

  // Utils
  private initForm(recipe: RecipeModel): void {

    this.recipeForm = new FormGroup({
      name: new FormControl(recipe.name),
      description: new FormControl(recipe.description),
      imagePath: new FormControl(recipe.imagePath)
    });
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
