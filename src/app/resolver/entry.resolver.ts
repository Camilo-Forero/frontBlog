import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { EntryService } from '../service/entry.service';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class EntryResolve implements Resolve<any> {

  constructor(
    private acctService: EntryService
    ) {}

  async resolve(route: ActivatedRouteSnapshot)
  {
    return await this.acctService.getEntry(route.params['id']).toPromise();
  }

}