import { ModalGiveBookToUserComponent } from "./../modal-give-book-to-user/modal-give-book-to-user.component";
import { ToastrService } from "ngx-toastr";
import { FormControl, Validators } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ServerService } from "src/app/shared/server.service";
import { MatDialog } from "@angular/material/dialog";

interface User {
  name: string;
  email: string;
  userType: string;
}

@Component({
  selector: "app-library",
  templateUrl: "./library.component.html",
  styleUrls: ["./library.component.scss"],
})
export class LibraryComponent implements OnInit {
  userData: User;
  booksData = [];
  newBook: FormGroup;
  allUsersData = [];
  registerBook = false;
  constructor(
    private _service: ServerService,
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _dialog: MatDialog
  ) {
    this.newBook = this._fb.group({
      bookCreator: new FormControl("", Validators.required),
      bookName: new FormControl("", Validators.required),
    });
    this.getUserData();
    this.getAllBooks();
    this.getAllUsers();
  }

  ngOnInit() {}

  getUserData() {
    this._service.getLoggedUserData().subscribe(
      accept => {
        this.userData = accept.data;
        
      },
      reject => {
        
      }
    );
  }

  getAllUsers() {
    this._service.getAllUsers().subscribe(
      accept => {
        this.allUsersData = accept.data;
        
      },
      reject => {
        
      }
    );
  }

  getAllBooks() {
    this._service.getAllBooks().subscribe(
      accept => {
        this.booksData = accept.data;
        
      },
      reject => {
        
      }
    );
  }

  onClickRegisterNewBook() {
    if (this.userData.userType !== "admin") {
      this._toastr.error("Somente administradores podem criar livros!", '');
    } else {
      this.registerBook = !this.registerBook;
    }
  }

  onClickSaveNewBook() {
    if (this.newBook.valid) {
      this._toastr.info("Salvando Novo Livro..", "");
      this._service.createBook(this.newBook.value).subscribe(
        accept => {
          this._toastr.success("Salvo com sucesso!", "");
          this.registerBook = false;
          this.getAllBooks();
          this.newBook.controls['bookCreator'].setValue('');
          this.newBook.controls['bookName'].setValue('');
        },
        reject => {
          this._toastr.error("Falha ao salvar livro!", "");
        }
      );
    }
  }

  onClickReturnBook(book_id) {
    this._service.returnBook(book_id).subscribe(
      accept => {
        
        this.getAllBooks();
        this.getAllUsers();
      },
      reject => {
        
      }
    );
  }

  onClickGetBook(book_id) {
    this._service.takeBook(book_id).subscribe(
      accept => {
        this._toastr.success("Livro pego com sucesso", "");
        this.getAllBooks();
        this.getAllUsers();
      },
      reject => {
        this._toastr.error("Livro já emprestado!", "");
      }
    );
  }

  onClickForceSetBoot(data) {
    if (this.userData.userType !== "admin") {
      this._toastr.error("Somente administradores podem emprestar livros!", "");
    } else {
      const dialogRef = this._dialog.open(ModalGiveBookToUserComponent, {
        data,
      });

      dialogRef.componentInstance.bookWasSetEvt.subscribe(data => {
        if (data.status === true) {
          this.getAllBooks();
          this.getAllUsers();
        }
      });

      dialogRef.backdropClick().subscribe(() => {
        this.getAllBooks();
        this.getAllUsers();
      });
    }
  }
}
