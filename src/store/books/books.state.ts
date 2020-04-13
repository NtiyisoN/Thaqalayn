import { Injectable } from '@angular/core';
import { Book, BookTitle } from '@app/models';
import { BooksService } from '@app/services';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { BooksAction, LoadBookPart, LoadBookTitles } from './books.actions';

export interface BooksStateModel {
  titles: BookTitle[];
  parts: { [index: string]: Book };
}

@State<BooksStateModel>({
  name: 'books',
  defaults: {
    titles: [],
    parts: {}
  }
})
@Injectable()
export class BooksState {
  constructor(private booksService: BooksService) {}

  @Selector()
  public static getState(state: BooksStateModel) {
    return state;
  }

  @Selector()
  public static getTitles(state: BooksStateModel) {
    return state.titles;
  }

  @Selector()
  public static getParts(state: BooksStateModel) {
    return state.parts;
  }

  @Action(LoadBookTitles)
  public loadTitles(ctx: StateContext<BooksStateModel>) {
    return this.booksService.getTitles().pipe(
      tap(loadedTitles =>
        ctx.patchState(
        {
          titles: loadedTitles
        }
      )));
  }

  @Action(LoadBookPart)
  public loadPart(ctx: StateContext<BooksStateModel>, action: LoadBookPart) {
    return this.booksService.getPart(action.payload).pipe(
      tap(loadedPart => {
        const state = ctx.getState();
        return ctx.patchState({
          parts: {
            ...state.parts,
            [loadedPart.index]: loadedPart
          }});
      }));
  }

  @Action(BooksAction)
  public add(ctx: StateContext<BooksStateModel>, { payload }: BooksAction) {
    // const stateModel = ctx.getState();
    // stateModel.items = [...stateModel.items, payload];
    // ctx.setState(stateModel);
  }
}
