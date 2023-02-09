import { Component, OnInit }                                                     from '@angular/core';
import { filter, from, map, Observable, of, pairwise, ReplaySubject, startWith } from 'rxjs';
import { CryptoService }                                                         from '../crypto.service';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm }       from '@angular/forms';
import { ErrorStateMatcher }                                                     from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    constructor(public readonly difficulty = 4) {}

    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const { hash = '' } = control?.value;
        return hash.startsWith('0'.repeat(this.difficulty));
    }
}

@Component({
    selector:    'app-block',
    templateUrl: './block.component.html',
    styleUrls:   [ './block.component.scss' ],
})
export class BlockComponent implements OnInit {
    public readonly difficulty = 4;
    public readonly maxNonce   = 0x100000;
    matcher                    = new MyErrorStateMatcher(this.difficulty);
    public formGroup: FormGroup<{
        data: FormControl<string | null>,
        blockNumber: FormControl<number | null>
        nonce: FormControl<number | null>,
        hash: FormControl<string | null>,
    }>;
    public mining              = false;

    constructor(public crypto: CryptoService,
                public fb: FormBuilder) {

        this.formGroup = this.fb.group({
            data:        [ '' ],
            blockNumber: [ 1 ],
            nonce:       [ 8451 ],
            hash:        [ '0000d47b65996eb8caa83faae58d071f2a762c14703f7f1d5cf4bd0ea9e6d8e1' ],
        });
    }

    public ngOnInit(): void {
        this.formGroup.valueChanges
            .pipe(startWith({ data: '', nonce: 1, blockNumber: 1, hash: '' }),
                pairwise(),
                filter(([ fst, snd ]) => {
                    const { hash: fstHash, ...fstObj } = fst;
                    const { hash: sndHash, ...sndObj } = snd;

                    return JSON.stringify(fstObj) !== JSON.stringify(sndObj);
                }),
                map(([ prev, curr ]) => curr),
            )
            .subscribe(({ hash, ...data }) => {
                console.log(data);
                const dataEncoded = JSON.stringify(data);
                this.hashData(dataEncoded);
            });

    }

    private set hash(value: string) {
        this.formGroup.controls['hash'].setValue(value);
    }

    public hashData(data: string): void {
        from(this.crypto.hash(data))
            .subscribe(hash => this.hash = hash);
    }

    public async mine() {
        this.mining = true;
        const { data = '', blockNumber = 1, hash } = this.formGroup.value;
        this.formGroup.disable();

        for (let nonce = 0; nonce < this.maxNonce; ++nonce) {
            console.log('nonce', nonce);
            const encoded = JSON.stringify({ data, blockNumber, nonce });
            const hash    = await this.crypto.hash(encoded);

            if (hash.startsWith('0'.repeat(this.difficulty))) {
                this.formGroup.enable();
                this.formGroup.setValue({ data, blockNumber, nonce, hash });
                this.mining = false;
                break;
            }
        }
    }
}
