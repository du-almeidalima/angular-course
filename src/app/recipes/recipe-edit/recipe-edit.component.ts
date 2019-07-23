import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  private editMode: boolean;
  private id: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // Adding to observable to react to changes
    this.route.params.subscribe(
      (params:Params) => {

        this.id = params.id;
        this.editMode = params.id != null;
      }
    );
  }

}

/* What happens here is that, whenever we assign a component to a rote and load it in a <router-outlet> we can get the
 * route this component is loaded and its metadata such as params, query, data ...
 * In here, we're using a Observable, which is from Reactive Programming, basically when we subscribe to an Observable
 * we are listening to its changes, and whenever it changes we'll execute a anonymous function
 */
