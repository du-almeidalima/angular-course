import {Component} from "@angular/core";
import DataStorageService from "../core/http/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService) {}

  public onSaveData(): void {
    this.dataStorageService.saveRecipes();
  }

  public onFetchData(): void {
    console.log(this.dataStorageService.getRecipes())
  }
}
