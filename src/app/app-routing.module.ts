import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashComponent }        from './hash/hash.component';
import { BlockComponent }       from './block/block.component';
import { BlockChainComponent }  from './block-chain/block-chain.component';
import { TokenComponent }       from './token/token.component';
import { CoinbaseComponent }    from './coinbase/coinbase.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'hash' },
    { path: 'hash', component: HashComponent },
    { path: 'block', component: BlockComponent },
    { path: 'blockchain', component: BlockChainComponent },
    { path: 'token', component: TokenComponent },
    { path: 'coinbase', component: CoinbaseComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
})
export class AppRoutingModule {}
