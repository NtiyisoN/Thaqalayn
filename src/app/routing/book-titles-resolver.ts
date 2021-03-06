import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ChapterList } from '@app/models';
import { Store } from '@ngxs/store';
import { LoadBookPart } from '@store/books/books.actions';
import { Observable } from 'rxjs';

@Injectable()
export class BookTitlesResolver implements Resolve<Observable<ChapterList[]>> {
  constructor(private store: Store) {}

  resolve() {
    return this.store.dispatch(new LoadBookPart('books'));
  }
}
