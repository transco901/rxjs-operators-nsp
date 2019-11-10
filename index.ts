import { Observable, of, from, interval, fromEvent } from 'rxjs';
import { map, switchMap, delay, concatMap, filter, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

/****************************  map  ****************************/

/********* getting started *********/
// console.clear();

// //of(): Converts the arguments to an observable sequence
// const source = of('World', 'Houston', 'Insperity');

// // pipe(): takes as its arguments the functions you want to combine, and
// // returns a new function that, when executed, runs the composed functions in sequence.
// source.pipe( 
//     map(s => `Hello ${s}!`),
//     //map(s => 10),
//     //filter( s => s === 10)
//   ).subscribe(s => console.log(s)); 

/********* transform data *********/
console.clear();

class Employee {
  name: string;
  perId: number;
  companyId: number;
}

var employee: Employee;

function getEmployees() {
  var employees = [ 
      {name: 'Ben Jones', perId:3211, companyId: 8100}, 
      {name: 'John Barnaby', perId:4212, companyId: 9200}, 
      {name: 'Joyce Barnaby', perId:4213, companyId: 8100}, 
      {name: 'Charlie Nelson', perId:5213, companyId: 9200},
      {name: 'Kate Wilding', perId:5213, companyId: 9200},
      {name: 'Gavin Troy', perId:5213, companyId: 8100},
  ];

  return from(employees).pipe(
    concatMap( ee => of(ee).pipe( delay(1500))));
  }

getEmployees().pipe(
  map(ee => {
    employee = ee;
    console.log(`Employee mapped: ${employee.name}, ${employee.perId}`);
  })).subscribe();


/****************************  fromEvent and filter  ****************************/
// console.clear();

// document.getElementById("divForClicks").style.display = 'block';

// var clicks = fromEvent(document, 'click');

// var clicksOnSpans = clicks.pipe(
//     filter( (event: Event, index: number) => {
//       return (<Element>event.target).tagName == "SPAN";
//     }));

// clicksOnSpans.subscribe(x => console.log(`span clicked!`))


/****************************  catchError  ****************************/
// console.clear();
// const loadData = fromEvent(document, 'click');

// // When we click 'load', trigger an http event
// loadData.pipe(
//   concatMap(() => ajax.get('http://this/will/404').pipe(
//     catchError(err => {
//       //side effect, to log something happened
//       console.log(`An error occurred while loading: ${err}`);
//       // return different Observable
//       return of({message: 'We noticed an error.'});
//     })
//   ))
// ).subscribe(x => console.log(x));

/**************************  switchMap, distinctUntilChanged  **************************/
// console.clear();
// // swtichMap() - type ahead search - only interested in latest input; cancel the rest.
// // distinctUntilChange() - Only emit when the current value is different than the last.

// document.getElementById("divForSearchBox").style.visibility = 'visible';

// fromEvent(document,'keyup').pipe(
//   debounceTime(300),
//   distinctUntilChanged(),
//   switchMap(val => filterSearchItems()))
//   .subscribe();

// function filterSearchItems() {
//     var input, filter, ul, li, a, i, txtValue;
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
//     return new Observable(); // weird?
// }