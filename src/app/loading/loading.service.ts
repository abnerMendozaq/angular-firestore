import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class LoadingService {
    private loading = new Subject<boolean>();

    public set setLoading(load: boolean) {
        this.loading.next(load);
    }

    public get getLoading(): Observable<boolean> {
        return this.loading.asObservable();
    }

}