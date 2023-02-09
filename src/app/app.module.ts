import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule }        from './app-routing.module';
import { AppComponent }            from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule }    from '@angular/material/toolbar';
import { NavibarComponent }                 from './navibar/navibar.component';
import { MatButtonModule }                  from '@angular/material/button';
import { HashComponent }                    from './hash/hash.component';
import { BlockComponent }                   from './block/block.component';
import { TokenComponent }                   from './token/token.component';
import { CoinbaseComponent }                from './coinbase/coinbase.component';
import { BlockChainComponent }              from './block-chain/block-chain.component';
import { MatTabsModule }                    from '@angular/material/tabs';
import { MatCardModule }                    from '@angular/material/card';
import { MatInputModule }                   from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule }         from '@angular/material/progress-spinner';

@NgModule({
    declarations: [
        AppComponent,
        NavibarComponent,
        HashComponent,
        BlockComponent,
        BlockChainComponent,
        TokenComponent,
        CoinbaseComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatTabsModule,
        MatCardModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
    ],
    providers:    [],
    bootstrap:    [ AppComponent ],
})
export class AppModule {}
