import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MultiLingualText, Verse } from '@app/models';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-book-titles',
  templateUrl: './book-titles.component.html',
  styleUrls: ['./book-titles.component.scss']
})
export class BookTitlesComponent implements OnInit {
  @Input() titles: MultiLingualText;
  @Input() descriptions: MultiLingualText;
  @Input() verse: Verse;

  constructor() { }

  ngOnInit(): void {
  }

}
