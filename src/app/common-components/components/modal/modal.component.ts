import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() title: string;
  @Input() modalBody: TemplateRef<any>;
  @Output() onSaveButtonClick = new EventEmitter();
  @Input() modalOpen = false;

  constructor() {
  }

  ngOnInit() {
  }

  onCancel() {
    this.modalOpen = false;
  }

  onSave() {
    this.onSaveButtonClick.emit({saved: true});
    this.onCancel();
  }
}
