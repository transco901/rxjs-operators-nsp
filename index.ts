import { Observable, of, from, interval, fromEvent } from 'rxjs';
import { map, switchMap, delay, concatMap, filter, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

/****************************  map  ****************************/

// Source observable.
// of(): Converts the arguments to an observable sequence.
// pipe(): takes as its arguments the functions you want to combine, and
// returns a new function that, when executed, runs the composed
// functions in sequence.

// A set of operators applied to an observable is a recipe—that is, a
// set of instructions for producing the values you’re interested in. By
// itself, the recipe doesn’t do anything. You need to call subscribe()
// to produce a result through the recipe.

/********* getting started *********/
// const source = of('World', 'Houston', 'Insperity');

// source.pipe( 
//     map(x => `Hello ${x}!`) 
//   );

// Subscribe/Listen
//source.subscribe(x => console.log(x));

/********* transform data *********/
// class Employee {
//   name: string;
//   perId: number;
// }

// var employee: Employee;

// function getEmployees() {
//   var employees = [ 
//       {name: 'Maria Gomez', perId:3211}, 
//       {name: 'John Barnaby', perId:4212}, 
//       {name: 'Rick Johnson', perId:5213} 
//   ];

//   return from(employees).pipe(
//     concatMap( ee => of(ee).pipe( delay(1500))));
//   }

// getEmployees().pipe(
//   map(ee => {
//     employee = ee;
//     console.log(`Employee mapped: ${employee.name}, ${employee.perId}`);
//   })).subscribe();


/****************************  fromEvent and filter  ****************************/

// document.getElementById("divForClicks").style.visibility = 'visible';

// var clicks = fromEvent(document, 'click');

// var clicksOnSpans = clicks.pipe(
//     filter( (event: Event, index: number) => {
//       return (<Element>event.target).tagName == "SPAN";
//     }));

// clicksOnSpans.subscribe(x => console.log(`span clicked!`))


/****************************  catchError  ****************************/
// const loadData = fromEvent(document, 'click');

// // When we click 'load', trigger an http event
// loadData.pipe(
//   concatMap(() => ajax.get('http://this/will/404').pipe(
//     catchError(err => {
//       //side effect, to log something happened
//       console.log(`An error occurred while loading: ${err}`);
//       //return different Observable
//       return of({message: 'We noticed an error.'});
//     })
//   ))
// ).subscribe(x => console.log(x));

/****************************  switchMap  ****************************/
// Polling - every time service is called a new Observable is created and old is
// cancelled.
var mockDataIndex = 
const mockData = ['data1', 'data2'];
function getUpdatedData() {
  return of()
}
var pollingSubscription = interval(2000).switchMap(()=> getUpdatedData())
