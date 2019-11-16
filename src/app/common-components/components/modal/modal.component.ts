import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnChanges {
  @Input() title: string;
  @Input() modalBody: TemplateRef<any>;
  @Output() onSaveButtonClick = new EventEmitter();
  @Input() modalOpen = false;
  _modalOpen = false;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, this._modalOpen);
    if (changes['modalOpen']) {
      this._modalOpen = changes['modalOpen'].currentValue;
    }
  }

  onCancel() {
    this._modalOpen = false;
  }

  onSave() {
    this.onSaveButtonClick.emit({saved: true});
    this.onCancel();
  }
}
