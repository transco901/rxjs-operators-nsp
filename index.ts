import { Observable, of, from, interval, fromEvent, throwError } from "rxjs";
import {
  tap,
  map,
  filter,
  switchMap,
  concatMap,
  mergeMap,
  delay,  
  debounceTime,
  distinctUntilChanged,
  take,
  catchError,
  retry 
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";

/****************************  map and filter ****************************/
console.clear();

class Employee {
  name: string;
  perId: number;
  companyId: number;
  age: number;
}

function transformToEmployee(ee: any): Employee {
  const newEE = new Employee();
  newEE.name = ee.name;
  newEE.perId = ee.perId;
  newEE.companyId = ee.companyId;
  newEE.age = getAge(ee.birthDate);
  return newEE;
}

function getAge(birthDate: Date) {
    let today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

let employees = new Array<Employee>();

function getEmployees() {
  let employees = [
    { name: "Ben Jones", perId: 3211, companyId: 8100, birthDate: new Date(1984, 11, 1) },
    { name: "John Barnaby", perId: 4212, companyId: 9200, birthDate: new Date(2000, 11, 1) },
    { name: "Joyce Barnaby", perId: 4213, companyId: 8100, birthDate: new Date(1987, 1, 1) },
    { name: "Charlie Nelson", perId: 5213, companyId: 9200, birthDate: new Date(2001, 4, 4) },
    { name: "Kate Wilding", perId: 5214, companyId: 9200, birthDate: new Date(1993, 10, 12) },
    { name: "Gavin Troy", perId: 5215, companyId: 8100, birthDate: new Date(1977, 1, 19) }
  ];

  return from(employees)
              .pipe(concatMap(ee => of(ee).pipe(delay(500))));
}

// pipe(): takes as its arguments the functions you want to combine (a.k.a. a recipe), and returns a new function that, when executed, runs the composed functions in sequence
getEmployees()
  .pipe(
    map(ee => {
      const employee: Employee = transformToEmployee(ee);
      employees.push(employee);
      console.log(`Name: ${employee.name}, id: ${employee.perId}, age: ${employee.age}`)
    })
  );
  // subscribe() adds an observer which triggers the 'lazy' observable to start pushing values
  //.subscribe();

/***********************************  switchMap ***********************************/

// console.clear();
// // switchMap() - type ahead search - only interested in latest input; cancel the rest.
// // debounceTime() - delay and only the most recent value from each burst of emissions.  wait for the user input to stabilize
// // distinctUntilChange() - Only emit when the current value is different than the last (avoid duplicate seraches).

// A stream of key presses
// fromEvent(document,'keyup').pipe(
//   debounceTime(500),
//   map((e: any) => e.target.value),
//   distinctUntilChanged(),
//   tap(c => console.log(`API call @${new Date()}`)),
//   switchMap(() => fakeGetCompanyHttpRequest()))
//   .subscribe();

// function fakeGetCompanyHttpRequest() {
//     let input, filter, ul, li, a, i, txtValue;
//     input = document.getElementById("searchBox");
//     filter = input.value.toUpperCase();

//     ul = document.getElementById("searchResultList");
//     li = ul.getElementsByTagName("li");

//     for (i = 0; i < li.length; i++) {
//         a = li[i].getElementsByTagName("a")[0];
//         txtValue = a.textContent || a.innerText;
//         li[i].style.display = (txtValue.toUpperCase().indexOf(filter) > -1) ?
//           "" : "none";
//     }
//     return new Observable();
// }

//document.getElementById('divForSearchBox').style.display = 'inline';

/***********************************  concatMap ***********************************/
// console.clear();

// const deleteButtons = document.getElementsByClassName('deleteBtn');

// A stream of "delete button" clicks
// const source$ = fromEvent(deleteButtons, 'click').pipe(
//   concatMap(e => fakeDeleteHttpRequest(e) )
//   //switchMap(e => fakeDeleteHttpRequest(e) )  // demonstrate how switchMap will not wait.
// );

// source$.subscribe(button => {
//   console.log(`%cAPI Call Complete: ${button.nextElementSibling.textContent}`, 'color: green');
//   button.parentElement.style.color = 'red';
// });

// function fakeDeleteHttpRequest(e: Event) {
//   const button = e.target as HTMLButtonElement;
//     console.log(`%cAPI Call Requested: ${button.nextElementSibling.textContent}`, 'color: orange');
//   return of(button).pipe(delay( Number(button.id) ));
// }

//document.getElementById('divForConcatMap').style.display = 'inline';

/***********************************  catchError ***********************************/

// console.clear();

// // A stream of "load button" clicks
// const button = document.getElementById("loadBtn");

// const source$ = fromEvent(button, "click");

// When we click "load", trigger an http get
// source$.pipe(concatMap(() => ajax.get("http://this/will/404"))).subscribe({
//   error(err) {
//     console.log(err);
//   }
// });

// source$
//   .pipe(
//     concatMap(() =>
//       ajax.get("http://this/will/404")
//         .pipe( 
//           map(data => {
//             return benefits = data.response;
//           }),
//           catchError(err => {
//             // side effect: display that something happened
//             document.getElementById('errorMsg').style.visibility = 'visible';
//             // Return a different observable (catch and replace)
//             return of(new Array<Benefit>());
//           })
//         )
//       )
//     )
//     .subscribe(x => console.log(x));

// let benefits = new Array<Benefit>();

// class Benefit {  
//   id: number;
//   description: string;
// }

// document.getElementById("divForError").style.display = "inline";

/***********************************  retry ***********************************/
// console.clear();

// const source$ = interval(500); 
// const example$ = source$.pipe(
//   mergeMap(val => {
//     if(val > 3) {
//       return throwError('Error!');
//     }
//     return of(val);
//   }),
//   retry(2)
// );

// const subscribe = example$.subscribe(
//   {
//     next: val => console.log(val),
//     error: val => console.log(`${val}: Retried 2 times then quite!`)
//   }
// );