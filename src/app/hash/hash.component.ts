import { Component, OnInit }                    from '@angular/core';
import { CryptoService }                        from '../crypto.service';
import { BehaviorSubject, from, ReplaySubject } from 'rxjs';

@Component({
    selector:    'app-hash',
    templateUrl: './hash.component.html',
    styleUrls:   [ './hash.component.scss' ],
})
export class HashComponent implements OnInit {
    public data: string = '';
    public hash$        = new ReplaySubject<string>();

    constructor(public crypto: CryptoService) {}

    public ngOnInit(): void {
        this.hashData(this.data);
    }

    public hashData(data: string): void {
        from(this.crypto.hash(data))
            .subscribe(hash => this.hash$.next(hash));
    }
}
