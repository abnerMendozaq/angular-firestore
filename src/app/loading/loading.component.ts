import { Component } from "@angular/core";
import { LoadingService } from "./loading.service";

@Component({
    selector: 'app-loading',
    template: `
    <div class="loading" *ngIf="isLoading">
        <div class="spinner">
            <div class="spinner-item"></div>
            <div class="spinner-item"></div>
            <div class="spinner-item"></div>
            <div class="spinner-item"></div>
            <div class="spinner-item"></div>
        </div>
    </div>
    `,
    styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
    public isLoading = false;
    constructor(private loadingService: LoadingService) {
        loadingService.getLoading.subscribe(
            load => {
                this.isLoading = load;
            }
        );
    }
}