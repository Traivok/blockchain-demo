import { Component, OnInit }                   from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import sha256                                  from '../sha256';
import { Sha256Stream }                        from '../sha256.stream';


@Component({
    selector:    'app-block',
    templateUrl: './block.component.html',
    styleUrls:   [ './block.component.scss' ],
})
export class BlockComponent implements OnInit {
    public readonly maxNonce = 0x100000;

    public formGroup: FormGroup<{
        data: FormControl<string | null>,
        blockNumber: FormControl<number | null>
        nonce: FormControl<number | null>,
    }>;
    public mining = false;

    public difficulty   = 4;
    public hashStream = new Sha256Stream();

    constructor(public fb: FormBuilder) {
        this.formGroup = this.fb.group({
                data:        [ '' ],
                blockNumber: [ 1 ],
                nonce:       [ 8451 ],
            },
            {
                // asyncValidators: hashValidator.Validator,
            });

        this.hashStream.data = this.formGroup.value;

    }

    public ngOnInit(): void {
        this.formGroup.valueChanges
            .subscribe((data) => {
                console.log({ data });
                const dataEncoded = JSON.stringify(data);
                this.hashData(dataEncoded);
            });

    }

    public hashData(data: string): void {
        this.hashStream.data = data;
    }

    public async mine() {
        this.mining                          = true;
        const { data = '', blockNumber = 1 } = this.formGroup.value;
        this.formGroup.disable();

        for (let nonce = 0; nonce < this.maxNonce; ++nonce) {
            const encoded = JSON.stringify({ data, blockNumber, nonce });
            const hash    = await sha256(encoded);

            if (hash.startsWith('0'.repeat(this.difficulty))) {
                this.formGroup.enable();
                this.formGroup.setValue({ data, blockNumber, nonce });
                this.mining = false;
                break;
            }
        }
    }
}
