import { Component, OnInit }                            from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { routes }                                       from '../app-routing.module';
import { filter }                                       from 'rxjs';

@Component({
    selector:    'app-navibar',
    templateUrl: './navibar.component.html',
    styleUrls:   [ './navibar.component.scss' ],
})
export class NavibarComponent {

    public readonly routes: string[];

    activeLink: string = '';

    constructor(private router: Router) {
        this.routes = routes.reduce((prev: string[], curr: Route) => {
            // filter paths
            if (typeof curr.path === 'string' && curr.path.length)
                prev.push(curr.path);

            return prev;
        }, []);

        router.events
            .pipe(filter(v => v instanceof NavigationEnd))
            .subscribe((val) => {
                if (val instanceof NavigationEnd)
                    this.activeLink = val.url.replace(/^\//g, '');
            });
    }
}
