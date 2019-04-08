import { Component, OnInit, Inject, Output, EventEmitter } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ServerService } from "src/app/shared/server.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-modal-give-book-to-user",
  templateUrl: "./modal-give-book-to-user.component.html",
  styleUrls: ["./modal-give-book-to-user.component.scss"],
})
export class ModalGiveBookToUserComponent implements OnInit {
  allBooksData = [];
  userId;
  @Output() bookWasSetEvt = new EventEmitter();
  constructor(
    private _service: ServerService,
    private _toastr: ToastrService,
    public dialogRef: MatDialogRef<ModalGiveBookToUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.userId = this.data.id;
    this.getAllBooks();
  }

  ngOnInit() {}

  getAllBooks() {
    this._service.getAllBooks().subscribe(
      accept => {
        this.allBooksData = accept.data;
      },
      reject => {
        this._toastr.error("Falha ao baixar informações!", "");
      }
    );
  }

  onClickSetBook(evt) {
    this._service.setBookToUser(this.userId, evt).subscribe(
      accept => {
        this.bookWasSetEvt.emit({ status: true });
        this.getAllBooks();
      },
      reject => {
        this._toastr.error("Livro já emprestado!", "");
      }
    );
  }
}
